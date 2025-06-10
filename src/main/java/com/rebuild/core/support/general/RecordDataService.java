package com.rebuild.core.support.general;

import cn.devezhao.persist4j.Entity;
import cn.devezhao.persist4j.Field;
import cn.devezhao.persist4j.engine.ID;
import com.alibaba.fastjson.JSONObject;
import com.rebuild.core.Application;
import com.rebuild.core.metadata.MetadataHelper;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang.StringUtils;

/**
 * 记录数据服务
 * 负责获取和处理记录数据
 */
@Slf4j
public class RecordDataService {
    
    public JSONObject getRecordDataIfNeeded(String recordId) {
        if (StringUtils.isBlank(recordId) || !ID.isId(recordId)) {
            return null;
        }
        
        ID id = ID.valueOf(recordId);
        Entity entity = MetadataHelper.getEntity(id.getEntityCode());
        return getRecordData(entity, id);
    }
    
    public JSONObject getRecordData(Entity entity, ID recordId) {
        try {
            String[] fieldNames = extractFieldNames(entity);
            String fieldsStr = StringUtils.join(fieldNames, ",");
            
            String sql = String.format("select %s from %s where %s = '%s'",
                    fieldsStr, entity.getName(), entity.getPrimaryField().getName(), recordId);
            
            Object[] record = Application.createQueryNoFilter(sql).unique();
            
            return record != null ? buildFormData(fieldNames, record) : null;
        } catch (Exception e) {
            log.error("Error getting record data for {}: {}", recordId, e.getMessage(), e);
            return null;
        }
    }
    
    private String[] extractFieldNames(Entity entity) {
        Field[] fields = entity.getFields();
        String[] fieldNames = new String[fields.length];
        
        for (int i = 0; i < fields.length; i++) {
            fieldNames[i] = fields[i].getName();
        }
        
        return fieldNames;
    }
    
    private JSONObject buildFormData(String[] fieldNames, Object[] record) {
        JSONObject formData = new JSONObject();
        for (int i = 0; i < fieldNames.length; i++) {
            formData.put(fieldNames[i], record[i]);
        }
        return formData;
    }
}