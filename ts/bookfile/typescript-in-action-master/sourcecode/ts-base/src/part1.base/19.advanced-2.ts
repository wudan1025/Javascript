/**
 索引类型
 */
let obj = {
    a: 1,
    b: 2,
    c: 3
}

// 改造前
// function getValues(obj: any, keys: string[]) {
//     return keys.map(key => obj[key])
// }

// todo 思考
// 改造后  T 约束 obj, K 约束 keys
// K 增加约束，继承 obj 所有属性的联合类型
function getValues<T, K extends keyof T>(obj: T, keys: K[]): T[K][] {
    return keys.map(key => obj[key])
}
console.log(getValues(obj, ['a', 'b']))

// 改造后 可以判断出参数 不符合要求
// console.log(getValues(obj, ['d', 'e']))

// keyof T : 类型 T 所有公共属性的字面量联合类型
interface Obj {
    a: number;
    b: string;
}


let key: keyof Obj

console.log(key)

// T[K] 索引访问操作符
let value: Obj['a']

// 泛型约束
// T extends U
