/*
 * @LastEditors: wudan01
 * @description: 文件描述
 */
let a = {
  a: 'undefined',
};

if ('b' in a) {
  console.log(true);
}

if ('a' in a) {
  console.log(true);
}

if (a.a == undefined) {
  console.log('123');
}
console.log(a.b == undefined);
