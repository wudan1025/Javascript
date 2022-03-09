/*
 * @LastEditors: wudan01
 * @description: 文件描述
 */

let info = ['你好', 'hello', '蚌珠', '大大'];

var arr = [1, 2, 3, 4];
arr.sort(function () {
  return Math.random() - 0.5;
});
let arrString = {
  a: info[arr[0] - 1],
  b: info[arr[1] - 1],
  c: info[arr[2] - 1],
  d: info[arr[3] - 1],
};
console.log('arrString', arrString);
