<!--
 * @LastEditors: wudan01
 * @description: 文件描述
-->
# 定义
> 任意类型的父类

# 灵活使用

#### 判断 变量类型
```
// 使用 类型断言 指定 data 是 Customer 类型
// 形参使用 any 
// 根据传递变量是否有 特定属性判断 当前变量是否为某个类型
function isCustomer(data: any): data is Customer {
  return Boolean(data && data.custname)
}
```