/*
 * @LastEditors: wudan01
 * @description: 文件描述
 */
var obj = {
  a: 1,
  [Symbol()]: 100,
};

// Object.prototype === obj.__proto__; // ture
Object.prototype.geta = function geta() {
  console.log('geta');
};

Object.__proto__.b = '123';

// hasOwnProperty 属性是否在实例上
// obj.hasOwnProperty('a');
// true;
// obj.hasOwnProperty('b');
// false;
