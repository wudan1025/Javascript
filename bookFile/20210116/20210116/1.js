/* ajax.get('/user/list', {
    params: {
        departmentId: 0,
        search: ''
    }
}).then(data => {
    console.log(data);
});

ajax.post('/user/login', {
    account: '18310612838',
    password: md5('1234567890')
}).then(data => {
    console.log(data);
}); */

/* fetch('http://127.0.0.1:8888/user/list')
    .then(response => response.json())
    .then(data => {
        console.log(data);
    }); */

/*
 * 情况1：开发时候是跨域的「解决」，但是服务器部署的时候是同源的 
 *  + 修改本地HOST「DNS解析」
 *    核心：骗过浏览器，让浏览器认为是同源，但是本质还是跨域
 */
/*
 * 情况2：开发和上线都是跨域的 
 *  + JSONP「不安全，并且只支持GET请求」
 *  + 杂七杂八的方案
 *    + document.domain + iframe
 *    + window.name + iframe
 *    + H5 postMessage
 *    + ...
 *  + CORS跨域资源共享
 *  + proxy跨域代理 「目前最常用的是他」
 */

/* 
 * JSONP
 *   利用<script>「或者<link>/<img>/...」不存在域的限制
 *   特征：资源的访问一定都是GET请求，不可能有POST
 */