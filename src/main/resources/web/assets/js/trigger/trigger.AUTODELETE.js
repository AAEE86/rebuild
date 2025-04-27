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
var ContentAutoDelete = function(_ActionContentSpec) {
    _inherits(ContentAutoDelete, _ActionContentSpec);
    var _super = _createSuper(ContentAutoDelete);
    function ContentAutoDelete() {
        _classCallCheck(this, ContentAutoDelete);
        return _super.apply(this, arguments)
    }
    _createClass(ContentAutoDelete, [{
        key: "render",
        value: function render() {
            var _this = this;
            return React.createElement("div", {
                className: "auto-delete"
            }, React.createElement("form", {
                className: "simple"
            }, React.createElement("div", {
                className: "form-group row"
            }, React.createElement("label", {
                className: "col-12 col-lg-3 col-form-label text-lg-right"
            }, $L("删除哪些记录")), React.createElement("div", {
                className: "col-12 col-lg-8"
            }, React.createElement("select", {
                className: "form-control form-control-sm",
                ref: function ref(c) {
                    return _this._$useFields = c
                },
                multiple: true
            }, (this.state.fields || []).map(function(item) {
                return React.createElement("option", {
                    key: item[0],
                    value: item[0]
                }, item[1])
            })), React.createElement("p", {
                className: "form-text"
            }, $L("可删除源实体记录或其关联记录")), this.state.recyclebin === false && React.createElement(RbAlertBox, {
                message: $L("必须启用回收站才能使用此功能"),
                className: "mt-3 mb-0"
            })))))
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;
            var content = this.props.content || {};
            $.get("/admin/trigger/auto-delete-fields?entity=".concat(this.props.sourceEntity), function(res) {
                _this2.setState({
                    fields: res.data || []
                }, function() {
                    var $s2 = $(_this2._$useFields).select2({
                        placeholder: $L("选择"),
                        allowClear: true,
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
            });
            $.get("/admin/trigger/auto-delete-recyclebin", function(res) {
                _this2.setState({
                    recyclebin: res.data
                });
                if (res.data === false) {
                    $(_this2._$useFields).attr("disabled", true)
                }
            })
        }
    }, {
        key: "buildContent",
        value: function buildContent() {
            var _data = {
                fields: $(this._$useFields).val()
            };
            if ((_data.fields || []).length === 0) {
                RbHighbar.create($L("请选择删除哪些记录"));
                return false
            }
            return _data
        }
    }]);
    return ContentAutoDelete
}(ActionContentSpec);
renderContentComp = function renderContentComp(props) {
    renderRbcomp(React.createElement(ContentAutoDelete, props), "react-content", function() {
        contentComp = this
    })
}
;
LastLogsViewer.renderLog = function(L) {
    return L.level === 1 && L.affected ? React.createElement("div", {
        className: "v36-logdesc"
    }, $L("删除记录"), L.affected.map(function(a, idx) {
        return React.createElement("a", {
            key: idx,
            className: "badge text-id ml-1",
            href: "".concat(rb.baseUrl, "/app/redirect?id=").concat(a, "&type=newtab"),
            target: "_blank"
        }, a)
    })) : false
}
;
