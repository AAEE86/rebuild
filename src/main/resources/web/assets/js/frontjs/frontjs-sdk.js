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
function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread()
}
function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
}
function _unsupportedIterableToArray(o, minLen) {
    if (!o)
        return;
    if (typeof o === "string")
        return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor)
        n = o.constructor.name;
    if (n === "Map" || n === "Set")
        return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
        return _arrayLikeToArray(o, minLen)
}
function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null)
        return Array.from(iter)
}
function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr))
        return _arrayLikeToArray(arr)
}
function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length)
        len = arr.length;
    for (var i = 0, arr2 = new Array(len); i < len; i++) {
        arr2[i] = arr[i]
    }
    return arr2
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
function _extends() {
    _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key]
                }
            }
        }
        return target
    }
    ;
    return _extends.apply(this, arguments)
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
var _Context = function() {
    function _Context(wpc) {
        _classCallCheck(this, _Context);
        this.__wpc = wpc
    }
    _createClass(_Context, [{
        key: "_wpc",
        value: function _wpc() {
            return this.__wpc || window.__PageConfig || {}
        }
    }, {
        key: "getEntity",
        value: function getEntity() {
            return this._wpc().entity ? this._wpc().entity[0] : null
        }
    }, {
        key: "getPageType",
        value: function getPageType() {
            return this._wpc().type || null
        }
    }]);
    return _Context
}();
var _BasePage = function() {
    function _BasePage() {
        _classCallCheck(this, _BasePage);
        this.context = new _Context;
        this.__cb = {}
    }
    _createClass(_BasePage, [{
        key: "on",
        value: function on(type, cb) {
            var evt = this.__cb[type] || [];
            evt.push(cb);
            this.__cb[type] = evt
        }
    }, {
        key: "onOpen",
        value: function onOpen(cb) {
            this.on("open", cb)
        }
    }, {
        key: "addButton",
        value: function addButton(btn) {
            FrontJS.log("TODO :", btn);
            return false
        }
    }, {
        key: "addButtonGroup",
        value: function addButtonGroup(btn) {
            return this.addButton(btn)
        }
    }, {
        key: "removeButton",
        value: function removeButton(btnId) {
            FrontJS.log("TODO :", btnId);
            return false
        }
    }, {
        key: "getDock",
        value: function getDock() {
            FrontJS.log("TODO : #getDock");
            return null
        }
    }, {
        key: "_trigger",
        value: function _trigger(type, args) {
            var evt = this.__cb[type] || [];
            args = args || [];
            var lastReturnValue;
            evt.forEach(function(cb) {
                lastReturnValue = cb(args[0], args[1], args[2], args[3], args[4])
            });
            return lastReturnValue
        }
    }, {
        key: "_buildButton",
        value: function _buildButton(btn) {
            var $btn = $("<button type=\"button\" class=\"btn btn-".concat(btn.type || "secondary", " ").concat(btn.text ? "" : "w-auto", "\">").concat(btn.text || "", "</button>"));
            if (btn.icon)
                $("<i class=\"zmdi zmdi-".concat(btn.icon, " icon ").concat(btn.text && "mr-1", "\"></i>")).prependTo($btn);
            if (btn.title)
                $btn.attr("title", btn.title);
            if (btn._eaid)
                $btn.attr({
                    "data-eaid": btn._eaid,
                    disabled: true
                });
            if (typeof btn.onClick === "function")
                $btn.on("click", btn.onClick);
            return $btn
        }
    }, {
        key: "_buildButtonGroup",
        value: function _buildButtonGroup(btn) {
            var $btng = $("<div class=\"btn-group\"></div>");
            var text = btn.text + " <i class=\"icon zmdi zmdi-more-vert\"></i>";
            if (btn.icon)
                text = "<i class=\"zmdi zmdi-".concat(btn.icon, " icon ").concat(btn.text && "mr-1", "\"></i>").concat(btn.text || "");
            var $btn = $("<button class=\"btn btn-".concat(btn.type || "secondary", " ").concat(btn.text ? "" : "w-auto", " dropdown-toggle\" type=\"button\" data-toggle=\"dropdown\">").concat(text, "</button>")).prependTo($btng);
            if (btn.title)
                $btn.attr("title", btn.title);
            if (btn._eaid)
                $btn.attr({
                    "data-eaid": btn._eaid,
                    disabled: true
                });
            var $menu = $("<div class=\"dropdown-menu dropdown-menu-right\" _title=\"".concat($L("无可操作项"), "\"></div>")).appendTo($btng);
            btn.items.forEach(function(btnL2) {
                $btn = $("<a class=\"dropdown-item text-".concat(btnL2.type || "", "\">").concat(btnL2.text, "</a>")).appendTo($menu);
                if (btnL2.icon)
                    $("<i class=\"zmdi zmdi-".concat(btnL2.icon, " icon mr-1 text-").concat(btnL2.type || "", "\"></i>")).prependTo($btn);
                if (btnL2._eaid)
                    $btn.attr({
                        "data-eaid": btnL2._eaid,
                        disabled: true
                    });
                if (typeof btnL2.onClick === "function")
                    $btn.on("click", btnL2.onClick)
            });
            return $btng
        }
    }, {
        key: "_transformRecord",
        value: function _transformRecord(transformId) {
            var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
                recordId: null,
                mainid: null,
                existsRecord: null
            };
            $.get("/commons/frontjs/transform-meta?id=".concat(transformId), function(res) {
                if (res.error_code === 0) {
                    renderRbcomp(React.createElement(DlgTransform, _extends({}, res.data, {
                        transid: transformId,
                        sourceRecord: option.recordId,
                        mainRecord: option.mainid,
                        existsRecord: option.existsRecord
                    })))
                } else {
                    RbHighbar.error(res.error_msg)
                }
            })
        }
    }]);
    return _BasePage
}();
var _Form = function(_BasePage2) {
    _inherits(_Form, _BasePage2);
    var _super = _createSuper(_Form);
    function _Form() {
        _classCallCheck(this, _Form);
        return _super.apply(this, arguments)
    }
    _createClass(_Form, [{
        key: "_detectForm",
        value: function _detectForm() {
            var _RbFormModal = window.RbFormModal;
            if (_RbFormModal && _RbFormModal.__CURRENT35)
                return _RbFormModal.__CURRENT35;
            else
                FrontJS.log("Form component not detected")
        }
    }, {
        key: "getFormComp",
        value: function getFormComp() {
            var formObj = this._detectForm();
            return formObj ? formObj.getFormComp() : null
        }
    }, {
        key: "getProTable",
        value: function getProTable(detailName) {
            var formObj = this._detectForm();
            return formObj ? formObj._formComponentRef.getProTable(detailName) : null
        }
    }, {
        key: "getDetailFormComps",
        value: function getDetailFormComps(detailName) {
            var pt = this.getProTable(detailName);
            return pt ? pt.getInlineForms() : null
        }
    }, {
        key: "getFieldComp",
        value: function getFieldComp(fieldName) {
            var formComp = this.getFormComp();
            return formComp ? formComp.getFieldComp(fieldName) : null
        }
    }, {
        key: "onFieldValueChange",
        value: function onFieldValueChange(cb) {
            this.on("fieldValueChange", cb)
        }
    }, {
        key: "onSaveBefore",
        value: function onSaveBefore(cb) {
            this.on("saveBefore", cb)
        }
    }, {
        key: "onSaveAfter",
        value: function onSaveAfter(cb) {
            this.on("saveAfter", cb)
        }
    }, {
        key: "getCurrentId",
        value: function getCurrentId() {
            var formObj = this._detectForm();
            return formObj ? formObj.state.id : null
        }
    }, {
        key: "getDock",
        value: function getDock(detailName) {
            var formObj = this._detectForm();
            if (!formObj)
                return null;
            var $d = $(formObj._rbmodal).find(".dialog-footer .fjs-dock");
            if (detailName)
                $d = $(".detail-form-table[data-entity=\"".concat(detailName, "\"] .fjs-dock"));
            return $d[0] ? $d : null
        }
    }, {
        key: "addButton",
        value: function addButton(btn, detailName) {
            var $d = this.getDock(detailName);
            if (!$d)
                return false;
            var $btn = btn.items ? this._buildButtonGroup(btn) : this._buildButton(btn);
            $btn.appendTo($d);
            return true
        }
    }, {
        key: "removeButton",
        value: function removeButton(btnId, detailName) {
            var formObj = this._detectForm();
            if (!formObj)
                return null;
            var btnIds = typeof btnId === "string" ? [btnId] : btnId;
            btnIds.forEach(function(b) {
                if (b === "save") {
                    $(formObj._rbmodal).find(".dialog-footer .J_save").remove()
                } else if (b === "add-detail" && detailName) {
                    $(formObj._rbmodal).find(".detail-form-table[data-entity=\"".concat(detailName, "\"] .J_add-detail")).remove()
                }
            })
        }
    }, {
        key: "setTopAlert",
        value: function setTopAlert(text) {
            var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var formObj = this._detectForm();
            if (!formObj)
                return false;
            var c = text === null ? null : React.createElement("div", {
                className: "rbform-fjsalert"
            }, React.createElement(RbAlertBox, _extends({
                message: text || "No text"
            }, option)));
            formObj.setState({
                fjsAlertMessage: c
            });
            return true
        }
    }, {
        key: "setFieldHidden",
        value: function setFieldHidden(fieldName, hidden) {
            this._forEachFieldComp(fieldName, function(comp) {
                return comp.setHidden(hidden)
            })
        }
    }, {
        key: "setFieldNullable",
        value: function setFieldNullable(fieldName, nullable) {
            this._forEachFieldComp(fieldName, function(comp) {
                return comp.setNullable(nullable)
            })
        }
    }, {
        key: "setFieldReadonly",
        value: function setFieldReadonly(fieldName, readonly) {
            this._forEachFieldComp(fieldName, function(comp) {
                return comp.setReadonly(readonly)
            })
        }
    }, {
        key: "setFieldTip",
        value: function setFieldTip(fieldName, tip) {
            this._forEachFieldComp(fieldName, function(comp) {
                return comp.setTip(tip)
            })
        }
    }, {
        key: "setFieldValue",
        value: function setFieldValue(fieldName, value) {
            var comp = this.getFieldComp(fieldName);
            if (comp)
                comp.setValue(value);
            else
                FrontJS.log("No field found on current form :", fieldName)
        }
    }, {
        key: "getFieldValue",
        value: function getFieldValue(fieldName) {
            var comp = this.getFieldComp(fieldName);
            if (comp)
                return comp.getValue();
            FrontJS.log("No field found on current from :", fieldName);
            return undefined
        }
    }, {
        key: "_forEachFieldComp",
        value: function _forEachFieldComp(fieldName, cb) {
            var _this = this;
            var names = [];
            if (typeof fieldName === "string")
                names.push(fieldName);
            else
                names = _toConsumableArray(fieldName);
            names.forEach(function(name) {
                var comp = _this.getFieldComp(name);
                if (comp)
                    cb(comp);
                else
                    FrontJS.log("No field found on current from :", name)
            })
        }
    }, {
        key: "getDetailsFormComp",
        value: function getDetailsFormComp(specEntity) {
            var formComp = this.getFormComp();
            if (formComp && formComp._ProTables) {
                if (!specEntity)
                    specEntity = Object.keys(formComp._ProTables)[0];
                var p = formComp._ProTables[specEntity];
                if (!p) {
                    FrontJS.log("No form of details found :", specEntity || "0");
                    return null
                }
                var forms = [];
                p.state.inlineForms && p.state.inlineForms.forEach(function(item) {
                    forms.push(item.ref.current)
                });
                return forms
            }
            return undefined
        }
    }]);
    return _Form
}(_BasePage);
var _View = function(_BasePage3) {
    _inherits(_View, _BasePage3);
    var _super2 = _createSuper(_View);
    function _View() {
        _classCallCheck(this, _View);
        return _super2.apply(this, arguments)
    }
    _createClass(_View, [{
        key: "_detectView",
        value: function _detectView() {
            var _RbViewPage = window.RbViewPage;
            if (_RbViewPage && _RbViewPage._RbViewForm)
                return _RbViewPage._RbViewForm;
            else
                FrontJS.log("View component not detected")
        }
    }, {
        key: "getCurrentId",
        value: function getCurrentId() {
            return this._detectView() ? this.context._wpc().recordId : null
        }
    }, {
        key: "getDock",
        value: function getDock(detailName) {
            var viewObj = this._detectView();
            if (!viewObj)
                return null;
            if (detailName) {
                var $d = $(".related-list[data-entity=\"".concat(detailName, "\"] .fjs-dock"));
                return $d[0] ? $d : null
            } else {
                var _$d = $(".view-operating .fjs-dock");
                return _$d[0] ? _$d : null
            }
        }
    }, {
        key: "addButton",
        value: function addButton(btn, detailName) {
            var viewObj = this._detectView();
            if (!viewObj)
                return false;
            var $d = detailName ? this.getDock(detailName) : $(".view-operating .view-action");
            if (!$d)
                return false;
            var $btn;
            if (btn.items) {
                $btn = this._buildButtonGroup(btn);
                $btn.addClass("w-100").find(">.btn").removeClass("w-auto")
            } else {
                $btn = this._buildButton(btn);
                $btn.removeClass("w-auto")
            }
            if (detailName) {
                $btn.appendTo($d)
            } else {
                var $wrap = $("<div class=\"col-12 col-lg-6\"></div>").appendTo($d);
                $btn.appendTo($wrap)
            }
            return true
        }
    }, {
        key: "removeButton",
        value: function removeButton(btnId) {
            var btnIds = typeof btnId === "string" ? [btnId] : btnId;
            btnIds.forEach(function(b) {
                var $btn = $(".view-action .J_".concat(b));
                if ($btn.parent().hasClass("col-lg-6"))
                    $btn = $btn.parent();
                $btn.remove()
            })
        }
    }, {
        key: "setTopAlert",
        value: function setTopAlert(text) {
            var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var viewObj = this._detectView();
            if (!viewObj)
                return false;
            var c = text === null ? null : React.createElement("div", {
                className: "rbview-fjsalert"
            }, React.createElement(RbAlertBox, _extends({
                message: text || "No text"
            }, option)));
            viewObj.setState({
                fjsAlertMessage: c
            });
            return true
        }
    }, {
        key: "getFieldValue",
        value: function getFieldValue(fieldName) {
            var viewObj = this._detectView();
            if (!viewObj)
                return false;
            return viewObj.__ViewData[fieldName]
        }
    }, {
        key: "exportReport",
        value: function exportReport(reportId) {
            var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
                recordId: null,
                isPdf: false
            };
            if (typeof option === "boolean")
                option = {
                    isPdf: option
                };
            var entity = this.context.getEntity();
            var id = option && option.recordId ? option.recordId : this.getCurrentId();
            $openWindow("".concat(rb.baseUrl, "/app/").concat(entity, "/report/export?report=").concat(reportId, "&record=").concat(id, "&output=").concat(option.isPdf ? "pdf" : ""))
        }
    }, {
        key: "updateRecord",
        value: function updateRecord(data) {
            var _this2 = this;
            var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
                recordId: null
            };
            var post = _objectSpread({
                metadata: {
                    id: option && option.recordId ? option.recordId : this.getCurrentId()
                }
            }, data);
            $.post("/app/entity/record-save", JSON.stringify(post), function(res) {
                if (res.error_code === 0) {
                    _this2.reload()
                } else {
                    RbHighbar.error(res.error_msg)
                }
            })
        }
    }, {
        key: "transformRecord",
        value: function transformRecord(transformId) {
            var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
                recordId: null,
                mainid: null,
                existsRecord: null
            };
            if (!option.recordId)
                option.recordId = this.getCurrentId();
            this._transformRecord(transformId, option)
        }
    }, {
        key: "reload",
        value: function reload() {
            window.RbViewPage ? window.RbViewPage.reload() : location.reload()
        }
    }, {
        key: "openFormWithDetail",
        value: function openFormWithDetail(entity, detailField) {
            var _ref;
            var option = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
                detailEntityName: null,
                recordId: null
            };
            var id = option.recordId ? option.recordId : this.getCurrentId();
            var ds = [(_ref = {},
            _defineProperty(_ref, detailField, id),
            _defineProperty(_ref, "metadata", {
                entity: option.detailEntityName || null
            }),
            _ref)];
            FrontJS.openForm(entity, {
                initialValue: {
                    "$DETAILS$": ds
                }
            })
        }
    }]);
    return _View
}(_BasePage);
var _DataList = function(_BasePage4) {
    _inherits(_DataList, _BasePage4);
    var _super3 = _createSuper(_DataList);
    function _DataList(props) {
        var _this3;
        _classCallCheck(this, _DataList);
        _this3 = _super3.call(this, props);
        _this3.__cellRenders = {};
        _this3.__rowActions = [];
        return _this3
    }
    _createClass(_DataList, [{
        key: "_detectList",
        value: function _detectList() {
            var _RbListPage = window.RbListPage;
            if (_RbListPage && _RbListPage._RbList)
                return _RbListPage._RbList;
            else
                FrontJS.log("List component not detected")
        }
    }, {
        key: "getMode",
        value: function getMode() {
            return window.RbViewModal ? window.RbViewModal.mode || 1 : -1
        }
    }, {
        key: "getSelectedIds",
        value: function getSelectedIds() {
            var listObj = this._detectList();
            return listObj ? listObj.getSelectedIds(true) : []
        }
    }, {
        key: "getSelectedId",
        value: function getSelectedId() {
            return this.getSelectedIds()[0] || null
        }
    }, {
        key: "reload",
        value: function reload() {
            var listObj = this._detectList();
            listObj && listObj.reload()
        }
    }, {
        key: "getDock",
        value: function getDock() {
            if (!["RecordList", "DetailList"].includes(this.context.getPageType()))
                return null;
            var listObj = this._detectList();
            if (!listObj)
                return null;
            var $d = $(".rb-datatable-header .dataTables_oper .fjs-dock");
            return $d[0] ? $d : null
        }
    }, {
        key: "addButton",
        value: function addButton(btn) {
            var $d = this.getDock();
            if (!$d)
                return null;
            var $btn = btn.items ? this._buildButtonGroup(btn) : this._buildButton(btn);
            $btn.appendTo($d);
            if (!btn.text && btn.title) {
                setTimeout(function() {
                    return $btn.tooltip({})
                }, 300)
            }
            var $oper = $(".dataTables_wrapper .dataTables_oper");
            if ($oper.find(">.btn,>.btn-group,>.fjs-dock>.btn,>.fjs-dock>.btn-group").length >= 6)
                $oper.addClass("compact");
            return true
        }
    }, {
        key: "removeButton",
        value: function removeButton(btnId) {
            var btnIds = typeof btnId === "string" ? [btnId] : btnId;
            btnIds.forEach(function(b) {
                if (b === "mores")
                    b = "action";
                $(".dataTables_oper .J_".concat(b)).remove()
            })
        }
    }, {
        key: "setTopAlert",
        value: function setTopAlert(text) {
            var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            if (this.getMode() === 2)
                return;
            if (text === null) {
                $(".rblist-fjsalert").remove();
                return
            }
            var $e = $(".rblist-fjsalert");
            if ($e[0]) {
                $unmount($e[0], 1, true)
            } else {
                $e = $("<div class=\"rblist-fjsalert\"></div>").prependTo(".rb-content .main-content")
            }
            setTimeout(function() {
                renderRbcomp(React.createElement(RbAlertBox, _extends({
                    message: text || "No text"
                }, option)), $e[0])
            }, 10);
            return true
        }
    }, {
        key: "exportReport",
        value: function exportReport(reportId) {
            var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
                isPdf: false,
                isMerge: false,
                recordId: null
            };
            if (typeof option === "boolean")
                option = {};
            var ids = option && option.recordId ? [option.recordId] : this.getSelectedIds();
            if (option && option.recordId && Array.isArray(option.recordId))
                ids = option.recordId;
            if (!ids[0])
                return RbHighbar.create($L("请至少选择一条记录"));
            var listObj = this._detectList();
            function _FN(o) {
                if (o.isList) {
                    var qe = listObj ? listObj.__lastQueryEntry || {} : {};
                    var exportFilter = {
                        entity: o.entity,
                        fields: ["".concat(o.entity, "Id")],
                        sort: qe.sort || null,
                        _selected: ids.join("|")
                    };
                    $.post("/app/".concat(o.entity, "/export/submit?dr=1&report=").concat(reportId, "&output=").concat(o.isPdf ? "pdf" : ""), JSON.stringify(exportFilter), function(res) {
                        if (res.error_code === 0) {
                            $openWindow("".concat(rb.baseUrl, "/filex/download/").concat(res.data.fileKey, "?attname=").concat(res.data.fileName, "&temp=yes"))
                        } else {
                            RbHighbar.error(res.error_msg)
                        }
                    })
                } else {
                    $openWindow("".concat(rb.baseUrl, "/app/").concat(o.entity, "/report/export?report=").concat(reportId, "&record=").concat(o.isMerge ? ids.join(",") : ids[0], "&output=").concat(o.isPdf ? "pdf" : ""))
                }
            }
            $.get("/commons/frontjs/report-type?id=".concat(reportId), function(res) {
                if (res.error_code === 0) {
                    var _data = res.data;
                    _FN(_objectSpread(_objectSpread({}, option), {}, {
                        isList: _data.isList,
                        entity: _data.entity
                    }))
                } else {
                    RbHighbar.error(res.error_msg)
                }
            })
        }
    }, {
        key: "updateRecords",
        value: function updateRecords(data) {
            var _this4 = this;
            var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
                recordId: null
            };
            var ids = option && option.recordId ? [option.recordId] : this.getSelectedIds();
            if (!ids[0])
                return RbHighbar.create($L("请至少选择一条记录"));
            var post = _objectSpread({
                metadata: {
                    id: null
                }
            }, data);
            var idsLen = ids.length;
            var errorLen = 0;
            var errorLast = null;
            ids.forEach(function(id) {
                post.metadata.id = id;
                $.post("/app/entity/record-save", JSON.stringify(post), function(res) {
                    idsLen--;
                    if (res.error_code > 0) {
                        errorLen++;
                        errorLast = res.error_msg
                    }
                    if (idsLen <= 0) {
                        _this4.reload();
                        if (errorLen === 0)
                            RbHighbar.success("修改成功");
                        else {
                            if (errorLast && ids.length - errorLen === 0) {
                                RbHighbar.error(errorLast)
                            } else {
                                RbHighbar.success($L("成功修改 %d 条记录", ids.length - errorLen))
                            }
                        }
                    }
                })
            })
        }
    }, {
        key: "updateSelectedRecords",
        value: function updateSelectedRecords(data) {
            var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
                recordId: null
            };
            console.warn("Deprecated API : `updateSelectedRecords`");
            this.updateRecords(data, option)
        }
    }, {
        key: "transformRecord",
        value: function transformRecord(transformId) {
            var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
                recordId: null,
                mainid: null,
                existsRecord: null,
                isMuilt: false
            };
            var id;
            if (option.isMuilt) {
                id = option.recordId ? option.recordId : this.getSelectedIds();
                if (!id || id.length === 0)
                    return RbHighbar.create($L("请至少选择一条记录"))
            } else {
                id = option.recordId ? option.recordId : this.getSelectedId();
                if (!id)
                    return RbHighbar.create($L("请选择一条记录"))
            }
            option.recordId = id;
            this._transformRecord(transformId, option)
        }
    }, {
        key: "regCellRender",
        value: function regCellRender(fieldKey, renderFunc) {
            this.__cellRenders[fieldKey] = function(v, s, k) {
                var res = renderFunc(v, s, k);
                if (res === false)
                    return false;
                return React.createElement("td", {
                    key: k
                }, React.createElement("div", {
                    style: s
                }, res))
            }
        }
    }, {
        key: "regRowButton",
        value: function regRowButton(btn) {
            this.__rowActions.push(btn)
        }
    }, {
        key: "regRowAction",
        value: function regRowAction(btn) {
            console.warn("Deprecated API : `regRowAction`");
            this.regRowButton(btn)
        }
    }, {
        key: "openFormWithDetails",
        value: function openFormWithDetails(entity, detailField) {
            var option = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {
                detailEntityName: null,
                recordId: null
            };
            var ids = option.recordId ? [option.recordId] : this.getSelectedIds();
            if (!ids[0])
                return RbHighbar.create($L("请至少选择一条记录"));
            var ds = [];
            ids.forEach(function(id) {
                var _ds$push;
                ds.push((_ds$push = {},
                _defineProperty(_ds$push, detailField, id),
                _defineProperty(_ds$push, "metadata", {
                    entity: option.detailEntityName || null
                }),
                _ds$push))
            });
            FrontJS.openForm(entity, {
                initialValue: {
                    "$DETAILS$": ds
                }
            })
        }
    }]);
    return _DataList
}(_BasePage);
var _Query = function() {
    function _Query() {
        _classCallCheck(this, _Query)
    }
    _createClass(_Query, [{
        key: "get",
        value: function get(id, fields) {
            return FrontJS._fetchSync("/app/entity/common-get?id=".concat(id, "&fields=").concat($encode(fields))).data || null
        }
    }, {
        key: "query",
        value: function query(queryBody, cb) {
            $.post("/app/entity/common-list", JSON.stringify(queryBody), function(res) {
                if (res.error_code === 0) {
                    typeof cb === "function" && cb(res.data)
                } else {
                    RbHighbar.error(res.error_msg)
                }
            })
        }
    }, {
        key: "querySimple",
        value: function querySimple(entity, fields, kvFilter, cb) {
            var qb = this._buildQueryBody(entity, fields, kvFilter);
            this.query(qb, cb)
        }
    }, {
        key: "_buildQueryBody",
        value: function _buildQueryBody(entity, fields, kvFilter) {
            var filter = {
                entity: entity,
                items: []
            };
            var index = 1;
            for (var k in kvFilter) {
                filter.items.push({
                    index: index++,
                    op: "EQ",
                    field: k,
                    value: kvFilter[k]
                })
            }
            return {
                entity: entity,
                filter: filter,
                fields: fields
            }
        }
    }]);
    return _Query
}();
var FrontJS = {
    Form: new _Form,
    View: new _View,
    DataList: new _DataList,
    Query: new _Query,
    openForm: function openForm(idOrEntity) {
        var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
            title: null,
            specLayout: null,
            initialValue: null
        };
        var _id = $regex.isId(idOrEntity) ? idOrEntity : null;
        var name = _id ? _id.split("-")[0] : idOrEntity;
        $.get("/commons/metadata/meta-info?name=".concat(name), function(res) {
            if (res.error_code === 0) {
                var _data = res.data || {};
                if (!option.title)
                    option.title = _id ? $L("编辑%s", _data.entityLabel) : $L("新建%s", _data.entityLabel);
                if (!_id && _data.mainEntity) {
                    option.initialValue = option.initialValue || {};
                    option.initialValue["$MAINID$"] = "$MAINID$FJS"
                }
                var props = {
                    entity: _data.entity,
                    icon: _data.icon,
                    id: _id || null,
                    title: option.title,
                    specLayout: option.specLayout || null,
                    initialValue: option.initialValue || null
                };
                RbFormModal.create(props, true)
            } else {
                FrontJS.log(res)
            }
        })
    },
    openLiteForm: function openLiteForm(idOrEntity, fields, title, onHandleSave) {
        LiteFormModal.create(idOrEntity, fields, title, onHandleSave)
    },
    openView: function openView(id, openType) {
        var viewUrl = "/app/redirect?id=".concat(id, "&type=").concat(openType || "newtab");
        if (openType === "newtab" || openType === "dock") {
            window.open(viewUrl);
            return
        }
        var _RbViewModal = parent.RbViewModal || window.RbViewModal || null;
        if (_RbViewModal) {
            var name = id.split("-")[0];
            $.get("/commons/metadata/meta-info?name=".concat(name), function(res) {
                if (res.error_code === 0) {
                    _RbViewModal.create({
                        entity: res.data.entity,
                        id: id
                    }, !parent.RbViewModal)
                } else {
                    FrontJS.log(res)
                }
            })
        } else {
            window.open(viewUrl)
        }
    },
    openModal: function openModal(chindJSX) {
        var _this5 = this;
        var option = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
            title: null,
            onHide: null,
            onShow: null
        };
        var JSX = React.createElement(RbModal, _extends({}, option, {
            disposeOnHide: true,
            ref: function ref(c) {
                return _this5._dlg = c
            }
        }), chindJSX);
        renderRbcomp(JSX, function() {
            FrontJS.__currentModel38 = this
        })
    },
    closeModal: function closeModal() {
        if (FrontJS.__currentModel38) {
            FrontJS.__currentModel38.hide();
            FrontJS.__currentModel38 = null
        }
    },
    getPageToken: function getPageToken() {
        return FrontJS._fetchSync("/commons/frontjs/page-token").data || null
    },
    getRecord: function getRecord(id, fields) {
        return this.Query.get(id, fields)
    },
    getText: function getText(id) {
        var _data = FrontJS._fetchSync("/commons/search/read-labels?id=".concat(id)).data;
        return _data[id]
    },
    checkPermission: function checkPermission(idOrEntity, action) {
        return FrontJS._fetchSync("/app/entity/extras/check-permission?id=".concat(idOrEntity, "&action=").concat(action)).data || null
    },
    log: function log() {
        var a = arguments;
        if (a[4])
            console.warn("FrontJS :", a[0], a[1], a[2], a[3], a[4]);
        else if (a[3])
            console.warn("FrontJS :", a[0], a[1], a[2], a[3]);
        else if (a[2])
            console.warn("FrontJS :", a[0], a[1], a[2]);
        else if (a[1])
            console.warn("FrontJS :", a[0], a[1]);
        else
            console.warn("FrontJS :", a[0])
    },
    __cb: [],
    ready: function ready(cb) {
        this.__cb.push(cb)
    },
    _fetchSync: function _fetchSync(url) {
        var _data;
        $.ajax({
            type: "GET",
            async: false,
            url: url,
            success: function success(res) {
                return _data = res
            }
        });
        return _data || {}
    }
};
$(document).ready(function() {
    FrontJS.__cb.forEach(function(cb) {
        return cb()
    });
    if (rb.env === "dev") {
        var x = _ClassMethods(_Form.prototype, "FrontJS.Form.", "_Form.") + " " + _ClassMethods(_View.prototype, "FrontJS.View.", "_View.") + " " + _ClassMethods(_DataList.prototype, "FrontJS.DataList.", "_List.");
        console.log(x)
    }
});
function _ClassMethods(cls, prefix, prefix2) {
    var methods = (Object.getOwnPropertyNames(cls) || []).filter(function(name) {
        if (["constructor", "updateSelectedRecords", "removeButton", "getDetailsFormComp"].includes(name) || name.startsWith("_"))
            return false;
        return true
    });
    var join = prefix + methods.join(" " + prefix);
    if (prefix2)
        join += " " + prefix2 + methods.join(" " + prefix2);
    return join
}
