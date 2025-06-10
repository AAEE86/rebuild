package com.rebuild.core.support.general;

import cn.devezhao.persist4j.engine.ID;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.List;

/**
 * 简易过滤器条件评估服务
 * 重构后的主入口类，采用组合模式整合各个服务
 * 
 * @author rebuild
 * @since 2023/05/20
 */
@Slf4j
public class EasyFilterEvaluator {
    
    private final LayoutConfigService configService;
    private final RecordDataService dataService;
    private final FilterConditionEvaluator conditionEvaluator;
    private final FilterProcessor filterProcessor;
    
    public EasyFilterEvaluator() {
        this.configService = new LayoutConfigService();
        this.dataService = new RecordDataService();
        this.conditionEvaluator = new FilterConditionEvaluator();
        this.filterProcessor = new FilterProcessor(conditionEvaluator);
    }
    
    // 构造函数注入，便于测试
    public EasyFilterEvaluator(LayoutConfigService configService, 
                              RecordDataService dataService,
                              FilterConditionEvaluator conditionEvaluator,
                              FilterProcessor filterProcessor) {
        this.configService = configService;
        this.dataService = dataService;
        this.conditionEvaluator = conditionEvaluator;
        this.filterProcessor = filterProcessor;
    }
    
    /**
     * 评估布局配置中的过滤条件
     */
    public List<JSONObject> evaluateLayoutFilters(String layoutId, JSONObject formData, ID user, String recordId) {
        if (!configService.isValidLayoutId(layoutId)) {
            log.warn("Invalid layout ID: {}", layoutId);
            return new ArrayList<>();
        }
        
        try {
            JSONArray layoutConfig = configService.getLayoutConfig(layoutId);
            if (configService.isEmptyConfig(layoutConfig)) {
                return new ArrayList<>();
            }
            
            return filterProcessor.processLayoutFilters(layoutConfig, formData, user, recordId);
        } catch (Exception e) {
            log.error("Error evaluating layout filters for layout {}: {}", layoutId, e.getMessage(), e);
            return new ArrayList<>();
        }
    }
    
    /**
     * 评估动作显示条件
     */
    public JSONObject evaluateActionFilters(JSONArray actionItems, ID user, String recordId) {
        if (configService.isEmptyConfig(actionItems)) {
            return new JSONObject();
        }
        
        try {
            JSONObject recordData = dataService.getRecordDataIfNeeded(recordId);
            return filterProcessor.processActionFilters(actionItems, recordData, user, recordId);
        } catch (Exception e) {
            log.error("Error evaluating action filters: {}", e.getMessage(), e);
            return new JSONObject();
        }
    }
    
    /**
     * 评估智能过滤规则（基于布局配置）
     */
    public JSONArray evaluateEasyFilterByLayout(String layoutId, JSONObject formData, String recordId, ID user) {
        if (!configService.isValidLayoutId(layoutId)) {
            log.warn("Invalid layout ID: {}", layoutId);
            return new JSONArray();
        }
        
        try {
            JSONArray layoutConfig = configService.getLayoutConfig(layoutId);
            if (configService.isEmptyConfig(layoutConfig)) {
                return new JSONArray();
            }
            
            return filterProcessor.processLayoutConfigArray(layoutConfig, formData, recordId, user);
        } catch (Exception e) {
            log.error("Error evaluating easy filter for layout {}: {}", layoutId, e.getMessage(), e);
            return new JSONArray();
        }
    }
    
    /**
     * 评估过滤条件
     */
    public boolean evalFilterCondition(JSONObject filterExpr, JSONObject formData, ID user, String recordId) {
        return conditionEvaluator.evalFilterCondition(filterExpr, formData, user, recordId);
    }
}