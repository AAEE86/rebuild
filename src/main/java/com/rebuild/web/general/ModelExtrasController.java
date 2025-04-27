/*!
Copyright (c) REBUILD <https://getrebuild.com/> and/or its owners. All rights reserved.

rebuild is dual-licensed under commercial and open source licenses (GPLv3).
See LICENSE and COMMERCIAL in the project root for license information.
*/

package com.rebuild.web.general;

import cn.devezhao.bizz.privileges.impl.BizzPermission;
import cn.devezhao.commons.web.ServletUtils;
import cn.devezhao.persist4j.Entity;
import cn.devezhao.persist4j.Field;
import cn.devezhao.persist4j.engine.ID;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONAware;
import com.alibaba.fastjson.JSONObject;
import com.rebuild.api.RespBody;
import com.rebuild.core.Application;
import com.rebuild.core.configuration.general.AutoFillinManager;
import com.rebuild.core.metadata.MetadataHelper;
import com.rebuild.core.metadata.easymeta.EasyEntity;
import com.rebuild.core.metadata.easymeta.EasyMetaFactory;
import com.rebuild.core.privileges.UserHelper;
import com.rebuild.core.privileges.bizz.User;
import com.rebuild.core.service.general.RepeatedRecordsException;
import com.rebuild.core.service.general.transform.RecordTransfomer39;
import com.rebuild.core.support.general.CalcFormulaSupport;
import com.rebuild.core.support.i18n.I18nUtils;
import com.rebuild.core.support.i18n.Language;
import com.rebuild.utils.JSONUtils;
import com.rebuild.web.BaseController;
import com.rebuild.web.EntityParam;
import com.rebuild.web.IdParam;
import com.rebuild.core.metadata.EntityHelper;
import com.rebuild.core.metadata.easymeta.EasyField;
import com.rebuild.core.metadata.easymeta.DisplayType;
import com.rebuild.core.configuration.general.PickListManager;
import com.rebuild.core.configuration.general.MultiSelectManager;
import com.rebuild.core.configuration.general.ClassificationManager;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang.StringUtils;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Iterator;
import java.util.Collection;

/**
 * 表单/视图 功能扩展
 *
 * @author devezhao zhaofang123@gmail.com
 * @since 2019/05/20
 */
@Slf4j
@RestController
@RequestMapping("/app/entity/extras/")
public class ModelExtrasController extends BaseController {

    // 获取表单回填数据
    @RequestMapping("fillin-value")
    public JSON getFillinValue(@EntityParam Entity entity, @IdParam(name = "source") ID sourceRecord,
                               HttpServletRequest request) {
        String field = getParameterNotNull(request, "field");
        Field useField = entity.getField(field);
        JSONObject formData40 = (JSONObject) ServletUtils.getRequestJson(request);

        return AutoFillinManager.instance.getFillinValue(useField, sourceRecord, formData40);
    }

    // 记录转换
    @PostMapping("transform39")
    public RespBody transform39(HttpServletRequest request) {
        final JSONObject post = (JSONObject) ServletUtils.getRequestJson(request);
        final ID transid = ID.valueOf(post.getString("transid"));
        final Object sourceRecordAny = post.get("sourceRecord");
        if (sourceRecordAny instanceof JSONArray) {
            return this.transform39Muilt(transid, (JSONArray) sourceRecordAny);
        }
        // 单个
        ID sourceRecord = ID.valueOf(sourceRecordAny.toString());

        RecordTransfomer39 transfomer39 = new RecordTransfomer39(transid);
        if (!transfomer39.checkFilter(sourceRecord)) {
            return RespBody.error(Language.L("当前记录不符合转换条件"), 400);
        }

        ID mainRecord = ID.isId(post.getString("mainRecord")) ? ID.valueOf(post.getString("mainRecord")) : null;
        ID existsRecord = ID.isId(post.getString("existsRecord")) ? ID.valueOf(post.getString("existsRecord")) : null;

        try {
            Object res;
            if (post.getBooleanValue("preview")) {
                res = transfomer39.preview(sourceRecord, mainRecord, existsRecord);
            } else {
                res = transfomer39.transform(sourceRecord, mainRecord, existsRecord);
            }
            return RespBody.ok(res);

        } catch (Exception ex) {
            log.warn(">>>>> {} : {}", sourceRecord, ex.getLocalizedMessage());

            String error = ex.getLocalizedMessage();
            if (ex instanceof RepeatedRecordsException) {
                error = Language.L("存在重复记录");
            }

            return RespBody.errorl("记录转换失败 (%s)",
                    Objects.toString(error, ex.getClass().getSimpleName().toUpperCase()));
        }
    }

    // 批量转换
    private RespBody transform39Muilt(ID transid, JSONArray sourceRecords) {
        List<ID> newIds = new ArrayList<>();
        for (Object o : sourceRecords) {
            RecordTransfomer39 transfomer39 = new RecordTransfomer39(transid);
            ID sourceRecord = ID.valueOf((String) o);
            if (!transfomer39.checkFilter(sourceRecord)) continue;

            try {
                ID newId = transfomer39.transform(sourceRecord, null, null);
                newIds.add(newId);
            } catch (Exception ex) {
                log.warn(">>>>> {} : {}", sourceRecord, ex.getLocalizedMessage());
            }
        }
        return RespBody.ok(newIds);
    }

    @GetMapping("record-last-modified")
    public JSONAware fetchRecordLastModified(@IdParam ID id) {
        final Entity entity = MetadataHelper.getEntity(id.getEntityCode());

        String sql = String.format("select modifiedOn from %s where %s = '%s'",
                entity.getName(), entity.getPrimaryField().getName(), id);
        Object[] recordMeta = Application.createQueryNoFilter(sql).unique();
        if (recordMeta == null) {
            return RespBody.error("NO_EXISTS");
        }

        return JSONUtils.toJSONObject(
                new String[] { "lastModified" },
                new Object[] { ((Date) recordMeta[0]).getTime() });
    }

    @GetMapping("record-meta")
    public JSONAware fetchRecordMeta(@IdParam ID id) {
        final Entity entity = MetadataHelper.getEntity(id.getEntityCode());

        String sql = "select createdOn,modifiedOn from %s where %s = '%s'";
        if (MetadataHelper.hasPrivilegesField(entity)) {
            sql = sql.replace(",modifiedOn", ",modifiedOn,owningUser");
        }

        sql = String.format(sql, entity.getName(), entity.getPrimaryField().getName(), id);
        Object[] recordMeta = Application.createQueryNoFilter(sql).unique();
        if (recordMeta == null) {
            return RespBody.errorl("记录不存在");
        }

        recordMeta[0] = I18nUtils.formatDate((Date) recordMeta[0]);
        recordMeta[1] = I18nUtils.formatDate((Date) recordMeta[1]);

        String[] owning = null;
        List<String[]> sharingList = null;
        if (recordMeta.length == 3) {
            User user = Application.getUserStore().getUser((ID) recordMeta[2]);
            String dept = user.getOwningDept() == null ? null : user.getOwningDept().getName();
            owning = new String[]{user.getIdentity().toString(), user.getFullName(), dept};

            Object[][] shareTo = Application.createQueryNoFilter(
                    "select shareTo from ShareAccess where belongEntity = ? and recordId = ?")
                    .setParameter(1, entity.getName())
                    .setParameter(2, id)
                    .setLimit(9)  // 最多显示9个
                    .array();
            sharingList = new ArrayList<>();
            for (Object[] st : shareTo) {
                sharingList.add(new String[]{st[0].toString(), UserHelper.getName((ID) st[0])});
            }
        }

        return JSONUtils.toJSONObject(
                new String[] { "createdOn", "modifiedOn", "owningUser", "sharingList" },
                new Object[] { recordMeta[0], recordMeta[1], owning, sharingList });
    }

    @GetMapping("record-history")
    public JSONAware fetchRecordHistory(@IdParam ID id) {
        Object[][] array = Application.createQueryNoFilter(
                "select revisionType,revisionOn,revisionBy,channelWith from RevisionHistory where recordId = ? order by autoId desc")
                .setParameter(1, id)
                .setLimit(100)
                .array();

        for (Object[] o : array) {
            int revType = (int) o[0];
            if (revType == 1) o[0] = Language.L("新建");
            else if (revType == 2) o[0] = Language.L("删除");
            else if (revType == 4) o[0] = Language.L("更新");
            else if (revType == 16) o[0] = Language.L("分配");
            else if (revType == 32) o[0] = Language.L("共享");
            else if (revType == 64) o[0] = Language.L("取消共享");
            else if (revType == 991) o[0] = Language.L("审批通过");
            else if (revType == 992) o[0] = Language.L("审批撤销");
            else o[0] = Language.L("其他") + String.format(" (%d)", revType);

            o[1] = I18nUtils.formatDate((Date) o[1]);
            o[2] = new Object[] { o[2], UserHelper.getName((ID) o[2]) };
        }

        return JSONUtils.toJSONObjectArray(
                new String[] { "revisionType", "revisionOn", "revisionBy" }, array);
    }

    @GetMapping("check-creates")
    public JSON checkCreates(HttpServletRequest request) {
        final ID user = getRequestUser(request);
        String entity = getParameter(request, "entity", "");

        JSONArray allowed = new JSONArray();
        for (String e : entity.split(",")) {
            if (!MetadataHelper.containsEntity(e)) continue;

            EasyEntity easyEntity = EasyMetaFactory.valueOf(e);
            if (!MetadataHelper.hasPrivilegesField(easyEntity.getRawMeta())) continue;

            if (Application.getPrivilegesManager()
                    .allow(user, easyEntity.getRawMeta().getEntityCode(), BizzPermission.CREATE)) {
                allowed.add(easyEntity.toJSON());
            }
        }
        return allowed;
    }

    @PostMapping("eval-calc-formula")
    public RespBody evalCalcFormula(@EntityParam Entity entity, HttpServletRequest request) {
        String targetField = getParameterNotNull(request, "field");
        if (!entity.containsField(targetField)) return RespBody.error();

        JSONObject post = (JSONObject) ServletUtils.getRequestJson(request);
        Map<String, Object> varsInFormula = new HashMap<>(post.getInnerMap());
        for (Object value : varsInFormula.values()) {
            if (value == null || StringUtils.isBlank(value.toString())) {
                return RespBody.ok();
            }
        }

        Object evalVal = CalcFormulaSupport.evalCalcFormula(entity.getField(targetField), varsInFormula);
        return evalVal == null ? RespBody.ok() : RespBody.ok(evalVal);
    }
    
    @GetMapping("record-history-details")
    public JSONAware fetchRecordHistoryDetails(@IdParam ID id) {
        final Entity entity = MetadataHelper.getEntity(id.getEntityCode());
        Object[][] array = Application.createQueryNoFilter(
                "select revisionContent,revisionType,revisionOn,revisionBy,channelWith from RevisionHistory where recordId = ? order by autoId desc")
                .setParameter(1, id)
                .setLimit(100)
                .array();

        List<Object> list = new ArrayList<>();
        for (Object[] o : array) {
            JSONArray contents = JSON.parseArray((String) o[0]);
            if (contents != null) {
                paddingFieldsName(contents, entity);
            }
            
            int revType = (int) o[1];
            if (revType == 1) o[1] = Language.L("新建");
            else if (revType == 2) o[1] = Language.L("删除");
            else if (revType == 4) o[1] = Language.L("更新");
            else if (revType == 16) o[1] = Language.L("分配");
            else if (revType == 32) o[1] = Language.L("共享");
            else if (revType == 64) o[1] = Language.L("取消共享");
            else if (revType == 991) o[1] = Language.L("审批通过");
            else if (revType == 992) o[1] = Language.L("审批撤销");
            else o[1] = Language.L("其他") + String.format(" (%d)", revType);

            o[0] = contents;
            o[2] = I18nUtils.formatDate((Date) o[2]);
            o[3] = new Object[] { o[3], UserHelper.getName((ID) o[3]) };
            
            list.add(o);
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
    /**
     * 评估简易过滤器条件
     * 
     * @param request
     * @return
     */
    @PostMapping("easyfilter-eval")
    public JSONAware evalEasyFilter(HttpServletRequest request) {
        final ID user = getRequestUser(request);
        final String layoutId = getParameterNotNull(request, "layout");
        final String recordId = getParameter(request, "id");
        
        // 获取布局配置
        Object[] config = Application.createQueryNoFilter(
                "select config from LayoutConfig where configId = ?")
                .setParameter(1, ID.valueOf(layoutId))
                .unique();
        if (config == null) {
            return RespBody.error("Layout config not found");
        }
        
        JSONArray layoutConfig = JSON.parseArray((String) config[0]);
        JSONObject formData = (JSONObject) ServletUtils.getRequestJson(request);
        
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
        
        return (JSONAware) JSON.toJSON(results);
    }
    
    /**
     * 评估过滤器条件
     * 
     * @param filter
     * @param formData
     * @param user
     * @param recordId
     * @return
     */
    private boolean evalFilterCondition(JSONObject filter, JSONObject formData, ID user, String recordId) {
        String equation = filter.getString("equation");
        JSONArray items = filter.getJSONArray("items");

        
        // 如果没有条件项，直接返回false
        if (items == null || items.isEmpty()) {
            return false;
        }
        
        boolean result = "AND".equalsIgnoreCase(equation);
        
        for (Object item : items) {
            JSONObject condition = (JSONObject) item;
            String field = condition.getString("field");
            String op = condition.getString("op");
            Object value = condition.get("value");
            
            // 获取表单字段值
            Object fieldValue = formData.get(field);
            
            // 评估单个条件
            boolean conditionResult = evalSingleCondition(fieldValue, op, value, user, recordId);
            
            // 根据逻辑运算符组合结果
            if ("AND".equalsIgnoreCase(equation)) {
                result = result && conditionResult;
                if (!result) break; // AND 短路优化
            } else {
                result = result || conditionResult;
                if (result) break; // OR 短路优化
            }
        }
        
        return result;
    }
    
    /**
     * 评估单个条件
     * 
     * @param fieldValue
     * @param op
     * @param value
     * @param user
     * @param recordId
     * @return
     */
    private boolean evalSingleCondition(Object fieldValue, String op, Object value, ID user, String recordId) {
        if (fieldValue == null) {
            return "NL".equals(op) || "NT".equals(op);
        }
        
        switch (op) {
            case "EQ":
                return Objects.equals(fieldValue, value);
            case "NEQ":
                return !Objects.equals(fieldValue, value);
            case "GT":
                return compareNumbers(fieldValue, value) > 0;
            case "LT":
                return compareNumbers(fieldValue, value) < 0;
            case "GE":
                return compareNumbers(fieldValue, value) >= 0;
            case "LE":
                return compareNumbers(fieldValue, value) <= 0;
            case "LK":
                return fieldValue.toString().contains(value.toString());
            case "NLK":
                return !fieldValue.toString().contains(value.toString());
            case "IN":
                return evalInCondition(fieldValue, value);
            case "NIN":
                return !evalInCondition(fieldValue, value);
            case "NL":
                return false;
            case "NT":
                return false;
            default:
                return false;
        }
    }
    
    /**
     * 评估IN条件
     * 
     * @param fieldValue
     * @param value
     * @return
     */
    private boolean evalInCondition(Object fieldValue, Object value) {
        if (value instanceof JSONArray) {
            JSONArray values = (JSONArray) value;
            return values.contains(fieldValue);
        } else if (value instanceof Collection) {
            return ((Collection<?>) value).contains(fieldValue);
        }
        return Objects.equals(fieldValue, value);
    }
    
    /**
     * 比较数字值
     * 
     * @param fieldValue
     * @param value
     * @return
     */
    private int compareNumbers(Object fieldValue, Object value) {
        Number num1 = fieldValue instanceof Number ? (Number) fieldValue : Double.parseDouble(fieldValue.toString());
        Number num2 = value instanceof Number ? (Number) value : Double.parseDouble(value.toString());
        return Double.compare(num1.doubleValue(), num2.doubleValue());
    }

    /**
     * 检查自定义操作按钮是否显示
     * 
     * @param request
     * @return
     */
    @PostMapping("check-easyaction")
    public JSONAware checkEasyAction(HttpServletRequest request) {
        final ID user = getRequestUser(request);
        final String recordId = getParameterNotNull(request, "record");
        
        JSONArray items = (JSONArray) ServletUtils.getRequestJson(request);
        if (items == null || items.isEmpty()) {
            return RespBody.ok(new JSONObject());
        }
        
        JSONObject result = new JSONObject();
        for (int i = 0; i < items.size(); i++) {
            JSONObject item = items.getJSONObject(i);
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
                String sql = String.format("select * from %s where %s = '%s'",
                        entity.getName(), entity.getPrimaryField().getName(), recordId);
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
        
        return RespBody.ok(result);
    }
}
