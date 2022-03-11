import { extend } from 'jquery';

/*
 * @LastEditors: wudan01
 * @description: 文件描述
 */
class A {}

export default abstract class Animal2 extends A {
  eat() {
    console.log('eat');
  }
  // 需要在子类中实现
  abstract sleep(): void;
}
// let animal = new Animal2();
