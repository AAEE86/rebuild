/*!
Copyright (c) REBUILD <https://getrebuild.com/> and/or its owners. All rights reserved.

rebuild is dual-licensed under commercial and open source licenses (GPLv3).
See LICENSE and COMMERCIAL in the project root for license information.
*/

package com.rebuild.core.support.general;

import cn.devezhao.persist4j.Entity;
import cn.devezhao.persist4j.Field;
import cn.devezhao.persist4j.engine.ID;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.rebuild.core.Application;
import com.rebuild.core.metadata.MetadataHelper;
import com.rebuild.core.service.query.AdvFilterParser;
import com.rebuild.core.service.query.FilterRecordChecker;
import com.rebuild.core.service.query.ParseHelper;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang.StringUtils;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * 简易过滤器条件评估服务
 * 
 * @author rebuild
 * @since 2023/05/20
 */
@Slf4j
public class EasyFilterEvaluator {
    
    // 布局配置缓存，键为布局ID，值为布局配置
    private static final Map<String, JSONArray> LAYOUT_CONFIG_CACHE = new ConcurrentHashMap<>();
    
    // 缓存过期时间（毫秒）
    private static final long CACHE_EXPIRE_TIME = 5 * 60 * 1000; // 5分钟
    
    // 缓存最后更新时间
    private static final Map<String, Long> CACHE_UPDATE_TIME = new ConcurrentHashMap<>();
    
    /**
     * 评估布局配置中的过滤条件
     * 
     * @param layoutId 布局ID
     * @param formData 表单数据
     * @param user 当前用户
     * @param recordId 记录ID（可选）
     * @return 评估结果列表
     */
    public List<JSONObject> evaluateLayoutFilters(String layoutId, JSONObject formData, ID user, String recordId) {
        if (StringUtils.isBlank(layoutId) || !ID.isId(layoutId)) {
            log.warn("Invalid layout ID: {}", layoutId);
            return new ArrayList<>();
        }
        
        try {
            // 获取布局配置（优先从缓存获取）
            JSONArray layoutConfig = getLayoutConfig(layoutId);
            if (layoutConfig == null || layoutConfig.isEmpty()) {
                return new ArrayList<>();
            }
            
            List<JSONObject> results = new ArrayList<>();
            
            for (Object item : layoutConfig) {
                JSONObject fieldConfig = (JSONObject) item;
                String fieldName = fieldConfig.getString("field");
                
                if (StringUtils.isBlank(fieldName)) {
                    continue;
                }
                
                JSONObject result = new JSONObject();
                result.put("field", fieldName);
                
                // 评估隐藏条件
                JSONObject hiddenFilter = fieldConfig.getJSONObject("hiddenOnEasyFilter");
                if (hiddenFilter != null && !hiddenFilter.isEmpty()) {
                    boolean hidden = evalFilterCondition(hiddenFilter, formData, user, recordId);
                    result.put("hidden", hidden);
                }
                
                // 评估必填条件 
                JSONObject requiredFilter = fieldConfig.getJSONObject("requiredOnEasyFilter");
                if (requiredFilter != null && !requiredFilter.isEmpty()) {
                    boolean required = evalFilterCondition(requiredFilter, formData, user, recordId);
                    result.put("required", required);
                }
                
                // 评估只读条件
                JSONObject readonlyFilter = fieldConfig.getJSONObject("readonlyOnEasyFilter");
                if (readonlyFilter != null && !readonlyFilter.isEmpty()) {
                    boolean readonly = evalFilterCondition(readonlyFilter, formData, user, recordId);
                    result.put("readonly", readonly);
                }
                
                results.add(result);
            }
            
            return results;
        } catch (Exception e) {
            log.error("Error evaluating layout filters for layout {}: {}", layoutId, e.getMessage(), e);
            return new ArrayList<>();
        }
    }
    
    /**
     * 获取布局配置，优先从缓存获取
     * 
     * @param layoutId 布局ID
     * @return 布局配置
     */
    private JSONArray getLayoutConfig(String layoutId) {
        // 检查缓存是否过期
        Long lastUpdateTime = CACHE_UPDATE_TIME.get(layoutId);
        if (lastUpdateTime != null && System.currentTimeMillis() - lastUpdateTime > CACHE_EXPIRE_TIME) {
            LAYOUT_CONFIG_CACHE.remove(layoutId);
            CACHE_UPDATE_TIME.remove(layoutId);
        }
        
        // 从缓存获取
        JSONArray cachedConfig = LAYOUT_CONFIG_CACHE.get(layoutId);
        if (cachedConfig != null) {
            return cachedConfig;
        }
        
        // 从数据库获取
        try {
            Object[] config = Application.createQueryNoFilter(
                    "select config from LayoutConfig where configId = ?")
                    .setParameter(1, ID.valueOf(layoutId))
                    .unique();
            
            if (config == null || config[0] == null) {
                return null;
            }
            
            JSONArray layoutConfig = JSON.parseArray((String) config[0]);
            
            // 更新缓存
            LAYOUT_CONFIG_CACHE.put(layoutId, layoutConfig);
            CACHE_UPDATE_TIME.put(layoutId, System.currentTimeMillis());
            
            return layoutConfig;
        } catch (Exception e) {
            log.error("Error getting layout config for {}: {}", layoutId, e.getMessage(), e);
            return null;
        }
    }
    
    /**
     * 评估动作显示条件
     * 
     * @param actionItems 动作项配置
     * @param user 当前用户
     * @param recordId 记录ID
     * @return 评估结果
     */
    public JSONObject evaluateActionFilters(JSONArray actionItems, ID user, String recordId) {
        if (actionItems == null || actionItems.isEmpty()) {
            return new JSONObject();
        }
        
        JSONObject result = new JSONObject();
        
        try {
            // 预先获取记录数据，避免重复查询
            JSONObject recordData = null;
            Entity entity = null;
            
            if (StringUtils.isNotBlank(recordId) && ID.isId(recordId)) {
                ID id = ID.valueOf(recordId);
                entity = MetadataHelper.getEntity(id.getEntityCode());
                recordData = getRecordData(entity, id);
            }
            
            for (int i = 0; i < actionItems.size(); i++) {
                JSONObject item = actionItems.getJSONObject(i);
                String itemId = item.getString("id");
                
                if (StringUtils.isBlank(itemId)) {
                    continue;
                }
                
                // 获取过滤条件
                JSONObject showFilter = item.getJSONObject("showFilter");
                if (showFilter == null || showFilter.isEmpty()) {
                    result.put(itemId, true);
                    continue;
                }
                
                // 评估过滤条件
                boolean show = true;
                if (recordData != null) {
                    show = evalFilterCondition(showFilter, recordData, user, recordId);
                }
                
                result.put(itemId, show);
            }
        } catch (Exception e) {
            log.error("Error evaluating action filters: {}", e.getMessage(), e);
        }
        
        return result;
    }
    
    /**
     * 获取记录数据
     * 
     * @param entity 实体
     * @param recordId 记录ID
     * @return 记录数据
     */
    private JSONObject getRecordData(Entity entity, ID recordId) {
        try {
            // 优化字段获取方式
            Field[] fields = entity.getFields();
            String[] fieldNames = new String[fields.length];
            
            for (int i = 0; i < fields.length; i++) {
                fieldNames[i] = fields[i].getName();
            }
            
            String fieldsStr = StringUtils.join(fieldNames, ",");
            
            String sql = String.format("select %s from %s where %s = '%s'",
                    fieldsStr, entity.getName(), entity.getPrimaryField().getName(), recordId);
            
            Object[] record = Application.createQueryNoFilter(sql).unique();
            
            if (record == null) {
                return null;
            }
            
            // 构建记录数据
            JSONObject formData = new JSONObject();
            for (int i = 0; i < fields.length; i++) {
                formData.put(fieldNames[i], record[i]);
            }
            
            return formData;
        } catch (Exception e) {
            log.error("Error getting record data for {}: {}", recordId, e.getMessage(), e);
            return null;
        }
    }
    
    /**
     * 评估过滤条件
     * 
     * @param filterExpr 过滤条件表达式
     * @param formData 表单数据
     * @param user 当前用户
     * @param recordId 记录ID（可选）
     * @return 条件是否满足
     */
    public boolean evalFilterCondition(JSONObject filterExpr, JSONObject formData, ID user, String recordId) {
        // 使用 ParseHelper.validAdvFilter 验证过滤条件是否有效
        if (filterExpr == null || !ParseHelper.validAdvFilter(filterExpr)) {
            return false;
        }
        
        // 如果有记录ID，使用 FilterRecordChecker 检查记录是否符合条件
        if (StringUtils.isNotBlank(recordId) && ID.isId(recordId)) {
            try {
                ID id = ID.valueOf(recordId);
                FilterRecordChecker checker = new FilterRecordChecker(filterExpr);
                return checker.check(id);
            } catch (Exception e) {
                log.error("Error checking record filter for {}: {}", recordId, e.getMessage(), e);
                return false;
            }
        }
        
        // 根据表单数据评估条件
        if (formData == null || formData.isEmpty()) {
            return false;
        }
        
        try {
            // 获取过滤条件项
            JSONArray items = filterExpr.getJSONArray("items");
            if (items == null || items.isEmpty()) {
                return false;
            }
            
            // 解析过滤条件
            String entity = filterExpr.getString("entity");
            if (StringUtils.isBlank(entity)) {
                return false;
            }
            
            // 评估每个条件项
            boolean result = true;
            for (int i = 0; i < items.size(); i++) {
                JSONObject item = items.getJSONObject(i);
                String field = item.getString("field");
                String op = item.getString("op");
                Object value = item.get("value");
                
                if (StringUtils.isBlank(field) || StringUtils.isBlank(op)) {
                    continue;
                }
                
                // 获取表单中的字段值
                Object fieldValue = formData.get(field);
                
                // 根据操作符评估条件
                boolean itemResult = evaluateConditionItem(op, fieldValue, value);
                
                // 应用逻辑运算符（默认为AND）
                String join = item.getString("join");
                if ("OR".equalsIgnoreCase(join)) {
                    result = result || itemResult;
                } else {
                    result = result && itemResult;
                }
            }
            
            return result;
        } catch (Exception e) {
            log.error("Error evaluating filter condition: {}", e.getMessage(), e);
            return false;
        }
    }
    
    /**
     * 评估单个条件项
     * 
     * @param op 操作符
     * @param fieldValue 字段值
     * @param conditionValue 条件值
     * @return 条件是否满足
     */
    private boolean evaluateConditionItem(String op, Object fieldValue, Object conditionValue) {
        if (fieldValue == null) {
            // 空值处理
            return "NL".equals(op) || "NT".equals(op);
        }
        
        if ("NL".equals(op)) {
            return false;  // 非空
        }
        
        if ("NT".equals(op)) {
            return false;  // 非空
        }
        
        if (conditionValue == null) {
            return false;
        }
        
        String fieldStr = String.valueOf(fieldValue);
        String valueStr = String.valueOf(conditionValue);
        
        switch (op) {
            case "EQ":  // 等于
                return fieldStr.equals(valueStr);
            case "NEQ":  // 不等于
                return !fieldStr.equals(valueStr);
            case "LK":  // 包含
                return fieldStr.contains(valueStr);
            case "NLK":  // 不包含
                return !fieldStr.contains(valueStr);
            case "GT":  // 大于
                try {
                    double fieldNum = Double.parseDouble(fieldStr);
                    double valueNum = Double.parseDouble(valueStr);
                    return fieldNum > valueNum;
                } catch (NumberFormatException e) {
                    return false;
                }
            case "LT":  // 小于
                try {
                    double fieldNum = Double.parseDouble(fieldStr);
                    double valueNum = Double.parseDouble(valueStr);
                    return fieldNum < valueNum;
                } catch (NumberFormatException e) {
                    return false;
                }
            case "GE":  // 大于等于
                try {
                    double fieldNum = Double.parseDouble(fieldStr);
                    double valueNum = Double.parseDouble(valueStr);
                    return fieldNum >= valueNum;
                } catch (NumberFormatException e) {
                    return false;
                }
            case "LE":  // 小于等于
                try {
                    double fieldNum = Double.parseDouble(fieldStr);
                    double valueNum = Double.parseDouble(valueStr);
                    return fieldNum <= valueNum;
                } catch (NumberFormatException e) {
                    return false;
                }
            case "IN":  // 在...中
                if (conditionValue instanceof JSONArray) {
                    JSONArray values = (JSONArray) conditionValue;
                    for (int i = 0; i < values.size(); i++) {
                        if (fieldStr.equals(String.valueOf(values.get(i)))) {
                            return true;
                        }
                    }
                }
                return false;
            case "NIN":  // 不在...中
                if (conditionValue instanceof JSONArray) {
                    JSONArray values = (JSONArray) conditionValue;
                    for (int i = 0; i < values.size(); i++) {
                        if (fieldStr.equals(String.valueOf(values.get(i)))) {
                            return false;
                        }
                    }
                }
                return true;
            default:
                log.warn("Unsupported operator: {}", op);
                return false;
        }
    }
    
    /**
     * 清除缓存
     */
    public void clearCache() {
        LAYOUT_CONFIG_CACHE.clear();
        CACHE_UPDATE_TIME.clear();
        log.info("EasyFilterEvaluator cache cleared");
    }
    
    /**
     * 清除指定布局的缓存
     * 
     * @param layoutId 布局ID
     */
    public void clearCache(String layoutId) {
        if (StringUtils.isNotBlank(layoutId)) {
            LAYOUT_CONFIG_CACHE.remove(layoutId);
            CACHE_UPDATE_TIME.remove(layoutId);
            log.info("EasyFilterEvaluator cache cleared for layout: {}", layoutId);
        }
    }
}