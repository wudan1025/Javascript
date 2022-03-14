// 映射类型

// 接口
interface Obj {
    a: string;
    b: number;
}

// 将 Obj 所有接口变为只读
// ts 内置泛型接口

// Readonly 源码在 node_modukes/tyscript/lib
// todo 看源码
type ReadonlyObj = Readonly<Obj>

// 将Obj所有属性改为可选的
type PartialObj = Partial<Obj>


// 抽取子集
type PickObj = Pick<Obj, 'a' | 'b'>


// todo 只会修改 obj 不会 产生新的属性？？
// 属性还是对象？ 20 - 4:40
// ----- 分隔符 ----

// 创建新属性

// todo 作用
// x,y 为预定义的新属性 ，x,y 为已知类型的属性？？已知？？
type RecordObj = Record<'x' | 'y', Obj>

// todo 结果？
// console.log(RecordObj)