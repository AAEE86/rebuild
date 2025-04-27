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
var wpc = window.__PageConfig;
var __lastPassVerifyFormula = null;
var ContentDataValidate = function(_ActionContentSpec) {
    _inherits(ContentDataValidate, _ActionContentSpec);
    var _super = _createSuper(ContentDataValidate);
    function ContentDataValidate(props) {
        var _this;
        _classCallCheck(this, ContentDataValidate);
        _this = _super.call(this, props);
        _this.state.type = 1;
        return _this
    }
    _createClass(ContentDataValidate, [{
        key: "render",
        value: function render() {
            var _this2 = this;
            var state = this.state || {};
            return React.createElement("div", {
                className: "data-validate"
            }, React.createElement("form", {
                className: "simple"
            }, React.createElement("div", {
                className: "form-group row"
            }, React.createElement("label", {
                className: "col-md-12 col-lg-3 col-form-label text-lg-right"
            }, $L("校验条件")), React.createElement("div", {
                className: "col-md-12 col-lg-8"
            }, React.createElement("div", {
                className: "mt-1"
            }, React.createElement("label", {
                className: "custom-control custom-control-sm custom-radio custom-control-inline mb-2"
            }, React.createElement("input", {
                className: "custom-control-input",
                name: "ftype",
                type: "radio",
                onChange: function onChange() {
                    return _this2.setState({
                        type: 1
                    })
                },
                checked: state.type === 1
            }), React.createElement("span", {
                className: "custom-control-label"
            }, $L("过滤条件"))), React.createElement("label", {
                className: "custom-control custom-control-sm custom-radio custom-control-inline mb-2"
            }, React.createElement("input", {
                className: "custom-control-input",
                name: "ftype",
                type: "radio",
                onChange: function onChange() {
                    _this2.setState({
                        type: 2
                    }, function() {
                        _this2._validateFormula.focus()
                    })
                },
                checked: state.type === 2
            }), React.createElement("span", {
                className: "custom-control-label"
            }, $L("高级表达式")))), React.createElement("div", {
                className: state.type === 1 ? "" : "hide"
            }, React.createElement("a", {
                className: "btn btn-sm btn-link pl-0 text-left J_filter1",
                onClick: function onClick() {
                    return _this2.dataAdvFilter()
                },
                style: {
                    marginTop: -5
                }
            }, this.state.dataFilterItems ? "".concat($L("已设置条件"), " (").concat(this.state.dataFilterItems, ")") : $L("点击设置"))), React.createElement("div", {
                className: state.type === 2 ? "" : "hide"
            }, React.createElement("div", {
                className: "mt-1 mb-1 J_filter2"
            }, React.createElement(EditorWithFieldVars, {
                entity: wpc.sourceEntity,
                ref: function ref(c) {
                    return _this2._validateFormula = c
                },
                placeholder: "## Support AviatorScript. Please provide a Boolean value",
                isCode: true
            }))), React.createElement("div", {
                className: "form-text mt-0"
            }, $L("符合校验条件的数据/记录在操作时会提示失败")))), React.createElement("div", {
                className: "form-group row"
            }, React.createElement("label", {
                className: "col-12 col-lg-3 col-form-label text-lg-right"
            }, $L("提示内容")), React.createElement("div", {
                className: "col-12 col-lg-8"
            }, React.createElement(EditorWithFieldVars, {
                entity: wpc.sourceEntity,
                ref: function ref(c) {
                    return _this2._content = c
                },
                placeholder: $L("数据校验未通过")
            }), React.createElement("p", {
                className: "form-text",
                dangerouslySetInnerHTML: {
                    __html: $L("失败时的提示内容。内容支持字段变量，如 `{createdOn}` (其中 createdOn 为源实体的字段内部标识)")
                }
            }))), React.createElement("div", {
                className: "form-group row"
            }, React.createElement("label", {
                className: "col-md-12 col-lg-3 col-form-label text-lg-right"
            }), React.createElement("div", {
                className: "col-md-12 col-lg-9"
            }, React.createElement("label", {
                className: "custom-control custom-control-sm custom-checkbox custom-control-inline mb-0"
            }, React.createElement("input", {
                className: "custom-control-input",
                type: "checkbox",
                ref: function ref(c) {
                    return _this2._$weakMode = c
                }
            }), React.createElement("span", {
                className: "custom-control-label"
            }, $L("弱校验模式")))))))
        }
    }, {
        key: "dataAdvFilter",
        value: function dataAdvFilter() {
            if (this._advFilter) {
                this._advFilter.show()
            } else {
                var that = this;
                renderRbcomp(React.createElement(AdvFilter, {
                    title: $L("校验条件"),
                    inModal: true,
                    canNoFilters: true,
                    entity: this.props.sourceEntity,
                    filter: that._advFilter__data,
                    confirm: function confirm(f) {
                        return that.saveAdvFilter(f)
                    }
                }), null, function() {
                    that._advFilter = this
                })
            }
        }
    }, {
        key: "saveAdvFilter",
        value: function saveAdvFilter(filter) {
            this._advFilter__data = filter;
            this.setState({
                dataFilterItems: filter && filter.items ? filter.items.length : 0
            })
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this3 = this;
            disableWhen(512);
            var content = this.props.content || {};
            if (content.validateFilter)
                this.saveAdvFilter(content.validateFilter);
            if (content.tipContent)
                this._content.val(content.tipContent);
            if (content.validateMode === 2) {
                this.setState({
                    type: 2
                }, function() {
                    if (content.validateFormula) {
                        _this3._validateFormula.val(content.validateFormula);
                        typeof window.bosskeyTrigger === "function" && window.bosskeyTrigger()
                    }
                })
            }
            if (content.weakMode) {
                $(this._$weakMode).parents(".bosskey-show").removeClass("bosskey-show");
                $(this._$weakMode).attr("checked", true)
            }
        }
    }, {
        key: "buildContent",
        value: function buildContent() {
            var _data = {
                validateFilter: this._advFilter__data,
                validateFormula: this._validateFormula.val(),
                tipContent: this._content.val(),
                version: 2,
                weakMode: $val(this._$weakMode),
                validateMode: this.state.type || 1
            };
            if (_data.validateMode === 2) {
                if (!_data.validateFormula) {
                    RbHighbar.create($L("请设置高级表达式"));
                    return false
                }
                if (__lastPassVerifyFormula !== _data.validateFormula) {
                    var formula = _data.validateFormula.replace(/\n/gi, "\\n");
                    $.post("/admin/robot/trigger/verify-formula?entity=".concat(this.props.sourceEntity), formula, function(res) {
                        var error;
                        if (res.error_code === 0) {
                            if (res.data === true || res.data === false) {} else {
                                error = $L("表达式返回了非布尔值，这会导致触发器执行错误。是否继续？")
                            }
                        } else {
                            error = React.createElement(RF, null, React.createElement("p", null, $L("表达式可能存在错误，这会导致触发器执行错误。是否继续？")), res.error_msg && React.createElement("pre", {
                                className: "text-danger p-2"
                            }, res.error_msg))
                        }
                        if (error) {
                            __lastPassVerifyFormula = null;
                            RbAlert.create(error, {
                                type: "warning",
                                onConfirm: function onConfirm() {
                                    this.hide();
                                    __lastPassVerifyFormula = _data.validateFormula;
                                    setTimeout(function() {
                                        return $(".J_save").trigger("click")
                                    }, 20)
                                }
                            })
                        } else {
                            __lastPassVerifyFormula = _data.validateFormula;
                            setTimeout(function() {
                                return $(".J_save").trigger("click")
                            }, 20)
                        }
                    });
                    return false
                }
            } else {
                if (!this.state.dataFilterItems) {
                    RbHighbar.create($L("请设置过滤条件"));
                    return false
                }
            }
            return _data
        }
    }]);
    return ContentDataValidate
}(ActionContentSpec);
renderContentComp = function renderContentComp(props) {
    renderRbcomp(React.createElement(ContentDataValidate, props), "react-content", function() {
        contentComp = this
    })
}
;
LastLogsViewer.renderLog = null;
window.useExecManual = function() {
    $(".J_save").next().remove()
}
;
