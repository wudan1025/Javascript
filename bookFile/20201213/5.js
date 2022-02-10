let submit = document.querySelector('#submit');
/* let isRuning = false;
submit.onclick = function () {
    if (isRuning) return;
    isRuning = true;
    // 异步请求「模拟每一次请求1000ms才可以获取到结果」
    setTimeout(() => {
        $.ajax({
            url: './code.txt',
            success(result) {
                console.log(result);
                isRuning = false;
            }
        });
    }, 1000);
}; */


/*
 * 设置一个WAIT时间，此时间是用户自己定义，多久内触发多次算是频繁触发
 * 函数防抖：在频繁触发的模式下，我们只识别一次「可以只识别第一次 immediate=true，也可以识别最后一次」
 */
// 每一次点击都设置一个定时器，间隔WAIT这么久执行HANDLE；
// 如果上一次定时器还没有执行「说明还没有到WAIT这么久呢」，就执行了下一次了，此时我们把上一次的干掉，重新设置即可
function debounce(func, wait, immediate) {
    if (typeof func !== "function") throw new TypeError('func must be a function!');
    if (typeof wait === "undefined") {
        wait = 500;
        immediate = false;
    }
    if (typeof wait === "boolean") {
        immediate = wait;
        wait = 500;
    }
    if (typeof wait !== "number") throw new TypeError('wait must be a number!');
    if (typeof immediate !== "boolean") throw new TypeError('immediate must be a boolean!');

    var timer = null,
        result;
    return function proxy() {
        var self = this,
            params = [].slice.call(arguments),
            callNow = !timer && immediate;
        if (timer) clearTimeout(timer);
        timer = setTimeout(function () {
            // 清除最后一次定时器
            clearTimeout(timer);
            timer = null;
            // 符合执行的是最后一次「触发在结束边界」
            if (!immediate) result = func.apply(self, params);
        }, wait);
        // 符合第一次立即执行「触发在开始的边界」
        if (callNow) result = func.apply(self, params);
        return result;
    };
}

/* function debounce(func, wait, immediate) {
    let timer = null;
    return function proxy(...params) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            func.call(this, ...params);
        }, wait);
    };
} */

const handle = function handle(ev) {
    console.log(this, ev);
    /* setTimeout(() => {
        $.ajax({
            url: './code.txt',
            success(result) {
                console.log(result);
            }
        });
    }, 1000); */
};
submit.onclick = debounce(handle, true);
// submit.onclick=proxy;
// 用户疯狂点击，proxy函数会疯狂的执行，但是我们最后要执行的是handle，所以我们只需要在proxy执行多次的时候，基于一些列的判断处理，让handle只执行一次即可
// submit.onclick = handle; //this->submit  传递一个事件对象ev


/* 
// timer数字，代表当前是第几个定时器
let timer = setTimeout(() => {}, 1000);
// 清除定时器 
clearTimeout(timer);
// 此时timer还是数字，此时我们最好把他赋值为null，这样我们后期可以基于timer是否为null来验证定时器是否存在
timer = null; 
*/