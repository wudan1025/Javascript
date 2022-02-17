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
