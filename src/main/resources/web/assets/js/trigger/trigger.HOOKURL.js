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
var ContentHookUrl = function(_ActionContentSpec) {
    _inherits(ContentHookUrl, _ActionContentSpec);
    var _super = _createSuper(ContentHookUrl);
    function ContentHookUrl() {
        _classCallCheck(this, ContentHookUrl);
        return _super.apply(this, arguments)
    }
    _createClass(ContentHookUrl, [{
        key: "render",
        value: function render() {
            var _this = this;
            return React.createElement("div", {
                className: "hook-url"
            }, React.createElement("form", {
                className: "simple"
            }, React.createElement("div", {
                className: "form-group row"
            }, React.createElement("label", {
                className: "col-12 col-lg-3 col-form-label text-lg-right"
            }, $L("推送到"), " (URL)"), React.createElement("div", {
                className: "col-12 col-lg-8"
            }, React.createElement("input", {
                type: "input",
                className: "form-control form-control-sm",
                placeholder: "https://example.com/postreceive",
                ref: function ref(c) {
                    return _this._$hookUrl = c
                }
            }))), React.createElement("div", {
                className: "form-group row"
            }, React.createElement("label", {
                className: "col-12 col-lg-3 col-form-label text-lg-right"
            }, $L("安全码")), React.createElement("div", {
                className: "col-12 col-lg-8"
            }, React.createElement("input", {
                type: "input",
                className: "form-control form-control-sm",
                placeholder: $L("(选填)"),
                ref: function ref(c) {
                    return _this._$hookSecret = c
                }
            }), React.createElement("p", {
                className: "form-text",
                dangerouslySetInnerHTML: {
                    __html: $L("填写后，系统在调用时会携带在请求头 Header 中，Header 名称为 `X-RBHOOK-SECRET`")
                }
            }))), React.createElement("div", {
                className: "form-group row"
            }, React.createElement("label", {
                className: "col-12 col-lg-3 col-form-label text-lg-right"
            }), React.createElement("div", {
                className: "col-12 col-lg-8"
            }, React.createElement("label", {
                className: "custom-control custom-control-sm custom-checkbox custom-control-inline mb-0"
            }, React.createElement("input", {
                className: "custom-control-input",
                type: "checkbox",
                ref: function ref(c) {
                    return _this._$forceSync = c
                }
            }), React.createElement("span", {
                className: "custom-control-label"
            }, $L("校验返回结果"))), React.createElement("p", {
                className: "form-text",
                dangerouslySetInnerHTML: {
                    __html: $L("启用后调用返回结果必须为 `SUCCESS`，否则将视为调用失败")
                }
            }))), React.createElement("div", {
                className: "form-group row"
            }, React.createElement("label", {
                className: "col-12 col-lg-3 col-form-label text-lg-right"
            }), React.createElement("div", {
                className: "col-12 col-lg-8"
            }, React.createElement("label", {
                className: "custom-control custom-control-sm custom-checkbox custom-control-inline mb-0"
            }, React.createElement("input", {
                className: "custom-control-input",
                type: "checkbox",
                ref: function ref(c) {
                    return _this._$pushAllData = c
                }
            }), React.createElement("span", {
                className: "custom-control-label"
            }, $L("推送全量数据"))), React.createElement("p", {
                className: "form-text",
                dangerouslySetInnerHTML: {
                    __html: $L("启用后会推送全部字段/数据（包括明细实体），否则将仅推送修改的字段/数据")
                }
            }))), React.createElement("div", {
                className: "form-group row"
            }, React.createElement("label", {
                className: "col-12 col-lg-3 col-form-label text-lg-right"
            }), React.createElement("div", {
                className: "col-12 col-lg-8"
            }, React.createElement("button", {
                type: "button",
                className: "btn btn-primary btn-outline",
                ref: function ref(c) {
                    return _this._btn = c
                },
                onClick: function onClick() {
                    return _this._test()
                },
                "data-spinner": "border"
            }, $L("推送测试")), this.state.testResult && React.createElement("div", {
                className: "code-panel mt-3 rounded"
            }, this.state.testResult)))))
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            var content = this.props.content;
            if (content) {
                if (content.hookUrl)
                    $(this._$hookUrl).val(content.hookUrl);
                if (content.hookSecret)
                    $(this._$hookSecret).val(content.hookSecret);
                if (content.forceSync)
                    $(this._$forceSync).attr("checked", true);
                if (content.pushAllData)
                    $(this._$pushAllData).attr("checked", true)
            }
        }
    }, {
        key: "buildContent",
        value: function buildContent() {
            var _data = {
                hookUrl: $(this._$hookUrl).val(),
                hookSecret: $(this._$hookSecret).val(),
                forceSync: $val(this._$forceSync),
                pushAllData: $val(this._$pushAllData)
            };
            if (!_data.hookUrl) {
                RbHighbar.create($L("请输入回调 URL"));
                return false
            }
            if (!$regex.isUrl(_data.hookUrl)) {
                RbHighbar.create($L("无效回调 URL"));
                return false
            }
            return _data
        }
    }, {
        key: "_test",
        value: function _test() {
            var _this2 = this;
            var data = this.buildContent();
            if (!data)
                return;
            this.setState({
                testResult: null
            });
            var $btn = $(this._btn).button("loading");
            $.post("/admin/robot/trigger/hookurl-test", JSON.stringify(data), function(res) {
                if (res.error_code === 0) {
                    var result = React.createElement("div", {
                        className: "code"
                    }, React.createElement("div", null, "STATUS : ", res.data.code), React.createElement("div", null, "MESSAGE :"), React.createElement("pre", {
                        className: "p-0 m-0"
                    }, res.data.message || React.createElement("em", {
                        className: "text-muted"
                    }, "<EMPTY>")));
                    _this2.setState({
                        testResult: result
                    })
                } else {
                    _this2.setState({
                        testResult: React.createElement("div", {
                            className: "code"
                        }, res.error_msg)
                    })
                }
                $btn.button("reset")
            })
        }
    }]);
    return ContentHookUrl
}(ActionContentSpec);
renderContentComp = function renderContentComp(props) {
    renderRbcomp(React.createElement(ContentHookUrl, props), "react-content", function() {
        contentComp = this
    })
}
;
LastLogsViewer.renderLog = function(L) {
    var id = L.affected || [];
    var error = L.error ? JSON.stringify(L.error) : null;
    return L.level === 1 && id ? React.createElement(RF, null, React.createElement("div", {
        className: "v36-logdesc"
    }, $L("推送记录"), React.createElement("a", {
        className: "badge text-id",
        href: "".concat(rb.baseUrl, "/app/redirect?id=").concat(id[0], "&type=newtab"),
        target: "_blank"
    }, id[0])), L.message && React.createElement("dl", {
        className: "m-0"
    }, React.createElement("dt", {
        className: "mt-1 font-weight-normal"
    }, React.createElement("a", {
        className: "hover-opacity",
        onClick: function onClick(e) {
            $(e.currentTarget).find("i.mdi").toggleClass("mdi-chevron-double-up");
            $(e.currentTarget).parent().next().toggleClass("hide")
        }
    }, $L("技术细节"), React.createElement("i", {
        className: "mdi mdi-chevron-double-down"
    }))), React.createElement("dd", {
        className: "mb-0 hide"
    }, React.createElement("blockquote", {
        className: "tech-details code"
    }, L.message)))) : React.createElement("p", {
        className: "".concat(error || L.level === 3 ? "text-danger" : "text-muted")
    }, error || L.message || "N")
}
;
