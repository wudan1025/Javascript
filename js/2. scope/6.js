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
  throttle(3000, function () {
    console.log('click2');
  })
);

// todo 写完
function throttle(time, cb) {
  // 此时不能 按照上一次时间记录，因为这是外层代码执行时间
  // 不是内层函数执行时间
  var pre = new Date().getTime(),
    now;
  var exec = false;
  var timer = null;

  return function () {
    // if (!exec) {
    //   cb();
    //   exec = true;
    // }
    if (timer) {
      now = new Date().getTime();
    } else {
      pre = now = new Date().getTime();
      timer = setTimeout(() => {
        cb();
      }, time);
    }

    console.log(now - pre);
    if (now - pre > time) {
      clearTimeout(timer);
      timer = null;
      pre = now;
      exec = false;
      // cb();
    }
  };
}
