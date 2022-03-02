<!--
 * @LastEditors: wudan01
 * @description: 文件描述
-->
# 1. 微任务/宏任务都有什么

# 2. 手动创建一个微任务
# 3. async/await
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


# 4. promise 相关

#### Promise.reslove() 及 Prmise.reject() 作用
###### Promise.reslove()
> Promise.reslove(value),将 value 包装为 promise 返回
> 具体参考  https://www.cnblogs.com/qianxiaox/p/14124551.html 补充
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

# 生成器函数相关
> generator function, 可以单步执行

> 生成器函数是 GeneratorFunction 的实例，生成器函数。__proto__===GeneratorFunction.prototype -> GeneratorFunction.prototype.__proto__===Function.prototype

> ({}).toString.call(生成器函数) => "[object GeneratorFunction]"

> 不能被new执行,当做普通函数执行，返回的结果就是生成器函数的一个实例

```
function* func() {
    console.log(1);
    return 2;
}
let itor = func();
console.log(itor.next()); //->{done:true,value:2}
console.log(itor.next()); //->{done:true,value:undefined} 
```
> yield
```
// 每一次执行next，遇到yield会暂停函数的执行
//   + done
//   + value -> yield后面的值
/* function* func() {
    console.log('A');
    yield 1;

    console.log('B');
    yield 2;

    console.log('C');
    yield 3;

    console.log('D');
    return 4;
}
let itor = func(); */

/* console.log(itor.next()); //->{done:false,value:1}
console.log(itor.next()); //->{done:false,value:2}
console.log(itor.next()); //->{done:false,value:3}
console.log(itor.next()); //->{done:true,value:4}
console.log(itor.next()); //->{done:true,value:undefined} */

/* console.log(itor.next()); //->{done:false,value:1}
console.log(itor.next()); //->{done:false,value:2}
console.log(itor.return(10)); //->{done:true,value:10}  把生成器内部的执行直接停止，让done变为true「throw直接抛异常，下面代码都不执行了」
console.log(itor.next()); //->{done:true,value:undefined}
console.log(itor.next()); //->{done:true,value:undefined} */
```