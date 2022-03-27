/*
 * @LastEditors: wudan01
 * @description: 文件描述
 */
// keyof
interface obj {
  a: number;
  b: string;
}

type keyofObj2 = keyof obj;

let keyofObj1: keyof obj;
let keyofObj3: keyofObj2;
console.log(keyofObj1);
// 或;

// let obj = { address: '博鳌', phone: 1111, descri: '顺利' };
// type keyofobjtype = keyof typeof obj; //S100=S98+S99的效果

class Order {
  static count: number;
  constructor(
    public orderId: number,
    public date: Date,
    public custname: string,
    public phone: string,
    public orderDetailArray: Array<string>
  ) {}
  doEat() {}
}

type keyofOrders = keyof Order;
let allvalue: keyofOrders = 'doEat';

let obj3 = {
  a: 1,
  b: '2',
};

// 改造前
// function getValues(obj: any, keys: string[]) {
//     return keys.map(key => obj[key])
// }

// 改造后
// 改造后  T 约束 obj, K 约束 keys
// K 增加约束，继承 obj 所有属性的联合类型(keyof T)
function getValues<T, K extends keyof T>(obj: T, keys: K[]): T[K][] {
  return keys.map((key) => obj[key]);
}

// 调用
// 全写
getValues<obj, keyof obj>(obj3, ['a', 'b']);

// 简写
getValues(obj3, ['a', 'b']);
