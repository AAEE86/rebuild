/*
Copyright (c) REBUILD <https://getrebuild.com/> and/or its owners. All rights reserved.

rebuild is dual-licensed under commercial and open source licenses (GPLv3).
See LICENSE and COMMERCIAL in the project root for license information.
*/

package com.rebuild.core.support;

import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang.BooleanUtils;
import org.springframework.core.NamedThreadLocal;
import org.springframework.util.StopWatch;

/**
 * 监控
 *
 * @author devezhao
 * @since 2021/12/23
 */
@Slf4j
public class HeavyStopWatcher {

    private HeavyStopWatcher() {}

    private static final ThreadLocal<StopWatch> WATCHER = new NamedThreadLocal<>("HeavyTaskWatcher");

    /**
     * @param name
     * @return
     */
    public static StopWatch createWatcher(String name) {
        // 未启用
        if (!BooleanUtils.toBoolean(System.getProperty("_HeavyStopWatcher"))) return null;

        StopWatch sw = new StopWatch(name);
        WATCHER.set(sw);
        return sw;
    }

    /**
     * @return
     */
    public static StopWatch getCurrentWatcher() {
        return WATCHER.get();
    }

    /**
     * @return
     */
    public static StopWatch clean() {
        return clean(0);
    }

    /**
     * @param printIfTimeout
     * @return
     */
    public static StopWatch clean(long printIfTimeout) {
        StopWatch sw = WATCHER.get();
        if (sw == null) return null;

        if (sw.getTotalTimeMillis() > printIfTimeout) log.info("\n" + sw.prettyPrint());

        WATCHER.remove();
        return sw;
    }

    /**
     * @param taskName
     * @return
     */
    public static StopWatch start(String taskName) {
        StopWatch sw = WATCHER.get();
        if (sw == null) return null;

        if (sw.isRunning()) {
            log.debug("stop after start");
            sw.stop();
        }

        if (taskName == null) taskName = (sw.getTaskCount() + 1) + ":TASK";
        else taskName = (sw.getTaskCount() + 1) + ":" + taskName;

        sw.start(taskName);
        return sw;
    }

    /**
     * @return
     */
    public static StopWatch stop() {
        StopWatch sw = WATCHER.get();
        if (sw == null) return null;

        if (sw.isRunning()) sw.stop();
        return sw;
    }
}