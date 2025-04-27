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
var ContentCreateFeed = function(_ActionContentSpec) {
    _inherits(ContentCreateFeed, _ActionContentSpec);
    var _super = _createSuper(ContentCreateFeed);
    function ContentCreateFeed() {
        _classCallCheck(this, ContentCreateFeed);
        return _super.apply(this, arguments)
    }
    _createClass(ContentCreateFeed, [{
        key: "render",
        value: function render() {
            var _this = this;
            var _feedType = this.state.feedType || 2;
            return React.createElement("div", {
                className: "create-feed"
            }, React.createElement("form", {
                className: "simple"
            }, React.createElement("div", {
                className: "form-group row pb-1"
            }, React.createElement("label", {
                className: "col-12 col-lg-3 col-form-label text-lg-right"
            }, $L("类型")), React.createElement("div", {
                className: "col-12 col-lg-8 pt-1"
            }, React.createElement("label", {
                className: "custom-control custom-control-sm custom-radio custom-control-inline mb-1"
            }, React.createElement("input", {
                className: "custom-control-input",
                name: "utype",
                type: "radio",
                onChange: function onChange() {
                    return _this.setState({
                        feedType: 2
                    })
                },
                checked: _feedType === 2
            }), React.createElement("span", {
                className: "custom-control-label"
            }, $L("跟进"))), React.createElement("label", {
                className: "custom-control custom-control-sm custom-radio custom-control-inline mb-1"
            }, React.createElement("input", {
                className: "custom-control-input",
                name: "utype",
                type: "radio",
                onChange: function onChange() {
                    return _this.setState({
                        feedType: 4
                    })
                },
                checked: _feedType === 4
            }), React.createElement("span", {
                className: "custom-control-label"
            }, $L("日程"))))), React.createElement("div", {
                className: "form-group row"
            }, React.createElement("label", {
                className: "col-12 col-lg-3 col-form-label text-lg-right"
            }, $L("内容")), React.createElement("div", {
                className: "col-12 col-lg-8"
            }, React.createElement(EditorWithFieldVars, {
                entity: wpc.sourceEntity,
                ref: function ref(c) {
                    return _this._content = c
                }
            }), React.createElement("p", {
                className: "form-text",
                dangerouslySetInnerHTML: {
                    __html: $L("内容支持字段变量，字段变量如 `{createdOn}` (其中 createdOn 为源实体的字段内部标识)")
                }
            }))), React.createElement("div", {
                className: _feedType !== 4 ? "hide" : ""
            }, React.createElement("div", {
                className: "form-group row"
            }, React.createElement("label", {
                className: "col-12 col-lg-3 col-form-label text-lg-right"
            }, $L("日程时间")), React.createElement("div", {
                className: "col-12 col-lg-8"
            }, React.createElement("div", {
                style: {
                    width: 292
                }
            }, React.createElement("select", {
                className: "form-control form-control-sm",
                ref: function ref(c) {
                    return _this._$scheduleTime = c
                }
            }, React.createElement("option", {
                value: ""
            }, $L("默认")), this.state.dateFields && this.state.dateFields.map(function(item) {
                return React.createElement("option", {
                    key: item.name,
                    value: item.name
                }, item.label)
            }))))), React.createElement("div", {
                className: "form-group row"
            }, React.createElement("label", {
                className: "col-12 col-lg-3 col-form-label text-lg-right"
            }, $L("发送提醒")), React.createElement("div", {
                className: "col-12 col-lg-8",
                style: {
                    paddingTop: 4
                },
                ref: function ref(c) {
                    return _this._$scheduleRemind = c
                }
            }, React.createElement("label", {
                className: "custom-control custom-checkbox custom-control-inline mb-1"
            }, React.createElement("input", {
                className: "custom-control-input",
                name: "remindOn",
                type: "checkbox",
                value: "1"
            }), React.createElement("span", {
                className: "custom-control-label"
            }, $L("通知"))), React.createElement("label", {
                className: "custom-control custom-checkbox custom-control-inline mb-1"
            }, React.createElement("input", {
                className: "custom-control-input",
                name: "remindOn",
                type: "checkbox",
                value: "2"
            }), React.createElement("span", {
                className: "custom-control-label"
            }, $L("邮件"))), React.createElement("label", {
                className: "custom-control custom-checkbox custom-control-inline mb-1"
            }, React.createElement("input", {
                className: "custom-control-input",
                name: "remindOn",
                type: "checkbox",
                value: "4"
            }), React.createElement("span", {
                className: "custom-control-label"
            }, $L("短信")))))), React.createElement("div", {
                className: "form-group row"
            }, React.createElement("label", {
                className: "col-12 col-lg-3 col-form-label text-lg-right"
            }, $L("关联记录")), React.createElement("div", {
                className: "col-12 col-lg-8"
            }, React.createElement("div", {
                style: {
                    width: 292
                }
            }, React.createElement("select", {
                className: "form-control form-control-sm",
                ref: function ref(c) {
                    return _this._$relatedRecord = c
                }
            }, React.createElement("option", {
                value: ""
            }, $L("默认")), this.state.refsFields && this.state.refsFields.map(function(item) {
                return React.createElement("option", {
                    key: item.name,
                    value: item.name
                }, item.label)
            }))))), React.createElement("div", {
                className: "form-group row"
            }, React.createElement("label", {
                className: "col-12 col-lg-3 col-form-label text-lg-right"
            }, $L("发布用户")), React.createElement("div", {
                className: "col-12 col-lg-8"
            }, React.createElement("div", {
                style: {
                    width: 292
                }
            }, React.createElement("select", {
                className: "form-control form-control-sm",
                ref: function ref(c) {
                    return _this._$postUser = c
                }
            }, React.createElement("option", {
                value: ""
            }, $L("默认")), this.state.userFields && this.state.userFields.map(function(item) {
                return React.createElement("option", {
                    key: item.name,
                    value: item.name
                }, item.label)
            })))))))
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;
            var content = this.props.content || {};
            $.get("/commons/metadata/fields?deep=3&entity=".concat(wpc.sourceEntity), function(res) {
                var dateFs = (res.data || []).filter(function(x) {
                    return ["DATE", "DATETIME"].includes(x.type)
                });
                var userFs = (res.data || []).filter(function(x) {
                    return x.type === "REFERENCE" && x.ref[0] === "User"
                });
                var refsFs = (res.data || []).filter(function(x) {
                    return x.type === "REFERENCE" && !["RobotApprovalConfig"].includes(x.ref[0])
                });
                _this2.setState({
                    dateFields: dateFs,
                    userFields: userFs,
                    refsFields: refsFs
                }, function() {
                    $([_this2._$scheduleTime, _this2._$postUser, _this2._$relatedRecord]).select2({
                        allowClear: true,
                        placeholder: $L("默认")
                    });
                    if (content.content)
                        _this2._content.val(content.content);
                    if (content.type)
                        _this2.setState({
                            feedType: content.type
                        });
                    if (content.scheduleTime)
                        $(_this2._$scheduleTime).val(content.scheduleTime).trigger("change");
                    if (content.scheduleRemind > 0) {
                        $(_this2._$scheduleRemind).find("input").each(function() {
                            if ((~~$(this).val() & content.scheduleRemind) !== 0)
                                $(this).prop("checked", true)
                        })
                    }
                    if (content.postUser)
                        $(_this2._$postUser).val(content.postUser).trigger("change");
                    if (content.relatedRecord)
                        $(_this2._$relatedRecord).val(content.relatedRecord).trigger("change")
                })
            })
        }
    }, {
        key: "buildContent",
        value: function buildContent() {
            var _data = {
                type: this.state.feedType,
                content: this._content.val(),
                scheduleTime: $(this._$scheduleTime).val() || null,
                scheduleRemind: 0,
                relatedRecord: $(this._$relatedRecord).val() || null,
                postUser: $(this._$postUser).val() || null
            };
            $(this._$scheduleRemind).find("input:checked").each(function() {
                _data.scheduleRemind += ~~$(this).val()
            });
            if (!_data.content) {
                RbHighbar.create($L("内容不能为空"));
                return false
            }
            return _data
        }
    }]);
    return ContentCreateFeed
}(ActionContentSpec);
renderContentComp = function renderContentComp(props) {
    renderRbcomp(React.createElement(ContentCreateFeed, props), "react-content", function() {
        contentComp = this
    });
    LastLogsViewer._Title = $L("新建动态")
}
;
