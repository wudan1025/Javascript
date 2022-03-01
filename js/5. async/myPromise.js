class MyPromise {
  constructor(executor) {
    // 初始化状态和值
    // this.initValue();
    this.PromiseState = 'pending';
    this.PromiseResult = null;
    this.onFulfilledCallbacks = []; // 保存成功回调
    this.onRejectedCallbacks = [];
    this.resolve = this.resolve.bind(this);
    this.reject = this.reject.bind(this);
    try {
      executor(this.resolve, this.reject);
    } catch (e) {
      this.reject(e);
    }
  }

  resolve(val) {
    if (this.PromiseState !== 'pending') return;
    this.PromiseState = 'fulfilled';
    this.PromiseResult = val;
    while (this.onFulfilledCallbacks.length) {
      this.onFulfilledCallbacks.shift()(this.PromiseResult);
    }
  }
  reject(val) {
    if (this.PromiseState !== 'pending') return;
    this.PromiseState = 'rejected';
    this.PromiseResult = val;
    while (this.onRejectedCallbacks.length) {
      this.onRejectedCallbacks.shift()(this.PromiseResult);
    }
  }

  then(onFulfilled, onRejected) {
    // 接收两个回调 onFulfilled, onRejected

    // 参数校验，确保一定是函数
    onFulfilled =
      typeof onFulfilled === 'function' ? onFulfilled : (val) => val;
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (reason) => {
            throw reason;
          };

    var thenPromise = new MyPromise((resolve, reject) => {
      const resolvePromise = (cb) => {
        setTimeout(() => {
          try {
            const x = cb(this.PromiseResult);
            if (x === thenPromise) {
              // 不能返回自身哦
              throw new Error('不能返回自身。。。');
            }
            if (x instanceof MyPromise) {
              // 如果返回值是Promise
              // 如果返回值是promise对象，返回值为成功，新promise就是成功
              // 如果返回值是promise对象，返回值为失败，新promise就是失败
              // 谁知道返回的promise是失败成功？只有then知道
              x.then(resolve, reject);
            } else {
              // 非Promise就直接成功
              resolve(x);
            }
          } catch (err) {
            // 处理报错
            reject(err);
            throw new Error(err);
          }
        });
      };

      if (this.PromiseState === 'fulfilled') {
        // 如果当前为成功状态，执行第一个回调
        resolvePromise(onFulfilled);
      } else if (this.PromiseState === 'rejected') {
        // 如果当前为失败状态，执行第二个回调
        resolvePromise(onRejected);
      } else if (this.PromiseState === 'pending') {
        // 如果状态为待定状态，暂时保存两个回调
        // 如果状态为待定状态，暂时保存两个回调
        this.onFulfilledCallbacks.push(resolvePromise.bind(this, onFulfilled));
        this.onRejectedCallbacks.push(resolvePromise.bind(this, onRejected));
      }
    });

    // 返回这个包装的Promise
    return thenPromise;
  }
  static all(promises) {
    const result = [];
    let count = 0;
    return new Promise((resolve, reject) => {
      const addData = (index, val) => {
        result[index] = val;
        count++;
        if (count === result.length) {
          resolve(result);
        }
      };
      promises.forEach((promise, index) => {
        if (promise instanceof MyPromise) {
          promise.then(
            (res) => {
              addData(index, res);
            },
            (err) => reject(err)
          );
        } else {
          addData(index, promise);
        }
      });
    });
  }
  static race(promises) {
    return new MyPromise((resolve, reject) => {
      promises.forEach((promise) => {
        if (promise instanceof MyPromise) {
          promise.then(
            (res) => {
              resolve(res);
            },
            (err) => {
              reject(err);
            }
          );
        } else {
          resolve(promise);
        }
      });
    });
  }
  static resolve(val) {
    return new MyPromise((resolve, reject) => {
      if (val instanceof MyPromise) {
        val.then((res) => {
          resolve(res),
            (err) => {
              reject(err);
            };
        });
      } else {
        resolve(val);
      }
    });
  }
  static reject(val) {
    return new Promise((_, reject) => {
      reject(val);
    });
  }
}

var p1 = new Promise(function (resolve, reject) {
  setTimeout(() => {
    resolve('yes');
  }, 2000);
  // reject('NO');
});
p1.then(function (result) {
  console.log('成功', result);
}).then(function (result) {
  console.log('成功', result);
});
p1.then(null, function (reason) {
  console.log('失败', reason);
});
