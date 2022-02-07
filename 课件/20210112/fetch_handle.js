/*
 * https://developer.mozilla.org/zh-CN/docs/Web/API/Fetch_API/Using_Fetch 
 */



// 设置公共的请求前缀
// const env = process.env.NODE_ENV;
let env = 'development',
    baseURL = "";
switch (env) {
    case 'development':
        baseURL = "http://127.0.0.1:8888";
        break;
    case 'test':
        baseURL = "http://168.23.12.124:8888";
        break;
    case 'production':
        baseURL = "http://api.zhufengpeixun.cn";
        break;
}

/*
 * method
 * params
 * body
 * headers 
 * responseType:'text/json/blob/buffer'
 */
function request(url, config) {
    config = config || {};
    let {
        params,
        headers: headers_config,
        body,
        method = 'GET',
        responseType = 'json'
    } = config;

    // 处理URL
    if (url.substr(0, 4).toLowerCase() !== "http") {
        // 传递的URL不设置前缀，我们自己把公共前缀加上
        url = baseURL + url;
    }

    // 处理HEADERS
    let headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
    };
    if (headers_config) {
        headers = Object.assign(headers, headers_config);
    }

    // 处理PARAMS「依赖QS库」
    if (params) {
        url += `${url.includes('?')?'&':'?'}${Qs.stringify(params)}`;
    }

    // 处理BODY「支持对象格式」
    if (body !== null && typeof body === "object") {
        const ContentType = headers['Content-Type'];
        if (ContentType === "application/x-www-form-urlencoded") {
            body = Qs.stringify(body);
        }
        if (ContentType === "application/json") {
            body = JSON.stringify(body);
        }
    }

    // 发送请求
    config = {
        method,
        headers,
        credentials: 'include',
        cache: 'no-cache',
    };
    if (/^(POST|PUT|PATCH)$/i.test(method)) {
        config.body = body;
    }
    return fetch(url, config).then(response => {
        let status = response.status,
            result = '';
        if (status >= 200 && status < 300) {
            // 处理返回的结果
            switch (responseType) {
                case 'json':
                    result = response.json();
                    break;
                case 'text':
                    result = response.text();
                    break;
                case 'blob':
                    result = response.blob();
                    break;
                case 'buffer':
                    result = response.arrayBuffer();
                    break;
            }
            return result;
        }
        return Promise.reject({
            status: response.status,
            statusText: response.statusText
        });
    }).catch(reason => {
        let status = reason.status;
        if (status) {
            // 状态码错误
        } else {
            // 断网了
        }
        return Promise.reject(reason);
    });
}

request('/user/login', {
    method: 'POST',
    body: {
        account: '18310612838',
        password: md5('1234567890')
    }
}).then(data => {
    console.log(data);
    return request('/user/login');
}).then(data => {
    console.log(data);
});






/* let fmd = new FormData;
fetch('http://127.0.0.1:8888/user/login', {
    headers: {
        // 设置请求头
    },
    method: 'POST',
    credentials: 'include',
    cache: 'no-cache',
    // 设置请求主体 只对POST系列有用（不是POST请求不要设置）
    // body: fmd
}).then(response => {
    let status = response.status;
    if (status >= 200 && status < 300) {
        // response是Response类的实例
        //   + response.json()
        //   + response.text()
        //   + response.blob()
        //   + response.arrayBuffer()
        // 返回的都是Promise实例
        let data = response.json();
        return data;
    }
    return Promise.reject({
        status: response.status,
        statusText: response.statusText
    });
}).then(data => {
    console.log(data);
}).catch(reason => {
    let status = reason.status;
    if (status) {
        // 状态码错误
    } else {
        // 断网了
    }
}); */