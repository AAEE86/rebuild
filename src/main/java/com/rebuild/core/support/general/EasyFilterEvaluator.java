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
import com.rebuild.core.service.query.FilterRecordChecker;
import com.rebuild.core.service.query.ParseHelper;
import org.apache.commons.lang.StringUtils;

import java.util.ArrayList;
import java.util.List;

/**
 * 简易过滤器条件评估服务
 * 
 * @author rebuild
 * @since 2023/05/20
 */
public class EasyFilterEvaluator {
    
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
        // 获取布局配置
        Object[] config = Application.createQueryNoFilter(
                "select config from LayoutConfig where configId = ?")
                .setParameter(1, ID.valueOf(layoutId))
                .unique();
        if (config == null) {
            return new ArrayList<>();
        }
        
        JSONArray layoutConfig = JSON.parseArray((String) config[0]);
        List<JSONObject> results = new ArrayList<>();
        
        for (Object item : layoutConfig) {
            JSONObject fieldConfig = (JSONObject) item;
            String fieldName = fieldConfig.getString("field");
            
            JSONObject result = new JSONObject();
            result.put("field", fieldName);
            
            // 评估隐藏条件
            JSONObject hiddenFilter = fieldConfig.getJSONObject("hiddenOnEasyFilter");
            if (hiddenFilter != null) {
                boolean hidden = evalFilterCondition(hiddenFilter, formData, user, recordId);
                result.put("hidden", hidden);
            }
            
            // 评估必填条件 
            JSONObject requiredFilter = fieldConfig.getJSONObject("requiredOnEasyFilter");
            if (requiredFilter != null) {
                boolean required = evalFilterCondition(requiredFilter, formData, user, recordId);
                result.put("required", required);
            }
            
            // 评估只读条件
            JSONObject readonlyFilter = fieldConfig.getJSONObject("readonlyOnEasyFilter");
            if (readonlyFilter != null) {
                boolean readonly = evalFilterCondition(readonlyFilter, formData, user, recordId);
                result.put("readonly", readonly);
            }
            
            results.add(result);
        }
        
        return results;
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
        for (int i = 0; i < actionItems.size(); i++) {
            JSONObject item = actionItems.getJSONObject(i);
            String itemId = item.getString("id");
            
            // 获取过滤条件
            JSONObject showFilter = item.getJSONObject("showFilter");
            if (showFilter == null || showFilter.isEmpty()) {
                result.put(itemId, true);
                continue;
            }
            
            // 评估过滤条件
            boolean show = true;
            if (ID.isId(recordId)) {
                // 获取记录数据
                Entity entity = MetadataHelper.getEntity(ID.valueOf(recordId).getEntityCode());
                
                StringBuilder fieldsBuilder = new StringBuilder();
                for (Field field : entity.getFields()) {
                    fieldsBuilder.append(field.getName()).append(",");
                }
                String fields = fieldsBuilder.substring(0, fieldsBuilder.length() - 1);
                
                String sql = String.format("select %s from %s where %s = '%s'",
                        fields, entity.getName(), entity.getPrimaryField().getName(), recordId);
                Object[] record = Application.createQueryNoFilter(sql).unique();
                
                if (record != null) {
                    // 构建记录数据
                    JSONObject formData = new JSONObject();
                    for (int j = 0; j < entity.getFields().length; j++) {
                        Field field = entity.getFields()[j];
                        formData.put(field.getName(), record[j]);
                    }
                    
                    // 评估条件
                    show = evalFilterCondition(showFilter, formData, user, recordId);
                }
            }
            
            result.put(itemId, show);
        }
        
        return result;
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
        if (!ParseHelper.validAdvFilter(filterExpr)) {
            return false;
        }
        
        // 如果有记录ID，使用 FilterRecordChecker 检查记录是否符合条件
        if (StringUtils.isNotBlank(recordId) && ID.isId(recordId)) {
            ID id = ID.valueOf(recordId);
            FilterRecordChecker checker = new FilterRecordChecker(filterExpr);
            return checker.check(id);
        }
        
        // 否则，根据表单数据评估条件
        // 这里可以实现更复杂的逻辑，根据表单数据动态评估条件
        // 简单实现：如果有过滤条件项，则认为条件满足
        JSONArray items = filterExpr.getJSONArray("items");
        return items != null && !items.isEmpty();
    }
}