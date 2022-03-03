/*
 * @LastEditors: wudan01
 * @description: 文件描述
 */
// 呆呆发我的
(function () {
  /* 核心部分 */
  function Promise(executor) {
    var self = this,
      change;
    if (typeof executor !== 'function')
      throw new TypeError('Promise resolver is not a function');
    if (!(self instanceof Promise))
      throw new TypeError('undefined is not a promise');
    self.state = 'pending';
    self.result = undefined;
    self.onfulfilledCallbacks = [];
    self.onrejectedCallbacks = [];
    change = function change(state, result) {
      if (self.state !== 'pending') return;
      self.state = state;
      self.result = result;
      setTimeout(function () {
        var callbacks =
          state === 'fulfilled'
            ? self.onfulfilledCallbacks
            : self.onrejectedCallbacks;
        callbacks.forEach(function (callback) {
          if (typeof callback !== 'function') return;
          callback(self.result);
        });
      });
    };
    try {
      executor(
        function resolve(value) {
          change('fulfilled', value);
        },
        function reject(reason) {
          change('rejected', reason);
        }
      );
    } catch (err) {
      change('rejected', err);
    }
  }

  /* 原型部分 */
  var resolvePromise = function resolvePromise(promise, x, resolve, reject) {
    if (promise === x)
      throw new TypeError('Chaining cycle detected for promise #<Promise>');
    if (x !== null && /^(object|function)$/i.test(typeof x)) {
      var then;
      try {
        then = x.then;
      } catch (err) {
        reject(err);
      }
      if (typeof then === 'function') {
        var called = false;
        try {
          then.call(
            x,
            function onfulfilled(y) {
              if (called) return;
              called = true;
              resolvePromise(promise, y, resolve, reject);
            },
            function onrejected(r) {
              if (called) return;
              called = true;
              reject(r);
            }
          );
        } catch (err) {
          if (called) return;
          called = true;
          reject(err);
        }
        return;
      }
    }
    resolve(x);
  };
  Promise.prototype = {
    constructor: Promise,
    then: function then(onfulfilled, onrejected) {
      var self = this,
        promise;
      if (!(self instanceof Promise))
        throw new TypeError(
          'Method Promise.prototype.then called on incompatible receiver #<Promise>'
        );
      if (typeof onfulfilled !== 'function') {
        onfulfilled = function onfulfilled(value) {
          return value;
        };
      }
      if (typeof onrejected !== 'function') {
        onrejected = function onrejected(reason) {
          throw reason;
        };
      }
      promise = new Promise(function (resolve, reject) {
        switch (self.state) {
          case 'fulfilled':
            setTimeout(function () {
              try {
                var x = onfulfilled(self.result);
                resolvePromise(promise, x, resolve, reject);
              } catch (err) {
                reject(err);
              }
            });
            break;
          case 'rejected':
            setTimeout(function () {
              try {
                var x = onrejected(self.result);
                resolvePromise(promise, x, resolve, reject);
              } catch (err) {
                reject(err);
              }
            });
            break;
          default:
            self.onfulfilledCallbacks.push(function (value) {
              try {
                var x = onfulfilled(value);
                resolvePromise(promise, x, resolve, reject);
              } catch (err) {
                reject(err);
              }
            });
            self.onrejectedCallbacks.push(function (reason) {
              try {
                var x = onrejected(reason);
                resolvePromise(promise, x, resolve, reject);
              } catch (err) {
                reject(err);
              }
            });
        }
      });
      return promise;
    },
    catch: function mycatch(onrejected) {
      return Promise.prototype.then.call(this, null, onrejected);
    },
  };
  if (typeof Symbol !== 'undefined')
    Promise.prototype[Symbol.toStringTag] = 'Promise';

  /* 静态属性 */
  var isPromise = function isPromise(x) {
    if (x !== null && /^(object|function)$/i.test(typeof x)) {
      var then;
      try {
        then = x.then;
      } catch (_) {
        return false;
      }
      if (typeof then === 'function') return true;
    }
    return false;
  };
  var checkIterator = function checkIterator(arr) {
    if (arr == null) return false;
    if (typeof Symbol !== 'undefined') {
      var iterator = arr[Symbol.iterator];
      return iterator ? true : false;
    }
    return Array.isArray(arr);
  };
  Promise.resolve = function resolve(value) {
    if (isPromise(value)) return value;
    return new Promise(function (resolve) {
      resolve(value);
    });
  };
  Promise.reject = function reject(reason) {
    return new Promise(function (_, reject) {
      reject(reason);
    });
  };
  Promise.all = function all(promises, limit) {
    if (!checkIterator(promises))
      throw new TypeError('promises is not iterable');
    if (typeof limit !== 'number' || isNaN(limit)) limit = 1;
    var n = 0,
      m = 0,
      results = [],
      reasons = [],
      len = promises.length;
    limit = limit < 1 ? 1 : limit > len ? len : limit;
    return new Promise(function (resolve, reject) {
      for (var i = 0; i < len; i++) {
        (function (i) {
          var promise = promises[i];
          if (!isPromise(promise)) promise = Promise.resolve(promise);
          promise.then(
            function onfulfilled(value) {
              results[i] = value;
              n++;
              if (n >= len) resolve(results);
            },
            function onrejected(reason) {
              m++;
              reasons[i] = reason;
              if (m >= limit) {
                reject(limit === 1 ? reason : reasons);
                return;
              }
              n++;
              results[i] = null;
            }
          );
        })(i);
      }
    });
  };
  Promise.any = function any(promises) {
    if (!checkIterator(promises))
      throw new TypeError('promises is not iterable');
    var n = 0,
      len = promises.length;
    return new Promise(function (resolve, reject) {
      for (var i = 0; i < len; i++) {
        var promise = promises[i];
        if (!isPromise(promise)) promise = Promise.resolve(promise);
        promise.then(
          function onfulfilled(value) {
            resolve(value);
          },
          function onrejected() {
            n++;
            if (n >= len) reject('All promises were rejected');
          }
        );
      }
    });
  };

  /* 测试是否符合规范 */
  Promise.deferred = function () {
    var result = {};
    result.promise = new Promise(function (resolve, reject) {
      result.resolve = resolve;
      result.reject = reject;
    });
    return result;
  };

  /* 暴露API */
  if (typeof window !== 'undefined') window.Promise = Promise;
  if (typeof module === 'object' && typeof module.exports === 'object')
    module.exports = Promise;
})();
