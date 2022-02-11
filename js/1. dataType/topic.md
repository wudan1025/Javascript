# 1. 输出结果
#### 题目
```
console.log(typeof typeof []);  // string
```
#### 结果
```
string 
typeof (typeof xx) 第一次结果为 字符串，
所以 不论判断什么类型都是字符串
```

# 2. 输出结果
#### 题目
```
var obj = {
    name: 'xxx',
    [Symbol.toPrimitive](hint) {
        // hint检测到浏览器隐式规定的转换类型:'number'/'string'/'default'
        return 10;
    }
};
console.log(obj - 10);
```

#### 结果
```
obj - 10, obj 转化为数字为10，结果为0
// 对象转换为数字/字符串「字符串拼接、数学运算、特殊方法处理、==比较（隐式转换、显式转换）...」
//  + 首先检测对象的 Symbol.toPrimitive 这个属性，获取其原始值
//  + 如果没有这个属性，则继续调用它的valueOf，也是获取原始值
//  + 如果值不是原始值，则继续调用toString转换为字符串
//  + 再把字符串基于Number转换为数字
```

# 3. 输出结果
#### 题目
```
let result = 100 + true + 21.2 + null + undefined + "Tencent" + [] + null + 9 + false;
console.log(result);
```
#### 结果
todo
```
NaNTencentnull9false
```

# 4. 输出结果
#### 题目
todo
```
var a = ?;
if (a == 1 && a == 2 && a == 3) {
    console.log('OK');
}
```
#### 结果
```
// 方案1
var a = {
    b:0,
    // 或 valueOf
    toString: function(){
        return ++this.b
    }
}

// 方案2
var i = 0;
Object.defineProperty(window, 'a', {
    get() {
        return ++i;
    }
});
if (a == 1 && a == 2 && a == 3) {
    console.log('OK');
}


```

# 5. 输出结果
#### 题目
> 重点
```
let arr = [27.2, 0, '0013', '14px', 123];
arr = arr.map(parseInt);
console.log(arr);
```
#### 结果
```
结果  [27, NaN, 1, 1, 27]
// 不等价
// arr = arr.map((arr) => {
//   // [27, 0, 13, 14, 123]
//   问题点 parseInt 接收两个参数
//   return parseInt(arr);
// });

// 等价于
arr = arr.map((el, idx, arr) => {
  return parseInt(el, idx); //  [27, NaN, 1, 1, 27]
});
console.log(arr)

// 想得到正确结果
1. ['1', '2', '3'].map( str => parseInt(str) );
2. ['1', '2', '3'].map( str => parseInt(str,10) );
```

> 类似
```
var numbers = [1, 4, 9];
// var roots = numbers.map(Math.sqrt);
// 等价于
var roots = numbers.map((num, idx) => {
  return Math.sqrt(num);
});
console.log(roots);
```

# 6. 输出结果
#### 题目
```
var numbers = [1, 2, 3, 4];
var filteredNumbers = numbers.map(function(num, index) {
  if(index < 3) {
     return num;
  }
});
```

#### 结果
```
// 不返回结果则为undefined
//index goes from 0,so the filterNumbers are 1,2,3 and undefined.
// filteredNumbers is [1, 2, 3, undefined]
// numbers is still [1, 2, 3, 4]
```