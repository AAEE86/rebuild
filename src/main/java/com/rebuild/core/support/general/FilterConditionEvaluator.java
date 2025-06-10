package com.rebuild.core.support.general;

import cn.devezhao.persist4j.engine.ID;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.rebuild.core.service.query.FilterRecordChecker;
import com.rebuild.core.service.query.ParseHelper;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang.StringUtils;

import java.util.function.BiFunction;

/**
 * 过滤条件评估引擎
 * 负责核心的条件评估逻辑
 */
@Slf4j
public class FilterConditionEvaluator {
    
    public boolean evalFilterCondition(JSONObject filterExpr, JSONObject formData, ID user, String recordId) {
        if (!isValidFilterExpression(filterExpr)) {
            return false;
        }
        
        // 优先使用记录ID进行检查
        if (StringUtils.isNotBlank(recordId) && ID.isId(recordId)) {
            return checkRecordFilter(filterExpr, recordId);
        }
        
        // 使用表单数据评估
        return evaluateByFormData(filterExpr, formData);
    }
    
    private boolean checkRecordFilter(JSONObject filterExpr, String recordId) {
        try {
            ID id = ID.valueOf(recordId);
            FilterRecordChecker checker = new FilterRecordChecker(filterExpr);
            return checker.check(id);
        } catch (Exception e) {
            log.error("Error checking record filter for {}: {}", recordId, e.getMessage(), e);
            return false;
        }
    }
    
    private boolean evaluateByFormData(JSONObject filterExpr, JSONObject formData) {
        if (formData == null || formData.isEmpty()) {
            return false;
        }
        
        try {
            JSONArray items = filterExpr.getJSONArray("items");
            if (items == null || items.isEmpty()) {
                return false;
            }
            
            String entity = filterExpr.getString("entity");
            if (StringUtils.isBlank(entity)) {
                return false;
            }
            
            return evaluateFilterItems(items, formData);
        } catch (Exception e) {
            log.error("Error evaluating filter condition: {}", e.getMessage(), e);
            return false;
        }
    }
    
    private boolean evaluateFilterItems(JSONArray items, JSONObject formData) {
        boolean result = true;
        
        for (int i = 0; i < items.size(); i++) {
            JSONObject item = items.getJSONObject(i);
            String field = item.getString("field");
            String op = item.getString("op");
            Object value = item.get("value");
            
            if (StringUtils.isBlank(field) || StringUtils.isBlank(op)) {
                continue;
            }
            
            Object fieldValue = formData.get(field);
            boolean itemResult = evaluateConditionItem(op, fieldValue, value);
            
            result = applyLogicalOperator(result, itemResult, item.getString("join"));
        }
        
        return result;
    }
    
    private boolean applyLogicalOperator(boolean currentResult, boolean itemResult, String join) {
        if ("OR".equalsIgnoreCase(join)) {
            return currentResult || itemResult;
        } else {
            return currentResult && itemResult;
        }
    }
    
    private boolean evaluateConditionItem(String op, Object fieldValue, Object conditionValue) {
        // 空值检查
        if (ParseHelper.NL.equalsIgnoreCase(op)) {
            return fieldValue == null;
        }
        
        if (ParseHelper.NT.equalsIgnoreCase(op)) {
            return fieldValue != null;
        }
        
        // 字段值为空的情况
        if (fieldValue == null) {
            return false;
        }
        
        // 条件值检查
        if (conditionValue == null && !isNullCheckOperator(op)) {
            return false;
        }
        
        return evaluateByOperator(op, fieldValue, conditionValue);
    }
    
    private boolean evaluateByOperator(String op, Object fieldValue, Object conditionValue) {
        String fieldStr = String.valueOf(fieldValue);
        String valueStr = conditionValue != null ? String.valueOf(conditionValue) : "";
        
        switch (op.toUpperCase()) {
            case ParseHelper.EQ:
                return fieldStr.equals(valueStr);
            case ParseHelper.NEQ:
                return !fieldStr.equals(valueStr);
            case ParseHelper.LK:
                return fieldStr.contains(valueStr);
            case ParseHelper.NLK:
                return !fieldStr.contains(valueStr);
            case ParseHelper.GT:
                return compareNumbers(fieldStr, valueStr, (f, v) -> f > v);
            case ParseHelper.LT:
                return compareNumbers(fieldStr, valueStr, (f, v) -> f < v);
            case ParseHelper.GE:
                return compareNumbers(fieldStr, valueStr, (f, v) -> f >= v);
            case ParseHelper.LE:
                return compareNumbers(fieldStr, valueStr, (f, v) -> f <= v);
            case ParseHelper.IN:
                return evaluateInOperator(fieldStr, conditionValue);
            case ParseHelper.NIN:
                return !evaluateInOperator(fieldStr, conditionValue);
            default:
                log.warn("Unsupported operator: {}", op);
                return false;
        }
    }
    
    private boolean evaluateInOperator(String fieldStr, Object conditionValue) {
        if (!(conditionValue instanceof JSONArray)) {
            return false;
        }
        
        JSONArray values = (JSONArray) conditionValue;
        for (int i = 0; i < values.size(); i++) {
            if (fieldStr.equals(String.valueOf(values.get(i)))) {
                return true;
            }
        }
        return false;
    }
    
    private boolean compareNumbers(String fieldStr, String valueStr, BiFunction<Double, Double, Boolean> comparator) {
        try {
            double fieldNum = Double.parseDouble(fieldStr);
            double valueNum = Double.parseDouble(valueStr);
            return comparator.apply(fieldNum, valueNum);
        } catch (NumberFormatException e) {
            // 如果不是数字，则按字符串比较
            return comparator.apply((double) fieldStr.compareTo(valueStr), 0.0);
        }
    }
    
    private boolean isValidFilterExpression(JSONObject filterExpr) {
        return filterExpr != null && ParseHelper.validAdvFilter(filterExpr);
    }
    
    private boolean isNullCheckOperator(String op) {
        return ParseHelper.NL.equalsIgnoreCase(op) || ParseHelper.NT.equalsIgnoreCase(op);
    }
}