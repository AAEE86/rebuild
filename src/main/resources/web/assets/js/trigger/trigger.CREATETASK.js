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
var ContentCreateTask = function(_ActionContentSpec) {
    _inherits(ContentCreateTask, _ActionContentSpec);
    var _super = _createSuper(ContentCreateTask);
    function ContentCreateTask() {
        _classCallCheck(this, ContentCreateTask);
        return _super.apply(this, arguments)
    }
    _createClass(ContentCreateTask, [{
        key: "render",
        value: function render() {
            var _this = this;
            return React.createElement("div", {
                className: "create-task"
            }, React.createElement("form", {
                className: "simple"
            }, React.createElement("div", {
                className: "form-group row"
            }, React.createElement("label", {
                className: "col-12 col-lg-3 col-form-label text-lg-right"
            }, $L("所属项目")), React.createElement("div", {
                className: "col-12 col-lg-8"
            }, React.createElement("div", {
                className: "row"
            }, React.createElement("div", {
                className: "col pr-2"
            }, React.createElement("select", {
                className: "form-control form-control-sm",
                ref: function ref(c) {
                    return _this._$project = c
                }
            }, this.state.projects && this.state.projects.map(function(item) {
                return React.createElement("option", {
                    key: item.id,
                    value: item.id
                }, item.projectName)
            })), React.createElement("p", {
                className: "form-text"
            }, $L("项目"))), React.createElement("div", {
                className: "col pl-2"
            }, React.createElement("select", {
                className: "form-control form-control-sm",
                ref: function ref(c) {
                    return _this._$plan = c
                }
            }, this.state.selectProject && this.state.selectProject.plans && this.state.selectProject.plans.map(function(item) {
                return React.createElement("option", {
                    key: item.id,
                    value: item.id,
                    disabled: item.flowStatus === 2
                }, item.planName)
            })), React.createElement("p", {
                className: "form-text"
            }, $L("任务面板")))))), React.createElement("div", {
                className: "form-group row"
            }, React.createElement("label", {
                className: "col-12 col-lg-3 col-form-label text-lg-right"
            }, $L("执行人")), React.createElement("div", {
                className: "col-12 col-lg-8"
            }, React.createElement("div", {
                className: "row"
            }, React.createElement("div", {
                className: "col pr-2"
            }, React.createElement(UserSelector, {
                hideDepartment: true,
                hideRole: true,
                hideTeam: true,
                multiple: false,
                ref: function ref(c) {
                    return _this._executorSelector = c
                }
            })), React.createElement("div", {
                className: "col pl-2"
            })))), React.createElement("div", {
                className: "form-group row"
            }, React.createElement("label", {
                className: "col-12 col-lg-3 col-form-label text-lg-right"
            }, $L("任务标题")), React.createElement("div", {
                className: "col-12 col-lg-8"
            }, React.createElement("input", {
                className: "form-control form-control-sm",
                ref: function ref(c) {
                    return _this._$name = c
                }
            }))), React.createElement("div", {
                className: "form-group row"
            }, React.createElement("label", {
                className: "col-12 col-lg-3 col-form-label text-lg-right"
            }, $L("任务详情")), React.createElement("div", {
                className: "col-12 col-lg-8"
            }, React.createElement(EditorWithFieldVars, {
                entity: wpc.sourceEntity,
                ref: function ref(c) {
                    return _this._$desc = c
                },
                placeholder: $L("(选填)")
            }), React.createElement("p", {
                className: "form-text",
                dangerouslySetInnerHTML: {
                    __html: $L("任务标题及详情支持字段变量，字段变量如 `{createdOn}` (其中 createdOn 为源实体的字段内部标识)")
                }
            })))))
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this2 = this;
            $.get("/project/alist", function(res) {
                var ps = res.data || [];
                _this2.setState({
                    projects: ps
                });
                var that = _this2;
                $(_this2._$project).select2({
                    placeholder: $L("选择项目")
                }).on("change", function() {
                    var id = $(this).val();
                    var s = ps.find(function(x) {
                        return x.id === id
                    });
                    that.setState({
                        selectProject: s
                    })
                }).trigger("change");
                $(_this2._$plan).select2({
                    placeholder: $L("选择任务面板")
                });
                var content = _this2.props.content;
                if (content) {
                    $(_this2._$project).val(content.project).trigger("change");
                    setTimeout(function() {
                        return $(_this2._$plan).val(content.projectPlan).trigger("change")
                    }, 200);
                    if (content.executor)
                        _this2._executorSelector.val(content.executor);
                    $(_this2._$name).val(content.title);
                    if (content.content)
                        _this2._$desc.val(content.content)
                }
            })
        }
    }, {
        key: "buildContent",
        value: function buildContent() {
            var _data = {
                project: $(this._$project).val(),
                projectPlan: $(this._$plan).val(),
                executor: this._executorSelector.val(),
                deadline: null,
                title: $(this._$name).val(),
                content: this._$desc.val()
            };
            if (!_data.project || !_data.projectPlan) {
                RbHighbar.createl("请选择所属项目");
                return false
            }
            if (!_data.content) {
                RbHighbar.createl("任务标题不能为空");
                return false
            }
            if (_data.executor)
                _data.executor = _data.executor[0];
            return _data
        }
    }]);
    return ContentCreateTask
}(ActionContentSpec);
renderContentComp = function renderContentComp(props) {
    renderRbcomp(React.createElement(ContentCreateTask, props), "react-content", function() {
        contentComp = this
    });
    LastLogsViewer._Title = $L("新建任务")
}
;
