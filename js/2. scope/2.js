/*
 * @LastEditors: wudan01
 * @description: 文件描述
 */

// 10
// console.log(a, b, c)
// var a = 12,
//   b = 13,
//   c = 14;

// function fn(a) {
//   console.log(a, b, c);
//   a = 100;
//   c = 200;
//   console.log(a, b, c);
// }
// b = fn(10);
// console.log(a, b, c);

// 11
// var foo = 'foo';
// console.log(foo); // foo
// {
//   console.log(foo);
//   function foo() {}
//   foo = 1;
//   console.log(foo);
// }
// console.log(foo);

// {
//   function foo() {}
//   foo = 1;
//   function foo() {}
//   foo = 2;
// }
// console.log(foo);

//
// 'use strict';
// var a = 4;
// function b(x, y, a) {
//   console.log(a); // 3
//   arguments[2] = 10;
//   console.log(a); // 非严格 10 / 严格 3
// }
// a = b(1, 2, 3);
// console.log(a); // undefined

// function fn(x, y) {
//   let arg = arguments;
//   x = 100;
//   console.log(arg[0]);

//   arg[1] = 200;
//   console.log(y);
// }
// fn(10);

// var test = (function (i) {
//   return function () {
//     console.log((i *= 2));
//   };
// })(2);
// test(5);

// var x = 5,
//   y = 6;
// function func() {
//   x += y;
//   func = function (y) {
//     console.log(y + --x);
//   };
//   console.log(x, y);
// }

// func(4);
// func(3);
// console.log(x, y);
