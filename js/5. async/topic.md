# 1 主线程及宏任务执行顺序
> 问题
```
setTimeout(() => {
    console.log(1);
}, 20);
console.log(2);
setTimeout(() => {
    console.log(3);
}, 10);
console.log(4);
console.time('AA');
for (let i = 0; i < 90000000; i++) {
    // do soming
}
console.timeEnd('AA'); //=>AA: 79ms 左右
console.log(5);
setTimeout(() => {
    console.log(6);
}, 8);
console.log(7);
setTimeout(() => {
    console.log(8);
}, 15);
console.log(9);
```
> 结果
```
// 会先执行主线程，即使主线程阻塞过程中，
// 其他宏任务到达可执行状态，也依旧再队列中等待
2 
4
5
7
9

// 主线程执行完，执行宏任务，按照可执行顺序执行
// setTimeout 10 比 setTimeout 8 先到达可执行状态，
// 所以 先输出 3
3
1
6
8
```

# 2 
> 问题
```
async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
}
async function async2() {
    console.log('async2');
}
console.log('script start');
setTimeout(function() {
    console.log('setTimeout');
}, 0)
async1();
new Promise(function(resolve) {
    console.log('promise1');
    resolve();
}).then(function() {
    console.log('promise2');
});
console.log('script end');
```
> 答案
```
主线程
script start
async1 start
// await 的函数 中同步任务也会在主线程中执行
async2
// new Promise 函数中同步任务也会在主线程执行
promise1
script end

微任务
// await 后面的代码会被看做异步微任务
async1 end
// Promise.then是异步微任务
promise2
宏任务 
setTimeout

```
# 3
```
let body = document.body;
body.addEventListener('click', function () {
    Promise.resolve().then(() => {
        console.log(1);
    });
    console.log(2);
});
body.addEventListener('click', function () {
    Promise.resolve().then(() => {
        console.log(3);
    });
    console.log(4);
});
```
> 结果
```
// 宏任务
2 
// 微任务
1
// 下一个宏任务
4
// 微任务
3
```

# 4
> 问题
```
console.log('start');
let intervalId;
Promise.resolve().then(() => {
    console.log('p1');
}).then(() => {
    console.log('p2');
});
setTimeout(() => {
    Promise.resolve().then(() => {
        console.log('p3');
    }).then(() => {
        console.log('p4');
    });
    intervalId = setInterval(() => {
        console.log('interval');
    }, 3000);
    console.log('timeout1');
}, 0);
```

> 结果
```
主线程
start
微任务: 微任务产生的微任务执行完
p1
p2
宏任务 
timeout1
微任务 ： 当前宏任务产生的微任务
P3
p4
宏任务
interval
```

# 5
> 问题:
```
setTimeout(() => {
    console.log('a');
});
Promise.resolve().then(() => {
    console.log('b');
}).then(() => {
    return Promise.resolve('c').then(data => {
        setTimeout(() => {
            console.log('d')
        });
        console.log('f');
        return data;
    });
}).then(data => {
    console.log(data);
});
```
> 答案
```
主线程 空
微任务: 会将当前微任务产生的微任务也执行完
在进行下一步
b
f
c
宏任务1
a
宏任务2
d
```
# 6
```
function func1() {
    console.log('func1 start');
    return new Promise(resolve => {
        resolve('OK');
    });
}
function func2() {
    console.log('func2 start');
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('OK');
        }, 10);
    });
}
console.log(1);
setTimeout(async () => {
    console.log(2);
    await func1();
    console.log(3);
}, 20);
for (let i = 0; i < 90000000; i++) {} //循环大约要进行80MS左右
console.log(4);
func1().then(result => {
    console.log(5);
});
func2().then(result => {
    console.log(6);
});
setTimeout(() => {
    console.log(7);
}, 0);
console.log(8);
```

> 答案
```
主线程
1
4
func1 start
func2 start
8

微任务
5
宏任务
2
func1 start

微任务
3

宏任务
7

微任务 无
宏任务
6

```

# 7 
```
var resolveAfter2Seconds = function resolveAfter2Seconds() {
  console.log('starting slow promise');
  return new Promise((resolve) => {
    setTimeout(function () {
      resolve('slow');
      console.log('slow promise is done');
    }, 2000);
  });
};

var resolveAfter1Second = function resolveAfter1Second() {
  console.log('starting fast promise');
  return new Promise((resolve) => {
    setTimeout(function () {
      console.log('fast promise is done');
      resolve('fast');
    }, 1000);
  });
};

// 相继的
// 第一个完全执行完
// 在执行第二个
var sequential = async function sequential() {
  console.log('==SEQUENTIAL START==');
  const slow = await resolveAfter2Seconds();
  console.log(slow);
  const fast = await resolveAfter1Second();
  console.log(fast);
};
// sequential();
/*
主线程
==SEQUENTIAL START==
starting slow promise
awite 等待成功
slow promise is done
slow
宏任务为空
微任务
starting fast promise
fast promise is done
fast
 */

// x
// 同时发生 与 concurrentPromise 效果一样
var concurrent = async function concurrent() {
  console.log('==CONCURRENT START with await==');
  // slow 与 fast 为 两个promise 实例
  // 此时定时器已经执行
  const slow = resolveAfter2Seconds();
  const fast = resolveAfter1Second();

  // 获取 reslove 返回结果
  // 使用 await 先获取 slow 的，在获取 fast 的
  console.log(await slow);
  console.log(await fast);
};
// concurrent();
/*
主线程
==CONCURRENT START with await
starting slow promise
starting fast promise
// 等待定时器执行结果
fast promise is done
slow promise is done
// await 等待slow reslove
slow
// await 等待fast reslove
fast

*/

// x
// 同时发生promiseAll, 与 concurrent 效果一样
var concurrentPromise = function concurrentPromise() {
  console.log('==CONCURRENT START with Promise.all==');
  return Promise.all([resolveAfter2Seconds(), resolveAfter1Second()]).then(
    (messages) => {
      console.log(messages[0]);
      console.log(messages[1]);
    }
  );
};

// concurrentPromise();
/*
主线程
==CONCURRENT START with Promise.all==
starting slow promise
starting fast promise
微任务无
宏任务1 
fast promise is done
微任务无
宏任务2
slow promise is done
微任务无
Promise.all 按数组顺序输出
slow
fast
 */

// x
var parallel = async function parallel() {
  console.log('==PARALLEL with await Promise.all==');
  await Promise.all([
    (async () => {
      let result = await resolveAfter2Seconds();
      console.log(result);
    })(),
    (async () => {
      let result = await resolveAfter1Second();
      console.log(result);
    })(),
  ]);
};
parallel();
/*
主线程
==PARALLEL with await Promise.all==
执行all第一个函数
starting slow promise
执行all第二个函数
starting fast promise
// fast 先返回
fast promise is done
fast
// slow 后返回
slow promise is done
slow
*/

var parallelPromise = function parallelPromise() {
  console.log('==PARALLEL with Promise.then==');
  resolveAfter2Seconds().then((message) => console.log(message));
  resolveAfter1Second().then((message) => console.log(message));
};
/*
主线程
==PARALLEL with Promise.then==
starting slow promise
starting fast promise
宏任务
fast promise is done
此次宏任务触发的微任务
fast
宏任务
slow promise is done
此次宏任务触发的微任务
slow
 */
```