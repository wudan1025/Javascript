<!--
 * @LastEditors: wudan01
 * @description: 文件描述
-->
# 变量定义
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