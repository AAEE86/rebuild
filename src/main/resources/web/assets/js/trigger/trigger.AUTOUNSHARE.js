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
var ContentAutoUnShare = function(_ActionContentSpec) {
    _inherits(ContentAutoUnShare, _ActionContentSpec);
    var _super = _createSuper(ContentAutoUnShare);
    function ContentAutoUnShare() {
        var _this;
        _classCallCheck(this, ContentAutoUnShare);
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key]
        }
        _this = _super.call.apply(_super, [this].concat(args));
        _defineProperty(_assertThisInitialized(_this), "state", _objectSpread({}, _this.props));
        return _this
    }
    _createClass(ContentAutoUnShare, [{
        key: "render",
        value: function render() {
            var _this2 = this;
            return React.createElement("div", {
                className: "auto-share"
            }, React.createElement("form", {
                className: "simple"
            }, React.createElement("div", {
                className: "form-group row"
            }, React.createElement("label", {
                className: "col-12 col-lg-3 col-form-label text-lg-right"
            }, $L("取消哪些记录")), React.createElement("div", {
                className: "col-12 col-lg-8"
            }, React.createElement("select", {
                className: "form-control form-control-sm",
                ref: function ref(c) {
                    return _this2._$useFields = c
                },
                multiple: true
            }, (this.state.fields || []).map(function(item) {
                return React.createElement("option", {
                    key: item[0],
                    value: item[0]
                }, item[1])
            })), React.createElement("p", {
                className: "form-text"
            }, $L("可取消共享源实体记录或其关联记录")))), React.createElement("div", {
                className: "form-group row"
            }, React.createElement("label", {
                className: "col-12 col-lg-3 col-form-label text-lg-right"
            }, $L("取消哪些用户")), React.createElement("div", {
                className: "col-12 col-lg-8"
            }, React.createElement(UserSelectorWithField, {
                ref: function ref(c) {
                    return _this2._UserSelector = c
                }
            }), React.createElement("p", {
                className: "form-text"
            }, $L("不选择则取消所有用户的"))))))
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this3 = this;
            disableWhen(2, 32, 64);
            var content = this.props.content || {};
            if (content.unshareTo) {
                $.post("/commons/search/user-selector?entity=".concat(this.props.sourceEntity), JSON.stringify(content.unshareTo), function(res) {
                    if (res.error_code === 0 && res.data.length > 0)
                        _this3._UserSelector.setState({
                            selected: res.data
                        })
                })
            }
            $.get("/admin/trigger/auto-unshare-fields?entity=".concat(this.props.sourceEntity), function(res) {
                _this3.setState({
                    fields: res.data || []
                }, function() {
                    var $s2 = $(_this3._$useFields).select2({
                        placeholder: $L("选择"),
                        templateResult: function templateResult(res) {
                            var text = res.text.split(" (N)");
                            var $span = $("<span></span>").text(text[0]);
                            if (text.length > 1)
                                $("<span class=\"badge badge-default badge-pill\">N</span>").appendTo($span);
                            return $span
                        }
                    });
                    if (content.fields) {
                        $s2.val(content.fields).trigger("change")
                    }
                })
            })
        }
    }, {
        key: "buildContent",
        value: function buildContent() {
            var _data = {
                unshareTo: this._UserSelector.getSelected(),
                fields: $(this._$useFields).val()
            };
            if ((_data.fields || []).length === 0) {
                RbHighbar.create($L("请选择取消哪些记录"));
                return false
            }
            return _data
        }
    }]);
    return ContentAutoUnShare
}(ActionContentSpec);
renderContentComp = function renderContentComp(props) {
    renderRbcomp(React.createElement(ContentAutoUnShare, props), "react-content", function() {
        contentComp = this
    });
    LastLogsViewer._Title = $L("取消共享记录")
}
;
