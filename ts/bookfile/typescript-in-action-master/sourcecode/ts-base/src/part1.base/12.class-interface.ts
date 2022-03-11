// 接口

// 只能约束共有成员
// 无法约束私有成员和构造函数
interface Human {
    name: string;
    eat(): void;
}

// 类 实现 接口
// 必须实现所有属性(可选除外)
class Asian implements Human {
    constructor(name: string) {
        this.name = name;
    }
    name: string
    eat() { }
    age: number = 0
    sleep() { }
}

interface Man extends Human {
    run(): void
}

interface Child {
    cry(): void
}

// 接口继承多个接口
interface Boy extends Man, Child { }

// 变量实现接口 
let boy: Boy = {
    name: '',
    run() { },
    eat() { },
    cry() { }
}

class Auto {
    state = 1
    // private state2 = 1
}

// 接口继承类？？？？todo

// 接口在抽离类的成员的时候
// 不仅抽离了公共成员，
// 也抽离了私有成员和受保护成员
// 当有 私有成员时， 类无法被接口 继承 ？？？
interface AutoInterface extends Auto {

}


class C1 implements AutoInterface {
    // 必须实现state1
    state1 = 1
}

// 
class Bus extends Auto implements AutoInterface {

}

// 看图 todo 了解关系

