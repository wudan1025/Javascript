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

  // 返回所有结果，如果失败 返回失败的那一个
  static all(arr) {
    let allResult = [],
      len = arr.length,
      resolveLen = 0;
    return new Promise(function (resolve, reject) {
      arr.forEach((element, index) => {
        element.then(
          (result) => {
            resolveLen++;
            allResult[index] = result;
            if (resolveLen == len) {
              resolve(allResult);
            }
          },
          (reason) => {
            reject(reason);
          }
        );
      });
    });
  }

  // 返回最先完成的 promise 结果，reslove or reject
  static race(arr) {
    let hasReturn = false;
    return new Promise(function (resolve, reject) {
      for (let i = 0; i < arr.length; i++) {
        arr[i].then(
          (result) => {
            if (!hasReturn) resolve(result);
            hasReturn = true;
          },
          (reason) => {
            if (!hasReturn) reject(reason);
            hasReturn = true;
          }
        );
        if (hasReturn) {
          break;
        }
      }
    });
  }

  static any()

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

var p1 = new Promise(function (resolve, reject) {
  // resolve('yes1');
  reject('NO1');
});

var p2 = new Promise(function (resolve, reject) {
  resolve('yes2');
  // reject('NO2');
});

// Promise.all([p1, p2]).then(
//   (result) => {
//     console.log(result);
//   },
//   (error) => {
//     console.log(error);
//   }
// );

Promise.race([p1, p2]).then(
  (result) => {
    console.log(result);
  },
  (error) => {
    console.log(error);
  }
);

// console.log(p1);

// let p2 = p1.then(
//   function (result) {
//     console.log('成功', result);
//   },
//   function (reason) {
//     console.log('失败', reason);
//   }
// );

// console.log(p2);

/*
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
*/
// console.log(Promise);
