/* function fun() {
    this.a = 0;
    this.b = function () {
        alert(this.a);
    }
}
fun.prototype = {
    b: function () {
        this.a = 20;
        alert(this.a);
    },
    c: function () {
        this.a = 30;
        alert(this.a)
    }
}
var my_fun = new fun();
my_fun.b();
my_fun.c(); */

/* let obj1 = {
    n: 10,
    m: 20,
    header: {
        a: 100
    }
};
let obj2 = {
    x: 10,
    m: 30,
    header: {
        b: 200
    }
}; */
/* // obj2覆盖obj1
// 只实现浅比较（浅合并）：只对第一级合并
let obj = Object.assign(obj1, obj2);
console.log(obj);
console.log(obj === obj1); //true 返回的不是新对象，而是原始的obj1对象
console.log(obj === obj2); //false */

/* let obj = Object.assign({}, obj1, obj2);
console.log(obj); //->返回的是第一个参数「也就是全新的一个对象」 */


/* function Fn(obj, extend) {
    if (extend) {
        for (let key in obj) {
            this[key] = obj[key];
        }
        return;
    }
    this.a = 100;
    this.b = function () {};
}
Fn.prototype.c = function () {};
Fn.prototype = new Fn({
    x: 100,
    getX: function () {}
}, true);
let f = new Fn; */

// hasOwnProperty、toString...
Object.prototype.xx = 'xx';

let obj = {
    name: 'zhufeng',
    age: 12,
    3: 200,
    0: 100,
    [Symbol('AA')]: function () {}
};
// + 优先遍历数字属性，而且按照从小到大遍历；数字属性遍历完，再去遍历其他的；
// + 无法遍历Symbol的私有属性
// + 遍历所属类原型上自定义的属性和方法「遍历了公有的：内置的是不可枚举的、自定义的属性是可枚举的」
/* for (let key in obj) {
    if (!obj.hasOwnProperty(key)) break; //解决问题三 
    console.log(key, obj[key]);
} */

/* // 获取私有的属性：Object.keys(obj) OR Object.getOwnPropertyNames(obj) ；返回包含所有非symbol私有属性的数组；
// Object.getOwnPropertySymbols 获取所有的Symbol私有属性「数组」
[
    ...Object.keys(obj),
    ...Object.getOwnPropertySymbols(obj)
].forEach(key => {
    console.log(key, obj[key]);
}); */