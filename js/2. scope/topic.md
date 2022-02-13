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