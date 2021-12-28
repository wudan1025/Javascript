/*
 * @LastEditors: wudan01
 * @description: 文件描述
 */
// throttle;

function throttle(cb, wait) {
  // 外层第一次需要为0
  // 计算remian时 才正确
  var firstTime = 0;
  // 进来第一次默认需要调用回调执行函数
  return function () {
    debugger;
    var curTime = new Date().getTime();
    // 当前时间-第一次进入时间 = 等待时间
    if (curTime - firstTime >= wait) {
      firstTime = new Date().getTime();
      cb();
    } else {
      console.log(curTime - firstTime);
    }
  };
}

// var throttleFn = throttle(cb, 5000);

// setTimeout(() => {
//   throttleFn();
// }, 1000);
// setTimeout(() => {
//   throttleFn();
// }, 2000);
// setTimeout(() => {
//   throttleFn();
// }, 3000);
// setTimeout(() => {
//   throttleFn();
// }, 5000);

// setTimeout(() => {
//   throttleFn();
// }, 7000);

function cb() {
  console.log('exec');
}

/*
// fn是我们需要包装的事件回调, interval是时间间隔的阈值
function throttle(fn, interval) {
  // last为上一次触发回调的时间
  let last = 0;

  // 将throttle处理结果当作函数返回
  return function () {
    // 保留调用时的this上下文
    let context = this;
    // 保留调用时传入的参数
    let args = arguments;
    // 记录本次触发回调的时间
    let now = +new Date();

    // 判断上次触发的时间和本次触发的时间差是否小于时间间隔的阈值
    if (now - last >= interval) {
      // 如果时间间隔大于我们设定的时间间隔阈值，则执行回调
      last = now;
      fn.apply(context, args);
    }
  };
}

// 用throttle来包装scroll的回调
const better_scroll = throttle(() => console.log('触发了点击事件'), 5000);

// document.addEventListener('click', better_scroll);
*/
