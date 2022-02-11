<!--
 * @LastEditors: wudan01
 * @description: 文件描述
-->
/*
 * @LastEditors: wudan01
 * @description: 文件描述
 */
// 20201202 - 2021204

// 1. 原始值类型「基本数据类型」有什么
/*
 6+2
 6: undefined,null,bool,string,number,object
 2: bigint,symbol
 */

// 2. 对象类型「下数所说的应该都是基于构造函数创造出来的实例」有什么
/*
 Array,regexp,data,number,string,error
 */

// 3. Symbol 的作用
/*
1. 唯一
2. Symbol.toStringTag Object.toStirng.call() 判断类型
*/

/*
// 补充
Object.getOwnPropertySymbols(obj) 当前对象包含的 Symbols 属性
Symbol.hasInstance
Symbol.toPrimitive
Symbol.toStringTag
Symbol.iterator
 */

// 4. bigint 的作用
/*
补充
//  Number.MAX_SAFE_INTEGER 9007199254740991  (2^53 - 1)
最大安全数字，超过安全数字，再进行运算，运算结果就不一定准确了
// 场景：前后端数据通信中，服务器是可以存储超长数字，
但是如果把大数返回客户端，处理起来不一定准确
*/

// 5. 数据类型检测的方法有什么, 各自的优缺点是什么
/*
1. typeOf 
  作用:区分简单类型和obj类型
  问题 
    1. typeOf null == Object

  // 补充
  typeOf obj => function/object
  typeof 实现CALL的对象「函数、箭头函数、生成器函数、构造函数」 ->"function"
  typeof 剩下未实现CALL的对象 ->"object"
   
2. constructor
  作用：判断是否是类的实例 实例.constructor = 构造函数
  问题
    1. constructor 可以随意修改，不准确
3. Object.toString.call()  
  作用：判断所有类型，可以通过symbol设置类型
 */

// 6. 为什么 typeof null ->"object"

/*
1. 转化为二进制 判断 
*/

# 7. 类型转换

#### 1. 触发隐士类型转换
