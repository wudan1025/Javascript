// 接口

/*
接口对于多余字段不会检查(对象字面量除外)

绕过对象字面量方法
1. 字面量赋值变量，变量赋值接口 , 例如 render(result) 不报错

2. 类型断言

3. 字符串索引签名
*/


// 定义 list 接口

interface List {
    // 只读属性
    readonly id: number;
    name: string;
    // 绕过对象字面量方法3 索引签名
    // [x: string]: any;
    // or
    [propName: string]: string | number | any;
    // 可以没有的属性
    age?: number;
}

// 结果接口
interface Result {
    data: List[]
}
function render(result: Result) {
    result.data.forEach((value) => {
        console.log(value.id, value.name)
        if (value.age) {
            console.log(value.age)
        }
        // value.id++
    })
}
let result = {
    data: [
        { id: 1, name: 'A', sex: 'male' },
        { id: 2, name: 'B', age: 10 }
    ]
}

// 报错
/*
render({
    data: [
        { id: 1, name: 'A', sex: 'male' },
        { id: 2, name: 'B', age: 10 }
    ]
})*/

// 绕过对象字面量方法1
render(result)

// 绕过对象字面量方法2 类型断言
render({
    data: [
        { id: 1, name: 'A', sex: 'male' },
        { id: 2, name: 'B', age: 10 }
    ]
} as Result)



// 声明一个字符串类型的数组
interface StringArray {
    [index: number]: string
}
let chars: StringArray = ['a', 'b']

// 两种 签名可以混用
interface Names {
    [x: string]: any;
    // y: number;
    [z: number]: number;
}

// ----------分隔符----------

// 函数章节

/*
// 定义函数 方法1
let add: (x: number, y: number) => number
// 定义函数 方法2
interface Add {
    (x: number, y: number): number
}

// 定义函数方法3
type Add = (x: number, y: number) => number
*/
type Add = (x: number, y: number) => number
// 实现具体函数
let add: Add = (a: number, b: number) => a + b

// 混合类型接口
interface Lib {
    (): void;
    version: string;
    doSomething(): void;
}

function getLib() {
    let lib = (() => { }) as Lib
    lib.version = '1.0.0'
    lib.doSomething = () => { }
    return lib;
}
let lib1 = getLib()
lib1()
let lib2 = getLib()
lib2.doSomething()

// 看到09 开始