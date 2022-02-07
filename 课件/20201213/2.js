/* 惰性思想 */

/* function getCss(element, attr) {
    // 处理兼容
    if (window.getComputedStyle) {
        return window.getComputedStyle(element)[attr];
    }
    return element.currentStyle[attr];
} */

/* let utils = (function () {
    let compatible = window.getComputedStyle ? true : false;

    const getCss = function getCss() {
        if (compatible) {
            return window.getComputedStyle(element)[attr];
        }
        return element.currentStyle[attr];
    };

    return {
        getCss
    };
})(); */


// 需求：一个超级复杂的业务函数，而且会被执行N次，后续执行，依然想使用第一次执行处理好的逻辑，这样我们不期望每一次执行，逻辑都重新判断一下，此时基于惰性思想「函数重构」可以实现性能的优化
function getCss(element, attr) {
    if (window.getComputedStyle) {
        getCss = function (element, attr) {
            return window.getComputedStyle(element)[attr];
        };
    } else {
        getCss = function (element, attr) {
            return element.currentStyle[attr];
        };
    }
    // 第一次把重写后的函数执行，获取对应样式
    return getCss(element, attr);
}

let body = document.body;
console.log(getCss(body, 'width'));
console.log(getCss(body, 'height'));
// ...