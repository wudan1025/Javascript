/*
 * @LastEditors: wudan01
 * @description: 文件描述
 */
// 老版本浏览器下
// 变量提升：foo = 0x0001; [[scope]]:EC(G)

// 新版本浏览器
// 全局变量提升的时候，出现在{}中的(排除对象和函数等)的function，只声明不定义

/* 
debugger;
console.log(foo); 
{
    console.log(foo); 
    function foo() {}
    foo = 1;
    console.log(foo); 
}
console.log(foo); 
*/

/* 
debugger;
/!*
 * EC(G)
 *    function foo; 「2」
 *    function foo; 「4」   
 * 
 *    同步=>0x0002  1
 *!/
// console.log(foo); =>undefined
{
    /!*
     * EC(B)
     *   foo = 0x0001; 「2」   [[scope]]:EC(B)
     *   foo = 0x0002; 「4」
     *!/
    // console.log(foo); =>0x0002 函数
    function foo() {1} //特殊：把之前对foo的操作同步给全局一份
    foo = 1; //私有foo=1
    // console.log(foo); =>1
    function foo() {2} //特殊：把之前对foo的操作同步给全局一份
    // console.log(foo); =>1
}
console.log(foo); //=>1 
*/

/* 
{
    function foo() {}
    foo = 1;
    function foo() {}
    foo = 2;
}
console.log(foo); 
*/
