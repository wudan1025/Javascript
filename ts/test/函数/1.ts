/*
 * @LastEditors: wudan01
 * @description: 文件描述
 */
// 实现比set 取值更方便的结合,使用方法重载实现remove

// 根据 id 删除元素,remove 返回数字

// todo 如何获取到 key 一样的对象？
// 根据 对象 删除，remove 返回删除的对象
class ArrayList {
  constructor(public elements: Array<object>) {}

  // 根据索引查询数组中指定元素
  get(index: number) {
    return this.elements[index];
  }

  // 输出
  show() {
    this.elements.forEach((ele) => {
      console.log(ele);
    });
  }

  remove(value: number): number;
  remove(value: object): object;

  // 报错todo
  // remove(value: number | object): (number | object){

  remove(value: number | object): any {
    // if (typeof value == 'number') {
    //   // this.get(value)
    //   this.elements.splice(value, 1);
    //   return value;
    // } else if (typeof value == 'object') {
    //   let result = null;
    //   this.elements.forEach((el, index) => {
    //     if (el == value) {
    //       result = index;
    //     }
    //   });
    //   let delel = this.elements.splice(result, 1);
    //   return delel;
    // }

    // filter 返回true 组成的数组
    this.elements = this.elements.filter((ele, index) => {
      if (typeof value == 'number') {
        return value !== index;
      } else {
        return value !== ele;
      }
    });

    return value;
  }
}

var a = new ArrayList([
  {
    a: 1,
  },
  {
    b: 2,
  },
  {
    c: 3,
  },
]);

a.remove(1);
a.remove(a[2]);

console.log(a);
