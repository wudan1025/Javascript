/* 
 * 基于原生JS实现Promise「遵循的是Promise A Plus规范」
 *    https://promisesaplus.com/ 
 */
(function () {
    "use strict";

    /* 核心 */
    function Promise(executor) {
        var self = this,
            change;

        // 参数格式处理：
        //   + 只允许new执行，不允许把其当做普通函数执行
        //   + 传递的executor必须是一个函数
        if (typeof self === "undefined") throw new TypeError('undefined is not a promise');
        if (typeof executor !== "function") throw new TypeError('Promise resolver ' + executor + ' is not a function');

        // 初始化私有属性
        self.state = 'pending';
        self.result = undefined;
        self.onFulfilledCallbacks = [];
        self.onRejectedCallbacks = [];

        change = function change(state, result) {
            if (self.state !== "pending") return;
            self.state = state;
            self.result = result;
            // 通知基于then存储的方法执行「两个集合中的方法执行」
            if (self.onFulfilledCallbacks.length === 0 && self.onRejectedCallbacks.length === 0) return;
            setTimeout(function () {
                var i = 0,
                    callbacks = self.state === "fulfilled" ? self.onFulfilledCallbacks : self.onRejectedCallbacks,
                    len = callbacks.length,
                    item;
                for (; i < len; i++) {
                    item = callbacks[i];
                    typeof item === "function" ? item(self.result) : null;
                }
            });
        };

        // 立即执行executor
        try {
            executor(function resolve(result) {
                change('fulfilled', result);
            }, function reject(reason) {
                change('rejected', reason);
            });
        } catch (err) {
            change('rejected', err);
        }
    }
    Promise.prototype = {
        constructor: Promise,
        customer: true,
        then: function (onfulfilled, onrejected) {
            if (typeof onfulfilled !== "function") {
                onfulfilled = function onfulfilled(result) {
                    return result;
                };
            }
            if (typeof onrejected !== "function") {
                onrejected = function onrejected(reason) {
                    throw reason;
                };
            }

            var self = this;
            switch (self.state) {
                case 'fulfilled':
                    // queueMicrotask(callback):创建异步的微任务「兼容性不好」
                    setTimeout(function () {
                        onfulfilled(self.result);
                    });
                    break;
                case 'rejected':
                    setTimeout(function () {
                        onrejected(self.result);
                    });
                    break;
                default:
                    // 把传递进来的函数事先存储起来，以后执行resolve/reject的时候通知这些方法执行
                    self.onFulfilledCallbacks.push(onfulfilled);
                    self.onRejectedCallbacks.push(onrejected);
            }
        },
        catch: function (onrejected) {
            var self = this;
            return self.then(null, onrejected);
        }
    };
    if (typeof Symbol !== "undefined") {
        Promise.prototype[Symbol.toStringTag] = 'Promise';
    }
    Promise.resolve = function resolve(value) {
        return new Promise(function (resolve) {
            resolve(value);
        });
    };
    Promise.reject = function reject(value) {
        return new Promise(function (_, reject) {
            reject(value);
        });
    };
    Promise.all = function all(promises) {};

    /* 暴露API */
    if (typeof window !== "undefined") {
        // window.Promise = Promise;
    }
    if (typeof module === "object" && typeof module.exports === "object") {
        // module.exports = Promise;
    }


    var p1 = new Promise(function (resolve, reject) {
        /* setTimeout(() => {
            reject('NO');
        }, 1000); */
        reject('NO');
    });
    p1.then(function (result) {
        console.log('成功', result);
    });
    p1.then(null, function (reason) {
        console.log('失败', reason);
    });
    console.log(1);
})();