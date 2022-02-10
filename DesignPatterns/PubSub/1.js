/*
 * @LastEditors: wudan01
 * @description: 文件描述
 */

// 发布订阅

// 发布者
class Pub {
  constructor(agent) {
    agent.addPub(this);
    this.agent = agent;
  }
  modifyState() {
    this.agent.modifyState();
  }
}

// 订阅者
class Sub {
  constructor(agent, name) {
    this.name = name;
    agent.addSub(this);
  }
  cb() {
    console.log('stateChange');
  }
}

// 中介
class Agent {
  constructor() {
    this.pub = [];
    this.sub = [];
  }
  // 增加 发布者
  addPub(pub) {
    this.pub.push(pub);
  }

  // 增加订阅者
  addSub(sub) {
    this.sub.push(sub);
  }

  // 发布者修改状态
  modifyState() {
    this.sub.forEach((sub) => {
      sub.cb();
    });
  }
}

var agent = new Agent();
var pub = new Pub(agent);
var sub1 = new Sub(agent, 'sub1');
var sub2 = new Sub(agent, 'sub2');

pub.modifyState();
