/*
 * @LastEditors: wudan01
 * @description: 文件描述
 */

var str = '12344565645';
str = str.split('').reverse().join('');

str = str.replace(/\d{3}/g, function ($0, $1) {
  console.log($0);
  console.log($1);
  return $0 + ',';
});

str = str.split('').reverse().join('');
console.log(str);
