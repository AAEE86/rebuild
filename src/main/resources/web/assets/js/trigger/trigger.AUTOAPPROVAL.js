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
var ContentAutoApproval = function(_ActionContentSpec) {
    _inherits(ContentAutoApproval, _ActionContentSpec);
    var _super = _createSuper(ContentAutoApproval);
    function ContentAutoApproval(props) {
        var _this;
        _classCallCheck(this, ContentAutoApproval);
        _this = _super.call(this, props);
        _this.state.useMode = 1;
        return _this
    }
    _createClass(ContentAutoApproval, [{
        key: "render",
        value: function render() {
            var _this2 = this;
            return React.createElement("div", {
                className: "auto-approval"
            }, React.createElement("form", {
                className: "simple"
            }, React.createElement("div", {
                className: "form-group row pt-1"
            }, React.createElement("label", {
                className: "col-12 col-lg-3 col-form-label text-lg-right"
            }, $L("审批模式")), React.createElement("div", {
                className: "col-12 col-lg-8"
            }, React.createElement("select", {
                className: "form-control form-control-sm",
                ref: function ref(c) {
                    return _this2._$useMode = c
                }
            }, React.createElement("optgroup", {
                label: $L("未提交记录")
            }, React.createElement("option", {
                value: "1"
            }, $L("直接通过")), React.createElement("option", {
                value: "2"
            }, $L("仅提交"))), React.createElement("optgroup", {
                label: $L("审批中记录")
            }, React.createElement("option", {
                value: "11"
            }, $L("通过")), React.createElement("option", {
                value: "12"
            }, $L("驳回")), React.createElement("option", {
                value: "13"
            }, $L("退回至上一步"))), React.createElement("optgroup", {
                label: $L("已通过记录")
            }, React.createElement("option", {
                value: "21"
            }, $L("撤销")))), React.createElement("p", {
                className: "form-text"
            }, WrapHtml($L("针对不同的记录审批状态，可选择不同的审批模式"))))), React.createElement("div", {
                className: "form-group row pt-2 ".concat(this.state.useMode <= 2 ? "" : "hide")
            }, React.createElement("label", {
                className: "col-12 col-lg-3 col-form-label text-lg-right"
            }, $L("使用审批流程")), React.createElement("div", {
                className: "col-12 col-lg-8"
            }, React.createElement("select", {
                className: "form-control form-control-sm",
                ref: function ref(c) {
                    return _this2._$useApproval = c
                }
            }, React.createElement("option", {
                value: ""
            }, $L("不使用")), (this.state.approvalList || []).map(function(item) {
                return React.createElement("option", {
                    key: item.id,
                    value: item.id
                }, item.text || "@".concat(item.id.toUpperCase()))
            })), React.createElement("p", {
                className: "form-text"
            }, WrapHtml($L("需要先添加 [审批流程](../approvals) 才能在此处选择"))))), React.createElement("div", {
                className: "form-group row pt-2 ".concat(this.state.useMode === 21 ? "" : "hide")
            }, React.createElement("label", {
                className: "col-12 col-lg-3 col-form-label text-lg-right"
            }, $L("撤销哪些记录")), React.createElement("div", {
                className: "col-12 col-lg-8"
            }, React.createElement("select", {
                className: "form-control form-control-sm",
                ref: function ref(c) {
                    return _this2._$revokeFields = c
                },
                multiple: true
            }, (this.state.revokeFields || []).map(function(item) {
                return React.createElement("option", {
                    key: item[0],
                    value: item[0]
                }, item[1])
            })), React.createElement("p", {
                className: "form-text"
            }, $L("可撤销源实体记录或其关联记录"))))))
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this3 = this;
            disableWhen(2, 16, 32, 64, 128, 256, 1024, 2048);
            $(this._$useMode).select2({}).on("change", function(e) {
                return _this3.setState({
                    useMode: ~~e.target.value
                })
            });
            var content = this.props.content || {};
            $.get("/admin/robot/trigger/auto-approval-alist?entity=".concat(this.props.sourceEntity), function(res) {
                _this3.setState({
                    approvalList: res.data || []
                }, function() {
                    $(_this3._$useApproval).select2({
                        placeholder: $L("无"),
                        allowClear: true
                    });
                    if (content.submitMode)
                        content.useMode = 2;
                    if (content.useMode)
                        $(_this3._$useMode).val(content.useMode).trigger("change");
                    if (content.useApproval) {
                        $(_this3._$useApproval).val(content.useApproval).trigger("change");
                        var exist38 = _this3.state.approvalList.find(function(x) {
                            return x.id === content.useApproval
                        });
                        if (!exist38) {
                            var o = new Option("[DELETED]",content.useApproval,true,true);
                            $(_this3._$useApproval).append(o)
                        }
                    }
                    $.get("/admin/trigger/auto-revoke-fields?entity=".concat(_this3.props.sourceEntity), function(res) {
                        _this3.setState({
                            revokeFields: res.data || []
                        }, function() {
                            $(_this3._$revokeFields).select2({
                                placeholder: $L("选择"),
                                templateResult: function templateResult(res) {
                                    var text = res.text.split(" (N)");
                                    var $span = $("<span></span>").text(text[0]);
                                    if (text.length > 1)
                                        $("<span class=\"badge badge-default badge-pill\">N</span>").appendTo($span);
                                    return $span
                                }
                            });
                            $(_this3._$revokeFields).val(content.revokeFields || []).trigger("change")
                        })
                    })
                })
            })
        }
    }, {
        key: "buildContent",
        value: function buildContent() {
            var s = {
                useMode: this.state.useMode,
                useApproval: $val(this._$useApproval) || null,
                revokeFields: $(this._$revokeFields).val() || []
            };
            if (s.useMode === 2 && !s.useApproval) {
                RbHighbar.create($L("审批模式为“仅提交”时需要使用审批流程"));
                return false
            } else if (s.useMode === 21 && (!s.revokeFields || s.revokeFields.length === 0)) {
                RbHighbar.create($L("请选择撤销哪些记录"));
                return false
            } else {
                return s
            }
        }
    }]);
    return ContentAutoApproval
}(ActionContentSpec);
renderContentComp = function renderContentComp(props) {
    renderRbcomp(React.createElement(ContentAutoApproval, props), "react-content", function() {
        contentComp = this;
        $(this._$useMode).find("option").each(function() {
            MODE_NAMES[this.value] = this.text
        })
    })
}
;
var MODE_NAMES = {};
LastLogsViewer.renderLog = function(L) {
    return L.level === 1 ? React.createElement("div", {
        className: "v36-logdesc"
    }, MODE_NAMES[L.message] || $L("审批记录"), L.affected.map(function(a, idx) {
        return React.createElement("a", {
            key: idx,
            className: "badge text-id ml-1",
            href: "".concat(rb.baseUrl, "/app/redirect?id=").concat(a, "&type=newtab"),
            target: "_blank"
        }, a)
    })) : false
}
;
