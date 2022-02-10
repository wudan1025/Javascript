/*
 * ...params ES6剩余运算符「获取的结果是一个数组」
 * arguments 获取的结果是一个类数组 
 */
/* const fn = function fn(...params) {
    return function anonymous(...args) {
        // 合并两次传递的参数 && 求和
        params = params.concat(args);

        // 数组求和
        /!* 
        // 方案一：命令式编程 HOW 在乎的是过程「允许我们把控过程中每一步细节  弊端：繁琐&代码多」
        let total = 0;
        for (let i = 0; i < params.length; i++) {
            total += params[i];
        }
        return total; 
        *!/

        /!*
        // 方案二：函数式编程「推荐」 WHAT 不重视过程，只在乎结果「把具体如何实现封装成为一个函数，想要实现某些需求，直接执行函数即可，对于用户来讲，函数内部如何处理不需要去管，只需要能拿到结果即可  优势:简单&减少冗余代码  弊端:只能按照既定的函数内部规则来执行，无法自己管控过程的细节」
        let total = 0;
        params.forEach(item => {
            total += item;
        });
        return total;
        *!/

        /!* return params.reduce((result, item) => {
            return result + item;
        }); *!/
        return params.reduce((result, item) => result + item);

        // 投机取巧
        // return eval(params.join('+'));
    };
}; */

/* const fn = (...params) => (...args) => params.concat(args).reduce((result, item) => result + item);
let res = fn(1, 2)(3);
console.log(res); //=>6  */

/* // reduce也是用来实现数组的迭代的方法「可以实现每一次处理结果的累计」
//   arr.reduce([callback]) 依次迭代数组中的每一项，每迭代一次都把[callback]执行一次，并且传递三个值
//    + result 上一次回调函数执行的返回结果「如果是第一次执行，获取的是数组的第一项」
//    + item 依次遍历的数组每一项「从第二项开始遍历」
//    + index 遍历的当前项索引
//   把最后一次回调函数执行的返回值作为reduce的总结果

// arr.reduce([callback],[initial])
//    + result初始值是[initial]  数组从第一项开始迭代
let arr = [10, 20, 30];
let total = arr.reduce((result, item, index) => {
    console.log(result, item, index);
    // 1) 10 20 1  =>30
    // 2) 30 30 2  =>60
    return result + item;
}); */

Array.prototype.reduce = function reduce(callback, initial) {
    // this->arr THIS一般是数组的实例(数组)
    if (typeof callback !== "function") throw new TypeError('callback must be a function!');
    let self = this,
        i = 0,
        len = self.length;
    if (typeof initial === "undefined") {
        initial = self[0];
        i = 1;
    }
    // 迭代数组每一项   
    for (; i < len; i++) {
        let item = self[i];
        initial = callback(initial, item, i);
    }
    return initial;
};
Array.prototype.reduceRight = function reduceRight(callback, initial) {
    let self = this;
    self = self.reverse();
    return self.reduce(callback, initial);
};

let arr = [10, 20, 30];
let total = arr.reduce((result, item, index) => {
    return result + item;
}, 100);
console.log(total);