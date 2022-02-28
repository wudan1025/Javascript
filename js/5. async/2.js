/*
 * @LastEditors: wudan01
 * @description: 文件描述
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

  var self = this
  this.state = 'pending';
  this.result = undefined;

  this.onFulfilledCallbacks = [];
  this.onRejctCallbacks = [];

  this.resolve = function (result) {
    stateChange('fullfilled', result);
  };

  this.reject = function (error) {
    stateChange('rejected', error);
  };

  // 回调执行 导致状态变化
  executor(this.resolve, this.reject);

  stateChange = function (state, result) {
    self.state = state;
    // 成功
    if (self.state == 'fullfilled') {
      self.result = result;
      for (let i = 0; i < self.onFulfilledCallbacks.length; i++) {
        setTimeout(function () {
          result = self.onFulfilledCallbacks[i](result);
        }, 0);
      }
    }
    if (self.state == 'rejected') {
      for (let i = 0; i < self.onRejctCallbacks.length; i++) {
        setTimeout(function () {
          self.onRejctCallbacks[i]();
        }, 0);
      }
    }
  };
}

// 
Promise.prototype.then = function (onfulfilled, onrejected) {
  if (typeof onfulfilled != 'function') {
    onfulfilled = function onfulfilled(result) {
      return result;
    };
  }

  if (typeof onrejected !== "function") {
    onrejected = function onrejected(reason) {
      throw reason;
    };
  }
  var self = this
  switch (self.state) {
    case 'fulfilled':
    // 如果已经成功，执行成功回调
    // todo
    case 'rejected':
    // 如果已经失败，执行失败回调
    // todo
    default:
      // pending 状态 
      self.onFulfilledCallbacks.push(onfulfilled);
      self.onRejectedCallbacks.push(onrejected);

  }

  this.onFulfilledCallbacks.push(cb);
};

var p = new Promise(function (resolve, reject) {
  setTimeout(() => {
    resolve('a');
  }, 2000);
});

p.then((d) => {
  console.log(d);
});
