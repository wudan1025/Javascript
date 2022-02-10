/* function Fn(x) {
    this.x = x;
    this.y = 200;
}
Fn.prototype.z = 300;
Fn.prototype.getX = function () {};
Fn.m = 400;
Fn.getM = function () {};

Fn.getM();
Fn(100);
new Fn(100); */

/* class Fn {
    constructor(x) {
        this.x = x;
        // this.y = 200;
    }
    y = 200; //ES7: this.y = 200 设置的是私有的属性

    //---- Fn.prototype
    getX() {} //没有prototype

    //---- 设置静态私有属性方法
    static m = 400;
    // static getM = function () {} //有prototype
    static getM() {} //没有prototype
}
Fn.prototype.z = 300; //公有的属性只能外侧单独加

// Fn(); //=>Uncaught TypeError: Class constructor Fn cannot be invoked without 'new' 基于class创建的类只能被new执行
// console.log(Fn.getM);
let f = new Fn(100);
console.log(f); */

/* let obj = {
    fn: function () {}, //有prototype
    fn() {} //没有prototype
}; */