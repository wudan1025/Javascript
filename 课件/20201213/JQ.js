/*
 * JS代码执行的环境：
 *   + 浏览器：PC端、移动端 「webkit、gecko、trident、blink...」
 *   + Hybrid混合APP开发：把H5页面嵌入都native app（IOS/安卓）的webview中「webkit」
 *   -----window
 *   + node：一个基于v8引擎，渲染和解析JS的环境
 *   -----没有window，全局对象global
 *   + 小程序
 *   + ...
 */
/* var A = typeof window !== "undefined" ? window : this;
// 如果A===window：说明是浏览器、webview中运行
// 如果是在Node环境下运行，A可能是Global，也可能是当前模块
var B = function (window, noGlobal) {
    // 浏览器环境下执行这个函数
    //  window -> window
    //  noGlobal -> undefined
    // webpack环境下导入执行
    //  window -> window
    //  noGlobal -> true
    "use strict";

    var version = "3.5.1",
        jQuery = function (selector, context) {
            return new jQuery.fn.init(selector, context);
        };
    // ...

    if (typeof noGlobal === "undefined") {
        // 浏览器直接导入
        window.jQuery = window.$ = jQuery;
    }

    return jQuery;
};

(function (global, factory) {
    "use strict";
    if (typeof module === "object" && typeof module.exports === "object") {
        // module & module.exports CommonJS模块规范「Node」
        module.exports = global.document ?
            // 即支持CommonJS规范，也有window  例如：webpack工程化环境
            // =>module.exports=jQuery;
            //   + import $ from 'jquery'   $->jQuery
            //   + let $=require('jquery')  $->jQuery
            factory(global, true) :
            function (w) {
                if (!w.document) {
                    throw new Error("jQuery requires a window with a document");
                }
                return factory(w);
            };
    } else {
        // 不支持CommonJS规范的「浏览器环境」
        // global->window
        // <script src='jquery.min.js'></script>
        factory(global);
    }
})(A, B); */

//==========
function factory(window, noGlobal) {
    "use strict";
    var jQuery = function (selector, context) {
        return new jQuery.fn.init(selector, context);
    };

    // ...

    /* 冲突处理 */
    var _jQuery = window.jQuery,
        _$ = window.$;
    jQuery.noConflict = function (deep) {
        if (window.$ === jQuery) {
            window.$ = _$;
        }
        if (deep && window.jQuery === jQuery) {
            window.jQuery = _jQuery;
        }
        return jQuery;
    };

    /* 暴露API */
    if (typeof define === "function" && define.amd) {
        define("jquery", [], function () {
            return jQuery;
        });
    }
    if (typeof noGlobal === "undefined") {
        window.jQuery = window.$ = jQuery;
    }
    return jQuery;
}