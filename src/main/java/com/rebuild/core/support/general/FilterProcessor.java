package com.rebuild.core.support.general;

import cn.devezhao.persist4j.engine.ID;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang.StringUtils;

import java.util.ArrayList;
import java.util.List;

/**
 * 过滤器处理器
 * 负责处理不同类型的过滤逻辑
 */
@Slf4j
public class FilterProcessor {
    
    private final FilterConditionEvaluator conditionEvaluator;
    
    public FilterProcessor(FilterConditionEvaluator conditionEvaluator) {
        this.conditionEvaluator = conditionEvaluator;
    }
    
    public List<JSONObject> processLayoutFilters(JSONArray layoutConfig, JSONObject formData, ID user, String recordId) {
        List<JSONObject> results = new ArrayList<>();
        
        for (Object item : layoutConfig) {
            JSONObject fieldConfig = (JSONObject) item;
            String fieldName = fieldConfig.getString("field");
            
            if (StringUtils.isBlank(fieldName)) {
                continue;
            }
            
            JSONObject result = evaluateFieldFilters(fieldConfig, fieldName, formData, user, recordId);
            results.add(result);
        }
        
        return results;
    }
    
    public JSONObject processActionFilters(JSONArray actionItems, JSONObject recordData, ID user, String recordId) {
        JSONObject result = new JSONObject();
        
        for (int i = 0; i < actionItems.size(); i++) {
            JSONObject item = actionItems.getJSONObject(i);
            String itemId = item.getString("id");
            
            if (StringUtils.isBlank(itemId)) {
                continue;
            }
            
            boolean show = evaluateActionItemFilter(item, recordData, user, recordId);
            result.put(itemId, show);
        }
        
        return result;
    }
    
    public JSONArray processLayoutConfigArray(JSONArray layoutConfig, JSONObject formData, String recordId, ID user) {
        JSONArray result = new JSONArray();
        
        for (Object item : layoutConfig) {
            if (!(item instanceof JSONObject)) {
                continue;
            }
            
            JSONObject fieldConfig = (JSONObject) item;
            String fieldName = fieldConfig.getString("field");
            
            if (shouldSkipField(fieldName)) {
                continue;
            }
            
            JSONObject fieldResult = processFieldConfig(fieldConfig, fieldName, formData, user, recordId);
            if (fieldResult.size() > 1) {
                result.add(fieldResult);
            }
        }
        
        return result;
    }
    
    private JSONObject evaluateFieldFilters(JSONObject fieldConfig, String fieldName, 
                                           JSONObject formData, ID user, String recordId) {
        JSONObject result = new JSONObject();
        result.put("field", fieldName);
        
        // 评估各种过滤条件
        evaluateAndSetFilter(fieldConfig, "hiddenOnEasyFilter", "hidden", result, formData, user, recordId);
        evaluateAndSetFilter(fieldConfig, "requiredOnEasyFilter", "required", result, formData, user, recordId);
        evaluateAndSetFilter(fieldConfig, "readonlyOnEasyFilter", "readonly", result, formData, user, recordId);
        
        return result;
    }
    
    private void evaluateAndSetFilter(JSONObject fieldConfig, String filterKey, String resultKey,
                                     JSONObject result, JSONObject formData, ID user, String recordId) {
        JSONObject filter = fieldConfig.getJSONObject(filterKey);
        if (filter != null && !filter.isEmpty()) {
            boolean conditionMet = conditionEvaluator.evalFilterCondition(filter, formData, user, recordId);
            result.put(resultKey, conditionMet);
        }
    }
    
    private boolean evaluateActionItemFilter(JSONObject item, JSONObject recordData, ID user, String recordId) {
        JSONObject showFilter = item.getJSONObject("showFilter");
        if (showFilter == null || showFilter.isEmpty()) {
            return true;
        }
        
        return recordData != null ? conditionEvaluator.evalFilterCondition(showFilter, recordData, user, recordId) : true;
    }
    
    private JSONObject processFieldConfig(JSONObject fieldConfig, String fieldName, 
                                         JSONObject formData, ID user, String recordId) {
        JSONObject fieldResult = new JSONObject();
        fieldResult.put("field", fieldName);
        
        checkEasyFilterCondition(fieldConfig, "requiredOnEasyFilter", "required", fieldResult, formData, user, recordId);
        checkEasyFilterCondition(fieldConfig, "hiddenOnEasyFilter", "hidden", fieldResult, formData, user, recordId);
        checkEasyFilterCondition(fieldConfig, "readonlyOnEasyFilter", "readonly", fieldResult, formData, user, recordId);
        
        return fieldResult;
    }
    
    private void checkEasyFilterCondition(JSONObject fieldConfig, String filterKey, String resultKey, 
                                         JSONObject fieldResult, JSONObject formData, ID user, String recordId) {
        JSONObject filter = fieldConfig.getJSONObject(filterKey);
        if (filter != null && !filter.isEmpty()) {
            boolean conditionMet = conditionEvaluator.evalFilterCondition(filter, formData, user, recordId);
            fieldResult.put(resultKey, conditionMet);
        }
    }
    
    private boolean shouldSkipField(String fieldName) {
        return StringUtils.isBlank(fieldName) || "$DIVIDER$".equals(fieldName);
    }
}