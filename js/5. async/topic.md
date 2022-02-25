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