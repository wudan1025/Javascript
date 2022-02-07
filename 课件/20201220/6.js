/* Function.prototype.bind = function bind(context, ...params) {
    // this(self)->fn  context->obj  params->[10,20]
    if (context == null) context = window;
    let self = this;
    return function proxy(...args) {
        // args->存储执行proxy传递的值，例如：ev事件对象
        params = params.concat(args);
        return self.call(context, ...params);
    };
}; */

Function.prototype.bind = function bind(context) {
    if (context == null) context = window;
    var params = [].slice.call(arguments, 1),
        self = this;
    return function proxy() {
        var args = [].slice.call(arguments);
        params = params.concat(args);
        return self.apply(context, params);
    };
};

function fn(x, y, ev) {
    console.log(this, x, y, ev);
    return x + y;
}
let obj = {
    name: 'obj'
};
// document.onclick = function (ev) {
//     // this->document
//     fn.call(obj, 10, 20, ev);
// };
document.onclick = fn.bind(obj, 10, 20);
//   + document.onclick = proxy