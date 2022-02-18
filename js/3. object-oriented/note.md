<!--
 * @LastEditors: wudan01
 * @description: 文件描述
-->
```
// 20201216 - 20201220

// 1. 判断属性在实力上还是原型链上
// 2. 实现bind 等
// 3. 继承
```

# 1. js 创建实例区别(字面量/new)
```
//   + 字面量方案  
//   + 构造函数方案  
// 对于对象和函数类型来讲，两种方案除了语法上的区别，没有啥特别的不同；但是对于原始值类型，区别还是很大的
// 「字面量方式返回的是原始值类型，但是构造函数方式返回的都是对象类型，但是都是所属类的实例」；
let n = 10; //原始值
let m = new Number(10); //对象

特殊的：Symbol / BigInt 是不允许被new的
```

# 2. 自己实现new

# 3. new Fn() 与 new Fn 区别
> /Users/wudan/Desktop/work-study/git/Javascript/bookFile/20201216/1.js

```
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
```

# 4. 自己实现 instanceof
#### instanceof 作用
> 验证某个实例是否属于这个类

#### instanceof 原理
> 通过 portotype 找，如果相等 true ？

> todo 错误
```
function instanceof_(fn, Object) {
  var result = false;
  while (Object.prototype) {
    console.log(Object.prototype);
    if (fn.constructor == Object) {
      result = true;
      break;
    }

    Object = Object.prototype;
  }
  return result;
}

console.log(instanceof_(f, Fn));
console.log(instanceof_(f, Object));
```

# 5. 判断属性是否在对象上
#### 对象私有，不在原型链上
> hasOwnProperty
> 对象.hasOwnProperty(属性)

#### 对象上没有，在原型链上
> 配合 hasOwnProperty / in 实现 hasPubProperty

```
function hasPubProperty(attr, obj) {
  return attr in obj && !obj.hasOwnProperty(attr);
}
```
#### 对象私有，或在原型链上
> in 
> 属性 in 对象

#### 代码示例
```
function Fn(x, y) {
  let total = x + y;
  this.x = x;
  this.y = y;
  this.say = function () {};
  return total;
}
let f = new Fn(10, 20);

console.log('say' in f); //->true
console.log(f.hasOwnProperty('say')); //->true
console.log('toString' in f); //->true
console.log(f.hasOwnProperty('toString')); //->false
console.log(f.hasOwnProperty('hasOwnProperty')); //->false

function hasPubProperty(attr, obj) {
  return attr in obj && !obj.hasOwnProperty(attr);
}
console.log(hasPubProperty('a', f)); // fasle
console.log(hasPubProperty('say', f)); // false
console.log(hasPubProperty('toString', f)); // true
```
