数据类型转换规则及Symbol.toPrimitive
18.2.5 parseInt(string, radix)
20.1 Number Objects

let result = 100 + true + 21.2 + null + undefined + "Tencent" + [] + null + 9 + false;
console.log(result);
var a = ?;
if (a == 1 && a == 2 && a == 3) {
    console.log('OK');
}
let arr = [27.2, 0, '0013', '14px', 123];
arr = arr.map(parseInt);
console.log(arr);
JS运行机制: 堆(Heap) / 栈(Stack) / 上下文(EC) / 全局对象(GO) / 变量对象(VO / AO)
var a = 12;
var b = a;
b = 13;
console.log(a);

-----------------

var a = { n: 12 };
var b = a;
b['n'] = 13;
console.log(a.n);

-----------------

var a = { n: 12 };
var b = a;
b = { n: 13 };
console.log(a.n);
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