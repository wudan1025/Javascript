/*
 * X（目标类型） = Y（源类型），X 兼容 Y
 */

// 类型兼容
let s: string = 'a'
s = null

// 接口兼容性
interface X {
    a: any;
    b: any;
}
interface Y {
    a: any;
    b: any;
    c: any;
}
let x1: X = { a: 1, b: 2 }
let y: Y = { a: 1, b: 2, c: 3 }
// x1 兼容 y
x1 = y
// y 不兼容 x
// y = x1

// 函数兼容性
// type 是什么 类型todo?
type Handler = (a: number, b: number) => void
function hof(handler: Handler) {
    return handler
}

// 1)参数个数

// 参数可以比规定的少
let handler1 = (a: number) => { }
hof(handler1)
// 不可以比规定的多
let handler2 = (a: number, b: number, c: number) => { }
// hof(handler2)

// 可选参数和剩余参数
let a11 = (p1: number, p2: number) => { }
let b22 = (p1?: number, p2?: number) => { }
let c33 = (...args: number[]) => { }
a11 = b22
a11 = c33
// b22 = a11
// b22 = c33
c33 = a11
c33 = b22

// 2)参数类型
let handler3 = (a: string) => { }
// hof(handler3)


// 接口兼容
// 多的兼容少的
interface Point3D {
    x: number;
    y: number;
    z: number;
}
interface Point2D {
    x: number;
    y: number;
}
let p3d = (point: Point3D) => { }
let p2d = (point: Point2D) => { }
p3d = p2d
// p2d = p3d

// 3) 返回值类型
let f1 = () => ({ name: 'Alice' })
let g = () => ({ name: 'Alice', location: 'Beijing' })
f1 = g
// g = f1

// 函数重载

function overload(a: number, b: number): number
// 其他函数 参数要符合 目标函数
function overload(a: string, b: string): string
function overload(a: any, b: any): any { }
// function overload(a: any): any {}
// function overload(a: any, b: any, c: any): any {}
// function overload(a: any, b: any) {}

// 枚举兼容性
enum Fruit { Apple, Banana }
enum Color { Red1, Yellow1 }
// 枚举 和 number 是兼容的 
let fruit: Fruit.Apple = 1
let no: number = Fruit.Apple
// 枚举之间是不兼容的
// let color: Color.Red = Fruit.Apple

// 类兼容性
// 静态成员和构造函数 不参与比较
class A {
    constructor(p: number, q: number) { }
    id: number = 1
    private name: string = ''
}
class B {
    static s = 1
    constructor(p: number) { }
    id: number = 2
    private name: string = ''
}
class C12 extends A { }
let aa = new A(1, 2)
let bb = new B(1)
// aa = bb
// bb = aa
let cc = new C12(1, 2)
aa = cc
cc = aa

// 泛型兼容性
interface Empty<T> {
    // value: T
}
let obj1: Empty<number> = {};
let obj2: Empty<string> = {};
obj1 = obj2


// 泛型函数
let log1 = <T>(x: T): T => {
    console.log('x')
    return x
}
let log2 = <U>(y: U): U => {
    console.log('y')
    return y
}

log1 = log2
