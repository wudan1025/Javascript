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

/*
1.利用缓存
  + 对于静态资源文件实现强缓存和协商缓存（扩展：文件有更新，如何保证及时刷新？）  
  + 对于不经常更新的接口数据采用本地存储做数据缓存（扩展：cookie / localStorage / vuex|redux 区别？）
2.DNS优化
  + 分服务器部署，增加HTTP并发性（导致DNS解析变慢）
  + DNS Prefetch
3.TCP的三次握手和四次挥手
  + Connection:keep-alive
4.数据传输
  + 减少数据传输的大小
    + 内容或者数据压缩（webpack等）
    + 服务器端一定要开启GZIP压缩（一般能压缩60%左右）
    + 大批量数据分批次请求（例如：下拉刷新或者分页，保证首次加载请求数据少）
  + 减少HTTP请求的次数
    + 资源文件合并处理
    + 字体图标
    + 雪碧图 CSS-Sprit
    + 图片的BASE64
  + ......
5.CDN服务器“地域分布式”
6.采用HTTP2.0
==============
网络优化是前端性能优化的中的重点内容，因为大部分的消耗都发生在网络层，
尤其是第一次页面加载，如何减少等待时间很重要“减少白屏的效果和时间”
+ LOADDING 人性化体验
+ 骨架屏：客户端骨屏 + 服务器骨架屏
+ 图片延迟加载
+ ....
*/