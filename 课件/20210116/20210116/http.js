const env = 'development';
switch (env) {
    case 'development':
        ajax.defaults.baseURL = "http://127.0.0.1:8888";
        break;
    case 'test':
        ajax.defaults.baseURL = "http://168.23.12.124:8888";
        break;
    case 'production':
        ajax.defaults.baseURL = "http://api.zhufengpeixun.cn";
        break;
}
ajax.defaults.withCredentials = true;
ajax.defaults.validateStatus = status => {
    return status >= 200 && status < 400;
};
ajax.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
ajax.defaults.transformRequest = (data, headers) => {
    const ContentType = headers.post['Content-Type'] || headers['Content-Type'];
    if (ContentType === "application/x-www-form-urlencoded") {
        return Qs.stringify(data);
    }
    if (ContentType === "application/json") {
        return JSON.stringify(data);
    }
    return data;
};

// 请求拦截器：向服务器发送请求之前
ajax.interceptors.request.use(config => {
    const token = localStorage.getItem('X-Token');
    if (token) {
        config.headers['Authorization'] = token;
    }
    return config;
});

// 响应拦截器
ajax.interceptors.response.use(response => {
    return response.body;
}, reason => {
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
        if (reason && (reason.code === "TIMEOUT" || reason.code === "ABORT")) {
            // 超时或者请求中断
        }
        if (!navigator.onLine) {
            // 网络出现故障
        }
    }
    return Promise.reject(reason);
});