//13-4 any 和 unknown 的两个区别
let price: any = "abc"
let total: number = price

let stuObj: any = { username: "wangwu", age: 23 }
// any 可以任意加 所有属性

let stuName: unknown = { username: "wangwu", age: 23 }
// unkoow 不可以加任何属性 stuName.xxx =  xx 报错？
// stuName.username

//let stuAge:number=stuName


export { }