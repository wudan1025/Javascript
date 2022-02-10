/*
 * 真实项目中有三种环境：
 *   + 开发环境 
 *   + 测试环境
 *  「灰度环境」
 *   + 成产环境
 */
// const env = process.env.NODE_ENV;
const env = 'development';
switch (env) {
    // $ npm run serve
    case 'development':
        axios.defaults.baseURL = "http://127.0.0.1:8888";
        break;
        // $ npm run test
    case 'test':
        axios.defaults.baseURL = "http://168.23.12.124:8888";
        break;
        // $ npm run build
    case 'production':
        axios.defaults.baseURL = "http://api.zhufengpeixun.cn";
        break;
}
// axios.defaults.timeout = 0;
axios.defaults.withCredentials = true;
axios.defaults.validateStatus = status => {
    return status >= 200 && status < 400;
};
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.headers['xxx'] = 'xxx';
axios.defaults.transformRequest = (data, headers) => {
    const ContentType = headers['Content-Type'] ||
        headers.common['Content-Type'] || headers.post['Content-Type'];
    if (ContentType === "application/x-www-form-urlencoded") {
        return Qs.stringify(data);
    }
    if (ContentType === "application/json") {
        return JSON.stringify(data);
    }
    return data;
};

// 请求拦截器：向服务器发送请求之前
axios.interceptors.request.use(config => {
    // 例如：所有请求发送，我们需要携带Token
    const token = localStorage.getItem('X-Token');
    if (token) {
        config.headers['Authorization'] = token;
    }
    return config;
});

// 响应拦截器
axios.interceptors.response.use(response => {
    return response.data;
}, reason => {
    /*
     * 失败的情况
     *   1.服务器给响应了，只不过返回的状态码不是2开头的 
     *   2.服务器不给响应：网络出错了、超时了、手动断开请求
     */
    let response = reason.response;
    if (response) {
        switch (response.status) {
            case 400:
                break;
            case 401:
                break;
                // ...
        }
    } else {
        if (reason && reason.code === "ECONNABORTED") {
            // 超时或者请求中断
        }
        if (!navigator.onLine) {
            // 网络出现故障
        }
    }
    return Promise.reject(reason);
});

//========
// 业务层的失败统一处理和封装
//   + 业务code失败的提示
//   + 做一些是否登录的校验
//   + ....
function queryGET(url, params = {}, config = {}) {
    config.params = params;
    return axios.get(url, config).then(data => {
        let code = +data.code;
        if (code === 0) {
            return data;
        }
        // 统一做提示
        // ...
        return Promise.reject(data);
    });
}

function queryPOST(url, data, config = {}) {
    return axios.post(url, data, config).then(data => {
        let code = +data.code;
        if (code === 0) {
            return data;
        }
        // 统一做提示
        // ...
        return Promise.reject(data);
    });;
}