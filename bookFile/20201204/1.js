/*
 * 对象转换为数字或者字符串
 *   1.查找对象的 Symbol.toPrimitive 
 *   2.对象.valueOf()  原始值：number\string\boolean\null\undefined\symbol\bigint
 *   3.对象.toString() 变为字符串
 *   4.字符串转换数字 Number(str)
 * 
 * ==相等  ===绝对相等
 *   ==在比较的时候，如果两边类型不一致，则转换为相同的数据类型
 *     NaN==NaN  false    Object.is(NaN,NaN)->true
 *     null==undefined -> true    null===undefined -> false   null&undefined和其他任何值比较都是不相等的
 *     对象==字符串   对象转换为字符串
 *     剩余的情况都是转换为数字
 * 
 *   ===类型不一致，不会转换，直接false
 */

// 第一类：隐式进行数据类型转换的时候进行处理的
/* var a = {
    i: 0
};
// valueOf / toString
a[Symbol.toPrimitive] = function () {
    // this->a
    return ++this.i;
};
// a[Symbol.toPrimitive]()
if (a == 1 && a == 2 && a == 3) {
    console.log('OK');
} */

/* var a = {
    i: 0,
    [Symbol.toPrimitive]() {
        return ++this.i;
    }
};
if (a == 1 && a == 2 && a == 3) {
    console.log('OK');
} */

/* var a = [1, 2, 3];
// a.shift() ->1
a.toString = a.shift;
if (a == 1 && a == 2 && a == 3) {
    console.log('OK');
} */

// 第二类：ES6 数据劫持 
/* let obj = {};
Object.defineProperty(obj, 'name', {
    // 以后当我们操作对象的name属性的时候(获取或者设置)，触发getter/setter
    get() {
        return '逗你玩';
    },
    set(value) {
        console.log(value);
    }
}); */

/* // var a = 12; //全局上下文中，基于var/function声明变量，也相当于给window设置了属性 window.a=12
var i = 0;
Object.defineProperty(window, 'a', {
    get() {
        return ++i;
    }
});
if (a == 1 && a == 2 && a == 3) {
    console.log('OK');
} */

//============JS中的数据类型转换
/*
 * 把其它的数据类型转换为number类型 
 *    例如：==比较、数学运算（+不仅仅是数学运算，还有字符串拼接）...
 * 
 * 显式转换方案：
 *    Number([val]) -> 隐式转换一般调取的都是这个方法  「浏览器有自己的特殊处理，针对于每一种情况都有详细的规则」
 *    parsetInt/parseFloat([val])
 *       parsetInt([val],[radix])处理机制
 *         [val] 必须是一个字符串，如果不是，则也要默认转换为字符串
 *         [radix]不设置(或者写的是零)：正常都是按照10处理的，如果字符串是以”0x“开始的，默认值是16...
 *       先在[val]中，找到所有符合[radix]进制的内容（从左到右查找，直到遇到不符合的为止「不论后面是否还有符合进制的，都不在查找了」），然后再把找到的内容看做[radix]进制，转换为十进制
 *       [radix]范围  2~36，除了0以外(0->10/16)，不在这个范围内，结果都是NaN
 */
// parseInt('12px') ->  parseInt('12px',10) -> 在字符串中找到所有符合10进制的内容 ‘12’ -> 最后把'12'当做看做10进制，转换为10进制 -> 12
// parseInt('12px',1) -> NaN
// console.log(parseInt(null)); //->parseInt('null',10) -> NaN  

// 把其它进制转换为10进制？
// '10101'  2机制 -> 10进制
// 1*2^0 + 0*2^1 + 1*2^2 + 0*2^3 + 1*2^4
// 4^-1 -> 1/4    4^-3 -> 1/(4^3)


// 把一个函数作为值传递给另外一个函数执行（实参）:回调函数
// parseInt(27.2,0) 
//    parseInt('27.2') -> 27
// parseInt(0,1)
//    NaN
// parseInt('0013',2)
//    '001' 看做2进制 转换为10进制
//    1*2^0 -> 1
// parseInt('14px',3)
//    '1' 看做3进制 转换为10进制
//    1*3^0 -> 1
// parseInt(123,4)
//    parseInt('123',4)
//    '123' 看做4进制 转换为10进制
//    3*4^0 + 2*4^1 + 1*4^2 -> 3+8+16 -> 27
/* let arr = [27.2, 0, '0013', '14px', 123];
arr = arr.map(parseInt);
console.log(arr); */

// 数据中有多少项，就迭代多少次，每一次执行回调函数（item当前迭代项 index索引），支持回调函数返回值，返回啥就把当前项替换成啥，原始数组不变，以新数组返回!!
/* let arrNew = arr.map(function (item, index) {
    return '@';
}); */

/*
 * 把其它数据类型转换为布尔：
 *   只有”0/NaN/null/undefined/空字符串“ 转换为false，其余都是true
 *   例如：
 *     if(1){} 
 *     ! 取反
 *     !! 转换为布尔
 *     ...
 */


/*
 * ”+“还存在字符串拼接 
 *   +两边都有值，有一边出现字符串或者对象，则为字符拼接
 *     特殊：{}+10 -> 10  {}看做代码块（ES6 块级上下文），真正运算的只有 +10 ->10
 *          ({}+10) -> '[object Object]10'
 *   +只有一边或者++x再或者x++，都是数学运算
 *     +'10' -> 10
 *     10+(++x) -> 先把x累加1，然后和10运算
 *     10+(x++) -> 先拿x的值和10运算，最后再x累加1
 *     
 *     x++ !== (x+=1 == x=x+1)
 */
/* let result = 100 + true + 21.2 + null + undefined + "Tencent" + [] + null + 9 + false;
console.log(result); */

// 10+{} -> "10[object Object]"  原本是想把{}变为数字，但是Symbol.toPrimitive/valueOf/toString，调到toString变为字符串，此时符合了有一边变为字符串了，则是字符串拼接

/* let x = '10';
console.log(++x); //->11

x = '10';
x += 1; //->x=x+1
console.log(x); //->'101' */

//=======================