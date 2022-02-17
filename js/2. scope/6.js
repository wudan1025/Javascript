/*
 * @LastEditors: wudan01
 * @description: 文件描述
 */

var submit = document.getElementById('load');

// submit.addEventListener('click', function () {
//   console.log('click');
// });

submit.addEventListener(
  'click',
  throttle_my(
    function () {
      console.log('执行cb的时间' + new Date())
      console.log('click2');

    },
    3000,
    true
  )
);

// 第一次点击 remain s 后执行，这之间的点击不响应
function throttle_my(cb, remain, immediate) {
  // 此时不能 按照上一次时间记录，因为这是外层代码执行时间
  // 不是内层函数执行时间
  var pre, now;
  var exec = false;
  var timer = null;
  // console.log(remain)

  return function () {
    // debugger
    console.log(new Date())
    if (timer) {
      now = new Date().getTime();
    } else {
      // 第一次进入
      pre = now = new Date().getTime();

      timer = setTimeout(() => {
        if (!immediate) {
          cb();
          clearTimeout(timer);
          timer = null;
          pre = now;
          exec = false;
        }
      }, remain);
    }
    if (immediate && !exec) {
      console.log(new Date())
      cb();
      exec = true;
    }
    // console.log(now - pre);
    if (now - pre > remain) {
      // todo 当前剩余时间
      cb()
      clearTimeout(timer);
      timer = null;
      pre = now;
      exec = false;
    }
  };
}

function throttle(func, wait) {
  if (typeof func !== 'function')
    throw new TypeError('func must be a function!');
  wait = +wait;
  if (isNaN(wait)) wait = 300;
  var timer = null,
    previous = 0,
    result;
  return function proxy() {
    var self = this,
      params = [].slice.call(arguments);
    var now = +new Date(),
      remaining = wait - (now - previous);
    if (remaining <= 0) {
      // 两次间隔时间已经超过WAIT了，此时我们立即执行
      if (timer) {
        clearTimeout(timer);
        timer = null;
      }
      previous = now;
      result = func.apply(self, params);
      return result;
    }
    // 没有定时器我们才设置，有定时器说明上次还没执行呢，只有上一次执行了，我们在开启下一次
    if (!timer) {
      timer = setTimeout(function () {
        clearTimeout(timer);
        timer = null;
        previous = +new Date();
        result = func.apply(self, params);
      }, remaining);
    }
    return result;
  };
}
