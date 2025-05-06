/*!
Copyright (c) REBUILD <https://getrebuild.com/> and/or its owners. All rights reserved.

rebuild is dual-licensed under commercial and open source licenses (GPLv3).
See LICENSE and COMMERCIAL in the project root for license information.
*/

package com.rebuild.web.general;

import cn.devezhao.persist4j.exception.JdbcException;
import cn.devezhao.persist4j.Record;
import cn.devezhao.bizz.security.AccessDeniedException;
import cn.devezhao.commons.web.ServletUtils;
import cn.devezhao.persist4j.Entity;
import cn.devezhao.persist4j.engine.ID;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.rebuild.core.Application;
import com.rebuild.core.DefinedException;
import com.rebuild.core.configuration.general.LiteFormBuilder;
import com.rebuild.core.metadata.MetadataHelper;
import com.rebuild.core.metadata.EntityHelper;
import com.rebuild.core.metadata.easymeta.EasyMetaFactory;
import com.rebuild.core.service.general.EntityService;
import com.rebuild.core.service.trigger.DataValidateException;
import com.rebuild.core.service.general.RepeatedRecordsException;
import com.rebuild.core.service.DataSpecificationException;
import com.rebuild.core.support.RbvFunction;
import com.rebuild.web.EntityController;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.transaction.UnexpectedRollbackException;
import javax.servlet.http.HttpServletRequest;

@Slf4j
@RestController
@RequestMapping("/app/entity/liteform")
public class LiteFormController extends EntityController {
    private static final int ERROR_CODE = 400;
    private static final String ENTITY_KEY = "entity";
    private static final String ID_KEY = "id";
    private static final String FIELDS_KEY = "fields";

    @RequestMapping("form-model")
    public JSON formModel(HttpServletRequest request) {
        final ID user = getRequestUser(request);
        final JSON requestJson = ServletUtils.getRequestJson(request);

        if (requestJson == null) {
            return createErrorResponse("无效的请求参数");
        }

        JSONObject requestData = (JSONObject) requestJson;
        ID recordId = getRecordIdFromRequest(requestData);
        String entityName = getEntityNameFromRequest(requestData, recordId);

        if (StringUtils.isBlank(entityName)) {
            return createErrorResponse("未指定实体或ID无效");
        }

        try {
            Entity entity = MetadataHelper.getEntity(entityName);
            String[] fields = getFieldsFromRequest(requestData);

            if (fields == null || fields.length == 0) {
                return createErrorResponse("未指定字段列表");
            }

            LiteFormBuilder formBuilder = (recordId != null)
                    ? new LiteFormBuilder(recordId, user)
                    : new LiteFormBuilder(entity, user);

            JSONArray elements = formBuilder.build(fields);
            return buildFormModelResult(recordId, entity, elements);

        } catch (Exception e) {
            log.error("构建轻量级表单失败: entity={}, user={}", entityName, user, e);
            return createErrorResponse(e.getMessage());
        }
    }

    @RequestMapping("record-save")
    public JSON recordSave(HttpServletRequest request) {
        final ID user = getRequestUser(request);
        final JSON formJson = ServletUtils.getRequestJson(request);
        
        if (formJson == null) {
            return createErrorResponse("无效的请求参数");
        }
        
        JSONObject requestData = (JSONObject) formJson;
        JSONObject metadata = requestData.getJSONObject("metadata");
        
        if (metadata == null) {
            return createErrorResponse("缺少元数据信息");
        }
        
        String entityName = metadata.getString(ENTITY_KEY);
        String recordId = metadata.getString(ID_KEY);
        
        if (StringUtils.isBlank(entityName)) {
            return createErrorResponse("未指定实体");
        }
        
        try {
            Entity entity = MetadataHelper.getEntity(entityName);
            Record record = EntityHelper.parse((JSONObject) formJson, user);
            
            ID weakMode = getIdParameter(request, "weakMode");
            if (weakMode != null) {
                RbvFunction.call().setWeakMode(weakMode);
            }
            
            final EntityService ies = Application.getEntityService(entity.getEntityCode());
            record = ies.createOrUpdate(record);
            return buildSuccessResponse(record.getPrimary());

        } catch (RepeatedRecordsException | AccessDeniedException | 
               DataSpecificationException | UnexpectedRollbackException | 
               JdbcException e) {
            if (e instanceof DataValidateException && ((DataValidateException) e).isWeakMode()) {
                String msg = e.getLocalizedMessage() + "$$$$" + ((DataValidateException) e).getWeakModeTriggerId();
                log.warn(">>>>> {}", msg);
                JSONObject error = new JSONObject();
                error.put("error_code", DefinedException.CODE_WEAK_VALIDATE);
                error.put("error_msg", msg);
                return error;
            }
            return createErrorResponse(e.getLocalizedMessage());
        }
    }

    private JSONObject createErrorResponse(String message) {
        JSONObject result = new JSONObject();
        result.put("error_code", ERROR_CODE);
        result.put("error_msg", message);
        return result;
    }

    private JSONObject buildSuccessResponse(ID recordId) {
        JSONObject result = new JSONObject();
        result.put("success", true);
        result.put("id", recordId.toLiteral());
        return result;
    }

    private ID getRecordIdFromRequest(JSONObject requestData) {
        if (requestData.containsKey(ID_KEY)) {
            String idStr = requestData.getString(ID_KEY);
            if (ID.isId(idStr)) {
                return ID.valueOf(idStr);
            }
        }
        return null;
    }

    private String getEntityNameFromRequest(JSONObject requestData, ID recordId) {
        if (recordId != null) {
            return MetadataHelper.getEntityName(recordId);
        }
        return requestData.containsKey(ENTITY_KEY) ? requestData.getString(ENTITY_KEY) : null;
    }

    private String[] getFieldsFromRequest(JSONObject requestData) {
        if (requestData.containsKey(FIELDS_KEY)) {
            JSONArray fieldsArray = requestData.getJSONArray(FIELDS_KEY);
            if (fieldsArray != null && !fieldsArray.isEmpty()) {
                String[] fields = new String[fieldsArray.size()];
                for (int i = 0; i < fieldsArray.size(); i++) {
                    fields[i] = fieldsArray.getJSONObject(i).getString("field");
                }
                return fields;
            }
        }
        return null;
    }

    private JSONObject buildFormModelResult(ID recordId, Entity entity, JSONArray elements) {
        JSONObject result = new JSONObject();
        result.put(ID_KEY, recordId != null ? recordId.toLiteral() : "");
        result.put(ENTITY_KEY, entity.getName());

        JSONObject entityMeta = new JSONObject();
        entityMeta.put(ENTITY_KEY, entity.getName());
        entityMeta.put("entityLabel", EasyMetaFactory.valueOf(entity).getLabel());
        entityMeta.put("entityCode", entity.getEntityCode());
        entityMeta.put("icon", EasyMetaFactory.valueOf(entity).getIcon());

        String detailEntity = getDetailEntity(entity);
        if (detailEntity != null) {
            entityMeta.put("detailEntity", detailEntity);
        }
        
        result.put("entityMeta", entityMeta);
        result.put("elements", elements);
        return result;
    }
    
    private String getDetailEntity(Entity entity) {
        // 如果该实体有明细实体，则返回明细实体的名称，否则返回 null
        Entity detail = entity.getDetailEntity();
        return detail != null ? detail.getName() : null;
    }
}