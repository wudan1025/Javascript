/*
 * @LastEditors: wudan01
 * @description: 文件描述
 */
function fun(n, o) {
  console.log(o);
  return {
    fun: function (m) {
      // 导致死循环
      // return this.fun(m,n)
      return fun(m, n);
    },
  };
}
var c = fun(0).fun(1); // undefined 0
c.fun(2); // 1
c.fun(3); // 1

/*
fun(0) undefined
.fun(1) function (m) m=1 
fun(m, n) => fun(n, o); m=n=1 n=o=0

c.fun(2);
c.fun(3); 

每一次都是单独调用 o 一直是 1

如果改为 c = c.fun(2); // 1
c.fun(3); // 2
*/
