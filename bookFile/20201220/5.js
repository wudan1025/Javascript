/* let obj = {
    x: 0,
    fn() {
        // this -> obj
        let self = this;
        setTimeout(function () {
            // this -> window
            self.x++;
            console.log(obj.x);
        }, 1000);
    }
};
obj.fn(); */

/* let obj = {
    x: 0,
    fn() {
        setTimeout(() => {
            this.x++;
            console.log(obj.x);
        }, 1000);
    }
};
obj.fn(); */

/* let obj = {
    x: 0,
    fn: () => {
        // this->window
        console.log(this);
    }
};
obj.fn(); */

//------------------
/*
 * Function.prototype
 *   + call
 *   + apply
 *   + bind
 * 每一个函数都是Function的实例，都可以调用其原型上的三个方法，用来实现函数内部THIS的改变
 */
/* function fn(x, y) {
    console.log(this, x, y);
    return x + y;
}
fn.__proto__ == Function.prototype
let obj = {
    name: 'obj'
}; */
// fn(); //->this:window
// obj.fn(); //->Uncaught TypeError: obj.fn is not a function

/* 
   fn首先基于__proto__找到Function.prototype上的call方法，把call方法执行
     + 传递的实参 obj
     + call方法中的this -> fn
   call方法执行的作用是：把fn「this」执行，并且让方法fn「this」中的this指向变为第一个传递的实参「obj」 
*/
// fn.call(obj);
// fn.call(obj, 10, 20); //this->obj x->10 y->20
// fn.call(10, 20); //this->10 x->20 y->undefined
// fn.call(); //->非严格模式下：this->window「传递第一个参数是null/undefined也是window」  严格模式下：this->undefined「传递的第一个参数是谁，this就是谁」
// let result = fn.call(obj, 10, 20);
// console.log(result);

/*
    apply和call只有一个区别：传递给执行函数的实参方式不一样
       fn.call([context],params1,params2,...)
       fn.apply([context],[params1,params2,...])
    最后结果都是把params一项项的传递给fn的
 */
// let arr = [10, 20];
// fn.call(obj, arr); //->this:obj x:arr y:undefined
// fn.apply(obj, arr); //->this:obj x:10 y:20
// fn.call(obj, ...arr); //->fn.call(obj, 10, 20)  //->this:obj x:10 y:20
// ===>call的性能要比apply好一丢丢「尤其是传递的实参在三个以上」

/* 应用一：实现数组求最大值/最小值 */
// let arr = [1, 5, 6, 23, 14, 15];

// 排序法
// arr.sort((a, b) => b - a);
// console.log(arr[0]);

// Math.max/min
// console.log(Math.max(arr)); //->NaN
// console.log(Math.max(...arr)); //->23
// console.log(Math.max.apply(Math, arr)); //->23

// 假设法
// let max = arr[0];
// arr.slice(1).forEach(item => {
//     if (item > max) {
//         max = item;
//     }
// });
// console.log(max);

// 自己拼字符串
// let str = 'Math.max(' + arr + ')'; //->'Math.max(1,5,6,23,14,15)'
// console.log(eval(str)); //->23

/* 应用二：鸭子类型（长的像鸭子，我们就称它为鸭子，最主要的是想让其具备鸭子的特点） */
/* Array.prototype.slice = function slice() {
    // this->ary
    let arr = [];
    for (let i = 0; i < this.length; i++) {
        arr.push(this[i]);
    }
    return arr;
};
// ary.slice() 数组浅克隆 */

/* 
function fn() {
    // console.log(arguments);  arguments.__proto__===Object.prototype  类数组对象，不能直接使用数组的方法
    // 想让类数组使用数组提供的方法(Array.prototype)

    /!* // 方案1:把类数组转换为数组
    // let arr = [...arguments];
    // let arr = Array.from(arguments);
    // 让类数组借用数组原型上的方法，实现类数组转换为数组「大部分数组的方法，都可以被类数组借用」
    let arr = Array.prototype.slice.call(arguments, 0);
    arguments.slice(0) -> 改变 this 执行
    let arr = [].slice.call(arguments);
    return arr.reduce((total, item) => total + item); *!/

    /!* // 方案2：直接借用
    return [].reduce.call(arguments, (total, item) => total + item); *!/

    /!* // 方案3：改变原型指向
    arguments.__proto__ = Array.prototype;
    return arguments.reduce((total, item) => total + item); *!/
}
console.log(fn(10, 20, 30, 40));
*/

// 更暴力的办法：直接把你的东西抢过来用
/* 
Array.prototype.push = function (val) {
    // this -> 数组
    // 1.把val放置在数组的末尾
    // this[this.length]=val;
    // 2.数组长度累加
    // this.length++;
    // return this.length;
};
arr.push(10); 
*/

/* let obj = {
    2: 3, //1
    3: 4, //2
    length: 2, //3 4
    push: Array.prototype.push
};
obj.push(1); //-> obj[2]=1  obj.length++
obj.push(2); //-> obj[3]=2  obj.length++
console.log(obj); //=>{2:1,3:2,length:4} */


/*
 * call/apply都是立即把函数执行「改变THIS和传递参数」 
 * bind没有把函数立即执行，只是把后期要改变的this及传递的参数预先存储起来「柯理化」
 */
function fn(x, y, ev) {
    console.log(this, x, y, ev);
    return x + y;
}
let obj = {
    name: 'obj'
};

// document.onclick = fn; //->点击文档才执行fn  this->document  x->MouseEvent事件对象  y->undefined
// document.onclick = fn.call(obj, 10, 20); //->立即执行了fn，我们需要点击的时候才执行
// document.onclick = function (ev) {
//     // this->document
//     fn.call(obj, 10, 20, ev);
// };
document.onclick = fn.bind(obj, 10, 20);

/*
// 执行bind,fn没有立即执行「预先把fn/obj/10/20都存储起来了」,返回一个新函数
let proxy = fn.bind(obj, 10, 20);
// 执行返回的函数,proxy内部帮助我们把fn执行「this和参数该处理都处理了」
proxy();
*/