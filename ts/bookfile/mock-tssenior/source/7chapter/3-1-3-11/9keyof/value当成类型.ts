import Order from './Order'

// 值 作为类型
// 变量实现类型时候，值只能为 和类型同名的值

// 注意：1类型的值只能是它自身就是1
type iBoolean = boolean | 1 | 0//  iBoolean由boolean类型和1类型和0类型构成的联合类型
let iValid: iBoolean = 0
if (Boolean(iValid)) {
  console.log("合法");
}
export { }