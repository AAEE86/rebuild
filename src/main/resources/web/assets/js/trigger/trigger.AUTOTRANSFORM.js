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
var ContentAutoTransform = function(_ActionContentSpec) {
    _inherits(ContentAutoTransform, _ActionContentSpec);
    var _super = _createSuper(ContentAutoTransform);
    function ContentAutoTransform() {
        _classCallCheck(this, ContentAutoTransform);
        return _super.apply(this, arguments)
    }
    _createClass(ContentAutoTransform, [{
        key: "render",
        value: function render() {
            var _this = this;
            return React.createElement("div", {
                className: "auto-transform"
            }, React.createElement("form", {
                className: "simple"
            }, React.createElement("div", {
                className: "form-group row"
            }, React.createElement("label", {
                className: "col-12 col-lg-3 col-form-label text-lg-right"
            }, $L("使用记录转换")), React.createElement("div", {
                className: "col-12 col-lg-8"
            }, React.createElement("select", {
                className: "form-control form-control-sm",
                ref: function ref(c) {
                    return _this._$useTransform = c
                }
            }, (this.state.transformList || []).map(function(item) {
                return React.createElement("option", {
                    key: item.id,
                    value: item.id
                }, item.text || "@".concat(item.id.toUpperCase()))
            })), React.createElement("p", {
                className: "form-text"
            }, WrapHtml($L("需要先添加 [记录转换](../transforms) 才能在此处选择"))))), React.createElement("div", {
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
                    return _this._$transformOnce = c
                }
            }), React.createElement("span", {
                className: "custom-control-label"
            }, $L("只转换一次"), React.createElement("i", {
                className: "zmdi zmdi-help zicon down-1",
                "data-toggle": "tooltip",
                title: $L("转换后即使符合条件也不再转换")
            }))), React.createElement("div", {
                className: "mt-2"
            }, React.createElement("label", {
                className: "custom-control custom-control-sm custom-checkbox custom-control-inline mb-0"
            }, React.createElement("input", {
                className: "custom-control-input",
                type: "checkbox",
                ref: function ref(c) {
                    return _this._$followingUpdate = c
                },
                onClick: function onClick(e) {
                    return _this._effectTransformOnce(e.target)
                }
            }), React.createElement("span", {
                className: "custom-control-label"
            }, $L("更新时保持同步"), React.createElement("i", {
                className: "zmdi zmdi-help zicon down-1",
                "data-toggle": "tooltip",
                title: $L("仅当启用“更新时”可用")
            }))))))))
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;
            disableWhen(2);
            var content = this.props.content || {};
            $.get("/admin/trigger/auto-transform-alist?entity=".concat(this.props.sourceEntity), function(res) {
                _this2.setState({
                    transformList: res.data || []
                }, function() {
                    $(_this2._$useTransform).select2({
                        placeholder: $L("无"),
                        allowClear: false
                    });
                    if (content.useTransform) {
                        $(_this2._$useTransform).val(content.useTransform).trigger("change");
                        if ($isTrue(content.transformOnce))
                            _this2._$transformOnce.checked = true;
                        if ($isTrue(content.followingUpdate)) {
                            _this2._$followingUpdate.checked = true;
                            _this2._effectTransformOnce(_this2._$followingUpdate);
                            if ((window.wpc && window.wpc.when & 4) === 0)
                                $("label.when-update input")[0].checked = false
                        }
                        var exist38 = _this2.state.transformList.find(function(x) {
                            return x.id === content.useTransform
                        });
                        if (!exist38) {
                            var o = new Option("[DELETED]",content.useTransform,true,true);
                            $(_this2._$useTransform).append(o)
                        }
                    }
                })
            })
        }
    }, {
        key: "_effectTransformOnce",
        value: function _effectTransformOnce(el) {
            if (el.checked) {
                this._$transformOnce.checked = true;
                this._$transformOnce.disabled = true;
                $("label.when-update input")[0].checked = true
            } else {
                this._$transformOnce.disabled = false
            }
        }
    }, {
        key: "buildContent",
        value: function buildContent() {
            var _data = {
                useTransform: $(this._$useTransform).val(),
                transformOnce: $val(this._$transformOnce),
                followingUpdate: $val(this._$followingUpdate)
            };
            if (!_data.useTransform) {
                RbHighbar.create($L("请选择使用记录转换"));
                return false
            }
            return _data
        }
    }]);
    return ContentAutoTransform
}(ActionContentSpec);
renderContentComp = function renderContentComp(props) {
    renderRbcomp(React.createElement(ContentAutoTransform, props), "react-content", function() {
        contentComp = this;
        $("#react-content [data-toggle=\"tooltip\"]").tooltip()
    })
}
;
LastLogsViewer.renderLog = function(L) {
    return L.level === 1 && L.affected ? React.createElement("div", {
        className: "v36-logdesc"
    }, _typeName(L.message), React.createElement(RF, null, React.createElement("a", {
        className: "badge text-id",
        href: "".concat(rb.baseUrl, "/app/redirect?id=").concat(L.affected[0], "&type=newtab"),
        target: "_blank"
    }, L.affected[0]), L.affected[1] && React.createElement(RF, null, React.createElement("i", {
        className: "mdi mdi-transfer-left text-muted down-1 ml-1 mr-1"
    }), React.createElement("a", {
        className: "badge text-id",
        href: "".concat(rb.baseUrl, "/app/redirect?id=").concat(L.affected[1], "&type=newtab"),
        target: "_blank"
    }, L.affected[1])))) : false
}
;
function _typeName(m) {
    if (m === "FollowingUpdate")
        return $L("更新同步");
    return $L("转换记录")
}
