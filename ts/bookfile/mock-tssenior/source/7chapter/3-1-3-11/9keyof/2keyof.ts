import Order from './Order'

// keyof 结果是个类型
// 获取Order类上所有属性+所有的public方法名组成的联合类型
type keyofOrders = keyof Order// keyofOrders="orderId" | "date" |"custname"|"phone"|"orderDetailArray" |"doEat"
// 只有属性 也有原型上public方法？其他方法也有吗
// 静态属性如何获取？
let allvalue: keyofOrders = "doEat"


export { }