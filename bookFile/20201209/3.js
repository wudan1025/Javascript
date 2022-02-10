/*
/!*
 * EC(G)
 *   var x;
 *   func = 0x0001; [[scope]]:EC(G)
 *!/
var x = 1;
function func(x, y = function anonymous1(){x = 2}){
    /!*
     * EC(FUNC) 
     *  作用域链:<EC(FUNC),EC(G)>
     *  形参赋值:x=5 y=0x0002(anonymous1) [[scope]]:EC(FUNC)
     *  变量提升:--
     *!/
    x = 3; //私有x=3
    y();
    /!*
     * EC(Y)
     *   作用域链:<EC(Y),EC(FUNC)>
     *   形参赋值:--
     *   变量提升:--
     * 
     * 代码执行  x=2  把EC(FUNC)中私有的x修改为2
     *!/
    console.log(x); //=>2
}
func(5);
console.log(x); //=>1
*/

/*
 * ES6新规则
 *   前提：
 *     1. 函数有形参赋值默认值，不论是否生效(也就是传递值后不走默认值)都遵循如下的规律
 *     2. 函数体中有声明变量「基于let/const/var」，注意：let/const声明的变量是不允许重复的（不能和形参一致） 
 *   规则：
 *     函数执行会产生一个私有的执行上下文「作用域链->this->arguments->形参赋值」
 *     它会把函数体中的代码，单独作为一个私有的“块级”上下文，并且其上级上下文是函数的那个私有的上下文
 *     小知识点：如果函数私有上下文中的某变量和块级上下文中的某变量一致，则块级上下文的最开始时候，会把函数上下文中的值同步给块级上下文中同名变量一份
 */

/* debugger;
var x = 1;
function func(x, y = function anonymous1(){x = 2}){
    var x = 3;
    y();
    console.log(x);
};
func(5);
console.log(x);  */


/* debugger;
var x = 1;
function func(x, y = function anonymous1(){x=2}){
    var x = 3;
    var y = function anonymous2(){x = 4}
    y();
    console.log(x);
};
func(5);
console.log(x);   */

/* debugger;
function func(x = 3) {
    function x() {}
}
func(10); */