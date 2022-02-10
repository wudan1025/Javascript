/*
 * @LastEditors: wudan01
 * @description: 文件描述
 */

// 观察者模式
// 被观察者
class Obj {
  constructor() {
    this.observers = [];
  }
  // 添加观察者
  add(observer) {
    this.observers.push(observer);
  }

  // 触发
  modifyState() {
    this.observers.forEach((observer) => {
      observer.cb();
    });
  }
}

// 观察者
class Observer {
  constructor(sub, cb) {
    sub.add(this);
    this.cb = cb;
  }
  cb() {
    this.cb();
  }
}

var sub = new Obj();
var observer1 = new Observer(sub, cb);
var observer2 = new Observer(sub, cb);
sub.modifyState();

function cb() {
  console.log('callback');
}
