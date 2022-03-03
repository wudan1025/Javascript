// 原始类型
let bool: boolean = true
let num: number | undefined | null = 123
let str: string = 'abc'
// str = 123

// 数组 
let arr1: number[] = [1, 2, 3]

// Array ts 预先定义的泛型接口
// number | string 联合类型
let arr2: Array<number | string> = [1, 2, 3, '4']

// 元组
// 特殊的数组，限制了数组的类型，个数
let tuple: [number, string] = [0, '1']
// 实际开发过程中 不建议使用
// 可以插入
// tuple.push(2) 
// console.log(tuple)
// 无法访问
// tuple[2]

// 函数
// 增加类型注解
let add3 = (x: number, y: number) => x + y

// compute 函数类型
let compute: (x: number, y: number) => number
compute = (a, b) => a + b

// 对象
let obj3: { x: number, y: number } = { x: 1, y: 2 }
obj3.x = 3

// symbol
// 警告？
let s1: symbol = Symbol()
let s2 = Symbol()
console.log(s1 === s2)

// undefined, null
let un: undefined = undefined
let nu: null = null
num = undefined
num = null

// void
let noReturn = () => { }

// any
let x
x = 1
x = []
x = () => { }

// 函数 返回类型 为 never
let error = () => {
    throw new Error('error')
}

// 函数 返回类型 为 never
// 死循环永远不会有返回值
let endless = () => {
    while (true) { }
}


