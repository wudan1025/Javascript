/*
 * @LastEditors: wudan01
 * @description: 文件描述
 */
/*
enum E1 {
  a,
  b,
}

let e5: E1.a = 3;
*/
/*
enum E5 {
  a,
  b,
}
let e6: E5 = 3;
*/
// enum XES_SVG_LIST {
//   // 枚举值是一个对象
//   // @ts-ignore
//   ShapeRect = XES_SVG_LIST_ARR[0],
//   // @ts-ignore
//   ShapeEllipse = XES_SVG_LIST_ARR[1],
// }
// let e6: XES_SVG_LIST = 3;
var enumType;
(function (enumType) {
  // @ts-ignore
  enumType[(enumType['type1'] = { value: 1, text: '文字1' })] = 'type1';
  // @ts-ignore
  enumType[(enumType['type2'] = { value: 2, text: '文字2' })] = 'type2';
})(enumType || (enumType = {}));
//引入枚举
var enumType1 = enumType; //类型枚举
var typelist1 = []; //枚举数据集
//在create方法 调用
// console.log(enumType1);
for (var key1 in enumType1) {
  console.log('key1' + key1);
  var temp = enumType1[key1];
  console.log('temp' + temp);
  if (temp.toString().indexOf('type') > -1) {
  } else {
    typelist1.push(enumType1[key1]);
  }
}
console.log(typelist1);
