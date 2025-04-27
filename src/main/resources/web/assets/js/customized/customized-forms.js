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
var CustomizedFormElement = function(_RbFormElement) {
    _inherits(CustomizedFormElement, _RbFormElement);
    var _super = _createSuper(CustomizedFormElement);
    function CustomizedFormElement() {
        _classCallCheck(this, CustomizedFormElement);
        return _super.apply(this, arguments)
    }
    return CustomizedFormElement
}(RbFormElement);
var CustomizedFormArea = function(_LiteFormArea) {
    _inherits(CustomizedFormArea, _LiteFormArea);
    var _super2 = _createSuper(CustomizedFormArea);
    function CustomizedFormArea() {
        _classCallCheck(this, CustomizedFormArea);
        return _super2.apply(this, arguments)
    }
    return CustomizedFormArea
}(LiteFormArea);
var CustomizedProTable = function(_ProTable) {
    _inherits(CustomizedProTable, _ProTable);
    var _super3 = _createSuper(CustomizedProTable);
    function CustomizedProTable() {
        _classCallCheck(this, CustomizedProTable);
        return _super3.apply(this, arguments)
    }
    return CustomizedProTable
}(ProTable);
window._CustomizedForms = {
    useFormElement: function useFormElement(entity, props) {
        console.log("Use `CustomizedFormElement` :", entity, props);
        return null
    },
    useFormArea: function useFormArea(entity, form) {
        console.log("Use `CustomizedFormArea` :", entity, form);
        return null
    },
    useProTable: function useProTable(entity, form) {
        console.log("Use `CustomizedProTable` :", entity, form);
        return null
    }
};
RbForm.renderAfter = function(form) {
    console.log("Your code ...", form)
}
;
