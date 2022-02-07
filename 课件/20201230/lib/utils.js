(function () {
    "use strict";

    var class2type = {};
    var getProto = Object.getPrototypeOf;
    var toString = class2type.toString;
    var hasOwn = class2type.hasOwnProperty;
    var fnToString = hasOwn.toString;
    var ObjectFunctionString = fnToString.call(Object);
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
        if (!proto) return true;
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

    // 遍历数组/类数组/对象中的每一项
    var each = function each(obj, callback) {
        var length,
            i = 0,
            item,
            index,
            result,
            keys;
        if (isArrayLike(obj)) {
            length = obj.length;
            for (; i < length; i++) {
                item = obj[i];
                index = i;
                result = callback.call(item, item, index);
                if (result === false) break;
            }
        } else {
            if (obj == null) throw new TypeError('obj not be a null/undefined!');
            keys = Object.keys(obj);
            typeof Symbol !== "undefined" ? keys = keys.concat(Object.getOwnPropertySymbols(obj)) : null;
            length = keys.length;
            for (; i < length; i++) {
                index = keys[i];
                item = obj[index];
                result = callback.call(item, item, index);
                if (result === false) break;
            }
        }
        return obj;
    };

    // 实现「数组/纯粹对象」深浅合并
    var merge = function merge() {
        var options, src, copyIsArray,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;
        if (typeof target === "boolean") {
            deep = target;
            target = arguments[i] || {};
            i++;
        }
        if (typeof target !== "object" && !isFunction(target)) target = {};
        for (; i < length; i++) {
            if ((options = arguments[i]) != null) {
                each(options, function (copy, name) {
                    // 防止死递归
                    if (target === copy) return;
                    copyIsArray = Array.isArray(copy);
                    if (deep && copy && (isPlainObject(copy) || copyIsArray)) {
                        src = target[name];
                        if (copyIsArray && !Array.isArray(src)) {
                            src = [];
                        } else if (!copyIsArray && !isPlainObject(src)) {
                            src = {};
                        }
                        target[name] = merge(deep, src, copy);
                        return;
                    }
                    target[name] = copy;
                });
            }
        }
        return target;
    };

    // 实现「数组/纯粹对象,其余类型的值,直接浅克隆即可」深浅克隆
    var clone = function clone(deep, obj, cache) {
        var type, Ctor, copy;
        if (typeof deep !== "boolean") {
            obj = deep;
            deep = false;
        }

        // 死递归的优化处理
        !Array.isArray(cache) ? cache = [] : null;
        if (cache.indexOf(obj) > -1) return obj;
        cache.push(obj);

        // 原始值类型直接返回
        if (obj == null) return obj;
        if (!/^(object|function)$/.test(typeof obj)) return obj;

        // 特殊值的处理
        type = toType(obj);
        Ctor = obj.constructor;
        if (/^(number|string|boolean|regexp|date)$/.test(type)) return new Ctor(obj);
        if (type === "error") return new Ctor(obj.message);
        if (type === "function") {
            return function proxy() {
                var params = [].slice.call(arguments);
                return obj.apply(this, params);
            };
        }
        if (!isPlainObject(obj) && !Array.isArray(obj)) return obj;

        // 纯粹对象和数组
        copy = new Ctor();
        each(obj, function (value, key) {
            if (deep) {
                // 深拷贝
                copy[key] = clone(deep, value, cache);
                return;
            }
            // 浅拷贝
            copy[key] = value;
        });
        return copy;
    };

    /* 暴露API */
    var utils = {
        toType: toType,
        isFunction: isFunction,
        isWindow: isWindow,
        isArrayLike: isArrayLike,
        isPlainObject: isPlainObject,
        isEmptyObject: isEmptyObject,
        isNumeric: isNumeric,
        each: each,
        merge: merge,
        clone: clone
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