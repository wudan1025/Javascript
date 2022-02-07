/*
 * JS运行的环境：
 *   + 浏览器
 *   + webview  WebApp(Hybride混合APP) 
 *   + node.js
 *   + ...
 * 
 * 浏览器能够运行JS代码，是因为提供了代码运行的环境：栈内存（Stack）
 *   + 栈内存也是从计算机的内存分配出来的一块内存
 *   + 执行环境栈 E（execution）C（context）Stack
 *   
 * 执行代码的过程中，为了区分是在哪个环境下执行（全局/函数/块...），首先会产生一个执行上下文：EC
 *   + EC(G) 全局上下文，全局代码在这执行
 *   + EC(X) 某个函数的执行上下文
 */

/* var a = 12;
var b = a;
b = 13;
console.log(a); */


/* var a = {
    n: 12
}; //a -> 0x0001
var b = a;
b = {
    n: 13
}; //b -> 0x0002
console.log(a.n); //=>12 */


// 课后思考：
var a = {
    n: 1
};
var b = a;
a.x = a = {
    n: 2
};
console.log(a.x);
console.log(b);
// a.x 成员访问，优先级20「优先计算的」
//  a.x=a=?  先处理a.x=?
//  a=a.x=?  先处理a.x=?

/* var a = 12,
    b = 12;
// var a=12;  var b=12; */

/* var a = b = 12;
// var a;  b没有var
// 1.创建值12
// 2.连等操作是按照从右到左
//    b -> 12
//    a -> 12 */

// https://developer.mozilla.org/zh-CN/docs/web/javascript/reference/operators/operator_precedence