/*
 * http://www.axios-js.com/zh-cn/docs/ 
 *    ajax「XMLHttpRequest」
 *      + $.ajax([config])  JQ
 *      + axios  基于Promise封装的ajax库 
 *      + Fetch  ES6+浏览器新增的前后端数据通信方案，和XMLHttpRequest不是一个东西「本身就是基于Promise管理的」
 *      + web scoket
 *      + 跨域请求方案
 *      + ......
 */
queryGET('/user/list', {
    departmentId: 0,
    search: ''
}).then(data => {

});


axios.get('/user/list', {
    params: {
        departmentId: 0,
        search: ''
    }
}).then(data => {
    console.log(data);
}).catch(reason => {
    // ...单独再做一些处理
});

axios.post('/user/login', {
    account: '18310612838',
    password: md5('1234567890')
}).then(data => {
    console.log(data);
});

axios.post('/user/resetpassword', {
    userId: 1,
    password: md5('1234567890')
}, {
    headers: {
        'Content-Type': 'application/json'
    }
}).then(data => {
    console.log(data);
});