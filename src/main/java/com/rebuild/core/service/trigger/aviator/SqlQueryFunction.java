/*!
Copyright (c) REBUILD <https://getrebuild.com/> and/or its owners. All rights reserved.

rebuild is dual-licensed under commercial and open source licenses (GPLv3).
See LICENSE and COMMERCIAL in the project root for license information.
*/

package com.rebuild.core.service.trigger.aviator;

import cn.devezhao.persist4j.Entity;
import cn.devezhao.persist4j.engine.ID;
import com.googlecode.aviator.runtime.function.AbstractFunction;
import com.googlecode.aviator.runtime.function.FunctionUtils;
import com.googlecode.aviator.runtime.type.AviatorObject;
import com.googlecode.aviator.runtime.type.AviatorRuntimeJavaType;
import com.rebuild.core.Application;
import com.rebuild.core.metadata.MetadataHelper;
import com.rebuild.core.service.query.QueryHelper;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang.StringUtils;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 执行SQL查询，返回一个字段值
 * 语法：SQLQUERY($SQL, [$PARAM1, PARAM2, PARAM3, PARAM4, PARAM5])
 * 
 * @author devezhao
 * @since 2023/11/15
 */
@Slf4j
public class SqlQueryFunction extends AbstractFunction {

    private static final Pattern SELECT_PATTERN = Pattern.compile("^\\s*select\\s+", Pattern.CASE_INSENSITIVE);
    private static final Pattern SEQ_PATTERN = Pattern.compile("^\\s*seq\\s+", Pattern.CASE_INSENSITIVE);
    private static final int MAX_PARAMS = 5;

    @Override
    public String getName() {
        return "SQLQUERY";
    }

    @Override
    public AviatorObject call(Map<String, Object> env) {
        throw new IllegalArgumentException("SQLQUERY function need at least 1 argument");
    }

    @Override
    public AviatorObject call(Map<String, Object> env, AviatorObject arg1) {
        String sql = FunctionUtils.getStringValue(arg1, env);
        return AviatorUtils.wrapReturn(executeSql(sql, null));
    }

    @Override
    public AviatorObject call(Map<String, Object> env, AviatorObject arg1, AviatorObject arg2) {
        String sql = FunctionUtils.getStringValue(arg1, env);
        Object param1 = FunctionUtils.getJavaObject(arg2, env);
        return AviatorUtils.wrapReturn(executeSql(sql, new Object[] { param1 }));
    }

    @Override
    public AviatorObject call(Map<String, Object> env, AviatorObject arg1, AviatorObject arg2, AviatorObject arg3) {
        String sql = FunctionUtils.getStringValue(arg1, env);
        Object param1 = FunctionUtils.getJavaObject(arg2, env);
        Object param2 = FunctionUtils.getJavaObject(arg3, env);
        return AviatorUtils.wrapReturn(executeSql(sql, new Object[] { param1, param2 }));
    }

    @Override
    public AviatorObject call(Map<String, Object> env, AviatorObject arg1, AviatorObject arg2, AviatorObject arg3, AviatorObject arg4) {
        String sql = FunctionUtils.getStringValue(arg1, env);
        Object param1 = FunctionUtils.getJavaObject(arg2, env);
        Object param2 = FunctionUtils.getJavaObject(arg3, env);
        Object param3 = FunctionUtils.getJavaObject(arg4, env);
        return AviatorUtils.wrapReturn(executeSql(sql, new Object[] { param1, param2, param3 }));
    }

    @Override
    public AviatorObject call(Map<String, Object> env, AviatorObject arg1, AviatorObject arg2, AviatorObject arg3, AviatorObject arg4, AviatorObject arg5) {
        String sql = FunctionUtils.getStringValue(arg1, env);
        Object param1 = FunctionUtils.getJavaObject(arg2, env);
        Object param2 = FunctionUtils.getJavaObject(arg3, env);
        Object param3 = FunctionUtils.getJavaObject(arg4, env);
        Object param4 = FunctionUtils.getJavaObject(arg5, env);
        return AviatorUtils.wrapReturn(executeSql(sql, new Object[] { param1, param2, param3, param4 }));
    }

    @Override
    public AviatorObject call(Map<String, Object> env, AviatorObject arg1, AviatorObject arg2, AviatorObject arg3, AviatorObject arg4, AviatorObject arg5, AviatorObject arg6) {
        String sql = FunctionUtils.getStringValue(arg1, env);
        Object param1 = FunctionUtils.getJavaObject(arg2, env);
        Object param2 = FunctionUtils.getJavaObject(arg3, env);
        Object param3 = FunctionUtils.getJavaObject(arg4, env);
        Object param4 = FunctionUtils.getJavaObject(arg5, env);
        Object param5 = FunctionUtils.getJavaObject(arg6, env);
        return AviatorUtils.wrapReturn(executeSql(sql, new Object[] { param1, param2, param3, param4, param5 }));
    }

    /**
     * 执行SQL查询
     * 
     * @param sql SQL语句
     * @param params 查询参数
     * @return 查询结果
     */
    private Object executeSql(String sql, Object[] params) {
        // 处理SQL语句
        boolean isSeq = false;
        
        // 检查是否为seq查询（返回多条记录）
        Matcher seqMatcher = SEQ_PATTERN.matcher(sql);
        if (seqMatcher.find()) {
            isSeq = true;
            sql = seqMatcher.replaceFirst("");
        }
        
        // 如果没有select关键词，添加select
        Matcher selectMatcher = SELECT_PATTERN.matcher(sql);
        if (!selectMatcher.find()) {
            sql = "select " + sql;
        }
        
        // 处理参数
        List<Object> paramList = new ArrayList<>();
        if (params != null) {
            for (Object param : params) {
                if (param == null) {
                    paramList.add(null);
                } else if (param instanceof Collection) {
                    paramList.addAll((Collection<?>) param);
                } else {
                    paramList.add(param);
                }
            }
        }
        
        try {
            // 执行查询
            Object[][] result = executeQuery(sql, paramList.toArray());
            
            // 处理结果
            if (result == null || result.length == 0) {
                return null;
            }
            
            if (isSeq) {
                // 返回多条记录的第一个字段值
                List<Object> values = new ArrayList<>();
                for (Object[] row : result) {
                    if (row != null && row.length > 0) {
                        values.add(row[0]);
                    }
                }
                return values;
            } else {
                // 返回第一条记录的第一个字段值
                return result[0][0];
            }
        } catch (Exception e) {
            log.error("执行SQL查询失败: " + sql, e);
            return null;
        }
    }
    
    /**
     * 执行查询
     * 
     * @param sql SQL语句
     * @param params 查询参数
     * @return 查询结果
     */
    private Object[][] executeQuery(String sql, Object[] params) {
        // 使用QueryHelper创建查询
        try {
            // 获取实体信息
            String entityName = extractEntityName(sql);
            if (StringUtils.isBlank(entityName)) {
                log.warn("无法从SQL中提取实体名称: " + sql);
                return null;
            }
            
            Entity entity = MetadataHelper.getEntity(entityName);
            
            // 创建查询
            if (params != null && params.length > 0) {
                // 使用正确的方法创建查询并设置参数
                cn.devezhao.persist4j.Query query = QueryHelper.createQuery(sql, entity);
                // 逐个设置参数
                for (int i = 0; i < params.length; i++) {
                    Object param = params[i];
                    // 尝试将字符串参数转换为ID类型（如果可能）
                    if (param instanceof String && ID.isId((String) param)) {
                        param = ID.valueOf((String) param);
                    }
                    query.setParameter(i + 1, param);
                }
                return query.array();
            } else {
                return QueryHelper.createQuery(sql, entity)
                        .array();
            }
        } catch (Exception e) {
            log.error("执行查询失败: " + sql, e);
            return null;
        }
    }
    
    /**
     * 从SQL中提取实体名称
     * 
     * @param sql SQL语句
     * @return 实体名称
     */
    private String extractEntityName(String sql) {
        // 简单提取from后面的实体名称
        String lowerSql = sql.toLowerCase();
        int fromIndex = lowerSql.indexOf(" from ");
        if (fromIndex == -1) {
            return null;
        }
        
        String afterFrom = sql.substring(fromIndex + 6).trim();
        // 处理可能的where、order by等
        String[] parts = afterFrom.split("\\s+");
        if (parts.length > 0) {
            return parts[0];
        }
        
        return null;
    }
}