"use strict";
function _typeof(obj) {
    "@babel/helpers - typeof";
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
        _typeof = function _typeof(obj) {
            return typeof obj
        }
    } else {
        _typeof = function _typeof(obj) {
            return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj
        }
    }
    return _typeof(obj)
}
function _extends() {
    _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key]
                }
            }
        }
        return target
    }
    ;
    return _extends.apply(this, arguments)
}
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable
            })
        }
        keys.push.apply(keys, symbols)
    }
    return keys
}
function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i] != null ? arguments[i] : {};
        if (i % 2) {
            ownKeys(Object(source), true).forEach(function(key) {
                _defineProperty(target, key, source[key])
            })
        } else if (Object.getOwnPropertyDescriptors) {
            Object.defineProperties(target, Object.getOwnPropertyDescriptors(source))
        } else {
            ownKeys(Object(source)).forEach(function(key) {
                Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key))
            })
        }
    }
    return target
}
function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function")
    }
}
function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value"in descriptor)
            descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor)
    }
}
function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps)
        _defineProperties(Constructor.prototype, protoProps);
    if (staticProps)
        _defineProperties(Constructor, staticProps);
    return Constructor
}
function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function")
    }
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass)
        _setPrototypeOf(subClass, superClass)
}
function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
        o.__proto__ = p;
        return o
    }
    ;
    return _setPrototypeOf(o, p)
}
function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();
    return function _createSuperInternal() {
        var Super = _getPrototypeOf(Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = _getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget)
        } else {
            result = Super.apply(this, arguments)
        }
        return _possibleConstructorReturn(this, result)
    }
}
function _possibleConstructorReturn(self, call) {
    if (call && (_typeof(call) === "object" || typeof call === "function")) {
        return call
    } else if (call !== void 0) {
        throw new TypeError("Derived constructors may only return object or undefined")
    }
    return _assertThisInitialized(self)
}
function _assertThisInitialized(self) {
    if (self === void 0) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
    }
    return self
}
function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct)
        return false;
    if (Reflect.construct.sham)
        return false;
    if (typeof Proxy === "function")
        return true;
    try {
        Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {}));
        return true
    } catch (e) {
        return false
    }
}
function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o)
    }
    ;
    return _getPrototypeOf(o)
}
function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        })
    } else {
        obj[key] = value
    }
    return obj
}
var UNICON_NAME = "texture";
var wpc = window.__PageConfig;
var eeType = $urlp("type") || "datalist";
var _Menu;
var _FieldsCache;
var _EntitiesCache;
var _ReportsCache;
var _TransformsCache;
$(document).ready(function() {
    $addResizeHandler(function() {
        var h = Math.max($(window).height() - 293, 306);
        $(".ee-left .sortable-box").height(h);
        $(".ee-left .sortable-box .J_config").height(h - 6)
    })();
    $(".main-content .card-body:eq(0)").addClass(eeType);
    $(".J_type a").each(function() {
        if ($(this).attr("href").includes(eeType))
            $(this).addClass("active")
    });
    $.get("/commons/metadata/fields?entity=".concat(wpc.entityName), function(res) {
        return _FieldsCache = res.data || []
    });
    $.get("/commons/metadata/entities?detail=yes", function(res) {
        return _EntitiesCache = res.data || []
    });
    $.get("/admin/trigger/auto-gen-report-alist?entity=".concat(wpc.entityName, "&detail=yes"), function(res) {
        return _ReportsCache = res.data || []
    });
    $.get("/admin/trigger/auto-transform-alist?entity=".concat(wpc.entityName), function(res) {
        return _TransformsCache = res.data || []
    });
    var config = wpc.config || {};
    if ($type(config) === "array")
        config = _defineProperty({}, eeType, config);
    renderRbcomp(React.createElement(Menu, {
        items: config[eeType] || null
    }), $(".J_config")[0], function() {
        _Menu = this
    });
    var $btn = $(".J_save").on("click", function() {
        config[eeType] = _Menu.val();
        var data = {
            config: JSON.stringify(config),
            metadata: {
                entity: "LayoutConfig",
                id: wpc.configid || null
            }
        };
        if (!wpc.configid) {
            data.belongEntity = wpc.entityName;
            data.applyType = "EASYACTION";
            data.shareTo = "ALL"
        }
        $btn.button("loading");
        $.post("/app/entity/common-save", JSON.stringify(data), function(res) {
            if (res.error_code === 0)
                location.reload();
            else
                RbHighbar.error(res.error_msg);
            $btn.button("reset")
        })
    })
});
var Menu = function(_React$Component) {
    _inherits(Menu, _React$Component);
    var _super = _createSuper(Menu);
    function Menu(props) {
        var _this;
        _classCallCheck(this, Menu);
        _this = _super.call(this, props);
        _this.state = _objectSpread({}, props);
        return _this
    }
    _createClass(Menu, [{
        key: "render",
        value: function render() {
            var _this2 = this;
            if ((this.state.items || []).length === 0)
                return null;
            return this.state.items.map(function(item) {
                var child;
                if (item.items && item.items.length > 0) {
                    child = React.createElement("ul", {
                        className: "ui-sortable"
                    }, item.items.map(function(itemL2) {
                        return _this2.renderItem(itemL2)
                    }))
                }
                return _this2.renderItem(item, 1, child)
            })
        }
    }, {
        key: "renderItem",
        value: function renderItem(item, level, child) {
            var _this3 = this;
            return React.createElement(MenuItem, _extends({
                key: item.id
            }, item, {
                level: level || 2,
                child: child,
                active: item.id === this.state.active,
                onItemClick: function onItemClick(id) {
                    if (id === _this3.state.id)
                        return;
                    _this3.setState({
                        active: id
                    });
                    var ps = _this3._findItem(id);
                    var em = $(".J_edit-menu")[0];
                    $unmount(em, 1, true);
                    setTimeout(function() {
                        renderRbcomp(React.createElement(MenuActionEditor, _extends({}, ps, {
                            onConfirm: function onConfirm(s) {
                                return _this3._saveItem(s)
                            }
                        })), em, function() {
                            $(em).find("input[name=\"text\"]").focus()
                        })
                    }, 10)
                },
                onItemRemove: function onItemRemove(id) {
                    var itemsNew = [];
                    _this3.state.items.forEach(function(item) {
                        if (item.items) {
                            var itemsNewL2 = [];
                            item.items.forEach(function(itemL2) {
                                if (itemL2.id === id)
                                    ;
                                else
                                    itemsNewL2.push(itemL2)
                            });
                            item.items = itemsNewL2
                        }
                        if (item.id === id)
                            ;
                        else
                            itemsNew.push(item)
                    });
                    _this3.setState({
                        items: itemsNew
                    })
                },
                onItemAdd: function onItemAdd(id) {
                    var ps = _this3._findItem(id);
                    ps.items = ps.items || [];
                    var newid = $random("LL");
                    ps.items.push({
                        id: newid
                    });
                    var itemsNew = [];
                    _this3.state.items.forEach(function(item) {
                        if (item.id === id)
                            item = ps;
                        itemsNew.push(item)
                    });
                    _this3.setState({
                        items: itemsNew
                    }, function() {
                        $(".J_config li[data-id=\"".concat(newid, "\"]")).trigger("click");
                        _this3._evtSortable()
                    })
                }
            }))
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this4 = this;
            $(".J_add-menu").on("click", function() {
                var itemsNew = _this4.state.items || [];
                var newid = $random("EA");
                itemsNew.push({
                    id: newid,
                    _fromNew: true
                });
                _this4.setState({
                    items: itemsNew
                }, function() {
                    $(".J_config li[data-id=\"".concat(newid, "\"]")).trigger("click")
                })
            });
            this._evtSortable()
        }
    }, {
        key: "_findItem",
        value: function _findItem(id) {
            var found = this.state.items.find(function(x) {
                return x.id === id
            });
            if (found)
                return found;
            this.state.items.forEach(function(x) {
                if (x.items && !found) {
                    found = x.items.find(function(xL2) {
                        return xL2.id === id
                    })
                }
            });
            return found
        }
    }, {
        key: "_saveItem",
        value: function _saveItem(s) {
            var itemsNew = [];
            this.state.items.forEach(function(item) {
                if (item.id === s.id) {
                    item = _objectSpread(_objectSpread({}, s), {}, {
                        items: item.items || []
                    })
                } else if (item.items) {
                    var itemsNewL2 = [];
                    item.items.forEach(function(itemL2) {
                        if (itemL2.id === s.id)
                            itemsNewL2.push(s);
                        else
                            itemsNewL2.push(itemL2)
                    });
                    item.items = itemsNewL2
                }
                itemsNew.push(item)
            });
            this.setState({
                items: itemsNew,
                active: null
            });
            $unmount($(".J_edit-menu")[0], 1, true)
        }
    }, {
        key: "_evtSortable",
        value: function _evtSortable() {
            function FN(el) {
                $(el).sortable({
                    placeholder: "dd-placeholder",
                    handle: ">.dd3-handle",
                    axis: "y"
                }).disableSelection()
            }
            FN(".J_config");
            $(".J_config ul.ui-sortable").each(function() {
                FN(this)
            })
        }
    }, {
        key: "val",
        value: function val() {
            var that = this;
            var itemsSorted = [];
            $(".J_config>li").each(function() {
                var item = that._findItem($(this).data("id"));
                item = _objectSpread(_objectSpread({}, item), {}, {
                    items: []
                });
                $(this).find("ul>li").each(function() {
                    var itemL2 = that._findItem($(this).data("id"));
                    item.items.push(itemL2)
                });
                itemsSorted.push(item)
            });
            return itemsSorted
        }
    }]);
    return Menu
}(React.Component);
function MenuItem(props) {
    return React.createElement("li", {
        "data-id": props.id,
        className: "dd-item dd3-item ".concat(props.active && "active"),
        onClick: function onClick(e) {
            $stopEvent(e, true);
            props.onItemClick(props.id)
        }
    }, React.createElement("div", {
        className: "dd-handle dd3-handle"
    }), React.createElement("div", {
        className: "dd3-content text-".concat(props.colorType || "", " ")
    }, React.createElement("i", {
        className: "icon zmdi zmdi-".concat(props.icon || UNICON_NAME)
    }), React.createElement("span", null, props.text || $L("未命名"))), React.createElement("div", {
        className: "dd3-action"
    }, props.level === 1 && eeType !== "datarow" && React.createElement("a", {
        title: $L("添加子按钮"),
        onClick: function onClick(e) {
            $stopEvent(e, true);
            props.onItemAdd(props.id)
        }
    }, React.createElement("i", {
        className: "zmdi zmdi-plus"
    })), React.createElement("a", {
        title: $L("移除"),
        onClick: function onClick(e) {
            $stopEvent(e, true);
            props.onItemRemove(props.id)
        }
    }, React.createElement("i", {
        className: "zmdi zmdi-close"
    }))), props.child)
}
var ActionDefs = function ActionDefs() {
    return [{
        value: 1,
        text: $L("新建")
    }, {
        value: 2,
        text: $L("快速编辑")
    }, {
        value: 3,
        text: $L("快速修改")
    }, {
        value: 4,
        text: $L("导出报表")
    }, {
        value: 5,
        text: $L("记录转换")
    }, {
        value: 10,
        text: $L("代码")
    }]
};
var TMPL_TYPES = function TMPL_TYPES() {
    return {
        1: " (EXCEL)",
        2: " (".concat($L("EXCEL 列表"), ")"),
        3: " (".concat($L("网页"), ")"),
        4: " (WORD)"
    }
};
var ShowStyles2_Comps = {};
var _config2Labels = {};
var _config2Tips = {};
var _config2Requireds = {};
var _config2Readonlys = {};
var _refreshConfigStar = function _refreshConfigStar($el) {
    $el.find(".dd-item").each(function() {
        var fkey = $(this).data("field");
        if (_config2Labels[fkey] || _config2Tips[fkey] || _config2Requireds[fkey] || _config2Readonlys[fkey]) {
            $(this).addClass("star")
        } else {
            $(this).removeClass("star")
        }
    })
};
var MenuActionEditor = function(_React$Component2) {
    _inherits(MenuActionEditor, _React$Component2);
    var _super2 = _createSuper(MenuActionEditor);
    function MenuActionEditor(props) {
        var _this5;
        _classCallCheck(this, MenuActionEditor);
        _this5 = _super2.call(this, props);
        _this5.state = _objectSpread({}, props);
        if (!_this5.state.opType)
            _this5.state.opType = eeType === "datarow" ? 1 : 1;
        return _this5
    }
    _createClass(MenuActionEditor, [{
        key: "render",
        value: function render() {
            var _this6 = this;
            var state = this.state;
            return React.createElement("form", {
                className: "simple mb-1"
            }, React.createElement("div", {
                className: "form-group"
            }, React.createElement("label", null, $L("基本")), React.createElement("div", {
                className: "simple"
            }, React.createElement("table", {
                className: "w-100 m-0"
            }, React.createElement("tr", null, React.createElement("td", null, React.createElement("div", {
                className: "input-group"
            }, React.createElement("span", {
                className: "input-group-prepend",
                title: $L("按钮图标"),
                onClick: function onClick() {
                    window.clickIcon = function(icon) {
                        _this6.setState({
                            icon: icon
                        });
                        RbModal.hide()
                    }
                    ;
                    RbModal.create("/p/common/search-icon", $L("选择图标"))
                }
            }, React.createElement("span", {
                className: "input-group-text"
            }, React.createElement("i", {
                className: "zmdi zmdi-".concat(state.icon || UNICON_NAME)
            }))), React.createElement("input", {
                type: "text",
                className: "form-control form-control-sm",
                name: "text",
                placeholder: $L("按钮名称"),
                defaultValue: state.text || $L("未命名"),
                maxLength: "40",
                ref: function ref(c) {
                    return _this6._$text = c
                }
            }))), React.createElement("td", {
                style: {
                    width: 100
                },
                className: "pl-2"
            }, React.createElement("select", {
                className: "form-control form-control-sm",
                name: "colorType",
                ref: function ref(c) {
                    return _this6._$colorType = c
                },
                title: $L("按钮颜色"),
                defaultValue: state.colorType || ""
            }, React.createElement("option", {
                value: ""
            }, $L("默认配色")), React.createElement("option", {
                value: "danger",
                className: "text-danger"
            }, $L("着重")), React.createElement("option", {
                value: "warning",
                className: "text-warning"
            }, $L("警告")), React.createElement("option", {
                value: "primary",
                className: "text-primary"
            }, $L("主色")), React.createElement("option", {
                value: "dark",
                className: "text-dark"
            }, $L("黑色")))))))), React.createElement("div", {
                className: "form-group"
            }, React.createElement("label", null, $L("显示样式")), React.createElement("div", {
                ref: function ref(c) {
                    return _this6._$showType = c
                }
            }, React.createElement("label", {
                className: "custom-control custom-control-sm custom-radio custom-control-inline mb-0"
            }, React.createElement("input", {
                className: "custom-control-input",
                type: "radio",
                name: "showType",
                value: "3",
                defaultChecked: true
            }), React.createElement("span", {
                className: "custom-control-label"
            }, $L("默认"))), React.createElement("label", {
                className: "custom-control custom-control-sm custom-radio custom-control-inline mb-0"
            }, React.createElement("input", {
                className: "custom-control-input",
                type: "radio",
                name: "showType",
                value: "1"
            }), React.createElement("span", {
                className: "custom-control-label"
            }, $L("仅图标"))), React.createElement("label", {
                className: "custom-control custom-control-sm custom-radio custom-control-inline mb-0"
            }, React.createElement("input", {
                className: "custom-control-input",
                type: "radio",
                name: "showType",
                value: "2"
            }), React.createElement("span", {
                className: "custom-control-label"
            }, $L("仅文字"))))), React.createElement("div", {
                className: "form-group mb-1"
            }, React.createElement("label", null, $L("谁能使用")), React.createElement("div", null, state._unmounted ? null : React.createElement(Share2, {
                ref: function ref(c) {
                    return _this6._Share2 = c
                },
                shareTo: this.props._fromNew ? "ALL" : state.shareTo,
                noSwitch: true
            }))), (eeType === "view" || eeType === "datarow") && React.createElement("div", {
                className: "form-group"
            }, React.createElement("label", null, $L("使用条件")), React.createElement("div", null, React.createElement("a", {
                className: "text-primary",
                onClick: function onClick() {
                    return _this6._showFilter()
                }
            }, state.showFilter && state.showFilter.items.length > 0 ? $L("已设置条件") + " (".concat(state.showFilter.items.length, ")") : $L("点击设置")))), React.createElement("div", {
                className: "form-group"
            }, React.createElement("label", null, $L("绑定操作")), React.createElement("div", null, React.createElement("ul", {
                className: "nav nav-tabs mb-4",
                ref: function ref(c) {
                    return _this6._$actionType = c
                }
            }, ActionDefs(eeType).map(function(item) {
                return React.createElement("li", {
                    className: "nav-item ".concat(item.value === 10 && "bosskey-show"),
                    key: item.value
                }, React.createElement("a", {
                    className: "nav-link ".concat(state.opType === item.value && "active"),
                    onClick: function onClick() {
                        return _this6.setState({
                            opType: item.value
                        })
                    }
                }, item.text))
            })), React.createElement("div", {
                className: state.opType === 1 ? "op1-edit" : "hide"
            }, this._renderOp1(state)), React.createElement("div", {
                className: state.opType === 2 ? "op2-edit" : "hide"
            }, this._renderOp2(state)), React.createElement("div", {
                className: state.opType === 3 ? "op3-edit" : "hide"
            }, this._renderOp3(state)), React.createElement("div", {
                className: state.opType === 4 ? "op4-edit" : "hide"
            }, this._renderOp4(state)), React.createElement("div", {
                className: state.opType === 5 ? "op5-edit" : "hide"
            }, this._renderOp5(state)), React.createElement("div", {
                className: state.opType === 10 ? "op10-edit" : "hide"
            }, this._renderOp10(state)))), React.createElement("div", null, React.createElement("button", {
                type: "button",
                className: "btn btn-primary btn-outline",
                onClick: function onClick() {
                    return _this6._handleConfirm()
                }
            }, $L("确定"))))
        }
    }, {
        key: "_showFilter",
        value: function _showFilter() {
            var _this7 = this;
            if (this._AdvFilter) {
                this._AdvFilter.show()
            } else {
                var that = this;
                renderRbcomp(React.createElement(AdvFilter, {
                    entity: wpc.entityName,
                    filter: this.state.showFilter,
                    confirm: function confirm(s) {
                        _this7.setState({
                            showFilter: s
                        })
                    },
                    title: $L("使用条件"),
                    inModal: true,
                    canNoFilters: true
                }), function() {
                    that._AdvFilter = this
                })
            }
        }
    }, {
        key: "_renderOp1",
        value: function _renderOp1(state) {
            var _this8 = this;
            return React.createElement(RF, null, React.createElement("div", {
                className: "form-group"
            }, React.createElement("label", null, $L("新建哪个实体")), React.createElement("div", null, React.createElement("select", {
                className: "form-control form-control-sm",
                defaultValue: state.op1Value || null,
                ref: function ref(c) {
                    return _this8._$op1Value = c
                }
            }, _EntitiesCache.map(function(e) {
                return React.createElement("option", {
                    key: e.name,
                    value: e.name
                }, e.label)
            })))), React.createElement("div", {
                className: "form-group"
            }, React.createElement("label", null, $L("指定布局")), React.createElement("div", null, React.createElement("select", {
                className: "form-control form-control-sm",
                defaultValue: state.op1Value2 || null,
                ref: function ref(c) {
                    return _this8._$op1Value2 = c
                }
            }, React.createElement("option", {
                value: "N"
            }, $L("自动")), state.op1Layouts && state.op1Layouts.map(function(item) {
                return React.createElement("option", {
                    key: item.id,
                    value: item.id
                }, item.name || $L("默认布局"))
            })))), React.createElement("div", {
                className: "form-group"
            }, React.createElement("label", null, $L("带入字段")), React.createElement("div", null, React.createElement("select", {
                className: "form-control form-control-sm",
                defaultValue: state.op1Value3 || null,
                ref: function ref(c) {
                    return _this8._$op1Value3 = c
                }
            }, React.createElement("option", {
                value: "N"
            }, $L("无")), state.op1Refs && state.op1Refs.map(function(item) {
                return React.createElement("option", {
                    key: item.name,
                    value: item.name
                }, item.label)
            })))), React.createElement("div", {
                className: "form-group"
            }, React.createElement("label", null, $L("窗口标题")), React.createElement("div", null, React.createElement("input", {
                className: "form-control form-control-sm",
                defaultValue: state.op1Value4 || null,
                ref: function ref(c) {
                    return _this8._$op1Value4 = c
                },
                placeholder: $L("默认")
            }))))
        }
    }, {
        key: "_renderOp2",
        value: function _renderOp2(state) {
            var _this9 = this;
            return React.createElement(RF, null, React.createElement("div", {
                className: "form-group"
            }, React.createElement("label", null, $L("编辑哪些字段")), React.createElement("div", {
                className: "sortable-box rb-scroller",
                ref: function ref(c) {
                    return _this9._$2fields = c
                }
            }, React.createElement("ol", {
                className: "dd-list ui-sortable",
                _title: $L("无")
            }, state.op2Fields && state.op2Fields.map(function(item) {
                var fieldName = item.name;
                return React.createElement("li", {
                    className: "dd-item dd3-item",
                    "data-field": fieldName,
                    key: fieldName
                }, React.createElement("div", {
                    className: "dd-handle dd3-handle"
                }), React.createElement("div", {
                    className: "dd3-content"
                }, React.createElement("span", null, item.label)), React.createElement("div", {
                    className: "dd3-action"
                }, React.createElement("a", {
                    className: "mr-1",
                    title: $L("属性"),
                    onClick: function onClick() {
                        if (ShowStyles2_Comps[fieldName]) {
                            ShowStyles2_Comps[fieldName].show()
                        } else {
                            var found = _FieldsCache.find(function(x) {
                                return x.name === fieldName
                            });
                            renderRbcomp(React.createElement(ShowStyles2, {
                                label: _config2Labels[fieldName],
                                tip: _config2Tips[fieldName],
                                required: _config2Requireds[fieldName],
                                readonly: _config2Readonlys[fieldName],
                                onConfirm: function onConfirm(s) {
                                    _config2Labels[fieldName] = s.label;
                                    _config2Tips[fieldName] = s.tip;
                                    _config2Requireds[fieldName] = s.required;
                                    _config2Readonlys[fieldName] = s.readonly;
                                    _refreshConfigStar($(_this9._$2fields).find(".dd-list"))
                                },
                                fieldNullable: found.nullable,
                                fieldReadonly: !found.updatable,
                                fieldDisabled: !(found.creatable && found.updatable)
                            }), function() {
                                ShowStyles2_Comps[fieldName] = this
                            })
                        }
                    }
                }, React.createElement("i", {
                    className: "zmdi zmdi-edit"
                })), React.createElement("a", {
                    className: "J_del",
                    title: $L("移除"),
                    onClick: function onClick() {
                        var op2FieldsNew = state.op2Fields.filter(function(x) {
                            return x.name !== fieldName
                        });
                        _this9.setState({
                            op2Fields: op2FieldsNew
                        })
                    }
                }, React.createElement("i", {
                    className: "zmdi zmdi-close"
                }))))
            }))), React.createElement("div", null, React.createElement("select", {
                className: "form-control form-control-sm",
                ref: function ref(c) {
                    return _this9._$op2Fields = c
                }
            }, React.createElement("option", {
                value: ""
            }), _FieldsCache && _FieldsCache.map(function(item) {
                return React.createElement("option", {
                    key: item.name,
                    value: item.name
                }, item.label)
            })))), React.createElement("div", {
                className: "form-group"
            }, React.createElement("label", null, $L("窗口标题")), React.createElement("div", null, React.createElement("input", {
                className: "form-control form-control-sm",
                defaultValue: state.op2Value2 || null,
                ref: function ref(c) {
                    return _this9._$op2Value2 = c
                },
                placeholder: $L("默认")
            }))))
        }
    }, {
        key: "_renderOp3",
        value: function _renderOp3(state) {
            var _this10 = this;
            return React.createElement(RF, null, React.createElement("div", {
                className: "form-group"
            }, React.createElement("label", null, $L("修改哪些字段")), React.createElement(Op3Editor, {
                items: state.op3Value || [{}],
                ref: function ref(c) {
                    return _this10._Op3Editor = c
                }
            })), React.createElement("div", {
                className: "form-group"
            }, React.createElement("label", null, $L("修改确认提示语")), React.createElement("div", null, React.createElement("textarea", {
                className: "form-control form-control-sm row2x",
                defaultValue: state.op3Value3 || null,
                ref: function ref(c) {
                    return _this10._$op3Value3 = c
                },
                placeholder: $L("默认")
            }))))
        }
    }, {
        key: "_renderOp4",
        value: function _renderOp4(state) {
            var _this11 = this;
            return React.createElement("div", {
                className: "form-group"
            }, React.createElement("label", null, $L("使用报表模版")), React.createElement("div", null, React.createElement("select", {
                className: "form-control form-control-sm",
                defaultValue: state.op4Value || null,
                ref: function ref(c) {
                    return _this11._$op4Value = c
                }
            }, _ReportsCache.map(function(item) {
                var name = item.name;
                if (item.detailEntity)
                    name += " [".concat($L("明细"), "]");
                name += TMPL_TYPES()[item.type] || " (EXCEL)";
                var key = item.id + (item.detailEntity ? ":" + item.detailEntity : "");
                return React.createElement("option", {
                    key: key,
                    value: key
                }, name)
            })), React.createElement("p", {
                className: "form-text"
            }, WrapHtml($L("需要先添加 [报表模板](../../data/report-templates) 才能在此处选择")))))
        }
    }, {
        key: "_renderOp5",
        value: function _renderOp5(state) {
            var _this12 = this;
            return React.createElement("div", {
                className: "form-group"
            }, React.createElement("label", null, $L("使用记录转换")), React.createElement("div", null, React.createElement("select", {
                className: "form-control form-control-sm",
                defaultValue: state.op5Value || null,
                ref: function ref(c) {
                    return _this12._$op5Value = c
                }
            }, _TransformsCache.map(function(item) {
                return React.createElement("option", {
                    key: item.id,
                    value: item.id
                }, item.text)
            })), React.createElement("p", {
                className: "form-text"
            }, WrapHtml($L("需要先添加 [记录转换](../../robot/transforms) 才能在此处选择")))))
        }
    }, {
        key: "_renderOp10",
        value: function _renderOp10(state) {
            var _this13 = this;
            return React.createElement("div", {
                className: "form-group"
            }, React.createElement("label", null, $L("JS 代码")), React.createElement("div", null, React.createElement("textarea", {
                className: "formula-code",
                spellCheck: "false",
                defaultValue: state.op10Value || null,
                ref: function ref(c) {
                    return _this13._$op10Value = c
                },
                maxLength: "1000",
                placeholder: "// ES5 Only. Use `console.log(selectedId)`"
            })))
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this14 = this;
            var props = this.props;
            if (props.showType) {
                $(this._$showType).find("input[value=".concat(props.showType, "]"))[0].click()
            }
            $(".J_edit-menu select").each(function() {
                if (!["colorType"].includes(this.name)) {
                    $(this).select2({
                        allowClear: false,
                        placeholder: $L("无")
                    })
                }
            });
            $(this._$op1Value).on("change", function(e) {
                var name = e.target.value || wpc.entityName;
                $.get("/admin/entity/".concat(name, "/get-forms-attr"), function(res) {
                    var _data = res.data || [];
                    if (_data.length === 0)
                        _data = [{
                            id: null
                        }];
                    _this14.setState({
                        op1Layouts: _data
                    }, function() {
                        props.op1Value2 && $(_this14._$op1Value2).val(props.op1Value2)
                    })
                });
                $.get("/commons/metadata/fields?entity=".concat(name), function(res) {
                    var _data = (res.data || []).filter(function(x) {
                        return x.type === "REFERENCE" && x.ref[0] === wpc.entityName
                    });
                    _this14.setState({
                        op1Refs: _data
                    }, function() {
                        props.op1Value3 && $(_this14._$op1Value3).val(props.op1Value3)
                    })
                })
            });
            $(this._$op1Value).val(props.op1Value || wpc.entityName).trigger("change");
            $(this._$2fields).perfectScrollbar();
            $(this._$2fields).find(".dd-list").sortable({
                placeholder: "dd-placeholder",
                handle: ">.dd3-handle",
                axis: "y"
            }).disableSelection();
            _config2Labels = {};
            _config2Tips = {};
            _config2Requireds = {};
            _config2Readonlys = {};
            var fs = [];
            var checked = props.op2Value || [];
            checked.forEach(function(item) {
                if (typeof item === "string")
                    item = {
                        field: item
                    };
                var found = _FieldsCache.find(function(x) {
                    return x.name === item.field
                });
                if (found) {
                    fs.push(found);
                    var fieldName = found.name;
                    _config2Labels[fieldName] = item.label2;
                    _config2Tips[fieldName] = item.tip2;
                    _config2Requireds[fieldName] = item.required2;
                    _config2Readonlys[fieldName] = item.readonly2
                }
            });
            this.setState({
                op2Fields: fs
            }, function() {
                _refreshConfigStar($(_this14._$2fields).find(".dd-list"))
            });
            $(this._$op2Fields).select2({
                placeholder: $L("添加编辑字段"),
                allowClear: false
            }).val("").on("change", function(e) {
                var op2Fields = _this14.state.op2Fields || [];
                var name = e.target.value;
                var ex = op2Fields.find(function(x) {
                    return x.name === name
                });
                if (!ex) {
                    var found = _FieldsCache.find(function(x) {
                        return x.name === name
                    });
                    op2Fields.push(found);
                    _this14.setState({
                        op2Fields: op2Fields
                    })
                }
            });
            $(this._$op4Value).select2({
                placeholder: $L("无"),
                allowClear: false,
                templateResult: function templateResult(res) {
                    var text = res.text;
                    var flag;
                    if (text.endsWith(")") && text.includes(" (")) {
                        var s = text.split(" (");
                        flag = s[s.length - 1].replace(")", "");
                        delete s[s.length - 1];
                        text = $cleanArray(s).join(" (")
                    }
                    var $span = $("<span></span>").text(text);
                    if (flag)
                        $("<span class=\"badge badge-default badge-pill\">".concat(flag, "</span>")).appendTo($span);
                    return $span
                }
            });
            if (props.op4Value) {
                var id = props.op4Value.substr(0, 20);
                var exist = _ReportsCache.find(function(x) {
                    return x.id === id
                });
                if (!exist) {
                    var o = new Option("[DELETED]",id,true,true);
                    $(this._$op4Value).append(o)
                }
            }
            if (props.op5Value) {
                var _exist = _TransformsCache.find(function(x) {
                    return x.id === props.op5Value
                });
                if (!_exist) {
                    var _o = new Option("[DELETED]",props.op5Value,true,true);
                    $(this._$op5Value).append(_o)
                }
            }
            if (props.op10Value) {
                $(this._$actionType).find(".bosskey-show").removeClass("bosskey-show")
            }
        }
    }, {
        key: "_handleConfirm",
        value: function _handleConfirm() {
            var ps = {
                id: this.props.id,
                icon: this.state.icon,
                text: $val(this._$text),
                colorType: $(this._$colorType).val() || null,
                showType: $(this._$showType).find("input:checked").val(),
                showFilter: this.state.showFilter || null,
                shareTo: this._Share2.getData().shareTo,
                opType: this.state.opType
            };
            if (ps.opType === 1) {
                ps.op1Value = $val(this._$op1Value) || null;
                ps.op1Value2 = $val(this._$op1Value2) || null;
                ps.op1Value3 = $val(this._$op1Value3) || null;
                ps.op1Value4 = $val(this._$op1Value4) || null
            } else if (ps.opType === 2) {
                ps.op2Value = [];
                $(this._$2fields).find("li").each(function() {
                    var o = {
                        field: $(this).attr("data-field")
                    };
                    o.label2 = _config2Labels[o.field] || null;
                    o.tip2 = _config2Tips[o.field] || null;
                    o.required2 = _config2Requireds[o.field] || null;
                    o.readonly2 = _config2Readonlys[o.field] || null;
                    ps.op2Value.push(o)
                });
                ps.op2Value2 = $val(this._$op2Value2) || null;
                if (ps.op2Value.length === 0)
                    return RbHighbar.createl("绑定操作设置有误")
            } else if (ps.opType === 3) {
                ps.op3Value = this._Op3Editor ? this._Op3Editor.val() : null;
                ps.op3Value3 = $val(this._$op3Value3);
                if (!ps.op3Value || ps.op3Value.length === 0)
                    return RbHighbar.createl("绑定操作设置有误")
            } else if (ps.opType === 4) {
                ps.op4Value = $val(this._$op4Value) || null;
                if (!ps.op4Value)
                    return RbHighbar.createl("绑定操作设置有误")
            } else if (ps.opType === 5) {
                ps.op5Value = $val(this._$op5Value) || null;
                if (!ps.op5Value)
                    return RbHighbar.createl("绑定操作设置有误")
            } else if (ps.opType === 10) {
                ps.op10Value = $val(this._$op10Value);
                if (!ps.op10Value)
                    return RbHighbar.createl("绑定操作设置有误")
            }
            typeof this.props.onConfirm === "function" && this.props.onConfirm(ps)
        }
    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            this.setState({
                _unmounted: true
            })
        }
    }]);
    return MenuActionEditor
}(React.Component);
var ShowStyles2 = function(_ShowStyles) {
    _inherits(ShowStyles2, _ShowStyles);
    var _super3 = _createSuper(ShowStyles2);
    function ShowStyles2(props) {
        var _this15;
        _classCallCheck(this, ShowStyles2);
        _this15 = _super3.call(this, props);
        _this15.state = {};
        return _this15
    }
    _createClass(ShowStyles2, [{
        key: "renderExtras",
        value: function renderExtras() {
            var _this16 = this;
            var props = this.props;
            return React.createElement(RF, null, React.createElement("div", {
                className: "form-group row"
            }, React.createElement("label", {
                className: "col-sm-3 col-form-label text-sm-right"
            }, $L("填写提示")), React.createElement("div", {
                className: "col-sm-7"
            }, React.createElement("input", {
                className: "form-control form-control-sm",
                type: "text",
                defaultValue: props.tip || "",
                placeholder: $L("默认"),
                ref: function ref(c) {
                    return _this16._$tip = c
                }
            }))), React.createElement("div", {
                className: "form-group row"
            }, React.createElement("label", {
                className: "col-sm-3 col-form-label text-sm-right"
            }), React.createElement("div", {
                className: "col-sm-7"
            }, React.createElement("label", {
                className: "custom-control custom-control-sm custom-checkbox custom-control-inline mt-0 mb-0"
            }, React.createElement("input", {
                className: "custom-control-input",
                type: "checkbox",
                defaultChecked: !!props.required || !props.fieldNullable,
                disabled: props.fieldDisabled || !props.fieldNullable,
                ref: function ref(c) {
                    return _this16._$required = c
                }
            }), React.createElement("span", {
                className: "custom-control-label"
            }, $L("必填"))), React.createElement("label", {
                className: "custom-control custom-control-sm custom-checkbox custom-control-inline mt-0 mb-0"
            }, React.createElement("input", {
                className: "custom-control-input",
                type: "checkbox",
                defaultChecked: !!this.props.readonly,
                disabled: props.fieldDisabled || props.fieldReadonly,
                ref: function ref(c) {
                    return _this16._$readonly = c
                }
            }), React.createElement("span", {
                className: "custom-control-label"
            }, $L("只读"))))))
        }
    }, {
        key: "saveProps",
        value: function saveProps() {
            var data = {
                label: $(this._$label).val() || "",
                tip: $(this._$tip).val() || "",
                required: $val(this._$required),
                readonly: $val(this._$readonly)
            };
            typeof this.props.onConfirm === "function" && this.props.onConfirm(data);
            this.hide()
        }
    }]);
    return ShowStyles2
}(ShowStyles);
var Op3Editor = function(_React$Component3) {
    _inherits(Op3Editor, _React$Component3);
    var _super4 = _createSuper(Op3Editor);
    function Op3Editor(props) {
        var _this17;
        _classCallCheck(this, Op3Editor);
        _this17 = _super4.call(this, props);
        _this17.state = _objectSpread({}, props);
        _this17._comps = {};
        return _this17
    }
    _createClass(Op3Editor, [{
        key: "render",
        value: function render() {
            var _this18 = this;
            var items = this.state.items || [{}];
            items.forEach(function(item) {
                if (!item.key2)
                    item.key2 = $random("fv-")
            });
            return React.createElement("div", {
                className: "op3-updates"
            }, React.createElement("div", {
                className: "row mb-1"
            }, React.createElement("div", {
                className: "col-5 pr-0"
            }, React.createElement("label", {
                className: "mb-0"
            }, $L("修改字段"))), React.createElement("div", {
                className: "col-7"
            }, React.createElement("label", {
                className: "mb-0"
            }, $L("修改值")))), items.map(function(item, i) {
                return React.createElement(Op3EditorItem, _extends({}, item, {
                    $$$parent: _this18,
                    index: i,
                    key: item.key2,
                    ref: function ref(c) {
                        return _this18._comps[item.key2] = c
                    }
                }))
            }), React.createElement("div", null, React.createElement("a", {
                href: "###",
                onClick: function onClick(e) {
                    $stopEvent(e, true);
                    if (items.length >= 9) {
                        RbHighbar.create($L("最多可添加 9 个"));
                        return false
                    }
                    items.push({});
                    _this18.setState({
                        items: items
                    })
                }
            }, React.createElement("i", {
                className: "zmdi zmdi-plus-circle icon"
            }), " ", $L("添加"))))
        }
    }, {
        key: "delItem",
        value: function delItem(key2) {
            var items = this.state.items.filter(function(item) {
                return item.key2 !== key2
            });
            this.setState({
                items: items
            });
            delete this._comps[key2]
        }
    }, {
        key: "val",
        value: function val() {
            var vvv = [];
            Object.values(this._comps).forEach(function(c) {
                if (!c || !vvv)
                    return;
                var v = c.val();
                if (v)
                    vvv.push(v);
                else
                    vvv = null
            });
            return vvv
        }
    }]);
    return Op3Editor
}(React.Component);
var Op3EditorItem = function(_React$Component4) {
    _inherits(Op3EditorItem, _React$Component4);
    var _super5 = _createSuper(Op3EditorItem);
    function Op3EditorItem(props) {
        var _this19;
        _classCallCheck(this, Op3EditorItem);
        _this19 = _super5.call(this, props);
        _this19.state = _objectSpread({}, props);
        return _this19
    }
    _createClass(Op3EditorItem, [{
        key: "render",
        value: function render() {
            var _this20 = this;
            var state = this.state || {};
            return React.createElement("div", {
                className: "row"
            }, React.createElement("div", {
                className: "col-5 pr-0"
            }, React.createElement("select", {
                className: "form-control form-control-sm",
                defaultValue: state.field || null,
                ref: function ref(c) {
                    return _this20._$op3Field = c
                }
            }, _FieldsCache.map(function(item) {
                return item.updatable ? React.createElement("option", {
                    key: item.name,
                    value: item.name
                }, item.label) : null
            }))), React.createElement("div", {
                className: "col-7"
            }, state.op3Field && React.createElement(FieldValueSet, {
                entity: wpc.entityName,
                field: state.op3Field,
                defaultValue: state.value || null,
                ref: function ref(c) {
                    return _this20._$op3Value = c
                }
            })), this.props.index > 0 && React.createElement("a", {
                href: "###",
                className: "del",
                title: $L("移除"),
                onClick: function onClick(e) {
                    $stopEvent(e, true);
                    _this20.props.$$$parent.delItem(_this20.props.key2)
                }
            }, React.createElement("i", {
                className: "zmdi zmdi-minus-circle"
            })))
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this21 = this;
            var init = true;
            $(this._$op3Field).select2({
                allowClear: false
            }).on("change", function(e) {
                var name = e.target.value;
                _this21.setState({
                    op3Field: null
                }, function() {
                    var found = _FieldsCache.find(function(x) {
                        return x.name === name
                    });
                    _this21.setState({
                        op3Field: found,
                        value: init ? _this21.state.value : null
                    });
                    init = false
                })
            }).trigger("change")
        }
    }, {
        key: "val",
        value: function val() {
            var fv = {
                field: $(this._$op3Field).val(),
                value: this._$op3Value.val()
            };
            if (!fv.field || $empty(fv.value))
                return null;
            return fv
        }
    }]);
    return Op3EditorItem
}(React.Component);
