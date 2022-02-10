/*
 * @LastEditors: wudan01
 * @description: 文件描述
 */
/*
let arr = [27.2, 0, '0013', '14px', 123];
// arr = arr.map(parseInt); //  [27, NaN, 1, 1, 27]

// 不等价
// arr = arr.map((arr) => {
//   // [27, 0, 13, 14, 123]
//   问题点 parseInt 接收两个参数
//   return parseInt(arr);
// });

// 等价于
arr = arr.map((el, idx, arr) => {
  return parseInt(el, idx); //  [27, NaN, 1, 1, 27]
});

console.log(arr);*/

/*
var numbers = [1, 4, 9];
// var roots = numbers.map(Math.sqrt);
// 等价于
var roots = numbers.map((num, idx) => {
  return Math.sqrt(num);
});
console.log(roots);
*/

// var a = ?;

var a = {
  b: 0,
  toString: function () {
    return ++this.b;
  },
};

if (a == 1 && a == 2 && a == 3) {
  console.log('OK');
}
