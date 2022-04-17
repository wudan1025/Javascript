<!--
 * @LastEditors: wudan01
 * @description: 文件描述
-->
# 变量定义
> interface/type 不需要 declare
> todo

> 函数
```
declare function moduleLib(options: Options): void

interface Options {
    [key: string]: any
}
```

> 命名空间

```
declare namespace umdLib {
    const version: string
    function doSomething(): void
}
```

# 导出写法
> 兼容
```
export = moduleLib
```

> umd : AMD 和 CommonJS 都是兼容 
```
export as namespace umdLib
```

# 其他
#### 1.自动生成 d.ts
> 需要配置 tsconfig 

> 源代码需要显示导出 export 才会自动生成