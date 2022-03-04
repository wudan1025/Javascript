/*
 * @LastEditors: wudan01
 * @description: 文件描述
 */

/*
总结
catch 方法无法执行
没有十一 class 语法
*/
// 'use strict';

function Promise(executor) {
  // 两种方法判断 只能通过 new 执行
  if (this == 'undefined' || this == window) {
    throw new Error('只能通过new 执行');
  }
  if (this.constructor != Promise) {
    throw new Error('只能通过new 执行');
  }

  // 判断回调只能是 函数
  if (typeof executor !== 'function') {
    throw new Error('cb 不是function');
  }

  var self = this;
  this.state = 'pending';
  this.result = undefined;

  this.onFulfilledCallbacks = [];
  this.onRejectedCallbacks = [];

  this.resolve = function (result) {
    stateChange('fullfilled', result);
  };

  this.reject = function (error) {
    stateChange('rejected', error);
  };

  // 回调执行 导致状态变化
  try {
    executor(this.resolve, this.reject);
  } catch (e) {
    console.log(e);
  }

  function stateChange(state, result) {
    self.state = state;
    // 成功
    if (self.state == 'fullfilled') {
      self.result = result;
      for (let i = 0; i < self.onFulfilledCallbacks.length; i++) {
        setTimeout(function () {
          self.onFulfilledCallbacks[i](result);
        }, 0);
      }
    }
    if (self.state == 'rejected') {
      self.reason = result;
      for (let i = 0; i < self.onRejectedCallbacks.length; i++) {
        setTimeout(function () {
          self.onRejectedCallbacks[i](self.reason);
        }, 0);
      }
    }
  }
}

Promise.prototype.then = function (onfulfilled, onrejected) {
  if (typeof onfulfilled != 'function') {
    onfulfilled = function onfulfilled(result) {
      return result;
    };
  }

  if (typeof onrejected !== 'function') {
    onrejected = function onrejected(reason) {
      throw reason;
    };
  }
  var self = this;
  switch (self.state) {
    case 'fullfilled':
      // 如果已经成功，执行成功回调
      setTimeout(function () {
        onfulfilled(self.result);
      });
      break;
    case 'rejected':
      // 如果已经失败，执行失败回调
      setTimeout(function () {
        onrejected(self.reason);
      });
      break;
    default:
      // pending 状态
      self.onFulfilledCallbacks.push(onfulfilled);
      self.onRejectedCallbacks.push(onrejected);
  }
};

// if (typeof Symbol !== 'undefined') {
//   Promise.prototype[Symbol.toStringTag] = 'Promise';
// }

// 静态方法
// Promise.resolve = function resolve(value) {
//   return new Promise(function (resolve) {
//     resolve(value);
//   }, null);
// };

// Promise.reject = function reject(value) {
//   return new Promise(null, function (reject) {
//     reject(value);
//   });
// };

// Promise.all = function all(promise) {};
// Promise.prototype.catch = function (onrejected) {
//   return this.then(null, onrejected);
// };

// if (typeof window !== 'undefined') {
//   window.Promise = Promise;
// }

// if (typeof module === 'object' && typeof moudule.exports === 'object') {
//   module.exports = Promise;
// }

var p1 = new Promise(function (resolve, reject) {
  setTimeout(() => {
    resolve('yes123');
  }, 2000);
  // reject('NO');
});
p1.then(function (result) {
  console.log('成功', result);
});
p1.then(null, function (reason) {
  console.log('失败', reason);
});
