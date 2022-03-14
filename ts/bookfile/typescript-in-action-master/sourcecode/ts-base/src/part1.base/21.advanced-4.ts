/*
条件类型：条件表达式决定的类型
*/

// 使类型不唯一
// T extends U ? X : Y

type TypeName<T> =
    T extends string ? "string" :
    T extends number ? "number" :
    T extends boolean ? "boolean" :
    T extends undefined ? "undefined" :
    T extends Function ? "function" :
    "object";
type T1 = TypeName<string>
type T2 = TypeName<string[]>


// 分布式条件类型
// (A | B) extends U ? X : Y
// todo 拆解结果
// (A extends U ? X : Y) | (B extends U ? X : Y)
type T3 = TypeName<string | string[]>



type Diff<T, U> = T extends U ? never : T
type T4 = Diff<"a" | "b" | "c", "a" | "e">

// 拆解 todo 21 - 6:00
// Diff<"a", "a" | "e"> | Diff<"b", "a" | "e"> | Diff<"c", "a" | "e">
// never | "b" | "c"
// "b" | "c"

// 过滤掉  null | undefined
type NotNull<T> = Diff<T, null | undefined>
type T5 = NotNull<string | number | undefined | null>

// diff功能相同 内置类型
// Exclude<T, U>

//notnull功能相同 内置类型
// NonNullable<T>

// 从T 抽取出可以赋值给类型U 的内容
// Extract<T, U>
type T6 = Extract<"a" | "b" | "c", "a" | "e">

// ReturnType<T> 获取函数返回值类型
type T8 = ReturnType<() => any>
