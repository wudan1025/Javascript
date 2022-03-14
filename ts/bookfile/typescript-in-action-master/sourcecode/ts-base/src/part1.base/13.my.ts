/*
 * @LastEditors: wudan01
 * @description: 文件描述
 */
// interface Length {
//     length: number
// }

// function logAdvance2<a extends Length>(value: a): a {
//     console.log(value, value.length);
//     return value;
// }
// logAdvance2([1])
// logAdvance2('123')
// logAdvance2({ length: 3 })

class Log<T> {
  // 无法约束静态方法
  static run1(value: T) {
    console.log(value);
    return value;
  }

  run(value: T) {
    console.log(value);
    return value;
  }
}
let log11 = new Log<number>();
log11.run(1);
let log22 = new Log();
log22.run({ a: 1 });
