/* 柯理化函数 curring：预先处理的思想「利用闭包，保存私有上下文中的一些信息，供其下级上下文中调取使用，也就是我们把一些信息先预先保存下来，后期让其下级上下文使用」 => 大函数执行返回小函数*/
/* 
const fn = (...params) => {
    // 闭包:params -> [1,2]
    return (...args) => {
        return params.concat(args).reduce((total, item) => {
            return total + item;
        });
    };
};
fn(1, 2)(3); 
*/

/* function fn() {}
fn.toString = function () {
    console.log('一定调我了');
    return 'OK';
};
// console.log(fn); //->fn.toString
alert(fn); //->fn.toString */

/* const curring = () => {
    let arr = [];
    const add = (...params) => {
        // 把每一次执行ADD方法传递的值都保留下来
        arr = arr.concat(params);
        return add;
    };
    add.toString = () => {
        // 输出ADD会调用其toString方法
        return arr.reduce((total, item) => total + item);
    };
    return add;
};

let add = curring();
let res = add(1)(2)(3);
console.log(res); //->6

add = curring();
res = add(1, 2, 3)(4);
console.log(res); //->10

add = curring();
res = add(1)(2)(3)(4)(5);
console.log(res); //->15 */


/* const curring = n => {
    let arr = [],
        index = 0;
    const add = (...params) => {
        index++;
        arr = arr.concat(params);
        if (index === n) {
            return arr.reduce((total, item) => total + item);
        }
        return add;
    };
    return add;
};

let add = curring(3);
let res = add(1)(2)(3);
console.log(res); //->6

add = curring(2);
res = add(1, 2, 3)(4);
console.log(res); //->10

add = curring(5);
res = add(1)(2)(3)(4)(5);
console.log(res); //->15 */