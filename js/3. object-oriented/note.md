<!--
 * @LastEditors: wudan01
 * @description: 文件描述
-->
```
// 20201216 - 20201220

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
```
function Dog(name) {
  this.name = name;
  // 导致 new 出的对象 结果为 {}
  // return {};
}
Dog.prototype.bark = function () {
  console.log('wangwang');
};
Dog.prototype.sayName = function () {
  console.log('my name is ' + this.name);
};

var test = _new(Dog, 'test');
// var test = new Dog('test');
test.sayName();
test.bark();

function _new(Ctor) {
  // 构造函数 不是函数 或
  // 构造函数的原型对象 不是 函数或对象
  // 箭头函数 没有 prototype, 所以无法new
  if (
    typeof Ctor != 'function' ||
    !/^(object|function)$/.test(typeof Ctor.prototype)
  ) {
    throw new TypeError('Ctor is not a constructor');
  }

  var params = [].slice.call(arguments, 1);

  // 1. 创建新对象，让新对象 __proto__ = 构造函数的prototype
  // 方案1
  // let obj = {};
  // obj.__proto__ = Ctor.prototype;

  // 方案2
  let obj = Object.create(Ctor.prototype);

  // 2. 修改this 为当前 obj ,使用普通函数方法，执行构造函数,
  let result = Ctor.apply(obj, params);
  console.log(result);

  // 3. 判断函数返回值 如果不对对象，则返回当obj
  if (/^(object|function)$/.test(typeof result)) return result;
  return obj;
}
```

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
> 通过 __proto__ 找，如果相等 true

> 方案1 , 不够完善
```
function Fn(x, y) {
  let total = x + y;
  this.x = x;
  this.y = y;
  this.say = function () {};
  return total;
}
let f = new Fn(10, 20);

function instanceof_(fn, Object) {
  var result = false;
  while (fn.__proto__) {
    // debugger;
    // console.log(fn.__proto__);
    // 不使用 constructor?
    if (fn.__proto__ == Object.prototype) {
      result = true;
      break;
    }

    fn = fn.__proto__;
  }
  return result;
}

console.log(instanceof_(f, Fn));
console.log(instanceof_(f, Object));
```

> 版本2
```
console.log(instanceof_([], Array)); //->true
console.log(instanceof_([], RegExp)); //->false
console.log(instanceof_([], Object)); //->true

function instance_of(example, Ctor) {
  let exmType = typeof example,
    ctorType = typeof Ctor;
  // 保证Ctor是一个构造函数
  if (ctorType !== 'function' || !Ctor.prototype)
    throw new TypeError('Ctor is not a constructor!');
  // 不处理原始值
  if (example == null) return false;
  if (!/^(object|function)$/i.test(exmType)) return false;

  // 优先检测 Symbol.hasInstance
  if (typeof Ctor[Symbol.hasInstance] === 'function') {
    return Ctor[Symbol.hasInstance](example);
  }

  // 没有这个属性，再按照 Ctor.prototype 是否出现在 example 的原型链上检测
  let prototype = Object.getPrototypeOf(example);
  while (prototype) {
    if (prototype === Ctor.prototype) return true;
    prototype = Object.getPrototypeOf(prototype);
  }
  return false;
}
```

# 5. 判断属性是否在对象上
#### 对象私有，不在原型链上
> hasOwnProperty
> 对象.hasOwnProperty(属性)

#### 对象上没有，在原型链上
> 配合 hasOwnProperty / in 实现 hasPubProperty

```
// 方案1
function hasPubProperty(attr, obj) {
  return attr in obj && !obj.hasOwnProperty(attr);
}
```

```
// 方案2
Object.prototype.hasPubProperty = function hasPubProperty(attr) {
    // this->f1
    var self = this,
        prototype = Object.getPrototypeOf(self);
    while (prototype) {
        // 检测是否存在ATTR这个属性
        if (prototype.hasOwnProperty(attr)) return true;
        /* var keys = Object.keys(prototype);
        if (typeof Symbol !== "undefined") {
            keys = keys.concat(Object.getOwnPropertySymbols(prototype));
        }
        if (keys.indexOf(attr) > -1) return true; */
        // 一直按照原型链查找
        prototype = Object.getPrototypeOf(prototype);
    }
    return false;
};
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

# 6 原型及原型链
#### prototype
> 类(class) / 函数(Function) 有 prototype 属性，指向一个对象，为原型对象

> 有 prototype 的函数类型包括 普通函数，构造函数(自定义，内置)，生成器函数

> 箭头函数 没有 prototype 

#### __proto__
> 实例(new class / new Fn) 和 对象 有 __proto__, 指向一个对象，为原型对象

> 实例(new class / new Fn) 有 constructor, 指向 (class/Fn)

> 有 __proto__ 的对象包括，普通对象，数组，正则对象,prototype 等

> 特殊 Function.protptype 是一个函数

#### 既有 __proto__ 又有 prototype
###### Array 
> 即使函数又是对象
> 作为函数 new Array
```
Array.prototype.__proto__ == Object.prototype
```
> 作为对象 Array.isArray 等方法
```
Array.__proto__ == Function.prototype
```
###### Funtion

> Funtion 和 Object 的混乱关系
Function.__proto__  == Function.prototype  ==  Object.__proto__


#### 两者都没有
> 箭头函数

#### 原型链
> 继承通过 __proto__ 属性去找

```
// 普通函数
// 普通函数通过原型链向上找尽头为 普通函数 -> Fn.prototype -> Object.prototype -> null
function Fn() {
this.a = '123'
}
var fn = new Fn()
console.log(fn.__proto__ == Fn.prototype) // true
console.log(fn.__proto__.prototype) // undefined
console.log(fn.__proto__.__proto__ == Object.prototype) // true
console.log(fn.__proto__.__proto__.__proto__) // null

// 实例
// 实例通过原型链向上找 实例->实例的构造函数->Object.prototype->null
var arr = new Array(1, 2, 3)
console.log(arr.__proto__ == Array.prototype) // true
console.log(arr.__proto__.prototype) // undefined
console.log(arr.__proto__.__proto__ == Object.prototype) // true
console.log(arr.__proto__.__proto__.__proto__) // null

// 内置构造函数
// 内置构造函数通过原型链向上找尽头为 内置构造函数 -> Fn.prototype -> Object.prototype -> null
console.log(Array.__proto__ == Function.prototype) // true
console.log(Array.__proto__.__proto__ == Object.prototype) // true
console.log(Array.__proto__.__proto__.__proto__) // null
console.log(Function.prototype.__proto__ == Object.prototype) // true
console.log(Object.prototype.__proto__) // null
```

# 7 call && apply && bind
> 都在 Function.prototype 的方法
> call 传递一个参数
> apply 传递数组
> call的性能要比apply好一丢丢「尤其是传递的实参在三个以上」

> todo 是否正确
```
~ function () {
  function call(context) {
    context = context || window;
    let args = [].slice.call(arguments, 1),
      result;
    context.$fn = this;
    result = context.$fn(...args);
    delete context.$fn;
    return result;
  }
  Function.prototype.call = call;
}();

function fn1() { console.log(1); }
function fn2() { console.log(2); }
fn1.call(fn2);
fn1.call.call(fn2);
Function.prototype.call(fn1);
Function.prototype.call.call(fn1);
```


# 9  原型相关方法
```
// 获取实例fn的原型对象 等他 fn.__proto__
Object.getPrototypeOf(fn)
```