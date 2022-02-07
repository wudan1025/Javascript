/*
 * 输入URL到看到页面，中间经历的环节
 *   1.URL解析 
 *     传输协议：用什么样的协议负责客户端和服务器端的信息传输  
 *        HTTP:最常用的 超文本传输协议  HTTP1.0/1.1/2.0
 *        HTTPS:HTTP+SSL(TSL)比HTTP更加的安全
 *        FTP:文件上的上传下载「我们把本地内容部署到服务器，或者从服务器拉去内容  FTP工具」
 *        ...
 *     域名:对服务器外网IP的一个重命名
 *        顶级域名/一级域名/二级域名...
 *        .cn/com/net/org/cc...
 *     端口号:区分同一个服务器上不同的服务的
 *        0~65535
 *        默认端口号：浏览器会根据输入的协议，给与默认端口号「前提是自己没有指定」
 *          HTTP -> 80
 *          HTTPS -> 443
 *          FTP -> 21
 *          ...
 *     请求资源的文件路径
 *        URL重写
 *     问号参数
 *        + 客户端把信息传递给服务器
 *        + A页面把信息传递给B页面
 *        + A组件把把信息传递给B组件
 *        + ...
 *     哈希值 HASH
 *        + 锚点定位
 *        + HASH路由
 *        + ...
 *     编码问题：
 *        处理：中文、特殊符号...
 *        + encodeURI/decodeURI：对整个URL编码，处理中文
 *        + encodeURIComponent/decodeURIComponent：对传递的参数单独的编码，处理中文以及特殊符号
 *        + escape/unescape：客户端对中文进行编码解码「一般只用于客户端信息传输，例如：cookie」
 *        + 也可以基于自己设定的加密机密规则处理「对称加密」
 *        + 对于某些数据，我么需要采用非对称加密「不可解密的，例如：md5」
 */
/* let str = `http://www.xx.com/api/list?lx=1&word=${encodeURIComponent("珠峰培训")}&from=${encodeURIComponent("http://www.qq.com/")}`;
console.log(str); */

// console.log(md5('zhufeng_peixun_2021')); //->"cee57d3f53e3b28fec59a3880c196e68"


/*
 * 2.缓存检测
 *   缓存一般指的都是静态资源文件的缓存，这个一般是客户端和服务器端根据一些协商的规则，自动去完成的缓存策略「不用我们自己编写啥代码去处理」
 *   只有API接口数据缓存，是需要前端开发自己去完成的
 * 
 * 缓存位置：
 *   Memory Cache : 内存缓存 「一般用于，页面没有关闭，只是刷新」
 *   Disk Cache：硬盘缓存  「页面关闭后重新打开」
 * 
 * 缓存处理：
 *   强缓存  Expires「HTTP1.0」 / Cache-Control「HTTP1.1」
 *      如果获取的是强缓存中的信息，HTTP状态码也是200
 *      如果是从服务器成功从新获取，HTTP状态码也是200
 *      
 *      强缓存不适合于静态页面的缓存？   
 *         如果页面都缓存了，以后服务器更新了产品，我们访问也是走的缓存数据，这样看不到最新的内容了  
 *        「强缓存模式下，其他资源信息的缓存和部署以及更新」
 *            项目资源更新，每一次部署的时候，在html中
 *            + 所有请求的资源文件「例如CSS/JS/图片...」后面都带一个时间戳
 *            + 或者每一次资源的更新，基于webpack生成不同的资源名称「HASH戳」
 * 
 *         <link href='index.css?20210109120512'>
 *         <script src='asdasdsa4356.js'>
 *         ----过了一天  css/js内容改变了，重新部署了
 *         <link href='index.css?20210110120512'> 发现后缀和上次缓存的不一样，则从新拉去最新的信息
 *         <script src='35453rtdgd.js'>
 * 
 *   协商缓存 Last-Modified/If-Modified-Since 「HTTP1.0」 & ETag/If-None-Match 「HTTP1.1」
 *      + 静态页面可以使用协商缓存处理
 *      + 对于其余的资源文件，我们使用 强缓存+协商缓存
 *   
 *   检测缓存 ->先看是否存在强缓存「强缓存存在走强缓存」->强缓存不存在，再看是否有协商缓存「协商存在，还是走缓存」->协商也不存在，则直接从服务器获取最新的内容  -> 缓存起来 ...
 * 
 * 
 * 数据缓存：
 *    + 本地存储：cookie / localStorage / sessionStorage
 *      + cookie:存储内容很少4KB、cookie信息自己会默认在客户端和服务器端传来传去「内容信息多会影响前后端通信的速度」、不稳定「基于安全卫士等可以把其清除掉」、用户可以禁用cookie...
 *      + localStorage:存储5MB、持久保存、稳定、和服务器也没关系
 *      + sessionStorage:页面关闭则消失
 *      + vuex+redux:类似于全局变量，页面刷新就没有了
 *      + ......
 */

function query() {
    return new Promise(resolve => {
        let xhr = new XMLHttpRequest;
        xhr.open('get', './data.json');
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4 && xhr.status === 200) {
                resolve(JSON.parse(xhr.responseText));
            }
        };
        xhr.send();
    });
}

(async function () {
    // 校验缓存数据
    let cache_data = localStorage.getItem('cache-data');
    if (cache_data) {
        cache_data = JSON.parse(cache_data);
        if (+new Date() - cache_data.time <= 10000) {
            console.log(cache_data.data);
            return;
        }
    }

    // 第一次请求数据
    let result = await query();
    console.log(result);

    // +存储到本地（记录一个存储周期）
    localStorage.setItem('cache-data', JSON.stringify({
        time: +new Date(),
        data: result
    }));
})();

/*
 * 3.DNS解析
 *   每一次DNS解析时间预计在20~120毫秒
 *    + 减少DNS解析次数「一个网站中访问的资源尽可能在一个服务器上」
 *      + 大型项目中，我么往往是分开服务器部署
 *        + Web服务器：处理资源文件「例如：html/css/js」的请求
 *        + 图片服务器：处理图片等富媒体资源
 *        + 数据服务器：处理API接口请求
 *        + 第三方服务器：获取第三方的一些数据
 *        + ...
 *        -->充分利用服务器的资源，提高不同资源服务器的处理和并发性
 *        -->提高HTTP的并发数「同一个服务器允许最大的并发数是5~7个」
 *      + 加大DNS解析的次数「不好的」
 * 
 *    + DNS预获取（DNS Prefetch）
 *      利用页面渲染的”异步性“，在渲染页面的过程中，同时去做DNS解析「解析的结果缓存下来」，后期渲染过程中，再次遇到对应域名的资源请求，直接获取缓存的解析记录即可...
 */

/*
 * 4.TCP三次握手：建立客户端和服务器之间的网络连接通道「只有通道建立好，在可以基于HTTP/HTTPS传输信息」
 *   + TCP网络通信：更加稳定可靠「三次握手 & 四次挥手」，但是也会慢
 *   + UDP网络通信：虽然建立通道比较快，但是不稳定，信息传输过程中可能会丢失信息
 */

/* 
 * 5.数据传输，基于传输协议
 *   HTTP事物：一个完整的请求和响应，称为一次HTTP事物
 *   HTTP报文：客户端和服务器之间通信的所有内容，统称为HTTP报文「控制台 NetWork」
 *     起始行：请求起始行、响应起始行
 *     首部（头）：请求头RequestHeaders、响应头ResponseHeaders
 *     主体：请求主体、响应主体
 */

/* 
 * 6.TCP四次挥手：断开TCP连接通道
 *   正常情况下，每一次请求，4、5、6三个步骤都走一遍「问题：每一次TCP连接和关闭都是消耗时间的」
 *   Connection: keep-alive 长连接「保持TCP通道暂时不关闭」，HTTP1.1版本及以后，默认都是带着这个属性的
 */