/*
 * @LastEditors: wudan01
 * @description: 文件描述
 */
/*
function throttle(cb, wait) {
  // console.log('外层');
  // 外层第一次需要为0
  // 计算remian时 才正确
  var firstTime = 0;
  var timer = '';
  // 进来第一次默认需要调用回调执行函数
  return function () {
    // console.log('内层');
    // if (!timer) {
    //   // 第一次;
    //   firstTime = new Date().getTime();
    //   timer = setTimeout(() => {
    //     timer = null;
    //     cb();
    //   }, wait);
    //   return;
    // }
    var curTime = new Date().getTime();
    if (curTime - firstTime >= wait) {
      firstTime = curTime;
      timer = setTimeout(() => {
        timer = null;
        cb();
      }, wait);
      // firstTime = new Date().getTime();
      // timer = null;
    } else {
      firstTime = curTime;
      clearTimeout(timer);
      timer = null;
      console.log(curTime - firstTime);
    }
  };
}

function cb() {
  console.log('exec');
}
*/

// fn是我们需要包装的事件回调, delay是每次推迟执行的等待时间
function debounce(fn, delay) {
  // 定时器
  let timer = null;

  // 将debounce处理结果当作函数返回
  return function () {
    // 保留调用时的this上下文
    let context = this;
    // 保留调用时传入的参数
    let args = arguments;

    // 每次事件被触发时，都去清除之前的旧定时器
    if (timer) {
      clearTimeout(timer);
    }
    // 设立新定时器
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
}

// 用debounce来包装scroll的回调
const better_scroll = debounce(() => console.log('触发了滚动事件'), 1000);

document.addEventListener('click', better_scroll);
