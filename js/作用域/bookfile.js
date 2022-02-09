/*
 * @LastEditors: wudan01
 * @description: 文件描述
 */
闭包作用域和JS高阶编程技巧
var a = { n: 1 };
var b = a;
a.x = a = { n: 2 };
console.log(a.x);
console.log(b);
var x = [12, 23];
function fn(y) {
    y[0] = 100;
    y = [100];
    y[1] = 200;
    console.log(y);
}
fn(x);
console.log(x);
var i = 0;
function A() {
    var i = 10;
    function x() {
        console.log(i);
    }
    return x;
}
var y = A();
y();
function B() {
    var i = 20;
    y();
}
B();
let x = 5;
function fn(x) {
    return function (y) {
        console.log(y + (++x));
    }
}
let f = fn(6);
f(7);
fn(8)(9);
f(10);
console.log(x);
let a = 0,
    b = 0;
function A(a) {
    A = function (b) {
        alert(a + b++);
    };
    alert(a++);
}
A(1);
A(2);
let / const / var 的区别
变量提升

重复声明

块级作用域

暂时性死区

……

THIS的几种基本情况
事件绑定

函数执行

匿名函数

成员访问

普通函数

回调函数

var x = 3,
    obj = { x: 5 };
obj.fn = (function () {
    this.x *= ++x;
    return function (y) {
        this.x *= (++x) + y;
        console.log(x);
    }
})();
var fn = obj.fn;
obj.fn(6);
fn(4);
console.log(obj.x, x);
JS高阶编程技巧
高级单例设计模式

惰性函数

柯理化函数

let add = curring();
let res = add(1)(2)(3);
console.log(res); //->6

add = curring();
res = add(1, 2, 3)(4);
console.log(res); //->10

add = curring();
res = add(1)(2)(3)(4)(5);
console.log(res); //->15
compose函数

/*
    在函数式编程当中有一个很重要的概念就是函数组合， 实际上就是把处理数据的函数像管道一样连接起来， 然后让数据穿过管道得到最终的结果。 例如：
    const add1 = (x) => x + 1;
    const mul3 = (x) => x * 3;
    const div2 = (x) => x / 2;
    div2(mul3(add1(add1(0)))); //=>3

    而这样的写法可读性明显太差了，我们可以构建一个compose函数，它接受任意多个函数作为参数（这些函数都只接受一个参数），然后compose返回的也是一个函数，达到以下的效果：
    const operate = compose(div2, mul3, add1, add1)
    operate(0) //=>相当于div2(mul3(add1(add1(0))))
    operate(2) //=>相当于div2(mul3(add1(add1(2))))

    简而言之：compose可以把类似于f(g(h(x)))这种写法简化成compose(f, g, h)(x)，请你完成 compose函数的编写
*/