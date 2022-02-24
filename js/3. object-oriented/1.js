/*
 * @LastEditors: wudan01
 * @description: 文件描述
 */

// function Fn(x, y) {
//   let total = x + y;
//   this.x = x;
//   this.y = y;
//   this.say = function () { };
//   return total;
// }
// let f = new Fn(10, 20);

/*
console.log(f instanceof Fn); //->true
console.log(f instanceof Array); //->false
console.log(f instanceof Object); //->true
console.log(1 instanceof Number); //->false
console.log(new Number(1) instanceof Number); //->true
*/

// console.log('say' in f); //->true
// console.log(f.hasOwnProperty('say')); //->true
// console.log('toString' in f); //->true
// console.log(f.hasOwnProperty('toString')); //->false
// console.log(f.hasOwnProperty('hasOwnProperty')); //->false

// function hasPubProperty(attr, obj) {
//   return attr in obj && !obj.hasOwnProperty(attr);
// }
// console.log(hasPubProperty('a', f)); // fasle
// console.log(hasPubProperty('say', f)); // false
// console.log(hasPubProperty('toString', f)); // true

/*
// 错误
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
*/

/*
function Fn() {
  this.x = 100;
  this.y = 200;
  this.getX = function () {
    console.log(this.x);
  }
}
Fn.prototype.getX = function () {
  console.log(this)
  console.log(this.x);
};
Fn.prototype.getY = function () {
  console.log(this.y);
};
let f1 = new Fn;
let f2 = new Fn;
// console.log(f1.getX === f2.getX); // false
// console.log(f1.getY === f2.getY); // true
// console.log(f1.__proto__.getY === Fn.prototype.getY); // true
// console.log(f1.__proto__.getX === f2.getX); // false
// console.log(f1.getX === Fn.prototype.getX); // false
// console.log(f1.constructor); // Fn

// todo
console.log(Fn.prototype);
console.log(Fn.prototype.__proto__);
console.log(Fn.prototype.__proto__.constructor); // Object


// f1.getX(); // 100
// f1.__proto__.getX(); // undefined this 指向？
// f2.getY(); // 200
// Fn.prototype.getY(); // 200
*/

// var a = () => {
//   console.log(this)
// }

// function multiply(a, b) {
//   b = (typeof b !== 'undefined') ? b : 1;
//   return a * b;
// }

// console.log(multiply.constructor == Function) // true

// function fun() {
//   this.a = 0;
//   this.b = function () {
//     console.log(this.a);
//   }
// }
// fun.prototype = {
//   b: function () {
//     this.a = 20;
//     console.log(this.a);
//   },
//   c: function () {
//     console.log(this)
//     this.a = 30;
//     console.log(this.a)
//   }
// }
// var my_fun = new fun();
// my_fun.b(); // 0
// my_fun.c(); // 30

// function Fn() {
//   let a = 1;
//   this.a = a;
// }
// Fn.prototype.say = function () {
//   this.a = 2;
// }
// Fn.prototype = new Fn;
// let f1 = new Fn;

// Fn.prototype.b = function () {
//   this.a = 3;
// };
// console.log(f1.a); // 1
// console.log(f1)
// console.log(f1.__proto__)
// console.log(f1.__proto__.__proto__)

// // console.log(f1.prototype); // undefined
// console.log(f1.b);
// // function () {
// // this.a = 3;
// // };
// console.log(f1.hasOwnProperty('b')); // false
// console.log('b' in f1); // true
// console.log(f1.constructor == Fn); // true

/*
function Foo() {
  getName = function () {
    console.log(1);
  };
  return this;
}
Foo.getName = function () {
  console.log(2);
};
Foo.prototype.getName = function () {
  console.log(3);
};
var getName = function () {
  console.log(4);
};
function getName() {
  console.log(5);
}
Foo.getName(); // 2
getName(); // 4
Foo().getName(); // 1
getName(); // 1
new Foo.getName(); // 3
new Foo().getName(); // 3
new new Foo().getName(); // 3
*/

/*
let n = 10;
console.log(Number.prototype)

Number.prototype.plus = function (val) {
  return this + val
}

Number.prototype.minus = function (val) {
  return this - val
}

let m = n.plus(10).minus(5);
console.log(m);//=>15（10+10-5）
*/

/*
function Modal(x, y) {
  this.x = x;
  this.y = y;
}
Modal.prototype.z = 10;
Modal.prototype.getX = function () {
  console.log(this.x);
}
Modal.prototype.getY = function () {
  console.log(this.y);
}
Modal.n = 200;
Modal.setNumber = function (n) {
  this.n = n;
};
let m = new Modal(10, 20);
console.log(m)

class Modal1 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  getX() {
    console.log(this.x);
  }

  getY() {
    console.log(this.y);
  }

  static n = 200
  static setNumber(n) {
    this.n = n;
  }
}


let m2 = new Modal1(10, 20);
console.log(m2)
*/

/*
// 遍历的笔记
Object.prototype.xx = 'xx';

let obj = {
  name: 'test',
  age: 12,
  3: 200,
  0: 100,
  [Symbol('AA')]: function () {},
};

// for (let key in obj) {
//   if (!obj.hasOwnProperty(key)) break;
//   console.log(key, obj[key]);
// }

[...Object.keys(obj), ...Object.getOwnPropertySymbols(obj)].forEach((key) => {
  console.log(key, obj[key]);
});
*/

/*
function create(prototype) {
  if (!/^(object|function)$/i.test(typeof prototype))
    throw new TypeError('Object prototype may only be an Object or null');
  // 方案1
  // let obj = {};
  // obj.__proto__ = prototype;
  // return obj;
  // 方案2
  function proxy() {}
  proxy.prototype = prototype;
  return new proxy();
}

function Fn() {
  this.a = 1;
}

Fn.prototype.a = function a() {
  console.log('a');
};

console.log(create(Fn));
console.log(create(Fn.prototype));

// Object.create = function create(prototype) {
//   if (!/^(object|function)$/i.test(typeof prototype))
//     throw new TypeError('Object prototype may only be an Object or null');

//   function proxy() {}
//   proxy.prototype = prototype;
//   return new proxy();
// };
*/

/*
let obj = {
  x: 0,
  fn() {
    // this -> obj
    let self = this;
    setTimeout(function () {
      // this -> window
      self.x++;
      console.log(obj.x);
    }, 1000);
  }
};
obj.fn();
*/

/*
let obj = {
  x: 0,
  fn() {
    setTimeout(() => {
      this.x++;
      console.log(this)
      console.log(obj.x);
    }, 1000);
  }
};
obj.fn();
*/

/*
let obj = {
  x: 0,
  fn: () => {
    // 箭头函数，继承外面this
    // this->window
    console.log(this);
  },
  fn1() {
    // 普通函数
    // this->obj
    console.log(this)
  }
};
obj.fn();
obj.fn1()
*/

var obj = {
  a: 1,
  getA: function () {
    console.log(this.a);
  },
};

var obj2 = {
  a: 2,
};

// Function.prototype.call = function () {
//   var args = Array.from(arguments);
//   // debugger;
//   var _this = args.splice(0, 1);
//   console.log(_this);
//   console.log(this);
// };

// Function.prototype.bind = function () {
//   var args = [].slice.apply(arguments);
//   var newThis = args.splice(0, 1)[0];
//   var params = args;
//   var self = this;
//   return function () {
//     console.log(self);
//     console.log(newThis);
//     return self.apply(newThis, params);
//   };
// };

/*
Function.prototype.bind = function (context) {
  context = context ? context : window;
  // 方式1
  // var params = [].slice.call(arguments,1);
  // 方式2
  var params = Array.from(arguments).splice(1);
  var self = this;
  return function () {
    var args = Array.from(arguments);
    params = params.concat(args);
    return self.apply(context, params);
  };
};

Function.prototype.call = function (context) {
  context = context ? context : window;
  var params = Array.from(arguments).splice(1);
  var key = Symbol('KEY');
  context[key] = this;
  var result = context[key](params);
  delete context[key];
  return result;
};

console.log(obj.getA());
console.log(obj.getA.call(obj2));
// var b = obj.getA.bind(obj2, 1, 2);
// console.log(b(4));

*/

/*
Function.prototype.call = function (context) {
  context = context ? context : window;
  var params = Array.from(arguments).splice(1);
  console.log('params' + params);
  var key = Symbol('KEY');
  context[key] = this;
  var result = context[key](params);
  delete context[key];
  console.log('result', result);
  return result;
};

var name = 'test';

function A(x, y) {
  var res = x + y;
  debugger;
  console.log(res, this.name);
  return res;
}

function B(x, y) {
  var res = x - y;
  console.log(res, this.name);
  return res;
}
// B.call(A, 40, 30);
B.call.call.call(A, 40, 30);
// 最后一个call执行
//   + this:B.call.call 「call方法」
// Function.prototype.call(A, 60, 50);
// Function.prototype.call.call.call(A, 80, 70);
// 最后一个call执行
//   + this:Function.prototype.call.call 「call方法」

*/

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
