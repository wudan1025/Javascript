/*
 * JS是单线程的：大部分代码都是同步的，但是也有少部分代码是异步编程的
 *    + 定时器
 *    + ajax：一般都是异步的
 *    + 事件绑定
 *    ------------上述都是异步的宏任务，下面的是异步微任务
 *    + promise
 *    + async await
 *    + generator
 *    + requestAnimationFrame
 *    + ...
 */
/* setTimeout(() => {
    console.log(1);
}, 1000);
console.log(2); */

/* setTimeout(() => {
    console.log(1);
}, 20);
console.log(2);
setTimeout(() => {
    console.log(3);
}, 10);
console.log(4);
// console.time('AA');
for (let i = 0; i < 90000000; i++) {
    // do soming
}
//=>AA: 79ms 左右
// console.timeEnd('AA'); 
console.log(5);
setTimeout(() => {
    console.log(6);
}, 8);
console.log(7);
setTimeout(() => {
    console.log(8);
}, 15);
console.log(9); */

/* setTimeout(() => {
    console.log(1);
    while (1 === 1) {}
}, 10);
console.log(2);
setTimeout(() => {
    console.log(3);
}, 20);
console.log(4); */