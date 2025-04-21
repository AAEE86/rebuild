"use strict";
var _FrontJS = window.FrontJS;
var EasyAction = {
    handleOp: function handleOp(item, recordId) {
        if (!_FrontJS)
            return;
        if (item.opType === 1)
            EasyAction.handleOp1(item, recordId);
        if (item.opType === 2)
            EasyAction.handleOp2(item, recordId);
        if (item.opType === 3)
            EasyAction.handleOp3(item, recordId);
        if (item.opType === 4)
            EasyAction.handleOp4(item, recordId);
        if (item.opType === 5)
            EasyAction.handleOp5(item, recordId);
        if (item.opType === 10)
            EasyAction.handleOp10(item, recordId)
    },
    handleOp1: function handleOp1(item, recordId) {
        if (!item.op1Value)
            return;
        var _List = this._getDataList();
        var ids = recordId ? [recordId] : _List.getSelectedIds() || [];
        var initialValue = {};
        if (item.op1Value3 && ids[0])
            initialValue[item.op1Value3] = ids[0];
        _FrontJS.openForm(item.op1Value, {
            specLayout: item.op1Value2,
            title: item.op1Value4 || null,
            initialValue: initialValue
        })
    },
    handleOp2: function handleOp2(item, recordId) {
        var _List = this._getDataList();
        var ids = recordId ? [recordId] : _List.getSelectedIds() || [];
        if (!ids[0])
            return RbHighbar.create($L("请选择一条记录"));
        var fields = [];
        item.op2Value.forEach(function(item) {
            var o = {
                field: item.field
            };
            if (item.label2)
                o.label = item.label2;
            if (item.tip2)
                o.tip = item.tip2;
            if (item.readonly2)
                o.readonly = true;
            if (item.required2)
                o.nullable = false;
            fields.push(o)
        });
        _FrontJS.openLiteForm(ids, fields, item.op2Value2 || null)
    },
    handleOp3: function handleOp3(item, recordId) {
        var _List = this._getDataList();
        var ids = recordId ? [recordId] : _List.getSelectedIds() || [];
        if (!ids[0])
            return RbHighbar.create($L("请至少选择一条记录"));
        var that = this;
        RbAlert.create(React.createElement(RF, null, item.op3Value3 || $L("确认修改吗？")), {
            onConfirm: function onConfirm() {
                var _this = this;
                this.disabled(true);
                var data = {};
                if (item.op3Value2) {
                    data[item.op3Value] = item.op3Value2
                } else {
                    item.op3Value.forEach(function(item) {
                        data[item.field] = item.value
                    })
                }
                var idsLen = ids.length;
                ids.forEach(function(id) {
                    data.metadata = {
                        id: id
                    };
                    $.post("/app/entity/record-save", JSON.stringify(data), function(res) {
                        idsLen--;
                        if (idsLen === 0) {
                            _List.reload();
                            if (that._isInView())
                                _FrontJS.View.reload();
                            _this.hide();
                            if (res.error_code > 0)
                                RbHighbar.error(res.error_msg);
                            else
                                RbHighbar.success("操作成功")
                        }
                    })
                })
            }
        })
    },
    handleOp4: function handleOp4(item, recordId) {
        var _List = this._getDataList();
        var ids = recordId ? [recordId] : _List.getSelectedIds() || [];
        if (!ids[0])
            return RbHighbar.create($L("请至少选择一条记录"));
        var md = item.op4Value.split(":");
        if (md[1]) {
            $.get("/commons/frontjs/get-detailids?ids=".concat(ids.join(",")), function(res) {
                if (res.error_code === 0) {
                    if (res.data && res.data.length > 0) {
                        _List.exportReport(md[0], {
                            isMerge: true,
                            recordId: res.data
                        })
                    } else {
                        RbHighbar.createl("选择的记录暂无明细数据")
                    }
                } else {
                    RbHighbar.error(res.error_msg)
                }
            })
        } else {
            _List.exportReport(md[0], {
                isMerge: true,
                recordId: ids
            })
        }
    },
    handleOp5: function handleOp5(item, recordId) {
        var _List = this._getDataList();
        var ids = recordId ? [recordId] : _List.getSelectedIds() || [];
        if (!ids[0])
            return RbHighbar.create($L("请至少选择一条记录"));
        if (this._isInView())
            _FrontJS.View.transformRecord(item.op5Value, {
                recordId: ids[0]
            });
        else
            _List.transformRecord(item.op5Value, {
                recordId: ids,
                isMuilt: true
            })
    },
    handleOp10: function handleOp10(item, recordId) {
        if (!recordId) {
            var _List = this._getDataList();
            recordId = recordId ? [recordId] : _List.getSelectedIds() || []
        }
        try {
            var FN = new Function("selectedId",item.op10Value);
            FN(recordId)
        } catch (err) {
            console.log(err)
        }
    },
    _isInView: function _isInView() {
        return !!window.RbViewPage
    },
    _getDataList: function _getDataList() {
        try {
            if (!!window.RbViewPage && !!parent.window.FrontJS) {
                return parent.window.FrontJS.DataList || _FrontJS.DataList || {}
            }
        } catch (ignored) {}
        return _FrontJS.DataList || {}
    },
    fixItem: function fixItem(item) {
        item.title = item.text || null;
        item.text = item.text || $L("未命名");
        item.icon = item.icon || "texture";
        item.type = item.colorType || null;
        if (~~item.showType === 1) {
            item.text = null;
            if (!item.icon)
                item.icon = "texture"
        } else if (~~item.showType === 2) {
            item.icon = null;
            item.title = null
        } else {
            item.title = null
        }
        if (item.items) {
            if (item.items.length === 0) {
                item.items = null
            } else {
                var items2 = [];
                item.items.forEach(function(c) {
                    var fix2 = EasyAction.fixItem(c);
                    if (fix2.text === null)
                        fix2.text = "";
                    items2.push(fix2)
                });
                item.items = items2
            }
        }
        return item
    },
    checkShowFilter: function checkShowFilter(items, recordId, cb) {
        $.post("/app/entity/extras/check-easyaction?record=".concat(recordId), JSON.stringify(items), function(res) {
            typeof cb === "function" && cb(res.data || {})
        })
    }
};
