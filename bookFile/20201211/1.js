/* "use strict";
var a = 4;
function b(x, y, a) {
    console.log(a);
    arguments[2] = 10;
    console.log(a);
}
a = b(1, 2, 3);
console.log(a); */


/* 
function fn(x, y) {
    /!*
     * EC(FN)
     *   作用域链:<EC(FN),EC(G)>
     *   初始ARGUMENTS: {0:10,length:1} 
     *   形参赋值:x=10 y=undefined
     *      「映射关系」  x->arguments[0]
     *   变量提升:--
     *!/
    let arg = arguments;
    x = 100;
    console.log(arg[0]); //=>100

    arg[1] = 200;
    console.log(y); //=>undefined
}
fn(10); 
*/

/*
/!*
 * EC(G)
 *   var test;  -> 0x0001
 *!/
var test = (function (i) {
    /!* 
     * EC(AN)
     *   作用域链:<EC(AN),EC(G)>
     *   形参赋值:i=2  ->4
     *   变量提升:--
     *!/
    return function () {
        /!*
         * EC(TEST)
         *   作用域链:<EC(TEST),EC(AN)> 
         *   初始ARG:{0:5,length:1}
         *   形参赋值:--
         *   变量提升:--
         *!/
        alert(i *= 2); //=>i=i*2  "4"
    }; //=>return 0x0001;  [[scope]]:EC(AN)
})(2);
test(5);
*/

/* var x = 5,
    y = 6;
function func() {
    x += y;
    func = function (y) {
        console.log(y + (--x));
    };
    console.log(x, y);
}
func(4);
func(3);
console.log(x, y); */

/* 
 * 简述你对闭包的理解，以及其优缺点？ 
 *   面试回答不好就是不会（或者不扎实、没吃透），不要找其它借口！！
 *   --
 *   开放性的技术问题回答策略：引导面试官问自己擅长的
 *     像讲故事一样，穿插一些过渡词，否则给面试官“背书”的感觉
 *     理论知识：EC/VO/AO/SCOPE/GC垃圾回收机制「堆栈内存」
 *     结合实战：
 *     深入研究：JS高阶编程技巧,单例模式 惰性思想 柯理化 compose组合函数 ...
 *     插件和源码：
 *     最后一个综述
 * 
 * 剧本精神：写成稿子自己背
 */

/* 
 * 匿名函数“具名化”：建议/标准 
 *   + 自执行函数
 *   + 函数表达式 
 *     const fn=function fn(){};
 *     document.body.onclick=function bodyClick(){};
 *     Array.prototype.unique=function unique(){};
 *     ...
 *   + 回调函数
 *   + ...
 */
/* "use strict";
(function (x) {
    // ...
    // 在JS严格模式下不支持
    console.log(arguments.callee); //函数本身「只能在函数内部使用」
    console.log(arguments.callee.caller); //函数执行所在的上下文对应的函数
})(10); */

/* 
function fn() {
    console.log(arguments.callee.caller); //=>b函数「就是在自己上下文中执行的，返回null」
}
function b() {
    fn();
}
b();
*/

/* 
(function fn(x) {
    // ...
    // console.log(fn); //函数本身，这样就可以在函数内部使用了
    fn();
})(10);
// console.log(fn); //=>Uncaught ReferenceError: fn is not defined 匿名函数具名化和实名函数不是一个概念「具名化的名字不能再函数以外使用」 
*/

/* (function fn(x) {
    fn = 10; //并且值是不允许修改的
    console.log(fn); //函数
})(10); */

/* (function fn(x) {
    let fn = 10; //如果这个名字有被当前上下文重新声明过，则以重新声明的为准「具名化的优先级低」
    console.log(fn); //=>10
})(10); */

/* var b = 10;
(function b() {
    b = 20;
    console.log(b); //=>函数
})();
console.log(b); //=>10 */

/* var b = 10;
(function b() {
    var b = 20;
    console.log(b); //=>20
})();
console.log(b); //=>10 */