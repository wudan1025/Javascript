/*
 * 遍历器（Iterator）是一种机制(接口)：为各种不同的数据结构提供统一的访问机制，任何数据结构只要部署Iterator接口，就可以完成遍历操作，依次处理该数据结构的所有成员
 *   + 拥有next方法用于依次遍历数据结构的成员
 *   + 每一次遍历返回的结果是一个对象 {done:false,value:xxx}
 *     + done:记录是否遍历完成
 *     + value:当前遍历的结果
 * 
 * 拥有Symbol.iterator属性的数据结构(值)，被称为可被遍历的，可以基于for of循环处理
 *   + 数组
 *   + 部分类数组：arguments/NodeList/HTMLCollection...
 *   + String
 *   + Set
 *   + Map
 *   + generator object
 *   + ...
 * 
 * 对象默认不具备Symbol.iterator，属于不可被遍历的数据结构
 */
class Iterator {
    constructor(assemble) {
        let self = this;
        self.assemble = assemble;
        self.index = 0;
    }
    next() {
        let self = this;
        if (self.index > self.assemble.length - 1) {
            return {
                done: true,
                value: undefined
            };
        }
        return {
            done: false,
            value: self.assemble[self.index++]
        };
    }
}
/* let itor = new Iterator([10, 20, 30, 40]);
console.log(itor.next());
console.log(itor.next());
console.log(itor.next());
console.log(itor.next());
console.log(itor.next()); */

// for of循环就是按照迭代器的规范去遍历集合中的每一项的
//   + 每一次迭代都会去找集合中的某个属性：Symbol.iterator「具备这个属性的对象属于可以被迭代的对象，才能使用for of循环，没有则不能使用这个循环」
//   + let itor=arr[Symbol.iterator]()
//   + itor.next() -> {done:false,value:xxx}
//   + ...
//   + done决定循环是否执行 value的值给item

/* Array.prototype[Symbol.iterator] = function () {
    // this->arr当前迭代的集合
    let self = this,
        index = 0;
    return {
        next() {
            if (index > self.length - 1) {
                return {
                    done: true,
                    value: undefined
                };
            }
            return {
                done: false,
                value: self[index++]
            };
        }
    };
}; */

/* Array.prototype[Symbol.iterator] = function () {
    return new Iterator(this);
};

let arr = [10, 20, 30, 40];
for (let item of arr) {
    console.log(item);
} */


// 是否可以基于for of直接遍历对象？
//   + 不能直接遍历
//   + 需要手动设置Symbol.iterator
/* let obj = {
    0: 1,
    1: 2,
    2: 3,
    length: 3,
    // [Symbol.iterator]: Array.prototype[Symbol.iterator]
    [Symbol.iterator]: function () {
        return new Iterator(this);
    }
};
for (let item of obj) {
    console.log(item);
} */