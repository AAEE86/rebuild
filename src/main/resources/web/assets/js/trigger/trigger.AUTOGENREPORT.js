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
var ContentAutoGenReport = function(_ActionContentSpec) {
    _inherits(ContentAutoGenReport, _ActionContentSpec);
    var _super = _createSuper(ContentAutoGenReport);
    function ContentAutoGenReport(props) {
        var _this;
        _classCallCheck(this, ContentAutoGenReport);
        _this = _super.call(this, props);
        _this.state.dataRange = 1;
        _this.state.genAfter = 1;
        return _this
    }
    _createClass(ContentAutoGenReport, [{
        key: "render",
        value: function render() {
            var _this2 = this;
            return React.createElement("div", {
                className: "auto-gen-report"
            }, React.createElement("form", {
                className: "simple"
            }, React.createElement("div", {
                className: "form-group row"
            }, React.createElement("label", {
                className: "col-12 col-lg-3 col-form-label text-lg-right"
            }, $L("使用报表模板")), React.createElement("div", {
                className: "col-12 col-lg-8"
            }, React.createElement("select", {
                className: "form-control form-control-sm",
                ref: function ref(c) {
                    return _this2._$useTemplate = c
                }
            }, (this.state.templateList || []).map(function(item) {
                if (item.type === 3)
                    return null;
                var type = "EXCEL";
                if (item.type === 2)
                    type = $L("EXCEL 列表");
                else if (item.type === 4)
                    type = "WORD";
                return React.createElement("option", {
                    key: item.id,
                    value: item.id
                }, item.name || "@".concat(item.id.toUpperCase()), " (", type, ")")
            })), React.createElement("p", {
                className: "form-text"
            }, WrapHtml($L("需要先添加 [报表模板](../../data/report-templates) 才能在此处选择"))))), React.createElement("div", {
                className: "form-group row pb-1"
            }, React.createElement("label", {
                className: "col-md-12 col-lg-3 col-form-label text-lg-right"
            }, $L("导出哪些数据")), React.createElement("div", {
                className: "col-12 col-lg-8 pt-1"
            }, React.createElement("label", {
                className: "custom-control custom-control-sm custom-radio custom-control-inline mb-1"
            }, React.createElement("input", {
                className: "custom-control-input",
                name: "dataRange",
                type: "radio",
                onChange: function onChange() {
                    return _this2.setState({
                        dataRange: 2
                    })
                },
                checked: this.state.dataRange === 2
            }), React.createElement("span", {
                className: "custom-control-label"
            }, $L("指定数据范围"))), React.createElement("label", {
                className: "custom-control custom-control-sm custom-radio custom-control-inline mb-1"
            }, React.createElement("input", {
                className: "custom-control-input",
                name: "dataRange",
                type: "radio",
                onChange: function onChange() {
                    return _this2.setState({
                        dataRange: 1
                    })
                },
                checked: this.state.dataRange === 1
            }), React.createElement("span", {
                className: "custom-control-label"
            }, $L("当前记录"))), React.createElement("div", null, React.createElement("span", {
                className: this.state.dataRange === 2 ? "" : "hide"
            }, React.createElement("a", {
                className: "btn btn-sm btn-link pl-0 text-left",
                onClick: function onClick() {
                    return _this2.dataAdvFilter()
                }
            }, this.state.dataFilterItems ? "".concat($L("已设置条件"), " (").concat(this.state.dataFilterItems, ")") : $L("点击设置")), React.createElement("div", {
                className: "form-text mt-0 mb-1"
            }, $L("指定数据范围内的记录才会被导出")))))), React.createElement("div", {
                className: "form-group row"
            }, React.createElement("label", {
                className: "col-md-12 col-lg-3 col-form-label text-lg-right"
            }, $L("导出到哪里")), React.createElement("div", {
                className: "col-12 col-lg-8 pt-1"
            }, React.createElement("label", {
                className: "custom-control custom-control-sm custom-radio custom-control-inline mb-1"
            }, React.createElement("input", {
                className: "custom-control-input",
                name: "genAfter",
                type: "radio",
                onChange: function onChange() {
                    return _this2.setState({
                        genAfter: 1
                    })
                },
                checked: this.state.genAfter === 1
            }), React.createElement("span", {
                className: "custom-control-label"
            }, $L("文件目录"))), React.createElement("label", {
                className: "custom-control custom-control-sm custom-radio custom-control-inline mb-1"
            }, React.createElement("input", {
                className: "custom-control-input",
                name: "genAfter",
                type: "radio",
                onChange: function onChange() {
                    return _this2.setState({
                        genAfter: 2
                    })
                },
                checked: this.state.genAfter === 2
            }), React.createElement("span", {
                className: "custom-control-label"
            }, $L("发送邮件"))), React.createElement("label", {
                className: "custom-control custom-control-sm custom-radio custom-control-inline mb-1"
            }, React.createElement("input", {
                className: "custom-control-input",
                name: "genAfter",
                type: "radio",
                onChange: function onChange() {
                    return _this2.setState({
                        genAfter: 3
                    })
                },
                checked: this.state.genAfter === 3
            }), React.createElement("span", {
                className: "custom-control-label"
            }, $L("新建记录"))), React.createElement("label", {
                className: "custom-control custom-control-sm custom-radio custom-control-inline mb-1"
            }, React.createElement("input", {
                className: "custom-control-input",
                name: "genAfter",
                type: "radio",
                onChange: function onChange() {
                    return _this2.setState({
                        genAfter: 4
                    })
                },
                checked: this.state.genAfter === 4
            }), React.createElement("span", {
                className: "custom-control-label"
            }, $L("更新记录"))), React.createElement("div", {
                className: "dest-tips"
            }, React.createElement("div", {
                className: this.state.genAfter === 1 ? "" : "hide"
            }, React.createElement("input", {
                type: "text",
                className: "form-control form-control-sm",
                placeholder: $L("目录名称"),
                ref: function ref(c) {
                    return _this2._$destFolder = c
                }
            }), React.createElement("p", {
                className: "form-text"
            }, WrapHtml($L("放在指定 [文件](../../../files/docs) 目录中")))), React.createElement("div", {
                className: this.state.genAfter === 2 ? "" : "hide"
            }, React.createElement("div", null, React.createElement("input", {
                type: "email",
                className: "form-control form-control-sm",
                placeholder: $L("邮箱地址"),
                ref: function ref(c) {
                    return _this2._$destAddr = c
                }
            }), React.createElement("p", {
                className: "form-text"
            }, $L("发送到指定邮箱，多个请使用逗号分开"))), React.createElement("div", {
                className: "mt-3"
            }, React.createElement("input", {
                type: "text",
                className: "form-control form-control-sm",
                ref: function ref(c) {
                    return _this2._$destSubject = c
                },
                maxLength: "60",
                placeholder: $L("邮件标题")
            })), React.createElement("div", {
                className: "mt-3"
            }, React.createElement(EditorWithFieldVars, {
                entity: wpc.sourceEntity,
                ref: function ref(c) {
                    return _this2._$destContent = c
                }
            }), React.createElement("p", {
                className: "form-text",
                dangerouslySetInnerHTML: {
                    __html: $L("内容 (及标题) 支持字段变量，字段变量如 `{createdOn}` (其中 createdOn 为源实体的字段内部标识)")
                }
            }))), React.createElement("div", {
                className: this.state.genAfter === 3 ? "" : "hide"
            }, React.createElement("div", {
                className: "row"
            }, React.createElement("div", {
                className: "col"
            }, React.createElement("label", {
                className: "mb-1"
            }, $L("实体")), React.createElement("select", {
                className: "form-control form-control-sm",
                ref: function ref(c) {
                    return _this2._$destDefEntity = c
                }
            }, this.state.defEntities && this.state.defEntities.map(function(item) {
                return React.createElement("option", {
                    key: item.entity,
                    value: item.entity
                }, item.entityLabel)
            }))), React.createElement("div", {
                className: "col pl-0"
            }, React.createElement("label", {
                className: "mb-1"
            }, $L("附件字段")), React.createElement("select", {
                className: "form-control form-control-sm",
                ref: function ref(c) {
                    return _this2._$destDefFile = c
                }
            }, this.state.defFields && this.state.defFields.map(function(item) {
                return React.createElement("option", {
                    key: item.name,
                    value: item.name
                }, item.label)
            })))), React.createElement("p", {
                className: "form-text"
            }, $L("新建一条记录，将导出的报表作为附件保存"))), React.createElement("div", {
                className: this.state.genAfter === 4 ? "" : "hide"
            }, React.createElement("div", {
                className: "row"
            }, React.createElement("div", {
                className: "col"
            }, React.createElement("label", {
                className: "mb-1"
            }, $L("附件字段")), React.createElement("select", {
                className: "form-control form-control-sm",
                ref: function ref(c) {
                    return _this2._$destDefFile2 = c
                }
            }, this.state.defFields2 && this.state.defFields2.map(function(item) {
                return React.createElement("option", {
                    key: item.name,
                    value: item.name
                }, item.label)
            }))), React.createElement("div", {
                className: "col pl-0"
            })), React.createElement("p", {
                className: "form-text"
            }, $L("更新当前记录，将导出的报表作为附件保存"))))))))
        }
    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            var _this3 = this;
            var content = this.props.content || {};
            var that = this;
            $.get("/admin/trigger/auto-gen-report-alist?entity=".concat(this.props.sourceEntity), function(res) {
                _this3.setState({
                    templateList: res.data || []
                }, function() {
                    $(_this3._$useTemplate).select2({
                        placeholder: $L("无"),
                        allowClear: false,
                        templateResult: function templateResult(res) {
                            var text = res.text;
                            var flag;
                            if (text.endsWith(")") && text.includes(" (")) {
                                var s = text.split(" (");
                                flag = s[s.length - 1].replace(")", "");
                                delete s[s.length - 1];
                                text = $cleanArray(s).join(" (")
                            }
                            var $span = $("<span></span>").text(text);
                            if (flag)
                                $("<span class=\"badge badge-default badge-pill\">".concat(flag, "</span>")).appendTo($span);
                            return $span
                        }
                    });
                    if (content.useTemplate) {
                        $(_this3._$useTemplate).val(content.useTemplate).trigger("change");
                        _this3.setState({
                            dataRange: content.dataRange || 1,
                            genAfter: content.genAfter || 1
                        }, function() {
                            if (content.dataRange === 2)
                                _this3.saveAdvFilter(content.dataFilter);
                            if (content.genAfter === 1) {
                                $(_this3._$destFolder).val(content.genAfterDest.folderName)
                            } else if (content.genAfter === 2) {
                                $(_this3._$destAddr).val(content.genAfterDest.email);
                                $(_this3._$destSubject).val(content.genAfterDest.subject);
                                _this3._$destContent.val(content.genAfterDest.content)
                            }
                        })
                    }
                })
            });
            $.get("/commons/metadata/entities", function(res) {
                _this3.setState({
                    defEntities: res.data || []
                }, function() {
                    $(_this3._$destDefEntity).select2({
                        placeholder: $L("无")
                    }).on("change", function(e) {
                        $.get("/commons/metadata/fields?deep=1&entity=".concat(e.target.value), function(res2) {
                            var ffs = [];
                            res2.data && res2.data.forEach(function(item) {
                                if (item.type === "FILE")
                                    ffs.push(item)
                            });
                            that.setState({
                                defFields: ffs
                            });
                            $(that._$destDefFile).select2({
                                placeholder: $L("无")
                            })
                        })
                    });
                    if (content.useTemplate && content.genAfter === 3) {
                        $(_this3._$destDefEntity).val(content.genAfterDest.entity).trigger("change");
                        setTimeout(function() {
                            return $(_this3._$destDefFile).val(content.genAfterDest.file).trigger("change")
                        }, 200)
                    } else {
                        $(_this3._$destDefEntity).trigger("change")
                    }
                })
            });
            $.get("/commons/metadata/fields?deep=1&entity=".concat(wpc.sourceEntity), function(res) {
                var ffs = [];
                res.data && res.data.forEach(function(item) {
                    if (item.type === "FILE")
                        ffs.push(item)
                });
                that.setState({
                    defFields2: ffs
                });
                $(that._$destDefFile2).select2({
                    placeholder: $L("无")
                });
                if (content.useTemplate && content.genAfter === 4) {
                    setTimeout(function() {
                        return $(_this3._$destDefFile2).val(content.genAfterDest.file).trigger("change")
                    }, 200)
                }
            })
        }
    }, {
        key: "buildContent",
        value: function buildContent() {
            var _data = {
                useTemplate: $(this._$useTemplate).val(),
                dataRange: this.state.dataRange || 1,
                dataFilter: this._advFilter__data,
                genAfter: this.state.genAfter || 1
            };
            if (!_data.useTemplate) {
                RbHighbar.createl("请选择使用报表模板");
                return false
            }
            if (_data.genAfter === 1) {
                _data.genAfterDest = {
                    folderName: $val(this._$destFolder)
                }
            }
            if (_data.genAfter === 2) {
                _data.genAfterDest = {
                    email: $val(this._$destAddr),
                    subject: $val(this._$destSubject),
                    content: this._$destContent.val()
                };
                var check = _data.genAfterDest.email ? 0 : 1;
                _data.genAfterDest.email && _data.genAfterDest.email.split(/[,，;；]/).forEach(function(item) {
                    item = item.trim();
                    if ($regex.isMail(item))
                        ;
                    else if (/^\{[a-z0-9._]{4,}}$/i.test(item))
                        ;
                    else
                        check++
                });
                if (check > 0) {
                    RbHighbar.createl("请输入正确的邮箱地址");
                    return false
                }
            }
            if (_data.genAfter === 3) {
                _data.genAfterDest = {
                    entity: $(this._$destDefEntity).val(),
                    file: $(this._$destDefFile).val()
                };
                if (!_data.genAfterDest.entity || !_data.genAfterDest.file) {
                    RbHighbar.createl("请选择实体和附件字段");
                    return false
                }
            }
            if (_data.genAfter === 4) {
                _data.genAfterDest = {
                    file: $(this._$destDefFile2).val()
                };
                if (!_data.genAfterDest.file) {
                    RbHighbar.createl("请选择附件字段");
                    return false
                }
            }
            return _data
        }
    }, {
        key: "dataAdvFilter",
        value: function dataAdvFilter() {
            var that = this;
            renderDlgcomp(React.createElement(AdvFilter, {
                title: $L("设置数据范围"),
                inModal: true,
                canNoFilters: true,
                entity: this.props.sourceEntity,
                filter: that._advFilter__data,
                confirm: function confirm(f) {
                    return that.saveAdvFilter(f)
                }
            }), function() {
                that._advFilter = this
            }, "AdvFilter37")
        }
    }, {
        key: "saveAdvFilter",
        value: function saveAdvFilter(filter) {
            this._advFilter__data = filter;
            this.setState({
                dataFilterItems: filter && filter.items ? filter.items.length : 0
            })
        }
    }]);
    return ContentAutoGenReport
}(ActionContentSpec);
renderContentComp = function renderContentComp(props) {
    renderRbcomp(React.createElement(ContentAutoGenReport, props), "react-content", function() {
        contentComp = this;
        $("#react-content [data-toggle=\"tooltip\"]").tooltip()
    })
}
;
window.useExecManual = function() {
    $(".J_save").next().remove()
}
;
LastLogsViewer.renderLog = function(L) {
    var m = L.level === 1 && L.message ? L.message.split("/") : [];
    return m.length > 0 ? React.createElement("div", {
        className: "v36-logdesc"
    }, $L("导出报表"), React.createElement("span", {
        className: "badge"
    }, m[0]), m[1] && React.createElement(RF, null, m[1] === "FILE" && $L("并放在文件目录"), m[1] === "EMAIL" && $L("并发送邮件"), m[1] === "RECORD" && $L("并新建记录"), m[1] === "RECORD2" && $L("并更新记录"), React.createElement("span", {
        className: "badge"
    }, m[2]))) : false
}
;
