/*
 * @LastEditors: wudan01
 * @description: 文件描述
 */
/*
 * 数据类型检测
 *   typeof 返回字符串
 *      typeof null ->"object"
 *      typeof 实现CALL的对象「函数、箭头函数、生成器函数、构造函数」 ->"function"
 *      typeof 剩下未实现CALL的对象 ->"object"
 *
 *   ECMAScript提供的内置类型在计算机底层都是按照二进制数据存储的
 *      以对应的数字开始代表不同的类型
 *      1:数字   010:浮点数
 *      100:字符串
 *      110:布尔
 *      -2^30:undefined
 *      000000:null
 *      000:对象
 *    设计上的缺陷
 */
// console.log(typeof typeof []); //->”string“

// 数据类型转换
// 对象转换为数字/字符串「字符串拼接、数学运算、特殊方法处理、==比较（隐式转换、显式转换）...」
//  + 首先检测对象的 Symbol.toPrimitive 这个属性，获取其原始值
//  + 如果没有这个属性，则继续调用它的valueOf，也是获取原始值
//  + 如果值不是原始值，则继续调用toString转换为字符串
//  + 再把字符串基于Number转换为数字

/* let obj = {
    name: 'xxx'
};
console.log(obj - 10); //数学运算：先把obj隐式转换为数字，再进行运算 */
/* 
let obj = {
    name: 'xxx',
    [Symbol.toPrimitive](hint) {
        // hint检测到浏览器隐式规定的转换类型:'number'/'string'/'default'
        return 10;
    }
};
console.log(obj - 10); */
