<!--
 * @LastEditors: wudan01
 * @description: 文件描述
-->
# 1. 微任务/宏任务都有什么

# 2. async/await
#### async
> async 表示函数是异步的，函数体内有异步方法
> 将返回值包装为promise返回
> 执行报错，返回失败 promise 实例
> 如果函数内部做了异常捕获，则还是成功态

```
async function fn() {
  return 10;
}
console.log(fn());

// 结果 可以贴张图替换
Promise {<fulfilled>: 10}
[[Prototype]]: Promise
[[PromiseState]]: "fulfilled"
[[PromiseResult]]: 10

```

#### awit
> await后面跟promise实例
> 不是实例，也会默认转化为实例
> 实例跟着主线程执行(同步的)
> 实例后面的内容，放在微任务队列中(异步的)
```
// await 1; //-> await Promise.resolve(1);
```

> await 后面函数执行成功 返回 reslove 会继续执行下面的代码
> await 后面函数执行失败 返回 reject 会导致后面代码不在执行
> 最好用 try catch 包起来
```
function api(interval) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // resolve(interval);
      reject();
    }, interval);
  });
}

async function func() {
  let result1 = await api(1000);
  console.log(result1);
  let result2 = await api(3000);
  console.log(result2);
}

func();

```


# promise 相关

#### promise then 返回值
```
let p1 = new Promise((resolve, reject) => {
  resolve('OK');
  // reject('NO');
});
let p2 = p1.then(
  (result) => {
    console.log('P1成功-->', result);
    return Promise.reject(10);
  },
  (reason) => {
    console.log('P1失败-->', reason);
  }
);
// 执行then方法会返回一些全新的promise实例p2
//   p2的状态和值是咋改变的？
//   + 不论执行的是基于p1.then存放的onfulfilledCallback/onrejectedCallback两个方法中的哪一个
//   + 只要方法执行不报错
//     + 如果方法中返回一个全新的Promise实例，则“全新的Promise实例”的成功和失败决定p2的成功和失败
//     + 如果不是返回promise呢？则 [[PromiseState]]:fulfiled  [[PromiseResult]]:返回值
//   + 如果方法执行报错：p2的 [[PromiseState]]:rejected  [[PromiseResult]]:报错原因
let p3 = p2.then(
  (result) => {
    console.log('P2成功-->', result);
  },
  (reason) => {
    console.log('P2失败-->', reason);
    return Promise.resolve(10);
  }
);

p3.then(
  (result) => {
    console.log('P3成功-->', result);
  },
  (reason) => {
    console.log('P3失败-->', reason);
    return Promise.resolve(10);
  }
);
console.log(1);
```