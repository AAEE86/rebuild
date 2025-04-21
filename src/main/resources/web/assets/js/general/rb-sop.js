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
var SopProcessor = function(_React$Component) {
    _inherits(SopProcessor, _React$Component);
    var _super = _createSuper(SopProcessor);
    function SopProcessor(props) {
        var _this;
        _classCallCheck(this, SopProcessor);
        _this = _super.call(this, props);
        _this.state = _objectSpread({}, props);
        return _this
    }
    _createClass(SopProcessor, [{
        key: "render",
        value: function render() {
            var _this2 = this;
            if ((this.state.steps || []).length === 0)
                return null;
            return React.createElement("div", {
                className: "sop-toolbar-wrap"
            }, React.createElement("div", {
                className: "sop-toolbar",
                ref: function ref(c) {
                    return _this2._$scroll = c
                }
            }, React.createElement("ol", {
                className: "sop-steps list-unstyled",
                ref: function ref(c) {
                    return _this2._$nodes = c
                }
            }, this.state.steps.map(function(item, idx) {
                var achievedTip = item.state === 2 ? $L("由 %s 于 %s 完成", item.achievedUser, item.achievedTime) : null;
                if (achievedTip && item.achievedContent)
                    achievedTip += "<br/>" + item.achievedContent;
                return React.createElement("li", {
                    className: "state-".concat(item.state || 0),
                    key: idx
                }, React.createElement("div", null, React.createElement("span", {
                    title: achievedTip,
                    onClick: function onClick() {
                        if (item.state !== 2)
                            return;
                        if (item.siblings) {
                            renderRbcomp(React.createElement(ViewSiblings, {
                                data: item.siblings
                            }))
                        } else if (item.relatedRecord) {
                            RbViewPage.clickView("#!/View/".concat(item.relatedRecord.entity, "/").concat(item.relatedRecord.id))
                        } else {
                            RbHighbar.createl("相关记录已经不存在")
                        }
                    }
                }, idx + 1, React.createElement("i", {
                    className: "mdi ".concat(item.state === 2 ? "mdi-check" : item.state === 1 ? "" : "")
                }), item.siblings && item.siblings.length > 1 && React.createElement("em", null, item.siblings.length)), React.createElement("p", null, item.name), window.__LAB_SHOWSOPTIP2 && React.createElement("div", {
                    className: "tip-content"
                }, WrapHtml(achievedTip))))
            }))))
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this3 = this;
            $.get("/app/entity/extras/sop-status?id=".concat(this.props.id), function(res) {
                if (res.error_code === 0) {
                    _this3.setState({
                        steps: res.data || null
                    }, function() {
                        $(_this3._$nodes).find("li>div>span").tooltip({
                            html: true
                        });
                        $(_this3._$scroll).perfectScrollbar({})
                    })
                } else {
                    RbHighbar.error(res.error_msg)
                }
            })
        }
    }]);
    return SopProcessor
}(React.Component);
var ViewSiblings = function(_RbAlert) {
    _inherits(ViewSiblings, _RbAlert);
    var _super2 = _createSuper(ViewSiblings);
    function ViewSiblings() {
        _classCallCheck(this, ViewSiblings);
        return _super2.apply(this, arguments)
    }
    _createClass(ViewSiblings, [{
        key: "renderContent",
        value: function renderContent() {
            return React.createElement("div", null, React.createElement("table", {
                className: "table table-hover mb-0 sop-table"
            }, React.createElement("tbody", null, this.props.data.map(function(item, idx) {
                return React.createElement("tr", {
                    key: idx
                }, React.createElement("td", null, React.createElement("div", {
                    style: {
                        minWidth: 180
                    }
                }, React.createElement("a", {
                    href: "###",
                    title: $L("打开"),
                    onClick: function onClick(e) {
                        $stopEvent(e, true);
                        item.relatedRecord && RbViewPage.clickView("#!/View/".concat(item.relatedRecord.entity, "/").concat(item.relatedRecord.id))
                    }
                }, item.relatedRecord ? item.relatedRecord.text : "[DELETED]"))), React.createElement("td", {
                    className: "text-muted"
                }, React.createElement("div", null, $L("由 %s 于 %s 完成", item.achievedUser, item.achievedTime)), item.achievedContent && React.createElement("p", {
                    className: "blockquote"
                }, item.achievedContent)))
            }))))
        }
    }]);
    return ViewSiblings
}(RbAlert);
