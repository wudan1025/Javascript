(function () {
    var class2type = {};
    var toString = class2type.toString;
    var hasOwn = class2type.hasOwnProperty;
    var fnToString = hasOwn.toString;
    var ObjectFunctionString = fnToString.call(Object);
    var getProto = Object.getPrototypeOf;

    var mapType = ["Boolean", "Number", "String", "Function", "Array", "Date", "RegExp", "Object", "Error", "Symbol", "BigInt"];
    mapType.forEach(function (name) {
        class2type["[object " + name + "]"] = name.toLocaleLowerCase();
    });

    var toType = function toType(obj) {
        if (obj == null) {
            return obj + "";
        }
        return typeof obj === "object" || typeof obj === "function" ?
            class2type[toString.call(obj)] || "object" :
            typeof obj;
    };

    var isFunction = function isFunction(obj) {
        return typeof obj === "function" && typeof obj.nodeType !== "number";
    };

    var isWindow = function isWindow(obj) {
        return obj != null && obj === obj.window;
    };

    var isArrayLike = function isArrayLike(obj) {
        var length = !!obj && "length" in obj && obj.length,
            type = toType(obj);
        if (isFunction(obj) || isWindow(obj)) return false;
        return type === "array" || length === 0 ||
            typeof length === "number" && length > 0 && (length - 1) in obj;
    };

    var isPlainObject = function isPlainObject(obj) {
        var proto, Ctor;
        if (!obj || toString.call(obj) !== "[object Object]") {
            return false;
        }
        proto = getProto(obj);
        if (!proto) return true;
        Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
        return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
    };

    var isEmptyObject = function isEmptyObject(obj) {
        if (obj == null) return false;
        if (typeof obj !== "object") return false;
        var keys = Object.keys(obj);
        if (hasOwn.call(Object, 'getOwnPropertySymbols')) {
            keys = keys.concat(Object.getOwnPropertySymbols(obj));
        }
        return keys.length === 0;
    };

    var isNumeric = function isNumeric(obj) {
        var type = toType(obj);
        return (type === "number" || type === "string") && !isNaN(+obj);
    };

    var each = function each(obj, callback) {
        var length, i = 0;
        if (isArrayLike(obj)) {
            length = obj.length;
            for (; i < length; i++) {
                var result = callback.call(obj[i], i, obj[i]);
                if (result === false) {
                    break;
                }
            }
        } else {
            var keys = Object.keys(obj);
            typeof Symbol !== "undefined" ? keys = keys.concat(Object.getOwnPropertySymbols(obj)) : null;
            for (; i < keys.length; i++) {
                var key = keys[i];
                if (callback.call(obj[key], key, obj[key]) === false) {
                    break;
                }
            }
        }
        return obj;
    }

    var shallowMerge = function shallowMerge(obj1, obj2) {
        var isPlain1 = isPlainObject(obj1),
            isPlain2 = isPlainObject(obj2);
        if (!isPlain1) return obj2;
        if (!isPlain2) return obj1;
        each(obj2, function (key, value) {
            obj1[key] = value;
        });
        return obj1;
    };

    var deepMerge = function deepMerge(obj1, obj2, cache) {
        cache = !Array.isArray(cache) ? [] : cache;
        if (cache.indexOf(obj2) >= 0) return obj2;
        cache.push(obj2);
        var isPlain1 = isPlainObject(obj1),
            isPlain2 = isPlainObject(obj2);
        if (!isPlain1 || !isPlain2) return shallowMerge(obj1, obj2);
        each(obj2, function (key, value) {
            obj1[key] = deepMerge(obj1[key], value, cache);
        });
        return obj1;
    };

    var shallowClone = function shallowClone(obj) {
        var type = toType(obj),
            Ctor = null;
        if (obj == null) return obj;
        Ctor = obj.constructor;
        if (/^(regexp|date)$/i.test(type)) return new Ctor(obj);
        if (/^(symbol|bigint)$/i.test(type)) return Object(obj);
        if (/^error$/i.test(type)) return new Ctor(obj.message);
        if (/^function$/i.test(type)) {
            return function anonymous() {
                return obj.apply(this, arguments);
            };
        }
        if (isPlainObject(obj) || type === "array") {
            var result = new Ctor();
            each(obj, function (key, value) {
                result[key] = value;
            });
            return result;
        }
        return obj;
    };

    var deepClone = function deepClone(obj, cache) {
        var type = toType(obj),
            Ctor = null,
            result = null;
        if (!isPlainObject(obj) && type !== "array") return shallowClone(obj);
        cache = !Array.isArray(cache) ? [] : cache;
        if (cache.indexOf(obj) >= 0) return obj;
        cache.push(obj);
        Ctor = obj.constructor;
        result = new Ctor();
        each(obj, function (key, value) {
            result[key] = deepClone(value, cache);
        });
        return result;
    };

    var utils = {
        toType: toType,
        isFunction: isFunction,
        isWindow: isWindow,
        isArrayLike: isArrayLike,
        isPlainObject: isPlainObject,
        isEmptyObject: isEmptyObject,
        isNumeric: isNumeric,
        each: each,
        shallowMerge: shallowMerge,
        deepMerge: deepMerge,
        shallowClone: shallowClone,
        deepClone: deepClone
    };

    /* 暴露API「支持浏览器直接导入 & webpack CommonJS模块导入」 */
    if (typeof window !== "undefined") {
        window.utils = utils;
    }

    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = utils;
    }
})();