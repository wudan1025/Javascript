/*
 * @LastEditors: wudan01
 * @description: 文件描述
 */
// 报社
class Publisher {
  constructor(name, channel) {
    this.name = name;
    this.channel = channel;
  }
  // 注册报纸
  addTopic(topicName) {
    this.channel.addTopic(topicName);
  }
  // 推送报纸
  publish(topicName) {
    this.channel.publish(topicName);
  }
}
// 订阅者
class Subscriber {
  constructor(name, channel) {
    this.name = name;
    this.channel = channel;
  }
  //订阅报纸
  subscribe(topicName) {
    this.channel.subscribeTopic(topicName, this);
  }
  //取消订阅
  unSubscribe(topicName) {
    this.channel.unSubscribeTopic(topicName, this);
  }
  //接收推送
  update(topic) {
    console.log(`${topic}已经送到${this.name}家了`);
  }
}
// 第三方平台
class Channel {
  constructor() {
    this.topics = {};
  }
  //报社在平台注册报纸
  addTopic(topicName) {
    this.topics[topicName] = [];
  }
  //报社取消注册
  removeTopic(topicName) {
    delete this.topics[topicName];
  }
  //订阅者订阅报纸
  subscribeTopic(topicName, sub) {
    if (this.topics[topicName]) {
      this.topics[topicName].push(sub);
    }
  }
  //订阅者取消订阅
  unSubscribeTopic(topicName, sub) {
    this.topics[topicName].forEach((item, index) => {
      if (item === sub) {
        this.topics[topicName].splice(index, 1);
      }
    });
  }
  //平台通知某个报纸下所有订阅者
  publish(topicName) {
    this.topics[topicName].forEach((item) => {
      item.update(topicName);
    });
  }
}

var channel = new Channel();

var pub1 = new Publisher('报社1', channel);
var pub2 = new Publisher('报社2', channel);

pub1.addTopic('晨报1');
pub1.addTopic('晚报1');
pub2.addTopic('晨报2');

var sub1 = new Subscriber('小明', channel);
var sub2 = new Subscriber('小红', channel);
var sub3 = new Subscriber('小张', channel);

sub1.subscribe('晨报1');
sub2.subscribe('晨报1');
sub2.subscribe('晨报2');
sub3.subscribe('晚报1');

sub3.subscribe('晨报2');
sub3.unSubscribe('晨报2');

pub1.publish('晨报1');
pub1.publish('晚报1');
pub2.publish('晨报2');

//晨报1已经送到小明家了
//晨报1已经送到小红家了
//晚报1已经送到小张家了
//晨报2已经送到小红家了
