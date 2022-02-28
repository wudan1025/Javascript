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
  executor(this.reject, this.resolve);

  stateChange = function (state, result) {
    this.state = state;
    // 成功
    if (this.state == 'fullfilled') {
      this.result = result;
      for (let i = 0; i < this.onFulfilledCallbacks; i++) {
        setTimeout(function () {
          result = this.onFulfilledCallbacks[i](result);
        }, 0);
      }
    }
    if (this.state == 'rejected') {
      for (let i = 0; i < this.onRejctCallbacks; i++) {
        setTimeout(function () {
          this.onRejctCallbacks[i]();
        }, 0);
      }
    }
  };
}

Promise.prototype.then = function (cb) {
  Promise.onFulfilledCallbacks.push(cb);
};

var p = new Promise(function (resolve, reject) {
  setTimeout(() => {
    resolve('a');
  }, 2000);
});

p.then((d) => {
  console.log(d);
});
