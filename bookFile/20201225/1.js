var arr = [];
var push = arr.push;
var slice = arr.slice;

var
    version = "3.5.1",
    jQuery = function jQuery(selector, context) {
        return new jQuery.fn.init(selector, context);
    };

// 原型方法：供实例调用
jQuery.fn = jQuery.prototype = {
    jquery: version,
    constructor: jQuery,
    // 支持负数索引/不传递索引
    get: function (num) {
        if (num == null) {
            return slice.call(this);
        }
        return num < 0 ? this[num + this.length] : this[num];
    },
    eq: function (i) {
        var len = this.length,
            j = +i + (i < 0 ? len : 0);
        return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
    },
    pushStack: function (elems) {
        var ret = jQuery.merge(this.constructor(), elems);
        ret.prevObject = this;
        return ret;
    },
    push: push,
    sort: arr.sort,
    splice: arr.splice,
    //...
};

var rootjQuery = jQuery(document),
    rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,
    init = jQuery.fn.init = function (selector, context, root) {
        // this -> JQ的实例对象
        var match, elem;

        // HANDLE: $(""), $(null), $(undefined), $(false)
        if (!selector) {
            return this;
        }

        // Method init() accepts an alternate rootjQuery
        // so migrate can support jQuery.sub (gh-2101)
        root = root || rootjQuery;

        // Handle HTML strings
        if (typeof selector === "string") {
            if (selector[0] === "<" &&
                selector[selector.length - 1] === ">" &&
                selector.length >= 3) {

                // Assume that strings that start and end with <> are HTML and skip the regex check
                match = [null, selector, null];

            } else {
                match = rquickExpr.exec(selector);
            }

            // Match html or make sure no context is specified for #id
            if (match && (match[1] || !context)) {

                // HANDLE: $(html) -> $(array)
                if (match[1]) {
                    context = context instanceof jQuery ? context[0] : context;

                    // Option to run scripts is true for back-compat
                    // Intentionally let the error be thrown if parseHTML is not present
                    jQuery.merge(this, jQuery.parseHTML(
                        match[1],
                        context && context.nodeType ? context.ownerDocument || context : document,
                        true
                    ));

                    // HANDLE: $(html, props)
                    if (rsingleTag.test(match[1]) && jQuery.isPlainObject(context)) {
                        for (match in context) {

                            // Properties of context are called as methods if possible
                            if (isFunction(this[match])) {
                                this[match](context[match]);

                                // ...and otherwise set as attributes
                            } else {
                                this.attr(match, context[match]);
                            }
                        }
                    }

                    return this;

                    // HANDLE: $(#id)
                } else {
                    elem = document.getElementById(match[2]);

                    if (elem) {

                        // Inject the element directly into the jQuery object
                        this[0] = elem;
                        this.length = 1;
                    }
                    return this;
                }

                // HANDLE: $(expr, $(...))
            } else if (!context || context.jquery) {
                return (context || root).find(selector);

                // HANDLE: $(expr, context)
                // (which is just equivalent to: $(context).find(expr)
            } else {
                return this.constructor(context).find(selector);
            }

            // HANDLE: $(DOMElement)
        } else if (selector.nodeType) {
            this[0] = selector;
            this.length = 1;
            return this;

            // HANDLE: $(function)
            // Shortcut for document ready
        } else if (isFunction(selector)) {
            // root->$(document) JQ对象
            return root.ready !== undefined ?
                root.ready(selector) :

                // Execute immediately if ready is not present
                selector(jQuery);
        }

        return jQuery.makeArray(selector, this);
    };
init.prototype = jQuery.fn;


// 把类数组转换为数组 $([类数组])
// 把两个数组或者类数拼接在一起
jQuery.makeArray = function makeArray(arr, results) {
    var ret = results || [];
    if (arr != null) {
        if (isArrayLike(Object(arr))) {
            jQuery.merge(ret,
                typeof arr === "string" ? [arr] : arr
            );
        } else {
            // 在不清楚是数组还是类数组集合的时候，我们尽可能使用 [].xxx.call(xxx) 借用的方法来调用数组的方法
            //   + 不考虑兼容以及结构是否变化的情况下，也可以Array.from(xxx)都变为数组 
            push.call(ret, arr);
        }
    }
    return ret;
};

// 合并数据/类数组：把两个集合拼接在一起「第一个集合中」，最后返回第一个集合
jQuery.merge = function merge(first, second) {
    var len = +second.length,
        j = 0,
        i = first.length;
    for (; j < len; j++) {
        first[i++] = second[j];
    }
    // 数组可以自动累加长度，但是类数组不会
    first.length = i;
    return first;
};