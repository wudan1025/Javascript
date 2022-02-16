<!--
 * @LastEditors: wudan01
 * @description: 文件描述
-->
# 1. 输出答案
#### 题目
```
var a = { n: 12 };
var b = a;
b = { n: 13 };
console.log(a.n); 
```
#### 答案
```
结果 12,
b 赋值修改地址，a地址未修改 a.n = 12
```

# 2. 输出答案
> todo 1206视频找答案
#### 题目
```
var a = { n: 1 };
var b = a;
a.x = a = { n: 2 };
console.log(a.x); 
console.log(b); 
```
#### 答案
```
// 答案错误
console.log(a.x); // {n:2}
console.log(b); // {n:1}
```

# 3. 输出答案
> 重点
#### 题目
```
var x = [12, 23];
function fn(y) {
  y[0] = 100;
  y = [100];
  y[1] = 200;
  console.log(y); // [100,200]
}
fn(x);
console.log(x); // [100,200]
```

#### 答案
```
var x = [12, 23]; // x 地址 为x1001
function fn(y) {
  y[0] = 100; // y 地址 x1001 
  y = [100]; // 给 y 赋值新地址 x1002
  y[1] = 200; // 修改  x1002 地址 [1] 的取值，x1001 的没有被修改 
  console.log(y); // [100,200]
}
fn(x);
// x1001 再函数内,只有 y[0] 被修改
console.log(x); // [100,23]
```

# 4. 输出答案
> 重点
#### 题目
```
var i = 0;

function A() {
  var i = 10;

  function x() {
    console.log(i); 
  }
  return x;
}
var y = A();
y();

function B() {
  var i = 20;
  y();
}
B();
```

#### 答案
> 作用域在 代码未运行初始化时 就已确定
```
/*
 * EC(G) 全局作用域
 *   i=0
 *   A=0x000A [[scope]]:EC(G)
 *   y=0x000X
 *   B=0x000B [[scope]]:EC(G)
 */
var i = 0;

function A() {
  /*
   * EC(A1) A1 作用域
   *   作用域链:<EC(A1),EC(G)>
   *   形参赋值:--
   * i=10
   * x=0x000X [[scope]]:EC(A1)
   */
  var i = 10;

  function x() {
    /*
     * EC(X1)
     *   作用域链:<EC(X1),EC(A1)>
     *   形参赋值:--
     */
    /*
     * EC(X2)
     *   作用域链:<EC(X2),EC(A1)>
     *   形参赋值:--
     */
    console.log(i); //->10 10
  }
  return x;
}
var y = A();
y();

function B() {
  /*
   * EC(B1)
   *   作用域链:<EC(B1),EC(G)>
   *   形参赋值:--
   * i=20
   */
  var i = 20;
  y();
}
B();
```


# 4. 输出答案
> 重点
#### 题目
```
let x = 5;
function fn(x) {
    return function(y) {
        console.log(y + (++x));
    }
}
let f = fn(6);
f(7);
fn(8)(9);
f(10);
console.log(x);
```
#### 答案
```
let x = 5;
function fn(x) {
  return function (y) {
    console.log(y + ++x);
  };
}
let f = fn(6); // x : 6
f(7); // y : 7 ++x x:7 结果 7+7 = 14
fn(8)(9); // x 8 y 9  ++x x:9 结果 9+9 = 18
f(10); // 在 f(7)这一步，当前作用域x被修改为7 ++x: 8 ,y :10, 结果 18
console.log(x); // 5 取全局作用域x

// 容易出错点
// 1. ++x ,运算律从右向左，x 先自增，再拿自增后的结果 与 另一个变量相加
// 2. f(7); 会修改当前作用域的x  fn(8)(9); 会获取新的返回函数，与 f(7) 无关
// f(10),与 f(7) 相同，x 当前为 7
```

# 5. 输出答案
#### 题目
```
let a=0,
    b=0;
function A(a){
    A=function(b){
        alert(a+b++);
    };
    alert(a++);
}
A(1);
A(2);
```
#### 答案
```
let a = 0,
  b = 0;
function A(a) {
  A = function (b) {
    console.log(a + b++);
    // alert(a + b++);
  };
  // alert(a++);
  console.log(a++);
}
A(1); // a=1,a++ a=2 alert=>1
A(2); // funA 被修改 b=2 ,a=2 ,a+b++ = 4 b: 3
```

# 6. 输出答案
> todo
#### 题目
```
// let n = 10;
// console.log(n);
// console.log(window.n);
```
#### 答案
> 补全解析
```
// let n = 10; //->VO(G)  n->10
// console.log(n); //=>10
// console.log(window.n); //=>undefined
```

# 7. 输出答案 
> todo (10, obj.fn)();  ???
> 开启严格模式答案区别
#### 题目
```
function fn() {
  console.log(this);
}
let obj = {
  name: 'zhufeng',
  fn,
};
fn(); 
obj.fn();
(10, obj.fn)();  
```
#### 答案
> 严格模式下，function window 为undef
```
 "use strict";
function fn() {
  console.log(this);
}
let obj = {
  name: 'zhufeng',
  fn,
};
fn(); //this->window/undefined
obj.fn(); //this->obj
(10, obj.fn)(); //this->window/undefined
```

# 8 答案输出
#### 题目
```
 let arr = [10, 20, 30];
 arr.forEach(function (item, index) {
     console.log(this); 
 });

```
#### 答案
> 匿名函数 this 指向window
```
let arr = [10, 20, 30];
arr.forEach(function (item, index) {
     console.log(this); //->window
});
```

# 9. 答案输出
> todo  重点
#### 题目
```
var x = 3,
  obj = {
    x: 5,
  };
obj.fn = (function () {
  this.x *= ++x; 
  return function (y) {
    this.x *= ++x + y;
    console.log(x);
  };
})();
var fn = obj.fn;
obj.fn(6);
fn(4);
console.log(obj.x, x);
```
#### 答案
> http://www.javascriptpeixun.cn/course/2801/task/168089/show
		36分钟： 试题解析
```
var x = 3,
  obj = {
    x: 5,
  };
obj.fn = (function () {
  this.x *= ++x; 
  return function (y) {
    this.x *= ++x + y;
    console.log(x);
  };
})();
var fn = obj.fn;
obj.fn(6);
fn(4);
console.log(obj.x, x);
```

# 10
#### 问题
```
console.log(a, b, c)
var a = 12,
  b = 13,
  c = 14;

function fn(a) {
  console.log(a, b, c);
  a = 100;
  c = 200;
  console.log(a, b, c); 
}
b = fn(10);
console.log(a, b, c); 
```

#### 答案
```
console.log(a, b, c); //undefined*3
var a = 12,
    b = 13,
    c = 14;

function fn(a) {
    /*
     * EC(FN)
     *   作用域链:<EC(FN),EC(G)>
     *   形参赋值:a=10
     *   变量提升:--
     */
    console.log(a, b, c); //10 13 14
    a = 100; //私有
    c = 200; //全局
    console.log(a, b, c); //100 13 200
}
b = fn(10);
console.log(a, b, c); //12 undefined 200
```

# 11 
> /Users/xes/Desktop/basic/Javascript/bookFile/20201209/2.js 
> todo 不明白
#### 问题
```
var foo = 'foo';
console.log(foo); // foo
{
  console.log(foo);
  function foo() {}
  foo = 1;
  console.log(foo);
}
console.log(foo);
```

#### 答案
```
/!*
 * EC(G) 全局变量
 *    function foo; 「2」
 *    function foo; 「4」   
 * 
 *    同步=>0x0002  1
 *!/
// console.log(foo); =>undefined
{
    /!*
     * EC(B)
     *   foo = 0x0001; 「2」   [[scope]]:EC(B)
     *   foo = 0x0002; 「4」
     *!/
    // console.log(foo); =>0x0002 函数
    function foo() {1} //特殊：把之前对foo的操作同步给全局一份
    foo = 1; //私有foo=1
    // console.log(foo); =>1
    function foo() {2} //特殊：把之前对foo的操作同步给全局一份
    // console.log(foo); =>1
}
console.log(foo); //=>1 
*/
```

# 12
> todo
#### 问题
```
{
    function foo() {}
    foo = 1;
    function foo() {}
    foo = 2;
}
console.log(foo); 
```

# 13
> todo 
> /Users/xes/Desktop/basic/Javascript/bookFile/20201209/3.js
> #### 问题
```
var x = 1;
function func(x,y = function anonymous1() { x = 2;}) {
  x = 3;
  y();
  console.log(x); 
}
func(5);
console.log(x);
``` 
> #### 答案
```
/!*
 * EC(G)
 *   var x;
 *   func = 0x0001; [[scope]]:EC(G)
 *!/
var x = 1;
function func(x, y = function anonymous1(){x = 2}){
    /!*
     * EC(FUNC) 
     *  作用域链:<EC(FUNC),EC(G)>
     *  形参赋值:x=5 y=0x0002(anonymous1) [[scope]]:EC(FUNC)
     *  变量提升:--
     *!/
    x = 3; //私有x=3
    y();
    /!*
     * EC(Y)
     *   作用域链:<EC(Y),EC(FUNC)>
     *   形参赋值:--
     *   变量提升:--
     * 
     * 代码执行  x=2  把EC(FUNC)中私有的x修改为2
     *!/
    console.log(x); //=>2
}
func(5);
console.log(x); //=>1
*/
```

# 14 
#### 问题
```
// 'use strict';
var a = 4;
function b(x, y, a) {
  console.log(a);
  arguments[2] = 10;
  console.log(a);
}
a = b(1, 2, 3);
console.log(a);
```
#### 答案
```
// 'use strict';
var a = 4;
function b(x, y, a) {
  console.log(a); // 3
  // 严格模式下不能给 arguments 赋值
  arguments[2] = 10;
  console.log(a); // 非严格 10 / 严格 3
}
a = b(1, 2, 3);
console.log(a); // undefined
```

# 15
#### 问题
```
function fn(x, y) {
  let arg = arguments;
  x = 100;
  console.log(arg[0]); 

  arg[1] = 200;
  console.log(y); 
}
fn(10);

```
#### 答案
```
function fn(x, y) {
    /!*
     * EC(FN)
     *   作用域链:<EC(FN),EC(G)>
     *   初始ARGUMENTS: {0:10,length:1} 
     *   形参赋值:x=10 y=undefined
     *      「映射关系」  x->arguments[0]
     *   变量提升:--
     *!/
    let arg = arguments;
    x = 100;
    console.log(arg[0]); //=>100

    arg[1] = 200;
    console.log(y); //=>undefined
}
fn(10); 
```

# 16
#### 问题
```
var test = (function (i) {
  return function () {
    console.log((i *= 2));
  };
})(2);
test(5);
```

#### 答案 
```
/!*
 * EC(G)
 *   var test;  -> 0x0001
 *!/
var test = (function (i) {
    /!* 
     * EC(AN)
     *   作用域链:<EC(AN),EC(G)>
     *   形参赋值:i=2  ->4
     *   变量提升:--
     *!/
    return function () {
        /!*
         * EC(TEST)
         *   作用域链:<EC(TEST),EC(AN)> 
         *   初始ARG:{0:5,length:1}
         *   形参赋值:--
         *   变量提升:--
         *!/
        alert(i *= 2); //=>i=i*2  "4"
    }; //=>return 0x0001;  [[scope]]:EC(AN)
})(2);
test(5);
```

# 17
#### 
```
var x = 5,
  y = 6;
function func() {
  x += y;
  func = function (y) {
    console.log(y + --x);
  };
  console.log(x, y);
}

func(4);
func(3);
console.log(x, y);
```
#### 
> todo 再做一次
```
```
# 18
> todo 补全解析
> /Users/xes/Desktop/basic/Javascript/bookFile/20201211/1.js
####

####
```
/* var b = 10;
(function b() {
    b = 20;
    console.log(b); //=>函数
})();
console.log(b); //=>10 */

/* var b = 10;
(function b() {
    var b = 20;
    console.log(b); //=>20
})();
console.log(b); //=>10 */
```

# 19 柯理化
```
// 实现一种
// function fn(...args1) {
//   return function (...args2) {
//     return args1.concat(args2).reduce((pre, cur) => {
//       return pre + cur;
//     });
//   };
// }

// var result = fn(1, 2)(3);
// console.log(result);

function curring(index) {
  let total = 0;
  var addFn = function (...arg) {
    index--;
    total += arg.reduce((pre, cur) => {
      return pre + cur;
    });
    if (index == 0) {
      return total;
    } else {
      return addFn;
    }
  };
  return addFn;
}

// 实现多个
var add = curring(3);
var res = add(1)(2)(3);
console.log(res); //->6

add = curring(2);
res = add(1, 2, 3)(4);
console.log(res); //->10

add = curring(5);
res = add(1)(2)(3)(4)(5);
console.log(res); //->15 */

```

# 20  实现 reduce 及 reduceRight
> https://www.cnblogs.com/amujoe/p/11376940.html 用法 笔记

```
Array.prototype.reduce = function (cb, init) {
  if (typeof cb != 'function') {
    throw new Error('第一个参数必须是function');
    // return;
  }

  var len = this.length,
    nextResult = arr[0],
    i = 1;

  if (init != undefined) {
    i = 0;
    nextResult = init;
  }

  for (; i < len; i++) {
    nextResult = cb(nextResult, arr[i], i, this);
  }
  return nextResult;
};

Array.prototype.reduceRight = function reduceRight(callback, initial) {
  let self = this;
  self = self.reverse();
  return self.reduce(callback, initial);
};

var arr = [2, 4, 8];
var result = arr.reduce((result, item, index) => {
  console.log('---');
  console.log('result' + result);
  console.log('item' + item);
  console.log('index' + index);
  console.log('---');
  return result + item;
}, 3);

console.log(result);
```

# 21. compose 函数
```
const add1 = (x) => x + 1;
const mul3 = (x) => x * 3;
const div2 = (x) => x / 2;
// console.log(div2(mul3(add1(add1(0))))); //=>3

const operate = compose(div2, mul3, add1, add1);
console.log(operate(2));

function compose(...arg) {
  var len = arg.length;

  return function (params) {
    for (i = len - 1; i >= 0; i--) {
      params = arg[i](params);
    }
    return params;
  };
}
```