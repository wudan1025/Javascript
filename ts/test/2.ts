/*
 * @LastEditors: wudan01
 * @description: 文件描述
 */
// 计算正方形面积
// 计算创建正方形对象,可一个给构造器传递宽高
// 也可以传递 包含宽高的形状参数对象
class Square {
  public width: number;
  public height: number;

  public getArea() {
    return this.width * this.height;
  }

  constructor(width: number, height: number);
  constructor(value: object, ...rest);

  constructor(params1, params2) {
    if (typeof params1 == 'number' && typeof params2 == 'number') {
      this.width = params1;
      this.height = params2;
    } else if (typeof params1 == 'object') {
      this.width = params1.width;
      this.height = params1.height;
    } else {
      // never
    }
  }
}

console.log(new Square(2, 3).getArea());

console.log(new Square({ width: 1, height: 4 }).getArea());
