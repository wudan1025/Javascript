/*
 * @LastEditors: wudan01
 * @description: 文件描述
 */
function Dog(name) {
  this.name = name;
}
Dog.prototype.bark = function () {
  console.log('wangwang');
};
Dog.prototype.sayName = function () {
  console.log('my name is ' + this.name);
};

/* let sanmao = new Dog('三毛');
sanmao.sayName();
sanmao.bark(); */

/*
 * Ctor:要操作的构造函数「创建它的实例」
 * params:数组,存储给Ctor传递的实参集合
 */
/* function _new(Ctor, ...params) {
    // 创建一个实例对象：创建一个对象，让其__proto__指向Ctor.prototype
    let obj = {};
    obj.__proto__ = Ctor.prototype;

    // 把构造函数当做普通函数执行，并且让函数中的THIS指向创建的实例对象
    let result = Ctor.call(obj, ...params);

    // 根据构造函数返回的结果，判断我们最后返回的是实例对象还是自己返回的值
    if (/^(object|function)$/.test(typeof result)) return result;
    return obj;
} */

/* function _new(Ctor, ...params) {
    let obj = Object.create(Ctor.prototype);
    let result = Ctor.call(obj, ...params);
    if (/^(object|function)$/.test(typeof result)) return result;
    return obj;
} */

/* function _new(Ctor) {
    // arguments 存储所有传递的实参信息，包含Ctor
    // 后期讲的：[].slice.call(arguments, 1)  把类数组转化为数组，并进行截取 「鸭子类型」
    var params = [].slice.call(arguments, 1),
        obj = Object.create(Ctor.prototype),
        result;
    result = Ctor.apply(obj, params);
    if (/^(object|function)$/.test(typeof result)) return result;
    return obj;
} */

/* function _new(Ctor) {
    var reg = /^(object|function)$/i,
        params,
        obj,
        result;
    if (typeof Ctor !== "function" || !reg.test(typeof Ctor.prototype)) throw new TypeError('Ctor is not a constructor');
    params = [].slice.call(arguments, 1);
    obj = Object.create(Ctor.prototype);
    result = Ctor.apply(obj, params);
    if (reg.test(typeof result)) return result;
    return obj;
}
let sanmao = _new(Dog, '三毛');
sanmao.bark(); //=>"wangwang"
sanmao.sayName(); //=>"my name is 三毛"
console.log(sanmao instanceof Dog); //=>true */

/*
 * Object.create([prototype]):创建一个空对象，并且让对象的__proto__指向[prototype]（把[prototype]作为创建空对象的原型）
 */
// let obj = Object.create(10); //=>Uncaught TypeError: Object prototype may only be an Object or null 只能传递对象或者null才可以
// let obj = Object.create(null); //=>创建了一个非任何类实例的空对象（它没有__proto__）「可以被理解为纯粹的对象」

// let prototype = Array.prototype;
// let obj = Object.create(prototype);
// console.log(obj);

if (!Object.create) {
  // IE 6~8
  Object.create = function create(prototype) {
    if (!/^(object|function)$/i.test(typeof prototype))
      throw new TypeError('Object prototype may only be an Object or null');

    function proxy() {}
    proxy.prototype = prototype;
    return new proxy();
  };
}
