/*
 * @LastEditors: wudan01
 * @description: 千分符设置
 */

// 方法1 
/*
var str = '12344565645';
str = str.split('').reverse().join('');

str = str.replace(/\d{3}/g, function ($0, $1) {
  console.log($0);
  console.log($1);
  return $0 + ',';
});

str = str.split('').reverse().join('');
console.log(str);
*/

// 方法2

var str = '12344565645';

// (?= (\d{ 3 }) +$) 表示匹配 3个一组结尾的， ?= 表示会从尾向前匹配

str = str.replace(/\d{1,3}(?=(\d{3})+$)/g, function ($0) {
  return $0 + ',';
});

console.log(str)


