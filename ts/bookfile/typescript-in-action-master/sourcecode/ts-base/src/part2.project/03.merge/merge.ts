/* 
声明合并
1. 接口合并
同名同类型变量可以通过编译
同名函数会被重载, 字面量函数被提到最顶端，后面接口的函数在前

2. 命名空间的合并
导出空间成员 不可以重复,重复会被覆盖
命名控件可以与命名控件重复，
命名空间和其他类型进行合并(class,function,enum)
需要放在其他类型的后面

*/
// 接口
interface A {
    x: number;
    // y: string;
    foo(bar: number): number; // 5
    foo(bar: 'a'): string; // 2
}

interface A {
    y: number;
    // 函数会被重载
    foo(bar: string): string; // 3
    foo(bar: string[]): string[]; // 4
    foo(bar: 'b'): string; // 1
}

// a 实现 A接口 ，A 接口会实现 上面两个接口的合包后接口
let a: A = {
    x: 1,
    y: 2,
    foo(bar: any) {
        return bar
    }
}

// class C { }
namespace C {
    export let state2 = 1
}
namespace C {
    export let state = 1
}
console.log(C.state)
console.log(C.state2)

function Lib() { }
namespace Lib {
    export let version = '1.0'
}
console.log(Lib.version)

enum Color {
    Red,
    Yellow,
    Blue
}
namespace Color {
    export function mix() { }
}
console.log(Color)
