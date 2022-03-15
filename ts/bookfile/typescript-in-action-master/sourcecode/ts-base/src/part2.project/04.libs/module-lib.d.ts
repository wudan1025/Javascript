
// umd 库声明文件
declare function moduleLib(options: Options): void

interface Options {
    [key: string]: any
}

// 为什么要写 namespace
declare namespace moduleLib {
    const version: string
    function doSomething(): void
}

// 兼容性好
export = moduleLib
