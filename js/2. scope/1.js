// var a = { n: 12 };
// var b = a;
// b = { n: 13 };
// console.log(a.n); // 12

// todo 错误
// var a = { n: 1 };
// var b = a;
// a.x = a = { n: 2 };
// console.log(a.x); // {n:2}
// console.log(b); // {n:1}

// var x = [12, 23];
// function fn(y) {
//   y[0] = 100;
//   y = [100];
//   y[1] = 200;
//   console.log(y); // [100,200]
// }
// fn(x);
// console.log(x); // [100,23]

// let x = 5;
// function fn(x) {
//   return function (y) {
//     console.log(y + ++x);
//   };
// }
// let f = fn(6); // x : 6
// f(7); // y : 7 ++x x:7 结果 7+7 = 14
// fn(8)(9); // x 8 y 9  ++x x:9 结果 9+9 = 18
// f(10); // 在 f(7)这一步，当前作用域x被修改为7 ++x: 8 ,y :10, 结果 18
// console.log(x); // 5 取全局作用域x

// // 容易出错点
// // 1. ++x ,运算律从右向左，x 先自增，再拿自增后的结果 与 另一个变量相加
// // 2. f(7); 会修改当前作用域的x  fn(8)(9); 会获取新的返回函数，与 f(7) 无关
// // f(10),与 f(7) 相同，x 当前为 7

// let a = 0,
//   b = 0;
// function A(a) {
//   A = function (b) {
//     console.log(a + b++);
//     // alert(a + b++);
//   };
//   // alert(a++);
//   console.log(a++);
// }
// A(1); // a=1,a++ a=2 alert=>1
// A(2); // funA 被修改 b=2 ,a=2 ,a+b++ = 4 b: 3

// let n = 10; //->VO(G)  n->10
// console.log(n); //=>10
// console.log(window.n); //=>undefined

// 'use strict'; //开起JS严格模式（默认是非严格模式）？
// function fn() {
//   console.log(this);
// }
// let obj = {
//   name: 'zhufeng',
//   fn,
// };
// fn(); // window
// obj.fn(); // obj
// (10, obj.fn)(); //

// let arr = [10, 20, 30];
// arr.forEach(function (item, index) {
//   console.log(this); //->window
// });
// arr.forEach(
//   function (item, index) {
//     console.log(this); //->forEach第二个参数「对象」  forEach内部做处理了
//   },
//   { xxx: 'xxx' }
// );

// setTimeout(
//   function (x) {
//     console.log(this, x); //->window 10
//   },
//   // 1000 为延时
//   1000,
//   // 10 为传递的参数
//   10
// );

// todo
// let add = curring();
// let res = add(1)(2)(3);
// console.log(res); //->6

// add = curring();
// res = add(1, 2, 3)(4);
// console.log(res); //->10

// add = curring();
// res = add(1)(2)(3)(4)(5);
// console.log(res); //->15

// 在函数式编程当中有一个很重要的概念就是函数组合， 实际上就是把处理数据的函数像管道一样连接起来， 然后让数据穿过管道得到最终的结果。 例如：
// const add1 = (x) => x + 1;
// const mul3 = (x) => x * 3;
// const div2 = (x) => x / 2;
// div2(mul3(add1(add1(0)))); //=>3

// 而这样的写法可读性明显太差了，我们可以构建一个compose函数，它接受任意多个函数作为参数（这些函数都只接受一个参数），然后compose返回的也是一个函数，达到以下的效果：
// const operate = compose(div2, mul3, add1, add1)
// operate(0) //=>相当于div2(mul3(add1(add1(0))))
// operate(2) //=>相当于div2(mul3(add1(add1(2))))

// 简而言之：compose可以把类似于f(g(h(x)))这种写法简化成compose(f, g, h)(x)，请你完成 compose函数的编写
