/*
 * @LastEditors: wudan01
 * @description: 文件描述
 */
class ArrayList<T extends object> {
  public element: Array<T>;
  public index: number = 0;
  constructor() {
    this.element = [];
  }
  public add(ele: T) {
    this.element[this.index++] = ele;
  }
}

class ArrayListObj {
  public element: Array<object>;
  public index: number = 0;
  constructor() {
    this.element = [];
  }
  public add(ele: object) {
    this.element[this.index++] = ele;
  }
}

// 类型 学生
type stuType = { stuname: string; age: number; address: string };
let stuOne: stuType = { stuname: 'wnagwu', age: 23, address: 'beijing' };

// 类型 顾客
class Customer {
  constructor(public name: string, public age: number) {}
}
let Cust = new Customer('wangwu', 23);

// 期望 custArrayList 只包含顾客类型
// 不使用泛型类
// let custArrayList = new ArrayListObj();

// 泛型类
// let custArrayList = new ArrayList<Customer>();
let custArrayList = new ArrayList();

custArrayList.add(Cust);
// // 使用泛型类报错
// custArrayList.add(stuOne);

// custArrayList.add(1);
