package com.rebuild.core.support.general;

import cn.devezhao.persist4j.engine.ID;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.rebuild.core.Application;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang.StringUtils;

/**
 * 布局配置服务
 * 负责获取和解析布局配置
 */
@Slf4j
public class LayoutConfigService {
    
    public JSONArray getLayoutConfig(String layoutId) {
        return executeConfigQuery(
            "select config from LayoutConfig where configId = ?",
            layoutId
        );
    }
    
    private JSONArray executeConfigQuery(String sql, String layoutId) {
        try {
            Object[] config = Application.createQueryNoFilter(sql)
                    .setParameter(1, ID.valueOf(layoutId))
                    .unique();
            
            if (config == null || config[0] == null) {
                return null;
            }
            
            return JSON.parseArray((String) config[0]);
        } catch (Exception e) {
            log.error("Error getting config for {}: {}", layoutId, e.getMessage(), e);
            return null;
        }
    }
    
    public boolean isValidLayoutId(String layoutId) {
        return StringUtils.isNotBlank(layoutId) && ID.isId(layoutId);
    }
    
    public boolean isEmptyConfig(JSONArray config) {
        return config == null || config.isEmpty();
    }
}