/*!
Copyright (c) REBUILD <https://getrebuild.com/> and/or its owners. All rights reserved.

rebuild is dual-licensed under commercial and open source licenses (GPLv3).
See LICENSE and COMMERCIAL in the project root for license information.
*/

package com.rebuild.core.service.trigger.impl;

import cn.devezhao.persist4j.Entity;
import cn.devezhao.persist4j.engine.ID;
import com.alibaba.fastjson.JSONObject;
import com.rebuild.core.configuration.ConfigBean;
import com.rebuild.core.configuration.general.TransformManager;
import com.rebuild.core.metadata.MetadataHelper;
import com.rebuild.core.service.general.GeneralEntityServiceContextHolder;
import com.rebuild.core.service.general.OperatingContext;
import com.rebuild.core.service.general.transform.RecordTransfomer37;
import com.rebuild.core.service.trigger.ActionContext;
import com.rebuild.core.service.trigger.ActionType;
import com.rebuild.core.service.trigger.TriggerAction;
import com.rebuild.core.service.trigger.TriggerException;
import com.rebuild.core.service.trigger.TriggerResult;
import com.rebuild.core.support.KVStorage;
import lombok.extern.slf4j.Slf4j;

import java.util.ArrayList;
import java.util.Collection;

/**
 * 自动记录转换
 * 
 * @author devezhao
 * @since 2023/05/23
 */
@Slf4j
public class AutoTransform extends TriggerAction {

    public AutoTransform(ActionContext context) {
        super(context);
    }

    @Override
    public ActionType getType() {
        return ActionType.AUTOTRANSFORM;
    }

    @Override
    public boolean isUsableSourceEntity(int entityCode) {
        return true;  // 所有实体都可用
    }

    @Override
    public Object execute(OperatingContext operatingContext) throws TriggerException {
        final JSONObject content = (JSONObject) actionContext.getActionContent();
        final ID recordId = operatingContext.getFixedRecordId();
        
        // 获取转换配置ID
        ID transformId = ID.valueOf(content.getString("useTransform"));
        if (transformId == null) {
            log.warn("No transform config found : {}", content);
            return TriggerResult.noMatching();
        }
        
        // 检查是否只转换一次
        boolean transformOnce = content.getBooleanValue("transformOnce");
        if (transformOnce) {
            String transformOnceKey = "AutoTransformOnce:" + actionContext.getConfigId() + ":" + recordId;
            if (KVStorage.getCustomValue(transformOnceKey) != null) {
                log.info("Record already transformed once : {}", recordId);
                return TriggerResult.noMatching();
            }
        }
        
        // 获取转换配置
        Entity sourceEntity = actionContext.getSourceEntity();
        ConfigBean transformConfig;
        try {
            transformConfig = TransformManager.instance.getTransformConfig(transformId, sourceEntity.getName());
        } catch (Exception ex) {
            log.error("Cannot get transform config : " + transformId, ex);
            return TriggerResult.error(ex.getLocalizedMessage());
        }
        
        // 执行转换
        JSONObject config = (JSONObject) transformConfig.getJSON("config");
        if (config == null) {
            log.warn("Invalid transform config : {}", transformId);
            return TriggerResult.noMatching();
        }
        
        Entity targetEntity = MetadataHelper.getEntity(transformConfig.getString("target"));
        RecordTransfomer37 transformer = new RecordTransfomer37(targetEntity, config, false);
        transformer.setUser(operatingContext.getOperator());
        
        GeneralEntityServiceContextHolder.setSkipGuard(recordId);
        GeneralEntityServiceContextHolder.setFromTrigger(recordId);
        
        ID newRecordId;
        try {
            newRecordId = transformer.transform(recordId, null);
            
            // 标记已转换
            if (transformOnce) {
                String transformOnceKey = "AutoTransformOnce:" + actionContext.getConfigId() + ":" + recordId;
                KVStorage.setCustomValue(transformOnceKey, "Y");
            }
            
        } catch (Exception ex) {
            log.error("Error occurred during transform : " + recordId, ex);
            return TriggerResult.error(ex.getLocalizedMessage());
        } finally {
            GeneralEntityServiceContextHolder.isSkipGuardOnce();
            GeneralEntityServiceContextHolder.isFromTrigger(true);
        }
        
        // 如果需要保持同步更新
        if (content.getBooleanValue("followingUpdate")) {
            String followingKey = "AutoTransformFollowing:" + actionContext.getConfigId() + ":" + recordId;
            KVStorage.setCustomValue(followingKey, newRecordId.toLiteral());
        }
        
        Collection<ID> affected = new ArrayList<>(2);
        affected.add(recordId);
        affected.add(newRecordId);
        return TriggerResult.success(affected);
    }
}