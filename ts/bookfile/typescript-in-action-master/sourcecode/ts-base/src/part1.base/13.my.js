/*
 * @LastEditors: wudan01
 * @description: 文件描述
 */
// interface Length {
//     length: number
// }
// function logAdvance2<a extends Length>(value: a): a {
//     console.log(value, value.length);
//     return value;
// }
// logAdvance2([1])
// logAdvance2('123')
// logAdvance2({ length: 3 })
var Log = /** @class */ (function () {
    function Log() {
    }
    // 无法约束静态方法
    Log.run1 = function (value) {
        console.log(value);
        return value;
    };
    Log.prototype.run = function (value) {
        console.log(value);
        return value;
    };
    return Log;
}());
var log11 = new Log();
log11.run(1);
var log22 = new Log();
log22.run({ a: 1 });
