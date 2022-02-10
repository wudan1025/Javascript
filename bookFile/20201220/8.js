/*
 * 数据类型检测
 *   + typeof 
 *     + typeof null -> "object"
 *     + typeof 不能细分对象类型的值，返回结果都是 ”object“ 「检测函数返回”function“」
 *     + typeof 10 -> “number”
 *       typeof new Number(10) -> “object”
 *     + 底层原理：typeof是按照“值”在计算机中存储的“二进制”值来检测的，凡是以000开始的都认为是对象，null->000000
 *     + 优势：使用起来方便，而且检测原始值类型及函数类型还是很方便的
 * 
 *   + instanceof 
 *     + 检测某个实例是否率属于某个类「临时拉来做数据类型检测：弥补typeof的一些不足，可以细分部分对象」
 *     + 问题很多
 *       + 不能检测原始值类型
 *       + 原型链可以被肆意重构，导致结果不准确
 *       + ...
 *     + 底层原理
 *       xxx instanceof Ctor
 *       + 首先查找Symbol.hasInstance，如果存在基于这个检测  Ctor[Symbol.hasInstance](xxx)
 *       + 如果没有，则基于原型链__proto__查找：只要Ctor.prototype出现在xxx的原型链上，结果就是true
 * 
 *   + constructor
 *     + 和instanceof类似，都是拉来充数的，检测结果不一定准「constructor可以被肆意的修改」
 *     + 相当于instanceof来讲，他是支持原始值类型处理的，而且只会基于“直属类”来进行判断
 *     
 *   + Object.prototype.toString.call([val]) -> ({}).toString.call([val])
 *     + 除了null/undefined，大部分数据类型所属类的原型上，都有toString方法；但是除了 Object.prototype.toString 用来检测数据类型，其余的都是转换为字符串的
 *     + 很强大、很专业、很准确....除了写起来麻烦，没有其余毛病
 *       返回值："[object ？]"
 *         + 先查找[val]的 Symbol.toStringTag「先找私有的，私有没有则向所属类原型上找」 ,属性值就是“？”的值
 *         + 没有，则内部是返回当前实例所属构造函数的名字 “[object Number/String/Null/Undefined/Object/Array/Function/GeneratorFunction...]”
 * 
 * Array.isArray([val]):检测是否为数组
 * Object.is(NaN,NaN)===true:检测是否为NaN  => isNaN([val])
 * ...
 */
let class2type = {},
    toString = class2type.toString; //->Object.prototype.toString

/* class Fn {
    // 自己扩展
    // [Symbol.toStringTag]='Fn';
}
// Fn.prototype[Symbol.toStringTag] = 'Fn';
let f = new Fn;
console.log(toString.call(f)); */





//==========
/* let x = [];
console.log(x instanceof Array); //->true
console.log(x instanceof RegExp); //->false
console.log(x instanceof Object); //->true
// console.log(10 instanceof Number); //->false
// console.log(new Number(10) instanceof Number); //->true */

/* class Fn {
    // 基于ES6 Class方式构建Symbol.hasInstance才会生效
    static[Symbol.hasInstance](x) {
        // x -> 检测的实例
        return true;
    }
}
let f = new Fn;
// console.log([] instanceof Fn); //->true
// console.log(instance_of([], Fn)); //->true */

/* function Fn() {}
Fn.prototype = Array.prototype;
let f = new Fn;
console.log(f instanceof Array); //->true  但是f打死也不是数组啊 */

// 检测example是否为Ctor的实例「example是实例对象,Ctor是一个构造函数」
/* function instance_of(example, Ctor) {
    let exmType = typeof example,
        ctorType = typeof Ctor;
    // 保证Ctor是一个构造函数
    if (ctorType !== "function" || !Ctor.prototype) throw new TypeError('Ctor is not a constructor!');
    // 不处理原始值
    if (example == null) return false;
    if (!/^(object|function)$/i.test(exmType)) return false;

    // 优先检测 Symbol.hasInstance
    if (typeof Ctor[Symbol.hasInstance] === "function") {
        return Ctor[Symbol.hasInstance](example);
    }

    // 没有这个属性，再按照 Ctor.prototype 是否出现在 example 的原型链上检测
    let prototype = Object.getPrototypeOf(example);
    while (prototype) {
        if (prototype === Ctor.prototype) return true;
        prototype = Object.getPrototypeOf(prototype);
    }
    return false;
} */
// console.log(instance_of([], Array)); //->true
// console.log(instance_of([], RegExp)); //->false
// console.log(instance_of([], Object)); //->true