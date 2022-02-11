/*
 * @LastEditors: wudan01
 * @description: 文件描述
 */
/* var a = {n: 1};
var b = a;
a.x = a = {n: 2};
console.log(a.x);
console.log(b); */

/* var x = [12, 23];
function fn(y) {
    y[0] = 100;
    y = [100];
    y[1] = 200;
    console.log(y);
}
// fn(x);
console.log(x); */

/*
 * EC(G) 全局作用域
 *   i=0
 *   A=0x000A [[scope]]:EC(G)
 *   y=0x000X
 *   B=0x000B [[scope]]:EC(G)
 */
var i = 0;

function A() {
  /*
   * EC(A1) A1 作用域
   *   作用域链:<EC(A1),EC(G)>
   *   形参赋值:--
   * i=10
   * x=0x000X [[scope]]:EC(A1)
   */
  var i = 10;

  function x() {
    /*
     * EC(X1)
     *   作用域链:<EC(X1),EC(A1)>
     *   形参赋值:--
     */
    /*
     * EC(X2)
     *   作用域链:<EC(X2),EC(A1)>
     *   形参赋值:--
     */
    console.log(i); //->10 10
  }
  return x;
}
var y = A();
y();

function B() {
  /*
   * EC(B1)
   *   作用域链:<EC(B1),EC(G)>
   *   形参赋值:--
   * i=20
   */
  var i = 20;
  y();
}
B();
