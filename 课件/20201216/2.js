function Fn() {
    this.x = 10;
    this.y = 20;
    this.say = function () {};
}
Fn.prototype.say = function () {};
Fn.prototype.eat = function () {};

let f1 = new Fn;
let f2 = new Fn;

// console.log(f1 === f2); //->false
// console.log(f1.x === f2.x); //->true  比较属性值「原始值」
// console.log(f1.say === f2.say); //->false  比较属性值「对象」