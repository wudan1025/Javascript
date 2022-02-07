(function () {
    "use strict";
    var class2type = {};
    var getProto = Object.getPrototypeOf;
    var toString = class2type.toString; //->Object.prototype.toString
    var hasOwn = class2type.hasOwnProperty; //->Object.prototype.hasOwnProperty
    var fnToString = hasOwn.toString; //->Function.prototype.toString
    var ObjectFunctionString = fnToString.call(Object); //->Object.toString()  //->"function Object() { [native code] }"

    // 建立数据类型检测的映射表
    var arr_type = ["Boolean", "Number", "String", "Function", "Array", "Date", "RegExp", "Object", "Error", "Symbol", "BigInt"];
    arr_type.forEach(function (name) {
        class2type["[object " + name + "]"] = name.toLowerCase();
    });
    
    // 通用检测方法
    var toType = function toType(obj) {
        if (obj == null) return obj + "";
        return typeof obj === "object" || typeof obj === "function" ?
            class2type[toString.call(obj)] || "object" :
            typeof obj;
    };

    // 检测是否为函数
    var isFunction = function isFunction(obj) {
        // In some browsers, typeof returns "function" for HTML <object> elements
        // (i.e., `typeof document.createElement( "object" ) === "function"`).
        return typeof obj === "function" && typeof obj.nodeType !== "number";
    };

    // 检测是否为window
    var isWindow = function isWindow(obj) {
        return obj != null && obj === obj.window;
    };

    // 检测是否为数组或者类数组
    var isArrayLike = function isArrayLike(obj) {
        var length = !!obj && "length" in obj && obj.length,
            type = toType(obj);
        if (isFunction(obj) || isWindow(obj)) return false;
        return type === "array" || length === 0 ||
            typeof length === "number" && length > 0 && (length - 1) in obj;
    };

    // 检测是否为纯粹的对象（obj.__proto__===Object.prototype）
    var isPlainObject = function isPlainObject(obj) {
        var proto, Ctor;
        if (!obj || toString.call(obj) !== "[object Object]") return false;
        proto = getProto(obj);
        if (!proto) return true; // Object.create(null)
        Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
        return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
    };

    // 检测当前对象是否为空对象
    var isEmptyObject = function isEmptyObject(obj) {
        if (obj == null) return false;
        var keys = Object.keys(obj);
        if (typeof Symbol !== "undefined") keys = keys.concat(Object.getOwnPropertySymbols(obj));
        return keys.length === 0;
    };

    // 检测是否为有效数字，认为：10和"10"都是有效数字，但是true/null这些都不是
    var isNumeric = function isNumeric(obj) {
        var type = toType(obj);
        return (type === "number" || type === "string") && !isNaN(obj);
    };

    /* 暴露API */
    var utils = {
        toType: toType,
        isFunction: isFunction,
        isWindow: isWindow,
        isArrayLike: isArrayLike,
        isPlainObject: isPlainObject,
        isEmptyObject: isEmptyObject,
        isNumeric: isNumeric
    };

    // 转让使用权
    var _$ = window._;
    utils.noConflict = function noConflict() {
        if (window._ === utils) window._ = _$;
        return utils;
    };

    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = utils;
    }
    if (typeof window !== "undefined") {
        window._ = window.utils = utils;
    }
})();