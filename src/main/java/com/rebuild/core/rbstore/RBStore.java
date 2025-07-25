/*!
Copyright (c) REBUILD <https://getrebuild.com/> and/or its owners. All rights reserved.

rebuild is dual-licensed under commercial and open source licenses (GPLv3).
See LICENSE and COMMERCIAL in the project root for license information.
*/

package com.rebuild.core.rbstore;

import com.alibaba.fastjson.JSON;
import com.rebuild.core.BootEnvironmentPostProcessor;
import com.rebuild.core.RebuildException;
import com.rebuild.core.support.ConfigurationItem;
import com.rebuild.utils.JSONUtils;
import com.rebuild.utils.OkHttpUtils;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang.StringUtils;

/**
 * RB 在线元数据仓库
 *
 * @author devezhao-mbp
 * @since 2019/04/28
 */
@Slf4j
public class RBStore {

    // https://github.com/getrebuild/rebuild-datas/
    public static final String DATA_REPO = BootEnvironmentPostProcessor.getProperty(
            ConfigurationItem.RbStoreUrl.name(), "https://getrebuild.com/gh/getrebuild/rebuild-datas/");

    /**
     * for Classification
     *
     * @param fileUri
     * @return
     */
    public static JSON fetchClassification(String fileUri) {
        return fetchRemoteJson("classifications/" + fileUri);
    }

    /**
     * for Metaschema
     *
     * @param fileUri
     * @return
     */
    public static JSON fetchMetaschema(String fileUri) {
        return fetchRemoteJson("metaschemas/" +
                StringUtils.defaultIfBlank(fileUri, "index-3.7.json"));
    }

    /**
     * for AiBot
     *
     * @param fileUri
     * @return
     */
    public static Object fetchPrompt(String fileUri) {
        String content = fetchRemoteFile("prompts/" +
                StringUtils.defaultIfBlank(fileUri, "index.json"));
        if (JSONUtils.wellFormat(content)) return JSON.parse(content);
        return content;
    }

    /**
     * @param fileUrl
     * @return
     * @throws RebuildException
     */
    public static JSON fetchRemoteJson(String fileUrl) throws RebuildException {
        String content = fetchRemoteFile(fileUrl);
        if (JSONUtils.wellFormat(content)) {
            return (JSON) JSON.parse(content);
        }
        throw new RebuildException("Unable to read data from RB-Store");
    }

    /**
     * @param fileUrl
     * @return
     * @throws RebuildException
     */
    protected static String fetchRemoteFile(String fileUrl) throws RebuildException {
        if (!fileUrl.startsWith("http")) {
            fileUrl = DATA_REPO + (fileUrl.startsWith("/") ? fileUrl.substring(1) : fileUrl);
        }

        try {
            return OkHttpUtils.get(fileUrl);
        } catch (Exception e) {
            log.error("Unable to read data from URL : {}", fileUrl, e);
        }
        throw new RebuildException("Unable to read data from RB-Store");
    }
}
