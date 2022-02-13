// 普通函数
// "use strict"
// function fn() {
//     console.log(this);
// }
// fn();


// 成员访问
// "use strict";
// function fn() {
//     console.log(this);
// }
// let obj = {
//     name: 'test',
//     // 写法1
//     fn,
//     // 等价写法2
//     // fn: fn,
//     // 等价写法3
//     // fn() {
//     //     console.log(this);
//     // }
// };
// obj.fn(); 


// 匿名函数
// 同普通函数执行
// "use strict";
// (function (x) {
//     console.log(this); //->window/undefined
// })(10);


// 回调函数：
// 把一个函数A作为实参，传递给另外一个执行的函数B「在B函数执行中，可以把A执行」
// "use strict";
// function fn(callback) {
//     // callback -> 匿名函数
//     callback();
// }
// fn(function () {
//     console.log(this);
// }); 

// 括号表达式
// "use strict"; //开起JS严格模式（默认是非严格模式）？
// function fn() {
//     console.log(this);
// }
// let obj = {
//     name: 'zhufeng',
//     fn
//     // fn: fn
// };
// // 括号内不止一项
// (10, obj.fn)(); 


// 回调函数 
// js 内置函数做处理的情况
// let arr = [10, 20, 30];
// arr.forEach(function (item, index) {
//     console.log(this); //->window
// });
// arr.forEach(function (item, index) {
//     console.log(this); //->forEach第二个参数「对象」  forEach内部做处理了
// }, { xxx: 'xxx' });
// setTimeout(function (x) {
//     console.log(this, x); //->window 10
// }, 1000, 10); 