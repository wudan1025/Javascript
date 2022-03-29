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
 * @LastEditors: wudan01
 * @description: 文件描述
 */
var People = /** @class */ (function () {
    function People() {
    }
    People.prototype.eat = function () {
        console.log('People父类的eat');
    };
    return People;
}());
var AmericanPeople = /** @class */ (function (_super) {
    __extends(AmericanPeople, _super);
    function AmericanPeople() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AmericanPeople.prototype.eat = function () {
        console.log('用叉子吃饭...');
    };
    return AmericanPeople;
}(People));
var ChinesePeople = /** @class */ (function (_super) {
    __extends(ChinesePeople, _super);
    function ChinesePeople() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //中国人
    ChinesePeople.prototype.eat = function () {
        console.log('用筷子吃饭...');
    };
    ChinesePeople.prototype.sleep = function () {
        console.log('sleep');
    };
    return ChinesePeople;
}(People));
var TuzhuPeople = /** @class */ (function (_super) {
    __extends(TuzhuPeople, _super);
    function TuzhuPeople() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    // 土族人
    TuzhuPeople.prototype.eat = function () {
        console.log('用手抓吃饭...');
    };
    return TuzhuPeople;
}(People));
// 父类的对象变量people可以接受任何一个子类的对象,
// 例如可以接受AmericanPeople,ChinesePeople,TuzhuPeople子类对象
var people = new AmericanPeople();
// 从而用这个父类的对象变量来调用子类中重写的方法而输出不同的结果.
people.eat();
people = new ChinesePeople();
people.eat();
console.log(people instanceof ChinesePeople);
if (people instanceof ChinesePeople) {
    people.sleep();
}
people = new TuzhuPeople();
people.eat();
// 多态发生在继承中
