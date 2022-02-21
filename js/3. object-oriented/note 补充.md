# 6 原型及原型链

#### 既有 __proto__ 又有 prototype
###### Array 
> 即使函数又是对象
> 作为函数 new Array
```
Array.prototype.__proto__ == Object.prototype
```
> 作为对象 Array.isArray 等方法
```
Array.__proto__ == Function.prototype
```
###### Funtion

> Funtion 和 Object 的混乱关系
Function.__proto__  == Function.prototype  ==  Object.__proto__


#### 两者都没有
> 箭头函数

#### 原型链
> 继承通过 __proto__ 属性去找

```
 // 普通函数
  // 普通函数通过原型链向上找尽头为 Object -> null
  function Fn() {
    this.a = '123'
  }
  var fn = new Fn()
  // console.log(fn.__proto__ == Fn.prototype)
  // console.log(fn.__proto__.prototype) // undefined
  // console.log(fn.__proto__.__proto__ == Object.prototype)
  // console.log(fn.__proto__.__proto__.__proto__) // null

  // 内置构造函数
  // 内置构造函数通过原型链向上找尽头为 Function -> Object -> null
  var arr = new Array(1, 2, 3)
  console.log(arr.__proto__ == Array.prototype)
  console.log(arr.__proto__) // undefined
  console.log(arr.__proto__.__proto__ == Object.prototype)
  console.log(arr.__proto__.__proto__.__proto__) // null

  console.log(Array.__proto__ == Function.prototype) // true
  console.log(Array.__proto__.__proto__ == Object.prototype) // true
  console.log(Array.__proto__.__proto__.__proto__) // null

  console.log(Function.prototype.__proto__ == Object.prototype) 
```