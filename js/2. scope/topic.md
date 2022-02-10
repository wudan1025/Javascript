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
> todo 1204视频找答案
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
> todo 1204视频找答案
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
错误 见题目注释
```