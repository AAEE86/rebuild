/*!
Copyright (c) REBUILD <https://getrebuild.com/> and/or its owners. All rights reserved.

rebuild is dual-licensed under commercial and open source licenses (GPLv3).
See LICENSE and COMMERCIAL in the project root for license information.
*/

package com.rebuild.web.admin.audit;

import cn.devezhao.persist4j.Entity;
import cn.devezhao.persist4j.engine.ID;
import cn.devezhao.persist4j.Field;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.rebuild.core.Application;
import com.rebuild.core.metadata.EntityHelper;
import com.rebuild.core.metadata.MetadataHelper;
import com.rebuild.core.metadata.easymeta.EasyField;
import com.rebuild.core.metadata.easymeta.EasyMetaFactory;
import com.rebuild.core.support.i18n.I18nUtils;
import com.rebuild.core.support.i18n.Language;
import com.rebuild.utils.JSONUtils;
import com.rebuild.web.EntityController;
import com.rebuild.web.IdParam;
import com.rebuild.core.metadata.easymeta.DisplayType;
import com.rebuild.core.configuration.general.PickListManager;
import com.rebuild.core.configuration.general.MultiSelectManager;
import com.rebuild.core.configuration.general.ClassificationManager;
import org.apache.commons.lang.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;

/**
 * @author devezhao
 * @since 11/01/2018
 */
@RestController
@RequestMapping("/admin/audit/")
public class RevisionHistoryController extends EntityController {

    @GetMapping("revision-history")
    public ModelAndView page() {
        return createModelAndView("/admin/audit/revision-history");
    }

    @GetMapping("revision-history/details")
    public JSON details(@IdParam ID revisionId) {
        Object[] rev = Application.createQueryNoFilter(
                "select revisionContent,belongEntity from RevisionHistory where revisionId = ?")
                .setParameter(1, revisionId)
                .unique();

        JSONArray contents = JSON.parseArray((String) rev[0]);
        if (MetadataHelper.containsEntity((String) rev[1])) {
            paddingFieldsName(contents, MetadataHelper.getEntity((String) rev[1]));
        }

        return contents;
    }

    @GetMapping("revision-history/details-list")
    public JSON detailsList(@IdParam ID revisionId) {
        Object[] o = Application.getQueryFactory().uniqueNoFilter(revisionId, "recordId,belongEntity");
        if (o == null) return JSONUtils.EMPTY_ARRAY;

        Object[][] array = Application.createQueryNoFilter(
                "select revisionContent,revisionType,revisionOn,revisionBy.fullName from RevisionHistory where recordId = ? order by autoId desc")
                .setParameter(1, o[0])
                .setLimit(500)
                .array();

        List<Object> list = new ArrayList<>();
        if (MetadataHelper.containsEntity((String) o[1])) {
            Entity entity = MetadataHelper.getEntity((String) o[1]);

            for (Object[] item : array) {
                JSONArray contents = JSON.parseArray((String) item[0]);
                paddingFieldsName(contents, entity);

                item[0] = contents;
                item[2] = I18nUtils.formatDate((Date) item[2]);
                list.add(item);
            }
        }
        return (JSON) JSON.toJSON(list);
    }

    // 补充字段名称
    private void paddingFieldsName(JSONArray contents, Entity entity) {
        final int entityCode = entity.getEntityCode();
        for (Iterator<Object> iter = contents.iterator(); iter.hasNext(); ) {
            JSONObject item = (JSONObject) iter.next();
            String fieldName = item.getString("field");

            if (entity.containsField(fieldName)) {
                EasyField easyField = EasyMetaFactory.valueOf(entity.getField(fieldName));
                // 排除不可查询字段
                if (!easyField.isQueryable()) {
                    if (fieldName.equalsIgnoreCase("contentMore") && entityCode == EntityHelper.Feeds) {
                        // 保留
                    } else {
                        iter.remove();
                        continue;
                    }
                }

                fieldName = easyField.getLabel();
                
                // 处理特殊字段类型的值
                enrichFieldValue(item, easyField);
            } else {
                if ("SHARETO".equalsIgnoreCase(fieldName)) {
                    fieldName = Language.L("共享用户");
                    // 处理共享用户的值
                    enrichIdFieldValue(item, "before");
                    enrichIdFieldValue(item, "after");
                } else {
                    fieldName = "[" + fieldName.toUpperCase() + "]";
                }
            }
            item.put("field", fieldName);
        }
    }
    
    /**
     * 丰富字段值显示，处理引用、下拉、多选、分类等特殊字段类型
     * 
     * @param item 字段变更项
     * @param easyField 字段元数据
     */
    private void enrichFieldValue(JSONObject item, EasyField easyField) {
        DisplayType dt = easyField.getDisplayType();
        Field field = easyField.getRawMeta();
        
        // 处理引用字段
        if (dt == DisplayType.REFERENCE) {
            enrichIdFieldValue(item, "before");
            enrichIdFieldValue(item, "after");
        }
        // 处理下拉列表字段
        else if (dt == DisplayType.PICKLIST) {
            enrichPicklistValue(item, "before");
            enrichPicklistValue(item, "after");
        }
        // 处理多选字段
        else if (dt == DisplayType.MULTISELECT) {
            enrichMultiselectValue(item, "before", field);
            enrichMultiselectValue(item, "after", field);
        }
        // 处理分类字段
        else if (dt == DisplayType.CLASSIFICATION) {
            enrichClassificationValue(item, "before");
            enrichClassificationValue(item, "after");
        }
    }
    
    // 处理ID类型字段值
    private void enrichIdFieldValue(JSONObject item, String valueKey) {
        Object value = item.get(valueKey);
        if (value instanceof String && ID.isId((String) value)) {
            ID id = ID.valueOf((String) value);
            String text = getEntityLabel(id);
            if (text != null) {
                item.put(valueKey + "Text", text);
            }
        }
    }
    
    // 处理下拉列表值
    private void enrichPicklistValue(JSONObject item, String valueKey) {
        Object value = item.get(valueKey);
        if (value instanceof String && ID.isId((String) value)) {
            ID id = ID.valueOf((String) value);
            String text = PickListManager.instance.getLabel(id);
            if (text != null) {
                item.put(valueKey + "Text", text);
            }
        }
    }
    
    // 处理多选值
    private void enrichMultiselectValue(JSONObject item, String valueKey, Field field) {
        Object value = item.get(valueKey);
        if (value instanceof Number) {
            long mask = ((Number) value).longValue();
            String[] labels = MultiSelectManager.instance.getLabels(mask, field);
            if (labels.length > 0) {
                item.put(valueKey + "Text", StringUtils.join(labels, ", "));
            }
        }
    }
    
    // 处理分类值
    private void enrichClassificationValue(JSONObject item, String valueKey) {
        Object value = item.get(valueKey);
        if (value instanceof String && ID.isId((String) value)) {
            ID id = ID.valueOf((String) value);
            String text = ClassificationManager.instance.getFullName(id);
            if (text != null) {
                item.put(valueKey + "Text", text);
            }
        }
    }
    
    /**
     * 获取实体记录的标签（名称）
     * 
     * @param recordId 记录ID
     * @return 记录标签
     */
    private String getEntityLabel(ID recordId) {
        if (recordId == null) return null;
        
        try {
            Entity entity = MetadataHelper.getEntity(recordId.getEntityCode());
            String nameField = entity.getNameField().getName();
            Object[] o = Application.createQueryNoFilter(
                    "select " + nameField + " from " + entity.getName() + " where " + entity.getPrimaryField().getName() + " = ?")
                    .setParameter(1, recordId)
                    .unique();
            return o == null ? null : o[0].toString();
        } catch (Exception e) {
            return null;
        }
    }
}