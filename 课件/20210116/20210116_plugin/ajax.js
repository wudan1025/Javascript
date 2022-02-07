import _ from './lib/utils';
import qs from 'qs';

/* 公用参数或者变量 */
const methodGET = ['GET', 'HEAD', 'DELETE', 'OPTIONS'],
    methodPOST = ['POST', 'PUT', 'PATCH'],
    methods = methodGET.concat(methodPOST);
let headers = {
    'Content-Type': 'application/json'
};
_.each(methods, name => {
    name = name.toLowerCase();
    headers[name] = {};
});

/* 核心 */
class Ajax {
    constructor(config) {
        let self = this,
            interceptors_request = null;
        // 请求拦截器
        interceptors_request = ajax.interceptors.request.pond[0];
        config = interceptors_request(config);
        self.config = config;
        return self.request();
    }
    // 发送数据请求
    request() {
        let promise,
            xhr,
            self = this,
            {
                method,
                timeout,
                withCredentials,
                validateStatus
            } = self.config;
        promise = new Promise((resolve, reject) => {
            // 创建实例&OPEN
            xhr = new XMLHttpRequest;
            xhr.open(method.toUpperCase(), self.handleURL());
            // 零散的配置
            timeout > 0 ? xhr.timeout = timeout : null;
            xhr.withCredentials = withCredentials;
            self.handleRequestHeaders(xhr);
            // 结果处理
            xhr.onreadystatechange = () => {
                if (!validateStatus(xhr.status)) {
                    // 状态码不符合:失败
                    reject(self.handleResult(xhr, false, 'STATUS'));
                    return;
                }
                if (xhr.readyState === 4 || (method.toUpperCase() === "HEAD" && xhr.readyState === 2)) {
                    // 成功
                    resolve(self.handleResult(xhr, true));
                }
            };
            xhr.ontimeout = xhr.onabort = xhr.onerror = (ev) => {
                // 请求超时 & 请求中断 & 网络出问题:失败
                reject(self.handleResult(xhr, false, ev.type.toUpperCase()));
            };
            // 发送请求
            xhr.send(self.handleData());
        });
        // 响应拦截器
        let [onfulfilled, onrejected] = ajax.interceptors.response.pond;
        return promise.then(onfulfilled, onrejected);
    }
    // 处理URL
    handleURL() {
        let self = this,
            {
                baseURL,
                url,
                cache,
                params,
                method
            } = self.config;
        url = baseURL + url;
        if (params) {
            if (typeof params === "object") {
                params = qs.stringify(params);
            }
            if (params) url += `${url.includes('?')?'&':'?'}${params}`;
        }
        if (methodGET.includes(method.toUpperCase()) && cache === false) {
            url += `${url.includes('?')?'&':'?'}_=${Math.random()}`;
        }
        return url;
    }
    // 处理请求主体信息
    handleData() {
        let self = this,
            {
                data,
                method,
                transformRequest,
                headers
            } = self.config;
        // 非POST请求什么都不处理
        if (!methodPOST.includes(method.toUpperCase())) return null;
        return transformRequest(data, headers);
    }
    // 处理自定义请求头
    handleRequestHeaders(xhr) {
        let self = this,
            obj = {},
            {
                headers, //{xxx:xxx,post:{xxx:xxx}}
                method
            } = self.config;
        _.each(headers, (value, key) => {
            if (methods.includes(key.toUpperCase())) return;
            obj[key] = value;
        });
        obj = _.merge(true, obj, headers[method.toLowerCase()] || {});
        // 迭代设置
        _.each(obj, (value, key) => {
            xhr.setRequestHeader(key, value);
        });
    }
    // 处理结果的
    handleResult(xhr, isOk, fail) {
        let self = this,
            {
                responseType
            } = self.config;
        let response = {
            status: xhr.status,
            statusText: xhr.statusText,
            xhr: xhr,
            config: self.config,
            headers: {},
            body: null
        };
        // 处理响应头信息
        let headersAllText = xhr.getAllResponseHeaders();
        if (headersAllText) {
            headersAllText = headersAllText.split(/(?:\n)/g);
            headersAllText.forEach(item => {
                if (!item) return;
                let [key, value] = item.split(': ');
                response.headers[key] = value;
            });
        }
        if (isOk) {
            // 成功
            response.body = xhr.response;
            switch (responseType.toUpperCase()) {
                case 'JSON':
                    response.body = JSON.parse(xhr.responseText);
                    break;
                case 'TEXT':
                    response.body = xhr.responseText;
                    break;
                case 'XML':
                    response.body = xhr.responseXML;
                    break;
            }
            return response;
        }
        return {
            code: fail,
            xhr: xhr,
            config: self.config,
            response: fail === "STATUS" ? response : undefined
        };
    }
}

/* 规划调用方式 */
let configRule = {
    baseURL: {
        type: 'string',
        default: ''
    },
    url: {
        type: 'string',
        required: true
    },
    method: {
        type: 'string',
        default: 'GET'
    },
    transformRequest: {
        type: 'function',
        default: data => data
    },
    headers: {
        type: 'object',
        default: headers
    },
    params: {
        type: ['string', 'object'],
        default: {}
    },
    cache: {
        type: 'boolean',
        default: false
    },
    data: {
        type: ['string', 'object'],
        default: ''
    },
    timeout: {
        type: 'number',
        default: 0
    },
    withCredentials: {
        type: 'boolean',
        default: false
    },
    responseType: {
        type: 'string',
        default: 'json'
    },
    validateStatus: {
        type: 'function',
        default: status => {
            return status >= 200 && status < 300;
        }
    }
};
const ajax = function ajax(config) {
    !_.isPlainObject(config) ? config = {} : null;
    config = _.merge(true, {}, ajax.defaults, config);
    // 迭代配置规则，进行规则校验&&参数合并
    _.each(configRule, (ruleObj, key) => {
        let {
            type,
            default: defaultValue,
            required
        } = ruleObj;
        let myValue = config[key],
            myValue_type = _.toType(myValue);
        // 规则是必须传递，但是我们没有传递这个配置项，则报错即可
        if (required && myValue_type === "undefined") throw new TypeError(`${key} must be required!`);
        // 用户自己传递了对应的配置项
        if (myValue_type !== "undefined") {
            !Array.isArray(type) ? type = [type] : null;
            // 不符合要求传递值的格式
            if (!type.includes(myValue_type)) throw new TypeError(`${key} must be an ${type}!`);
            return;
        }
        // 用户没有传递当前配置项
        config[key] = defaultValue;
    });
    // 发送数据请求
    return new Ajax(config);
};
// speedy function
_.each(methodGET, name => {
    name = name.toLowerCase();
    ajax[name] = function (url, config) {
        !_.isPlainObject(config) ? config = {} : null;
        config.url = url;
        config.method = name;
        return ajax(config);
    };
});
_.each(methodPOST, name => {
    name = name.toLowerCase();
    ajax[name] = function (url, data, config) {
        !_.isPlainObject(config) ? config = {} : null;
        config.url = url;
        config.method = name;
        config.data = data;
        return ajax(config);
    };
});
// static propertys
ajax.all = function ajax_all(promises) {
    if (!_.isArrayLike(promises)) throw new TypeError('promises must be an array or like-array!');
    return Promise.all(promises);
};
ajax.defaults = {
    // 默认必须有headers对象？ 
    // ajax.defaults.headers['xxx'] / ajax.defaults.headers.post['xxx']
    headers: _.clone(true, headers)
};
// interceptors
class Interceptors {
    constructor() {
        let self = this;
        self.pond = [result => {
            return result;
        }, reason => {
            return Promise.reject(reason);
        }];
    }
    use(onfulfilled, onrejected) {
        let self = this;
        if (typeof onfulfilled !== "function") {
            onfulfilled = result => {
                return result;
            };
        }
        if (typeof onrejected !== "function") {
            onrejected = reason => {
                return Promise.reject(reason);
            };
        }
        self.pond[0] = onfulfilled;
        self.pond[1] = onrejected;
    }
}
ajax.interceptors = {
    request: new Interceptors,
    response: new Interceptors
};

/* 暴露API */
if (typeof window !== "undefined") {
    window.ajax = ajax;
}
if (typeof module === "object" && typeof module.exports === "object") {
    module.exports = ajax;
}