jQuery.extend = jQuery.fn.extend = function () {
    var options, name, src, copy, copyIsArray, clone,
        target = arguments[0] || {}, //传递的第一项
        i = 1,
        length = arguments.length, //传递实参的个数
        deep = false; //是否为深比较合并

    // $.extend(true,obj1,obj2...)
    if (typeof target === "boolean") {
        deep = target;
        target = arguments[i] || {}; //target -> 传递的第一个对象
        i++; //i -> 2
    }
    
    if (typeof target !== "object" && !isFunction(target)) target = {};

    // $.extend(obj) || $.fn.extend(obj) || $.extend(true,obj)
    if (i === length) {
        target = this; //target -> $/$.fn
        i--; //i -> 0/1 传递进来obj在ARGS集合中的索引
    }

    for (; i < length; i++) {
        // $/$.fn.extend(obj) -> target:$/$.fn  options:obj
        // $.extend([true?],obj1,obj2,obj3...) -> target:obj1  options:obj2/obj3/...
        if ((options = arguments[i]) != null) {
            // 把options中的每一项替换target中的
            for (name in options) {
                copy = options[name]; //copy -> options每一项的值

                // Prevent Object.prototype pollution
                // Prevent never-ending loop
                if (name === "__proto__" || target === copy) {
                    continue;
                }

                if (deep && copy && (jQuery.isPlainObject(copy) ||
                        (copyIsArray = Array.isArray(copy)))) {
                    // 只有options中获取的这一项是 纯粹的对象/数组 才有必要进行深度比较合并
                    src = target[name]; //copy->options这一项值  src->target中的这一项值
                    if (copyIsArray && !Array.isArray(src)) {
                        clone = [];
                    } else if (!copyIsArray && !jQuery.isPlainObject(src)) {
                        clone = {};
                    } else {
                        clone = src;
                    }
                    // clone 替换 src「target中的这一项值」
                    copyIsArray = false;

                    target[name] = jQuery.extend(deep, clone, copy);
                } else if (copy !== undefined) {
                    // 浅合并:只需要把options中的每一项copy，替换target中当前同名这一项即可
                    target[name] = copy;
                }
            }
        }
    }
    return target;
};


/* // 自己写一个支持用户自定义扩展属性和方法的extend
// 依赖 utils.js
(function (_) {
    function ModalPlugin() {}
    // ...

    ModalPlugin.extend = ModalPlugin.prototype.extend = function (obj) {
        var self = this;
        _.each(obj, function (value, key) {
            self[key] = value;
        });
        return self;
    };

    // ...
})(utils);
ModalPlugin.extend({

});
ModalPlugin.prototype.extend({

}); */