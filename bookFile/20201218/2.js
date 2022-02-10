/* function C1(name) {
    if (name) {
        this.name = name;
    }
}

function C2(name) {
    this.name = name;
}

function C3(name) {
    this.name = name || 'join';
}
C1.prototype.name = 'Tom';
C2.prototype.name = 'Tom';
C3.prototype.name = 'Tom';
alert((new C1().name) + (new C2().name) + (new C3().name));
// 'Tom' + undefined + 'join' => 'Tomundefinedjoin' */

/* 
function Fn() {
    let a = 1;
    this.a = a;
}
Fn.prototype.say = function () {
    this.a = 2;
}
Fn.prototype = new Fn;
let f1 = new Fn;
​
Fn.prototype.b = function () {
    this.a = 3;
};
console.log(f1.a);
console.log(f1.prototype);
console.log(f1.b);
console.log(f1.hasOwnProperty('b'));
console.log('b' in f1);
console.log(f1.constructor == Fn); */


let A = Symbol('AA');

function Fn() {
    this.x = 100;
    this[A] = 100;
    this.getX = function () {};
}
Fn.prototype[A] = 1000;
Fn.prototype.getX = function () {};
let f1 = new Fn;

// console.log(f1.hasOwnProperty('getX')); //->true  只要私有有这个属性，结果就是true
// console.log(f1.hasOwnProperty(A)); //->true  支持Symbol的私有属性检测

// 扩展到内置类的原型上，这样后期直接基于 对象.hasPubProperty(...) 即可调用
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

console.log(f1.hasPubProperty('x')); //->false
console.log(f1.hasPubProperty('getX')); //->true
console.log(f1.hasPubProperty(A)); //->true
console.log(f1.hasPubProperty('toString')); //->true   Object.prototype

// f1 -> Fn.prototype -> Object.prototype