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