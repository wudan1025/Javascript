
/*

es ts 中 
类的属性是实例属性，方法是原型方法
 */


// 抽象类 只能被继承 不能被实例化的类
abstract class Animal {
    eat() {
        console.log('eat')
    }
    // 抽象方法 todo???
    // 需要在子类中实现
    abstract sleep(): void
}
// let animal = new Animal()

class Dog extends Animal {
    constructor(name: string) {
        super()
        this.name = name
        this.pri()
    }
    // 类型注解
    // 属性必须有初始值
    public name: string = 'dog'
    // 方法默认是 public 当前子类实例都可以访问
    run() { }
    // 只有当前实例调用
    // todo private class 不能被new 和继承？
    private pri() { }
    // 受保护，当然和子类访问，实例无法访问
    // protected construtor 不能被实例化，只能被继承
    // 相当于声明了一个基类？？todo
    protected pro() { }
    // 只读属性，不可更改
    readonly legs: number = 4
    // 静态成员 
    static food: string = 'bones'

    // 实现抽象方法
    sleep() {
        console.log('Dog sleep')
    }
}
// console.log(Dog.prototype)
let dog = new Dog('wangwang')
// console.log(dog)
// dog.pri()
// dog.pro()
console.log(Dog.food)
dog.eat()

class Husky extends Dog {
    // 通过 public 添加color 将 color 变为实例属性
    constructor(name: string, public color: string) {
        super(name)
        this.color = color
        // this.pri()
        this.pro()
    }
    // color: string
}
// 静态方法也可以继承
console.log(Husky.food)



class Cat extends Animal {
    sleep() {
        console.log('Cat sleep')
    }
}
let cat = new Cat()

let animals: Animal[] = [dog, cat]
animals.forEach(i => {
    i.sleep()
})

class Workflow {
    step1() {
        return this
    }
    step2() {
        return this
    }
}

// 链式调用？？
// 每次调用返回this?

new Workflow().step1().step2()


// this 的多态
class MyFlow extends Workflow {
    next() {
        return this
    }
}

// 返回子类 this,父类 this ,子类 this, 父类 this
new MyFlow().next().step1().next().step2()
