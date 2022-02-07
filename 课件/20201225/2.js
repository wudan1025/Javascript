// $() -> 返回的都是JQ类的实例(JQ对象) 「格式：空实例对象、类数组集合...」
//  [selector] 支持的格式
//    + null/undefined/""/0/NaN/false  返回一个空JQ对象
//    + string:选择器（获取元素的类数组集合）/HTML字符串（创建DOM对象，返回JQ实例，也就是一个类数组集合）
//    + 原生的DOM元素对象:把原生DOM对象转换为JQ对象  目的是调用JQ原型上的方法
//    + 函数:$(函数)  => $(document).ready(函数)  
//        + 等待页面中的DOM结构都加载完成(DOMContentLoaded)，就会触发执行函数
//        + 当做闭包，防止全局变量污染
//    + DOM元素/节点集合/...：一个JQ实例对象（类数组集合）

// ----------
// 把JQ对象(一般类数组集合) 转换为 原生DOM对象：可以调用浏览器提供的内置的属性和方法
//   + 基于JQ集合中的某个索引获取即可  $(xxx)[index]  ->DOM对象
//   + $(xxx).get([index])  -> 原生DOM对象
//   + $(xxx).eq([index]) -> 新的JQ实例对象

// let $box = $('#box');
// $box.addClass('active');
// $box.siblings().removeClass('active');

let arr = [10, 20, 30, 40];

/* arr.forEach(function (item, index) {
    console.log(this, item, index);
    if (item >= 20) return false;
}); */

/* _.each(arr, function (item, index) {
    console.log(this, item, index);
    if (item >= 20) return false;
}); */

/* _.each(document.querySelectorAll('*'), (item, index) => {
    console.log(item);
    if (index >= 2) return false;
});

_.each({
    name: 'zhufeng',
    age: 12
}, (value, key) => {
    console.log(value, key);
}); */

