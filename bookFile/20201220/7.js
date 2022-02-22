/*
 * @LastEditors: wudan01
 * @description: 文件描述
 */
/* Function.prototype.call = function call(context, ...params) {
    // this(self)->fn  context->obj  params->[10,20]
    context == null ? context = window : null;
    if (!/^(object|function)$/i.test(typeof context)) context = Object(context);
    let self = this,
        key = Symbol('KEY'),
        result;
    context[key] = self;
    result = context[key](...params);
    delete context[key];
    return result;
};

function fn(x, y) {
    console.log(this, x, y);
    return x + y;
}
let obj = {
    name: 'obj',
    // call的原理 就是把context「要改变的this对象obj」和self「要执行的函数fn」之间建立关系
    // context.xxx=self;
    // context.xxx(10,20);
    // 删除新增的这个属性 delete context.xxx
    // fn: fn   //->obj.fn(10,20)
};
console.log(fn.call(100, 10, 20)); */

// ======作业题======
var name = 'test';

function A(x, y) {
  var res = x + y;
  console.log(res, this.name);
}

function B(x, y) {
  var res = x - y;
  console.log(res, this.name);
}
B.call(A, 40, 30);
B.call.call.call(A, 20, 10);
// 最后一个call执行
//   + this:B.call.call 「call方法」
Function.prototype.call(A, 60, 50);
Function.prototype.call.call.call(A, 80, 70);
// 最后一个call执行
//   + this:Function.prototype.call.call 「call方法」
