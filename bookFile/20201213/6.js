/*
 * @LastEditors: wudan01
 * @description: 文件描述
 */
const handle = function handle(ev) {
  console.log(this, ev);
  // console.log('OK');
};

/*
 * 设置一个WAIT时间，此时间是用户自己定义，多久内触发多次算是频繁触发
 * 函数节流：在频繁触发的模式下，我们每间隔WAIT这么久，就触发一次「节流的目的是降低触发频率」
 */
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

// 监听滚动条滚动，触发执行方法「问题：滚动条滚动中，浏览器最快的反应时间内则会触发一次  谷歌：5~6ms  IE:10~17ms」
window.onscroll = throttle(handle);
// window.onscroll = proxy;  每间隔5~6ms触发一次proxy，但是最后执行的还是handle，我们在proxy中能够控制handle执行的频率即可
