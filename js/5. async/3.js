/*
 * @LastEditors: wudan01
 * @description: 文件描述
 */

/* 
then 链 
及各种静态方法
*/

class Promise {
  constructor(executor) {
    this.state = 'pending';
    this.result = undefined;
    this.onFulfilledCallbacks = [];
    this.onRejectedCallbacks = [];

    try {
      executor(this.resolve.bind(this), this.reject.bind(this));
    } catch (e) {
      console.log(e);
      this.catch();
    }
  }
  resolve(result) {
    this.stateChange('fullfilled', result);
  }

  reject(error) {
    this.stateChange('rejected', error);
  }

  stateChange(state, result) {
    this.state = state;
    // 成功
    if (this.state == 'fullfilled') {
      this.result = result;
      for (let i = 0; i < this.onFulfilledCallbacks.length; i++) {
        setTimeout(() => {
          this.onFulfilledCallbacks[i](this.result);
        }, 0);
      }
    }
    if (this.state == 'rejected') {
      this.reason = result;
      for (let i = 0; i < this.onRejectedCallbacks.length; i++) {
        setTimeout(() => {
          this.onRejectedCallbacks[i](this.reason);
        }, 0);
      }
    }
  }

  then(onfulfilled, onrejected) {
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

    switch (this.state) {
      case 'fullfilled':
        // 如果已经成功，执行成功回调
        setTimeout(() => {
          onfulfilled(this.result);
        });
        break;
      case 'rejected':
        // 如果已经失败，执行失败回调
        setTimeout(() => {
          onrejected(this.reason);
        });
        break;
      default:
        // pending 状态
        this.onFulfilledCallbacks.push(onfulfilled);
        this.onRejectedCallbacks.push(onrejected);
    }
  }

  catch() {}

  // todo
  static all(arr) {
    // let result = [];
    // arr.forEach((element, index) => {
    //   result[idx] = element();
    //   console.log(element);
    // });
    // return result;
  }

  static race() {}

  // resolve 状态的promise
  // 将 value 变为 promise 返回
  static resolve(value) {
    return new Promise(function (resolve, reject) {
      resolve(value);
    });
  }

  // 返回 reject 状态的 promise
  static reject(reason) {
    return new Promise(function (resolve, reject) {
      reject(reason);
    });
  }
}

/*
var p1 = new Promise(function (resolve, reject) {
  resolve('yes');
  // reject('NO');
});

console.log(p1);

let p2 = p1.then(
  function (result) {
    console.log('成功', result);
  },
  function (reason) {
    console.log('失败', reason);
  }
);

console.log(p2);
*/

// https://www.cnblogs.com/qianxiaox/p/14124551.html
// Promise.resolve 作用

console.log(Promise.resolve('a'));
Promise.resolve('a').then(function (a) {
  console.log(a);
  console.log('Promise.resolve().then');
});

// Promise.reject 作用
Promise.reject('error').then(null, function (reason) {
  console.log(reason);
  console.log('Promise.reject().then');
});

// console.log(Promise);
