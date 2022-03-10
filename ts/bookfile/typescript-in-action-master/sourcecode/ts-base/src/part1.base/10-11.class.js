/*

es ts 中
类的属性是实例属性，方法是原型方法
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
// 抽象类 只能被继承 不能被实例化的类
var Animal = /** @class */ (function () {
    function Animal() {
    }
    Animal.prototype.eat = function () {
        console.log('eat');
    };
    return Animal;
}());
// let animal = new Animal()
var Dog = /** @class */ (function (_super) {
    __extends(Dog, _super);
    function Dog(name) {
        var _this = _super.call(this) || this;
        // 类型注解
        // 属性必须有初始值
        _this.name = 'dog';
        // 只读属性，不可更改
        _this.legs = 4;
        _this.name = name;
        _this.pri();
        return _this;
    }
    // 方法默认是 public 当前子类实例都可以访问
    Dog.prototype.run = function () { };
    // 只有当前实例调用
    // todo private class 不能被new 和继承？
    Dog.prototype.pri = function () { };
    // 受保护，当然和子类访问，实例无法访问
    // protected construtor 不能被实例化，只能被继承
    // 相当于声明了一个基类？？todo
    Dog.prototype.pro = function () { };
    // 实现抽象方法
    Dog.prototype.sleep = function () {
        console.log('Dog sleep');
    };
    // 静态成员 
    Dog.food = 'bones';
    return Dog;
}(Animal));
// console.log(Dog.prototype)
var dog = new Dog('wangwang');
// console.log(dog)
// dog.pri()
// dog.pro()
console.log(Dog.food);
dog.eat();
var Husky = /** @class */ (function (_super) {
    __extends(Husky, _super);
    // 通过 public 添加color 将 color 变为实例属性
    function Husky(name, color) {
        var _this = _super.call(this, name) || this;
        _this.color = color;
        _this.color = color;
        // this.pri()
        _this.pro();
        return _this;
    }
    return Husky;
}(Dog));
// 静态方法也可以继承
console.log(Husky.food);
var Cat = /** @class */ (function (_super) {
    __extends(Cat, _super);
    function Cat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Cat.prototype.sleep = function () {
        console.log('Cat sleep');
    };
    return Cat;
}(Animal));
var cat = new Cat();
var animals = [dog, cat];
animals.forEach(function (i) {
    i.sleep();
});
var Workflow = /** @class */ (function () {
    function Workflow() {
    }
    Workflow.prototype.step1 = function () {
        return this;
    };
    Workflow.prototype.step2 = function () {
        return this;
    };
    return Workflow;
}());
// 链式调用？？
// 每次调用返回this?
new Workflow().step1().step2();
// this 的多态
var MyFlow = /** @class */ (function (_super) {
    __extends(MyFlow, _super);
    function MyFlow() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MyFlow.prototype.next = function () {
        return this;
    };
    return MyFlow;
}(Workflow));
// 返回子类 this,父类 this ,子类 this, 父类 this
new MyFlow().next().step1().next().step2();
