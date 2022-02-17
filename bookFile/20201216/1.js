/* 
 * JS内置类 
 *   + Number  String  Boolean  Symbol  BigInt
 *   + Object
 *      + Object
 *      + Array
 *      + NodeList、HTMLCollection...
 *      + RegExp
 *      + Date
 *      + Set
 *      + Map
 *      + ...
 *   + Function 
 * 
 * 每一个HTML元素对象都有一个自己所属的类：
 *    divDOM对象（实例） ->  HTMLDivElement  ->  HTMLElement  ->  Element -> Node -> EventTarget -> Object
 */


/* 
 * 自定义类「自己搞点类，和创建他的实例」
 */
/* function Fn(x, y) {
    let total = x + y;
    this.x = x;
    this.y = y;
    return total;
} */
// let total = Fn(10, 20);


// Fn：类「构造函数」 -> 所有的类都是函数数据类型的（包含内置类）
//  + Number/String/Boolean/Symbol/BigInt/Object/Array/RegExp/Function... 
// console.log(typeof Object); //=>"function"
// console.log(typeof Array); //=>"function"

// f:实例对象 -> 所有的实例都是对象类型的「但是JS中有特殊性」
//    function sum(){}  -> Function实例  ->  typeof sum==="function"
//    let arr=[]  -> Array实例  -> 首先是一个数组，其次才是对象

// JS中创建值(实例)有两种方案：
//   + 字面量方案  
//   + 构造函数方案  
// 对于对象和函数类型来讲，两种方案除了语法上的区别，没有啥特别的不同；但是对于原始值类型，区别还是很大的
// 「字面量方式返回的是原始值类型，但是构造函数方式返回的都是对象类型，但是都是所属类的实例」；
/* 
let n = 10; //原始值
let m = new Number(10); //对象
console.log(m.toFixed(2)); //->'10.00'
console.log(n.toFixed(2)); //->'10.00'  浏览器默认会把“n”转换为“new Number(n)”对象类型的实例
console.log(n - 10); //->0
console.log(m - 10); //->0  浏览器会默认把对象转换为数字「Symbol.toPrimitive -> valueOf -> toString -> Number」 
*/

// 特殊的：Symbol / BigInt 是不允许被new的
// Uncaught TypeError: Symbol/BigInt is not a constructor 不是构造函数不允许被new
// -> 想获取Symbol对应的对象类型值  => Object([value])获取当前[value]对应的对象类型值

// let f = new Fn(10, 20);

//=====================
function Fn(x, y) {
    let total = x + y;
    this.x = x;
    this.y = y;
    this.say = function () { };
    return total;
}
let f = new Fn(10, 20);
let f2 = new Fn; //这样也会把Fn执行，也会创建其实例对象
// new Fn  VS  new Fn()
//  + 第二个可以传递实参，第一个不能
//  + 运算符优先级的区别
// https://developer.mozilla.org/zh-cn/docs/web/javascript/reference/operators/operator_precedence
//    + new Fn()  20
//    + new Fn  19
//    + 成员访问  obj.xx  20

/* new Fn().say()
// + new Fn()
// + 实例.say() */

/* new Fn.say();
//  + Fn.say 值V
//  + new V() */


// console.log(f.x); //->10
// console.log(f.total); //->undefined

// 验证某个实例是否率属于这个类  instanceof
/* console.log(f instanceof Fn); //->true
console.log(f instanceof Array); //->false
console.log(f instanceof Object); //->true */
/* console.log(1 instanceof Number); //->false
console.log(new Number(1) instanceof Number); //->true */


// 验证一个属性是否属于这个对象：attr in object
// 验证一个属性是否属于这个对象的私有属性：[object].hasOwnProperty([attr])
// console.log('say' in f); //->true
// console.log(f.hasOwnProperty('say')); //->true
// console.log('toString' in f); //->true
// console.log(f.hasOwnProperty('toString')); //->false
// console.log(f.hasOwnProperty('hasOwnProperty')); //->false

// 验证某个属性是否属于对象的公有属性「是它的属性，还不是私有的属性」
// 弊端：某个属性既是私有的，也是公有的
/* function hasPubProperty(obj, attr) {
    return (attr in obj) && !obj.hasOwnProperty(attr);
}
// console.log(hasPubProperty(f, 'hasOwnProperty')); //->true */