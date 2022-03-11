// 3种类型推断
// 基础类型推断
let a1 = 1;
let b2 = [1, null, 'a']
let c3 = { x: 1, y: 'a' }

// 最佳通用类型推断
let d = (x = 1) => x + 1

// 上下文类型推断
window.onkeydown = (event) => {
    // console.log(event.button)
}


interface Foo {
    bar: number
}

// 类型断言
// let foo = {} as Foo
// let foo = <Foo>{}

// 声明时候指定类型
let foo: Foo = {
    bar: 1
}
// foo.bar = 1
