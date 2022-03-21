/*
 * @LastEditors: wudan01
 * @description: 文件描述
 */
interface Obj {
  a: string;
  b: number;
}

// 将 Obj 所有接口变为只读
// ts 内置泛型接口

// Readonly 源码在 node_modukes/tyscript/lib
// todo 看源码
type ReadonlyObj = Readonly<Obj>;

console.log(ReadonlyObj);
