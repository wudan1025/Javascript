/*
 * CRP:critical rendering path 关键渲染路径
 *   围绕渲染的机制和步骤，去详细的进行每一步的优化，以此来提高页面的渲速度和运行性能
 * 
 * 从服务器基于HTTP网路请求回来的数据
 *   + 16进制的文件流
 *   + 浏览器把它解析为字符串（HTML字符串）
 *   + 按照W3C规则识别成为一个个的节点「词法解析」
 *   + 生成xxx树
 * 
 * 访问页面，首先请求回来的是一个HTML文档，浏览器开始自上而下渲染
 *   + 进程：一般指一个程序（浏览器打开一个页面，就相当于开了一个进程）
 *   + 线程：进程中具体去执行事务的东西，一个线程同时只能干一件事情
 *   一个进程中，可能会包含一到多个线程
 * 
 * 同步编程：一般是只有一个线程去处理事情，上面的事情处理不完，下面的事情无法处理「一件事一件事去干」
 * 异步编程：
 *    + 多线程异步编程
 *    + 单线程异步编程（JS是EventQueue+EventLoop机制完成单线程异步编程的）
 *    + ...
 * 
 * 浏览器是可以开辟多个进程/线程的
 *    + GUI渲染线程：渲染页面
 *    + JS引擎线程：渲染JS代码的
 *    + HTTP网络线程，可以开辟N多个：从服务器获取资源和数据的
 *    + 定时器监听线程
 *    + DOM监听线程
 *    + ...
 * 
 * 
 * 渲染页面过程中
 *    + 遇到style内嵌样式，GUI直接渲染即可
 *      ->如果CSS代码量比较少，我么直接内嵌即可，拉去HTML的时候，同时CSS也回来了，渲染的时候直接就渲染了
 *      ->但是如果CSS代码比较多，如果还用内嵌，一方面会影响HTML的拉取速度，也不利于代码的维护，此时还是用外链的方式比较好
 *    + 遇到link，浏览器开辟一个HTTP线程去请求资源文件信息，同时GUI继续向下渲染「异步」
 *      + 浏览器同时能够发送的HTTP请求是有数量限制的（谷歌：5~7个）
 *      + 超过最大并发限制的HTTP请求需要排队等待
 *      ->HTTP请求一定是越少越好...
 *    + 遇到@import，浏览器也是开辟HTTP线程去请求资源，但是此时GUI也暂定了（导入式样式会阻碍GUI的渲染），当资源请求回来之后，GUI才能继续渲染「同步」
 *      ->真实项目中应该避免使用@import
 * 
 *   ------------
 * 
 *    + 遇到 <script src='xxx/xxx.js'>，会阻碍GUI的渲染
 *       + defer：和link是类似的机制了，不会阻碍GUI渲染，当GUI渲染完，才会把请求回来的JS去渲染...
 *       + async：请求JS资源是异步的「单独开辟HTTP去请求」，此时GUI继续渲染；但是一但当JS请求回来，会立即暂停GUI的处理，接下来去渲染JS...
 *       ->加入我们有5个JS的请求，如果不设置任何属性，肯定是按照顺序请求和渲染JS的「依赖关系是有效的」；但是如果设置async，谁先请求回来就先渲染谁，依赖关系是无效的；如果使用defer是可以建立依赖关系的(浏览器内部在GUI渲染完成后，等待所有设置defer的资源都请求回来，再按照编写的依赖顺序去加载渲染js)；
 * 
 *    真实项目开发，我们一般把link放在页面的头部「是为了在没有渲染DOM的时候，就通知HTTP去请求CSS了，这样DOM渲染玩，CSS也差不多回来了，更有效的利用时间，提高页面的渲染速度」；我们一般把JS放在页面的底部，防止其阻碍GUI的渲染，如果不放在底部，我们最好设置上async/defer...；
 * 
 * 
 * DOM TREE（DOMContentLoaded事件触发） -> 「执行JS」? -> CSSOM TREE -> RENDER TREE渲染树「浏览器未来是按照这个树来绘制页面的」-> Layout布局计算「回流/重排」-> Painting绘制「重绘」{ 分层绘制 }
 *    + 页面第一次渲染，必然会引发一次回流和重绘
 *    + 如果我们改变了元素的位置和大小，浏览器需要重新计算元素在视口中的位置和大小信息，重新计算的过程是回流/重排，一但发生了回流操作，一定也会触发重绘「很消耗性能：DOM操作消耗性能，90%说的都是它」
 *    + 但是如果只是一些普通样式的改变，位置和大小不变，只需要重绘即可
 */

setTimeout(() => {
    /* // let box = document.querySelector('#box');
    // box.style.width = '100px';
    // box.style.height = '100px';

    // 集中改变样式
    // box.style.cssText = "width:100px;height:100px;";
    // box.className = 'big'; */

    // 新版浏览器都有一个机制：渲染队列机制
    // let box = document.querySelector('#box');
    // box.style.width = '100px';
    // console.log(box.style.width); //获取样式：style.xxx/getComputedStyle/getBoundingClientRect/clientWidth.../offsetWidth.../scrollWidth...  刷新浏览器渲染队列
    // box.style.height = '100px';

    // ---读写分离：把获取样式和设置样式的操作分离开
    // box.style.width = '100px';
    // box.style.height = '100px';
    // console.log(box.style.width);

    // ---读写分离
    // let prevW = parseFloat(window.getComputedStyle(box)['width']),
    //     prevH = parseFloat(window.getComputedStyle(box)['height']);
    // box.style.width = prevW + 100 + 'px';
    // box.style.height = prevH + 100 + 'px';


    // 文档碎片
    /* let box = document.querySelector('#box'),
        frag = document.createDocumentFragment();
    for (let i = 0; i < 10; i++) {
        let span = document.createElement('span');
        span.innerHTML = i + 1;
        frag.appendChild(span);
    }
    box.appendChild(frag); */

    /* let box = document.querySelector('#box'),
        str = ``;
    for (let i = 0; i < 10; i++) {
        str += `<span>${i+1}</span>`;
    }
    box.innerHTML = str; */

}, 1000);