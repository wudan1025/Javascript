// 泛型 不预先确定的数据类型，具体的类型在使用的时候才能确定
function log<T>(value: T): T {
    console.log(value);
    return value;
}
log<string[]>(['a', ',b', 'c'])
log(['a', ',b', 'c'])

// type Log = <T>(value: T) => T
// let myLog: Log = log

// 泛型接口
// 泛型所有成员会受到泛型的约束
interface Log<T> {
    (value: T): T
}

interface Log1 {
    // 只有这个成员受到泛型的约束
    // todo 约束的是 变量
    <T>(value: T): T
}

// let myLog: Log<number> = log
// myLog(1)

// 泛型类
class Log<T> {

    // 无法约束静态方法
    // static run1(value: T) {
    //     console.log(value)
    //     return value
    // }

    run(value: T) {
        console.log(value)
        return value
    }
}
let log11 = new Log<number>()
log11.run(1)
let log22 = new Log()
log22.run({ a: 1 })

interface Length {
    length: number
}

// 泛型的类型约束
// 使用泛型继承接口 进行约束 
// 问题：如何约束泛型参数
function logAdvance<T extends Length>(value: T): T {
    console.log(value, value.length);
    return value;
}
logAdvance([1])
logAdvance('123')
logAdvance({ length: 3 })
