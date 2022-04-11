<!--
 * @LastEditors: wudan01
 * @description: 文件描述
-->
# any
#### 定义
> 任意类型的父类, 任意类型的子类

#### 灵活使用

###### 任意添加属性
```
let stuObj: any = { username: 'wangwu', age: 23 };
// any 可以任意加 所有属性
stuObj.username = 123;
```

###### 判断 变量类型
```
// 使用 类型断言 指定 data 是 Customer 类型
// 形参使用 any 
// 根据传递变量是否有 特定属性判断 当前变量是否为某个类型
function isCustomer(data: any): data is Customer {
  return Boolean(data && data.custname)
}
```

# unkonw
```
let stuName: unknown = { username: 'wangwu', age: 23 };
// unknown 不可以加任何属性 stuName.xxx =  xx 报错 
// stuName.username = '123'; // 报错，无法通过编译
// unkonw 是不是所有类型子类，所以无法兼容其他类型
// let stuAge: number = stuName; // 报错，无法赋给其他值
```

# 区别
> any 是所有类型父类，也是所有类型子类

> unkonw 是所有类型父类，不是所有类型子类

#### 是所有类型父类
```
// 定义unkonw类型变量，后面跟任意类型可兼容
// 即 unkonw 是 任意变量 的父类
// any 同理
let a: unkonw = {任意}
```

#### 是所有类型子类
```
let stuName: unknown = { username: 'wangwu', age: 23 };
// unkonw 是不是所有类型子类，所以无法兼容其他类型
// let stuAge: number = stuName; // 报错，无法赋给其他值

// any 类型变量可以任意赋值
// 表示 any 是任意类型的子类型
```