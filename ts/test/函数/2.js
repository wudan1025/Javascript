/*
 * @LastEditors: wudan01
 * @description: 文件描述
 */
// 计算正方形面积
// 计算创建正方形对象,可一个给构造器传递宽高
// 也可以传递 包含宽高的形状参数对象
var Square = /** @class */ (function () {
    function Square(params1, params2) {
        if (typeof params1 == 'number' && typeof params2 == 'number') {
            this.width = params1;
            this.height = params2;
        }
        else if (typeof params1 == 'object') {
            this.width = params1.width;
            this.height = params1.height;
        }
        else {
            // never
        }
    }
    Square.prototype.getArea = function () {
        return this.width * this.height;
    };
    return Square;
}());
console.log(new Square(2, 3).getArea());
console.log(new Square({ width: 1, height: 4 }).getArea());
