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
      // this.reason = result;
      this.result = result;
      for (let i = 0; i < this.onRejectedCallbacks.length; i++) {
        setTimeout(() => {
          // this.onRejectedCallbacks[i](this.reason);
          this.onRejectedCallbacks[i](this.result);
        }, 0);
      }
    }
  }

  resolvePromise(promise, result, resolve, reject) {
    if (result && /^(function|object)$/.test(typeof result)) {
      // 返回结果 非简单值
      // 写法1 开始
      // let then;
      // 非 promise报错
      // try {
      //   then = result.then;
      // } catch (err) {
      //   reject(err);
      // }
      // // 如果是 promise, 返回then 的结果
      // if (typeof then == 'function') {
      //   var called = false;
      //   var self = this;
      //   try {
      //     then.call(
      //       result,
      //       function onfulfilled(y) {
      //         if (called) return;
      //         called = true;
      //         self.resolvePromise(promise, y, resolve, reject);
      //       },
      //       function onrejected(r) {
      //         if (called) return;
      //         called = true;
      //         reject(r);
      //       }
      //     );
      //   } catch (err) {
      //     if (called) return;
      //     called = true;
      //     reject(err);
      //   }
      // }
      // 写法1结束
      // 写法2 开始
      if (result instanceof Promise) {
        result.then(resolve, reject);
      } else {
        reject(err);
      }
    } else {
      // 返回结果为简单值
      resolve(result);
    }
  }

  // 写法2 简洁
  then(onfulfilled, onrejected) {
    debugger;
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

    let thenPromise = new Promise((resolve, reject) => {
      debugger;
      let resolvePromise = (cb) => {
        let cbResult;
        setTimeout(() => {
          try {
            cbResult = cb(this.result);
          } catch (err) {
            reject(err);
          }
          if (cbResult && /^(function|object)$/.test(typeof cbResult)) {
            // 返回结果 非简单值
            if (cbResult instanceof Promise) {
              cbResult.then(resolve, reject);
            } else {
              reject(cbResult);
            }
          } else {
            // 返回结果为简单值
            resolve(cbResult);
          }
        }, 0);
      };

      switch (this.state) {
        case 'fullfilled':
          // 如果已经成功，执行成功回调
          resolvePromise(onfulfilled);
          break;
        case 'rejected':
          // 如果已经失败，执行失败回调
          resolvePromise(onrejected);
          break;
        default:
          // pending 状态
          this.onFulfilledCallbacks.push(
            resolvePromise.bind(this, onfulfilled)
          );
          this.onRejectedCallbacks.push(resolvePromise.bind(this, onrejected));
      }
    });

    return thenPromise;
  }

  // 写法1
  /*
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

    let p = new Promise((resolve, reject) => {
      switch (this.state) {
        case 'fullfilled':
          // 如果已经成功，执行成功回调
          setTimeout(() => {
            try {
              let result = onfulfilled(this.result);
              this.resolvePromise(p, result, resolve, reject);
            } catch (err) {
              reject(err);
            }
          });
          break;
        case 'rejected':
          // 如果已经失败，执行失败回调
          setTimeout(() => {
            try {
              let result = onrejected(this.reason);
              this.resolvePromise(p, result, resolve, reject);
            } catch (err) {
              reject(err);
            }
          });
          break;
        default:
          // pending 状态
          this.onFulfilledCallbacks.push((value) => {
            try {
              var x = onfulfilled(value);
              this.resolvePromise(p, x, resolve, reject);
            } catch (err) {
              reject(err);
            }
          });
          this.onRejectedCallbacks.push((reason) => {
            try {
              var x = onrejected(reason);
              this.resolvePromise(p, x, resolve, reject);
            } catch (err) {
              reject(err);
            }
          });
      }
    });

    return p;
}
  */

  catch(onrejected) {
    return this.then.call(this, null, onrejected);
  }

  // 返回所有结果，
  // 全部成功，返回成功结果
  // 如果失败 返回失败的那一个
  static all(arr) {
    let allResult = [],
      len = arr.length,
      resolveLen = 0;
    return new Promise(function (resolve, reject) {
      arr.forEach((element, index) => {
        if (!(element instanceof Promise)) {
          element = Promise.resolve(element);
        }
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

  // all 反过来，
  // 有成功的，返回第一个成功的，
  // 全部失败，返回失败
  static any(arr) {
    let hasReturn = false,
      rejectLen = 0,
      arrLen = arr.length;
    return new Promise(function (resolve, reject) {
      for (let i = 0; i < arr.length; i++) {
        if (!(arr[i] instanceof Promise)) {
          arr[i] = Promise.resolve(arr[i]);
        }
        arr[i].then(
          (result) => {
            if (!hasReturn) resolve(result);
            hasReturn = true;
          },
          (reason) => {
            rejectLen++;
            if (rejectLen == arrLen) {
              reject(reason);
            }
          }
        );
        if (hasReturn) {
          break;
        }
      }
    });
  }

  // 返回最先完成的 promise 结果，
  // 成功或失败都返回
  static race(arr) {
    let hasReturn = false;
    return new Promise(function (resolve, reject) {
      for (let i = 0; i < arr.length; i++) {
        if (!(arr[i] instanceof Promise)) {
          arr[i] = Promise.resolve(arr[i]);
        }
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

// var p1 = new Promise(function (resolve, reject) {
//   resolve('yes1');
//   // reject('NO1');
// });

// var p2 = new Promise(function (resolve, reject) {
//   resolve('yes2');
//   // reject('NO2');
// });

// p1.then((result) => {
//   console.log(result);
// });

// Promise.all(['a', p1, p2]).then(
//   (result) => {
//     console.log(result);
//   },
//   (error) => {
//     console.log(error);
//   }
// );

// Promise.race([p1, p2]).then(
//   (result) => {
//     console.log(result);
//   },
//   (error) => {
//     console.log(error);
//   }
// );

// Promise.any([p1, p2]).then(
//   (result) => {
//     console.log(result);
//   },
//   (error) => {
//     console.log(error);
//   }
// );

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

var p1 = new Promise(function (resolve, reject) {
  // setTimeout(() => {
  resolve('yes');
  // }, 2000);
  // reject('NO');
});
p1.then(function (result) {
  console.log('成功', result);
  // return 123;
  return new Promise(function (resolve, reject) {
    // resolve(1);
    reject('NO');
  });
})
  // .then(function (result) {
  //   console.log('成功', result);
  // })
  // .then(function (result) {
  //   console.log('成功', result);
  // })
  .catch(function (err) {
    console.log(err);
  });
