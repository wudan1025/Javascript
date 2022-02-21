/*
 * @LastEditors: wudan01
 * @description: 文件描述
 */

function Fn(x, y) {
  let total = x + y;
  this.x = x;
  this.y = y;
  this.say = function () { };
  return total;
}
let f = new Fn(10, 20);

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

