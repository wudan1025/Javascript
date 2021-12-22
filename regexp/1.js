/*
 * @LastEditors: wudan01
 * @description: 文件描述
 */

// window.location.search.substring(1);
let query =
  'fileJson=https://mv.xesimg.com/XESlides/slidev2/slide_172077/1623135301208.json&env=3&startPage=62';

// 相同
// let reg = /([a-zA-Z0-9:/._]+)=([a-zA-Z0-9:/._]+)&?/g;
let reg = /([\w:/._]+)=([\w:/._]+)&?/g;

let result = [];
query = query.replace(reg, function ($0, $1, $2) {
  result.push({
    [$1]: $2,
  });
  return $0;
});

console.log(result);
console.log(query);
