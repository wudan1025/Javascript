/*
 * 原始值类型「基本数据类型」
 *    + undefined
 *    + null
 *    + boolean
 *    + number
 *      + NaN
 *      + Infinity
 *    + string
 *    + symbol
 *      + 可以做为对象的属性（属性的类型不是传统的String了）
 *      + 创建唯一值的
 *    + bigint
 * 对象类型「下数所说的应该都是基于构造函数创造出来的实例」
 *    + Object 普通对象
 *    + Array 数组对象
 *    + RegExp 正则对象
 *    + Date 日期对象
 *    + Error 错误对象
 *    + Set/Map
 *    + ----
 *    + Math 数学函数对象
 *    + JSON JSON对象
 *    + ArrayBuffer DataView
 *    + ----
 *    + 生成器函数
 *    + Promise Proxy Reflect
 *    + ----
 *    + Number对象 \ String对象 \ Boolean布尔对象 \ Symbol符号对象 ...
 */

// 应用：作为对象的非String类型的属性、创建唯一标识「统一宏管理」、内置原理也是基于Symbol的一些属性实现的...
/* let sym1 = Symbol('A'),
    sym2 = Symbol('A');
console.log(sym1 === sym2); //->false */

/* let sym = Symbol('A');
let obj = {
    name: '珠峰培训',
    0: 10,
    [Symbol()]: 100,
    [sym]: 200
};
// obj['name']
// obj[0]
// obj['0']
console.log(obj[Symbol()]); //->undefined
console.log(obj[sym]); //->200
console.log(Object.getOwnPropertySymbols(obj)); //->[Symbol(), Symbol(A)] */

/* Symbol.hasInstance
Symbol.toPrimitive
Symbol.toStringTag
Symbol.iterator
// ... */

// bigint:超大数字处理
// Number.MAX_SAFE_INTEGER 9007199254740991 最大安全数字，超过安全数字，再进行运算，运算结果就不一定准确了
// 场景：前后端数据通信中，服务器是可以存储超长数字，但是如果把大数返回客户端，处理起来不一定准确