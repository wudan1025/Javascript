(function () {
    "use strict";
    /* 工具 */
    var isArray = function isArray(value) {
        var type = Object.prototype.toString.call(value);
        return /^\[object Array\]$/i.test(type);
    };
    var isPromise = function isPromise(x) {
        if (x == null) return false;
        if (/^(object|function)$/i.test(typeof x)) {
            if (typeof x.then === "function") {
                return true;
            }
        }
        return false;
    };
    var handle = function handle(promise, x, resolve, reject) {
        if (x === promise) throw new TypeError('Chaining cycle detected for promise #<Promise>');
        if (isPromise(x)) {
            try {
                x.then(resolve, reject);
            } catch (err) {
                reject(err);
            }
            return;
        }
        resolve(x);
    };

    /* 核心 */
    function Promise(executor) {
        var self = this,
            change;
        if (typeof self === "undefined") throw new TypeError('undefined is not a promise');
        if (typeof executor !== "function") throw new TypeError('Promise resolver ' + executor + ' is not a function');

        self.state = 'pending';
        self.result = undefined;
        self.onFulfilledCallbacks = [];
        self.onRejectedCallbacks = [];
        change = function change(state, result) {
            if (self.state !== "pending") return;
            self.state = state;
            self.result = result;
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

            var self = this,
                promiseNew,
                x;
            promiseNew = new Promise(function (resolve, reject) {
                switch (self.state) {
                    case 'fulfilled':
                        setTimeout(function () {
                            try {
                                x = onfulfilled(self.result);
                                handle(promiseNew, x, resolve, reject);
                            } catch (err) {
                                reject(err);
                            }
                        });
                        break;
                    case 'rejected':
                        setTimeout(function () {
                            try {
                                x = onrejected(self.result);
                                handle(promiseNew, x, resolve, reject);
                            } catch (err) {
                                reject(err);
                            }
                        });
                        break;
                    default:
                        self.onFulfilledCallbacks.push(function (result) {
                            try {
                                x = onfulfilled(result);
                                handle(promiseNew, x, resolve, reject);
                            } catch (err) {
                                reject(err);
                            }
                        });
                        self.onRejectedCallbacks.push(function (reason) {
                            try {
                                x = onrejected(reason);
                                handle(promiseNew, x, resolve, reject);
                            } catch (err) {
                                reject(err);
                            }
                        });
                }
            });
            return promiseNew;
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
    Promise.all = function all(promises) {
        var legal = true;
        typeof Symbol !== "undefined" ? (typeof promises[Symbol.iterator] !== "function" ? legal = false : null) : (!isArray(promises) ? legal = false : null);
        if (legal === false) throw new TypeError(promises + ' is not iterable');
        return new Promise(function (resolve, reject) {
            var i = 0,
                len = promises.length,
                index = 0,
                item,
                results = [];
            for (; i < len; i++) {
                (function (i) {
                    item = promises[i];
                    if (!isPromise(item)) item = Promise.resolve(item);
                    item.then(function (result) {
                        index++;
                        results[i] = result;
                        if (index >= len) resolve(results);
                    }, reject);
                })(i);
            }
        });
    };

    /* 暴露API */
    if (typeof window !== "undefined") {
        window.Promise = Promise;
    }
    if (typeof module === "object" && typeof module.exports === "object") {
        module.exports = Promise;
    }
})();

//===========测试
/* var p1 = new Promise(function (resolve, reject) {
    resolve('OK');
}).then(function (result) {
    console.log('成功', result);
    return a;
}).then(function (result) {
    console.log('成功', result);
}).catch(function (reason) {
    console.log('失败', reason);
}); */

/* const query = interval => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (interval === 1000) reject(interval);
            resolve(interval);
        }, interval);
    });
};

var p = Promise.all([query(3000), query(1000), query(2000), 4000]);
p.then(function (results) {
    console.log('成功', results);
}).catch(function (reason) {
    console.log('失败', reason);
}); */