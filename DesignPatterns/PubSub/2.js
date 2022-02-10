/*
 * @LastEditors: wudan01
 * @description: 文件描述
 */
/*
 * @LastEditors: wudan01
 * @description: 文件描述
 */
class Agent {
  constructor() {
    this.list = [];
  }
  // 订阅
  subscribe(item) {
    this.list.push(item);
  }

  // 发布
  publish(msg) {
    this.list.forEach((item) => {
      console.log(`item is ${item.name}, msg is ${msg.msg}`);
    });
  }
}

// 房东 发布者
class HomeLoad {
  constructor(name) {
    this.name = name;
  }
  // 发布者发布信息后
  // 会通知到每一个注册的 订阅者
  publish(agent, msg) {
    agent.publish(msg);
  }
}

// 租户 订阅者
class Talent {
  constructor(name) {
    this.name = name;
  }

  // 订阅者 向 中介订阅信息
  register(agent) {
    agent.subscribe(this);
  }
}

let agent1 = new Agent();
let user1 = new Talent('user1');
let user2 = new Talent('user2');
let homeLoad1 = new HomeLoad('房东1');

// 订阅者订阅信息
user1.register(agent1);
user2.register(agent1);

// 发布者发布后 订阅者会受到 订阅信息
homeLoad1.publish(agent1, {
  msg: 'message',
});
