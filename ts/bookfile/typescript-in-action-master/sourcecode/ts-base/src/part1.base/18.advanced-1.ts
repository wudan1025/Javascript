/*
交叉类型 ：多个类型合并为一个类型， 新类型有两个类型都有的
，适合对象混入场景，取所有类型的并集
*/

interface DogInterface {
    run(): void
}
interface CatInterface {
    jump(): void
}

// 交叉类型 &
let pet: DogInterface & CatInterface = {
    run() { },
    jump() { }
}

/*
联合类型：取得类型不确定，可能是多个类型中的一个
增加代码灵活性
*/

let a: number | string = 1

// 字符串字面量的联合类型
let b: 'a' | 'b' | 'c'

// 数字的字面量联合类型
let c: 1 | 2 | 3

class Dog1 implements DogInterface {
    run() { }
    eat() { }
}
class Cat1 implements CatInterface {
    jump() { }
    eat() { }
}
enum Master { Boy, Girl }
function getPet(master: Master) {
    // pet 被推断为 dog 和 cat 联合类型
    let pet = master === Master.Boy ? new Dog1() : new Cat1();
    // 报错
    // pet.run()
    // pet.jump()
    // 只能访问交集方法
    pet.eat()
    return pet
}

// 通过公共的属性 类型保护区块
interface Square {
    kind: "square";
    size: number;
}
interface Rectangle {
    kind: "rectangle";
    width: number;
    height: number;
}
interface Circle {
    kind: "circle";
    radius: number;
}
type Shape = Square | Rectangle | Circle
function area(s: Shape) {
    switch (s.kind) {
        case "square":
            return s.size * s.size;
        case "rectangle":
            return s.height * s.width;
        case 'circle':
            return Math.PI * s.radius ** 2
        default:
            return ((e: never) => { throw new Error(e) })(s)
    }
}
console.log(area({ kind: 'circle', radius: 1 }))
