/*
 * @LastEditors: wudan01
 * @description: 文件描述
 */

class Auto {
  state = 1;
  // 有私有的无法被接口继承
  // private state3 = 1;
}
interface AutoInterface extends Auto {
  // state3 = 1;
}

class C1 implements AutoInterface {
  // 必须实现state1
  private state3 = 1;
}

class Bus extends Auto implements AutoInterface {}
