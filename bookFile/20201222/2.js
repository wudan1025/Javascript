//========================
// $ -> jQuery
// $('.box').addClass()
//    + $(...) -> 创造jQuery类的实例  JQ对象「jQuery的实例对象」
//    + jQuery是一个函数「构造函数」

// JQ是一个类库「提供大量的方法」
//   + jQuery.prototype  供其实例调用的「$(...).xxx()」
//   + jQuery.xxx 静态私有的属性和方法  「$.xxx()」

//=======================
/* var
    version = "3.5.1",
    jQuery = function jQuery(selector, context) {
        // selector:选择器类型 「字符串（选择器/HTML字符串）、函数、DOM元素对象...」
        // context:上下文，限制其获取的范围
        return new jQuery.fn.init(selector, context);
    };

// 原型方法：供实例调用
jQuery.fn = jQuery.prototype = {
    jquery: version,
    constructor: jQuery,
    // ...
};

// 把其当做普通对象，设置的静态私有属性和方法
jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
// ...


var rootjQuery = jQuery(document),
    rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,
    init = jQuery.fn.init = function (selector, context, root) {
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
            return root.ready !== undefined ?
                root.ready(selector) :

                // Execute immediately if ready is not present
                selector(jQuery);
        }

        return jQuery.makeArray(selector, this);
    };
init.prototype = jQuery.fn;
 */



// $() -> jQuery()
// $.fn -> jQuery.prototype 

// $('.box a')
// $('a',box)