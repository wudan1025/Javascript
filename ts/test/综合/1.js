/*
 * @LastEditors: wudan01
 * @description: 文件描述
 */
//  请编写一个操作对象方法和属性的函数实现以下功能
//   1. 当对象字符串属性有空格时就去掉空格后输出.
//   2. 当遇到对象方法时就执行,其他数据类型的属性一律直接输出
//   3.只有对象中包含allowoutput属性时,才允许输出。
//   4. 函数接收到外部传入的null,undefined,{}时，直接输出不是一个合法的对象。
//  考核点：1. 考核对类型守卫的熟练运用程度 2.静态方法
// interface ObjType {
//   value: {} | string | Function | object | null | undefined;
// }
var editObj = /** @class */ (function () {
    function editObj() {
    }
    editObj.prototype.editObj = function (value) {
        // todo { } 如何判断
        // if (value == null || value == undefined || value == Object.create({})) {
        if ((value == null || value == undefined || Object.keys(value).length == 0) &&
            typeof value != 'function') {
            console.log('不是一个合法的对象');
            return;
        }
        if (typeof value == 'string') {
            value = value.replace(/\s/g, function ($0) {
                return '';
            });
            console.log(value);
            return;
        }
        if (typeof value == 'function') {
            value();
            return;
        }
        if (typeof value == 'object' && value.allowoutput) {
            console.log(value);
            return;
        }
    };
    return editObj;
}());
var edit = new editObj();
edit.editObj({});
edit.editObj(null);
edit.editObj(undefined);
edit.editObj('a  dd fgg ');
edit.editObj(function () {
    console.log('cb');
});
edit.editObj({
    allowoutput: true,
    other: 'other'
});
