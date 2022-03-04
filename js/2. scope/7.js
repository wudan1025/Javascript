/*
 * @LastEditors: wudan01
 * @description: 文件描述
 */

const obj = {};

Object.defineProperty(obj, 'b', {
  value: 1,
  writable: true,
});

Object.defineProperty(obj, 'a', {
  get: function () {
    if (obj.b) {
      obj.b += 1;
    }
  },
});

console.log(obj.b); // 1

obj.a += 1;

console.log(obj.b); // 2

obj.a += 1;

console.log(obj.b); // 3

obj.a += 1;

console.log(obj.b); // 4
