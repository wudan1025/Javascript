/*
 * @LastEditors: wudan01
 * @description: 文件描述
 */

/*
class A1 {
  protected constructor() {
    console.log('123');
  }
}

// let a1 = new A1();

class Animal2 extends A1 {
  constructor() {
    super();
  }
  eat() {
    console.log('eat');
  }
}

let animal = new Animal2();
*/

class Workflow1 {
  step1() {
    return this;
  }
  step2() {
    return this;
  }
}

// new Workflow().step1().step2();

class MyFlow1 extends Workflow1 {
  next() {
    return this;
  }
}

// new MyFlow().next().step1().next().step2();
// console.log(new MyFlow1().next().next());

console.log(new MyFlow1().next().step1());
