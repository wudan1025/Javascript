# 1. 原始值类型「基本数据类型」有什么
#### 答案
```
 6+2
 6: undefined,null,bool,string,number,object
 2: bigint,symbol
```

# 2. 对象类型「下数所说的应该都是基于构造函数创造出来的实例」有什么
#### 答案
``` Array,regexp,data,number,string,error ```



# 3. Symbol 的作用
#### 答案
```
1. 唯一
2. Symbol.toStringTag Object.toStirng.call() 判断类型
```



#### 补充
```
Object.getOwnPropertySymbols(obj) 当前对象包含的 Symbols 属性
Symbol.hasInstance
Symbol.toPrimitive
Symbol.toStringTag
Symbol.iterator
```


# 4. bigint 的作用
#### 补充
``` Number.MAX_SAFE_INTEGER 9007199254740991  (2^53 - 1)
最大安全数字，超过安全数字，再进行运算，运算结果就不一定准确了
场景：前后端数据通信中，服务器是可以存储超长数字，
但是如果把大数返回客户端，处理起来不一定准确
```

# 5. 数据类型检测的方法有什么, 各自的优缺点是什么

# 6. 类型转换常见规则

# 7. 触发隐士类型转换
