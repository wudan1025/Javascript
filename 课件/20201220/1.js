/* 
 * 在内置类的原原型上扩展方法
 *   + 调用起来方便，可以直接基于实例去调用方法，方法中的this就是实例「也就是我们要操作的值」
 *   + 可以实现链式调用
 *   + 自己扩展的方法最好设置前缀“myXxx”，防止自己扩展的方法覆盖原始内置的方法
 */
// let arr = [10, 20];
// console.log(arr.slice(1).map(item => item * 10).push('X').toFixed(2).split('.'));

/* 
const checkVal = val => {
    val = +val;
    return isNaN(val) ? 0 : val;
};
Number.prototype.plus = function plus(val) {
    // this -> n 「对象，严格模式下可以是原始值」
    val = checkVal(val);
    return this + val;
};
Number.prototype.minus = function minus(val) {
    val = checkVal(val);
    return this - val;
};

let n = 10;
let m = n.plus(10).minus(5);
console.log(m); //=>15（10+10-5） 
*/