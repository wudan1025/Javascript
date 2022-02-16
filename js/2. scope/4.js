/*
 * @LastEditors: wudan01
 * @description: 文件描述
 */

// 实现一种
// function fn(...args1) {
//   return function (...args2) {
//     return args1.concat(args2).reduce((pre, cur) => {
//       return pre + cur;
//     });
//   };
// }

// var result = fn(1, 2)(3);
// console.log(result);

function curring(index) {
  let total = 0;
  var addFn = function (...arg) {
    index--;
    total += arg.reduce((pre, cur) => {
      return pre + cur;
    });
    if (index == 0) {
      return total;
    } else {
      return addFn;
    }
  };
  return addFn;
}

// 实现多个
var add = curring(3);
var res = add(1)(2)(3);
console.log(res); //->6

add = curring(2);
res = add(1, 2, 3)(4);
console.log(res); //->10

add = curring(5);
res = add(1)(2)(3)(4)(5);
console.log(res); //->15 */
