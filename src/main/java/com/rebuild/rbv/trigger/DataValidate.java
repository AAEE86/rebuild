/*!
Copyright (c) REBUILD <https://getrebuild.com/> and/or its owners. All rights reserved.

rebuild is dual-licensed under commercial and open source licenses (GPLv3).
See LICENSE and COMMERCIAL in the project root for license information.
*/

package com.rebuild.rbv.trigger;

import cn.devezhao.persist4j.engine.ID;
import com.alibaba.fastjson.JSONObject;
import com.rebuild.core.service.general.OperatingContext;
import com.rebuild.core.service.query.QueryHelper;
import com.rebuild.core.service.trigger.ActionContext;
import com.rebuild.core.service.trigger.ActionType;
import com.rebuild.core.service.trigger.DataValidateException;
import com.rebuild.core.service.trigger.TriggerAction;
import com.rebuild.core.service.trigger.TriggerException;
import com.rebuild.core.service.trigger.aviator.AviatorUtils;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang.StringUtils;

import java.util.HashMap;
import java.util.Map;

/**
 * 数据校验触发器
 * 
 * @author rebuild
 * @since 2021/6/30
 */
@Slf4j
public class DataValidate extends TriggerAction {

    /**
     * @param actionContext
     */
    public DataValidate(ActionContext actionContext) {
        super(actionContext);
    }

    @Override
    public ActionType getType() {
        return ActionType.DATAVALIDATE;
    }

    @Override
    public Object execute(OperatingContext operatingContext) throws TriggerException {
        final JSONObject config = (JSONObject) actionContext.getActionContent();
        final ID recordId = actionContext.getSourceRecord();
        
        // 获取配置参数
        boolean weakMode = config.getBooleanValue("weakMode");
        int validateMode = config.getIntValue("validateMode");
        String tipContent = config.getString("tipContent");
        
        // 默认提示内容
        if (StringUtils.isBlank(tipContent)) {
            tipContent = "数据校验未通过";
        }
        
        try {
            boolean isValid = false;
            
            // 根据校验模式执行不同的校验逻辑
            if (validateMode == 2) {
                // 高级表达式校验
                String validateFormula = config.getString("validateFormula");
                if (StringUtils.isNotBlank(validateFormula)) {
                    // 创建表达式环境变量
                    Map<String, Object> env = new HashMap<>();
                    // 添加记录ID到环境变量
                    env.put("RECORD", recordId);
                    env.put("ENTITY", actionContext.getSourceEntity());
                    
                    // 执行表达式校验
                    Object result = AviatorUtils.eval(validateFormula, env);
                    if (result instanceof Boolean) {
                        isValid = (Boolean) result;
                    } else {
                        log.warn("表达式校验结果非布尔类型: {}", result);
                        isValid = false;
                    }
                } else {
                    log.warn("未配置有效的校验表达式");
                    isValid = true;  // 无表达式视为校验通过
                }
            } else {
                // 过滤条件校验 (validateMode == 1 或默认)
                JSONObject validateFilter = config.getJSONObject("validateFilter");
                if (validateFilter != null && !validateFilter.isEmpty()) {
                    // 使用QueryHelper验证记录是否匹配过滤条件
                    // 匹配过滤条件的记录应该校验失败，所以这里需要取反
                    isValid = !QueryHelper.isMatchAdvFilter(recordId, validateFilter);
                } else {
                    log.warn("未配置有效的校验过滤条件");
                    isValid = true;  // 无过滤条件视为校验通过
                }
            }
            
            // 校验失败，抛出异常
            if (!isValid) {
                throw new DataValidateException(tipContent, weakMode, actionContext.getConfigId());
            }
            
            return null;
            
        } catch (DataValidateException ex) {
            throw ex;  // 直接抛出校验异常
        } catch (Exception ex) {
            log.error("数据校验执行异常", ex);
            throw new TriggerException("数据校验执行异常: " + ex.getLocalizedMessage(), ex);
        }
    }
}