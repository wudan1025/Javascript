/*
 * ES7：generator + promise 的语法糖 async + await
 *   https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/async_function
 */

// async:函数修饰符  控制函数返回promise实例
//  + 函数内部执行报错，则返回失败的promise实例，值是失败的原因
//  + 自己返回一个promise，以自己返回的为主
//  + 如果函数内部做了异常捕获，则还是成功态
//  + ...
/* async function fn() {
    return 10;
}
console.log(fn()); */

// 使用async的主要目的：是为了在函数内部使用await
/* function fn() {
    // await 1; Uncaught SyntaxError: await is only valid in async function
} */

/* function api(interval) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(interval);
        }, interval);
    });
}

// await:后面应该放置一个promise实例「我们书写的不是，浏览器也会把其变为promise实例」，await中断函数体中，其下面的代码执行「await表达式会暂停整个async函数的执行进程并出让其控制权」；只有等待await后面的promise实例是成功态之后，才会把之前暂停的代码继续执行，如果后面的promise实例是失败的，则下面的代码就不在执行了；
//   + await是异步的微任务
//   + 函数体中遇到await，后面代码该咋地咋地，但是下面的代码会暂停执行「把他们当做一个任务，放置在EventQueue的微任务队列中」
async function func() {
    // await 1; //-> await Promise.resolve(1);

    let result1 = await api(1000);
    console.log(result1);

    let result2 = await api(3000);
    console.log(result2);
}
func(); */

