/*
 * @LastEditors: wudan01
 * @description: 文件描述
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
/*
class A1 {
  protected constructor() {
    console.log('123');
  }
}

// let a1 = new A1();

class Animal2 extends A1 {
  constructor() {
    super();
  }
  eat() {
    console.log('eat');
  }
}

let animal = new Animal2();
*/
var Workflow1 = /** @class */ (function () {
    function Workflow1() {
    }
    Workflow1.prototype.step1 = function () {
        return this;
    };
    Workflow1.prototype.step2 = function () {
        return this;
    };
    return Workflow1;
}());
// new Workflow().step1().step2();
var MyFlow1 = /** @class */ (function (_super) {
    __extends(MyFlow1, _super);
    function MyFlow1() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    MyFlow1.prototype.next = function () {
        return this;
    };
    return MyFlow1;
}(Workflow1));
// new MyFlow().next().step1().next().step2();
// console.log(new MyFlow1().next().next());
console.log(new MyFlow1().next().step1());
