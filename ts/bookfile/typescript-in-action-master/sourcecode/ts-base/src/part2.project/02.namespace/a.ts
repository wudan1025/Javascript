// 命名空间 现在实际用法 看PPT
// 不要在模块中使用命名空间 

// 解析为闭包
namespace Shape {
    const pi = Math.PI
    export function cricle(r: number) {
        return pi * r ** 2
    }
}
