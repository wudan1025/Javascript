<!--
 * @LastEditors: wudan01
 * @description: 文件描述
-->
# 1. 输入URL到看到页面，中间经历的环节
> 1. dns 查询 ，网址查到ip
> 2. tcp 三次握手 http 请求，
> 3. 根据状态码判断走缓存还是返回新数据
> 4. 根据返回数据渲染(构建css tree和 html tree -> render tree)

问题： 为什么查到ip 才可以进行网络请求？

笔记
> 1. url解析 ： 处理 url
> 2. 缓存检测 - 检查强缓存 
> 3. dns 解析
> 4. TCP三次握手，建立通道
> 5. http 请求数据

https://blog.csdn.net/Say_one/article/details/114376992

https://juejin.cn/post/7016593221815910408#heading-0

# 2. dns 查询过程
参考笔记
https://note.youdao.com/s/qyEot92

# 3. tcp 三次握手/ 四次挥手过程
#### 三次握手
1. 客户端发起 ，服务端接收
2. 服务端发出收到请求，客户端收到
3. 客户端发出对此次收到的收到信息，


#### 四次挥手
1. 客户端发出断开申请，服务端接收
2. 服务端发出对客户端请求的接收到请求，
客户端数据发送...
3. 服务端发出 现在可以关闭的报文
4. 客户端发出收到可以关闭的报文


# 4. fetch/xhr 是什么及区别

#### fetch

```
fetch(url, {
    body: JSON.stringify(data), // must match 'Content-Type' header
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, same-origin, *omit
    headers: {
      'user-agent': 'Mozilla/4.0 MDN Example',
      'content-type': 'application/json'
    },
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer', // *client, no-referrer
  })
```
1. fetch 直接返回promise
```
async function getInfo(){
    const res = await fetch('http://www.test.asp');
    const result = await res;
    return result;
}
```
2. fetch 不支持 IE
3. fetch 不管请求处理成功还是失败(400,500)都会触发promise的resolve, 网络故障导致请求发送失败或者跨域的时候才会触发reject,
```
fetch('flowers.jpg').then(function(response) {
  if(response.ok) {
    return response.blob();
  }
  throw new Error('Network response was not ok.');
}).then(function(myBlob) { 
  var objectURL = URL.createObjectURL(myBlob); 
  myImage.src = objectURL; 
}).catch(function(error) {
  console.log('There has been a problem with your fetch operation: ', error.message);
});
```

4. fetch默认不会带cookie，需要添加配置项： 
```fetch(url, {credentials: 'include'})```s


# 5. 基于网络的性能优化
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

# 6. 同源及跨域解决方案
#### CORS
> 服务端加允许跨域的请求头 ```Access-Control-Allow-Origin```
> node 版本代码 
```
module.exports = {
    //=>WEB服务端口号
    PORT: 3001,
    //=>CROS跨域相关信息
    CROS: {
        ALLOW_ORIGIN: 'http://127.0.0.1:5500',
        ALLOW_METHODS: 'PUT,POST,GET,DELETE,OPTIONS,HEAD',
        HEADERS: 'Content-Type,Content-Length,Authorization, Accept,X-Requested-With',
        CREDENTIALS: true
    }
};

app.use((req, res, next) => {
    const {
        ALLOW_ORIGIN,
        CREDENTIALS,
        HEADERS,
        ALLOW_METHODS
    } = CONFIG.CROS;
    res.header("Access-Control-Allow-Origin", ALLOW_ORIGIN);
    res.header("Access-Control-Allow-Credentials", CREDENTIALS);
    res.header("Access-Control-Allow-Headers", HEADERS);
    res.header("Access-Control-Allow-Methods", ALLOW_METHODS);
    req.method === 'OPTIONS' ? res.send('CURRENT SERVICES SUPPORT CROSS DOMAIN REQUESTS!') : next();
});

```

#### JSONP

动态创建script标签, script ,img 不会跨域
不安全，并且只支持GET请求

#### proxy

> webpack 中配置

```
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './src/main.js',
    output: {
        filename: 'main.[hash].min.js',
        path: path.resolve(__dirname, 'build')
    },
    devServer: {
        port: '3000',
        compress: true,
        open: true,
        hot: true,
        proxy: {
            '/': {
                target: 'http://127.0.0.1:3001',
                changeOrigin: true
            }
        }
    },
    // 配置WEBPACK的插件
    plugins: [
        new HtmlWebpackPlugin({
            template: `./public/index.html`,
            filename: `index.html`
        })
    ]
};
```



#### nginx

#### postmessage
```https://developer.mozilla.org/zh-CN/docs/Web/API/Window/postMessage```


# 7. https 加密算法