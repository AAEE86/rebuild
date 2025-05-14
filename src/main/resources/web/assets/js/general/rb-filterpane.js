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
function _get() {
    if (typeof Reflect !== "undefined" && Reflect.get) {
        _get = Reflect.get
    } else {
        _get = function _get(target, property, receiver) {
            var base = _superPropBase(target, property);
            if (!base)
                return;
            var desc = Object.getOwnPropertyDescriptor(base, property);
            if (desc.get) {
                return desc.get.call(arguments.length < 3 ? target : receiver)
            }
            return desc.value
        }
    }
    return _get.apply(this, arguments)
}
function _superPropBase(object, property) {
    while (!Object.prototype.hasOwnProperty.call(object, property)) {
        object = _getPrototypeOf(object);
        if (object === null)
            break
    }
    return object
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
var REFENTITY_CACHE = window.REFENTITY_CACHE || {};
var BIZZ_ENTITIES = window.BIZZ_ENTITIES || [];
var AdvFilterPane = function(_React$Component) {
    _inherits(AdvFilterPane, _React$Component);
    var _super = _createSuper(AdvFilterPane);
    function AdvFilterPane(props) {
        var _this;
        _classCallCheck(this, AdvFilterPane);
        _this = _super.call(this, props);
        _defineProperty(_assertThisInitialized(_this), "onRef", function(c) {
            return _this._itemsRef.push(c)
        });
        _this.state = {};
        _this._itemsRef = [];
        return _this
    }
    _createClass(AdvFilterPane, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;
            var validFs = [];
            this.props.fields && this.props.fields.forEach(function(item) {
                if (["REFERENCE", "N2NREFERENCE"].includes(item.type)) {
                    REFENTITY_CACHE[item.name] = item.ref;
                    if ("N2NREFERENCE" === item.type)
                        REFENTITY_CACHE[item.name][2] = true;
                    if (!BIZZ_ENTITIES.includes(item.ref[0])) {
                        item.type = item.ref[1]
                    }
                }
                validFs.push(item)
            });
            this.setState({
                items: validFs
            }, function() {
                setTimeout(function() {
                    _this2.clearFilter();
                    $(".quick-filter-pane>.ph-item").remove();
                    $(".quick-filter-pane>span").show()
                }, 200)
            })
        }
    }, {
        key: "render",
        value: function render() {
            var _this3 = this;
            if (!this.state.items)
                return null;
            return React.createElement("form", {
                onSubmit: function onSubmit(e) {
                    return _this3.searchNow(e)
                }
            }, this.state.items.map(function(item, i) {
                return React.createElement("div", {
                    className: "col-item",
                    key: i
                }, React.createElement("div", {
                    className: "adv-filter"
                }, React.createElement("div", {
                    className: "filter-items"
                }, React.createElement(FilterItem4Pane, {
                    inFilterPane: true,
                    onRef: _this3.onRef,
                    $$$parent: _this3,
                    fields: [item],
                    allowClear: true,
                    select2Width: 227,
                    fieldLabel: item.label
                }))))
            }), React.createElement("div", {
                className: "col-item operating"
            }, React.createElement("div", null, React.createElement("div", {
                className: "btn-group"
            }, React.createElement("button", {
                className: "btn btn-secondary",
                type: "submit"
            }, React.createElement("i", {
                className: "icon zmdi zmdi-search"
            }), " ", $L("查询")), React.createElement("button", {
                className: "btn btn-secondary dropdown-toggle w-auto",
                type: "button",
                "data-toggle": "dropdown"
            }, React.createElement("i", {
                className: "icon zmdi zmdi-chevron-down"
            })), React.createElement("div", {
                className: "dropdown-menu dropdown-menu-right"
            }, React.createElement("label", {
                className: "custom-control custom-control-sm custom-radio custom-control-inline mb-0 mr-2"
            }, React.createElement("input", {
                className: "custom-control-input",
                type: "radio",
                name: "useEquation",
                value: "OR",
                defaultChecked: true
            }), React.createElement("span", {
                className: "custom-control-label"
            }, $L("符合任一"))), React.createElement("label", {
                className: "custom-control custom-control-sm custom-radio custom-control-inline mb-0 mr-0"
            }, React.createElement("input", {
                className: "custom-control-input",
                type: "radio",
                name: "useEquation",
                value: "AND",
                ref: function ref(c) {
                    return _this3._$useEquationAnd = c
                }
            }), React.createElement("span", {
                className: "custom-control-label"
            }, $L("符合全部"))))), React.createElement("a", {
                className: "ml-3 down-3",
                onClick: function onClick() {
                    return _this3.clearFilter(true)
                },
                title: $L("重置")
            }, React.createElement("i", {
                className: "icon mdi mdi-restore"
            })), rb.isAdminUser && React.createElement("a", {
                className: "ml-1 down-3 admin-show",
                title: $L("配置查询面板字段"),
                onClick: function onClick() {
                    RbModal.create("/p/admin/metadata/list-filterpane?entity=".concat(_this3.props.entity), React.createElement(RF, null, $L("配置查询面板字段"), React.createElement("sup", {
                        className: "rbv"
                    }), React.createElement("i", {
                        className: "support-plat2 mdi mdi-monitor",
                        title: $L("PC 端适用")
                    })))
                }
            }, React.createElement("i", {
                className: "icon mdi mdi-cog"
            })))))
        }
    }, {
        key: "searchNow",
        value: function searchNow(e) {
            $stopEvent(e, true);
            var filters = [];
            for (var i = 0; i < this._itemsRef.length; i++) {
                var item = this._itemsRef[i].getFilterData();
                if (item)
                    filters.push(item)
            }
            var s = {
                entity: this.props.entity,
                equation: this._$useEquationAnd.checked ? "AND" : "OR",
                items: filters
            };
            if (rb.env === "dev")
                console.log(JSON.stringify(s));
            typeof this.props.onSearch === "function" && this.props.onSearch(s)
        }
    }, {
        key: "clearFilter",
        value: function clearFilter(searchNow) {
            var _this4 = this;
            this._itemsRef.forEach(function(i) {
                return i.clear()
            });
            searchNow === true && setTimeout(function() {
                return _this4.searchNow()
            }, 200)
        }
    }]);
    return AdvFilterPane
}(React.Component);
var FilterItem4Pane = function(_FilterItem) {
    _inherits(FilterItem4Pane, _FilterItem);
    var _super2 = _createSuper(FilterItem4Pane);
    function FilterItem4Pane() {
        _classCallCheck(this, FilterItem4Pane);
        return _super2.apply(this, arguments)
    }
    _createClass(FilterItem4Pane, [{
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this5 = this;
            _get(_getPrototypeOf(FilterItem4Pane.prototype), "componentDidMount", this).call(this);
            var $s2op = this.__select2[1];
            setTimeout(function() {
                if (["DATE", "DATETIME", "TIME", "NUMBER", "DECIMAL"].includes(_this5.state.type)) {
                    $s2op.val("BW").trigger("change")
                }
            }, 200)
        }
    }, {
        key: "renderValue",
        value: function renderValue() {
            var _this6 = this;
            var valComp = _get(_getPrototypeOf(FilterItem4Pane.prototype), "renderValue", this).call(this);
            if (["DATE", "DATETIME"].includes(this.state.type)) {
                return React.createElement(RF, null, React.createElement("label", null, this.props.fieldLabel), React.createElement("div", {
                    className: "datetime-filter ".concat(this.state.datetimeRange && "show-range"),
                    ref: function ref(c) {
                        return _this6._$datetimeFilter = c
                    }
                }, React.createElement("div", {
                    className: "btn-group w-100"
                }, React.createElement("button", {
                    type: "button",
                    className: "btn btn-secondary ".concat(this.state.op4 === "TDA" && "active"),
                    "data-op": "TDA",
                    onClick: function onClick(e) {
                        return _this6._handleQuickOp(e)
                    }
                }, $L("今天")), React.createElement("button", {
                    type: "button",
                    className: "btn btn-secondary ".concat(this.state.op4 === "CUW" && "active"),
                    "data-op": "CUW",
                    onClick: function onClick(e) {
                        return _this6._handleQuickOp(e)
                    }
                }, $L("本周")), React.createElement("button", {
                    type: "button",
                    className: "btn btn-secondary ".concat(this.state.op4 === "CUM" && "active"),
                    "data-op": "CUM",
                    onClick: function onClick(e) {
                        return _this6._handleQuickOp(e)
                    }
                }, $L("本月")), React.createElement("button", {
                    type: "button",
                    className: "btn btn-secondary ".concat(this.state.op4 === "PUM" && "active"),
                    "data-op": "PUM",
                    onClick: function onClick(e) {
                        return _this6._handleQuickOp(e)
                    }
                }, $L("上月")), React.createElement("button", {
                    type: "button",
                    className: "btn btn-secondary ".concat(this.state.op4 === "CUY" && "active"),
                    "data-op": "CUY",
                    onClick: function onClick(e) {
                        return _this6._handleQuickOp(e)
                    }
                }, $L("本年")), React.createElement("button", {
                    type: "button",
                    className: "btn btn-secondary",
                    "data-op": "BW",
                    onClick: function onClick() {
                        _this6.setState({
                            op: "BW",
                            op4: null,
                            datetimeRange: true
                        }, function() {
                            $(_this6._$datetimeFilter).find("input:eq(0)")[0].focus()
                        })
                    }
                }, $L("自定"))), valComp))

            }
            
            return React.createElement(RF, null, React.createElement("label", null, this.props.fieldLabel), valComp)
            
            }
    }, {
        key: "_handleQuickOp",
        value: function _handleQuickOp(e) {
            var _this7 = this;
            var op4 = $(e.target).data("op");
            this.setState({
                op4: op4 === this.state.op4 ? null : op4
            }, function() {
                _this7.props.$$$parent.searchNow()
            })
        }
    }, {
        key: "valueCheck",
        value: function valueCheck(e) {
            var v = e.target ? e.target.value : e.val();
            if (!v)
                return;
            _get(_getPrototypeOf(FilterItem4Pane.prototype), "valueCheck", this).call(this, e)
        }
    }, {
        key: "clear",
        value: function clear() {
            var _this8 = this;
            this.setState({
                value: null,
                value2: null,
                hasError: false,
                op4: null,
                datetimeRange: null
            }, function() {
                if (_this8._filterVal && _this8._filterVal.tagName === "SELECT") {
                    $(_this8._filterVal).val(null).trigger("change")
                }
            })
        }
    }]);
    return FilterItem4Pane
}(FilterItem);
