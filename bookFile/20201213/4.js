/* 
    在函数式编程当中有一个很重要的概念就是函数组合， 实际上就是把处理数据的函数像管道一样连接起来， 然后让数据穿过管道得到最终的结果。 例如：
    const add1 = (x) => x + 1;
    const mul3 = (x) => x * 3;
    const div2 = (x) => x / 2;
    div2(mul3(add1(add1(0)))); //=>3
​
    而这样的写法可读性明显太差了，我们可以构建一个compose函数，它接受任意多个函数作为参数（这些函数都只接受一个参数），然后compose返回的也是一个函数，达到以下的效果：
    const operate = compose(div2, mul3, add1, add1)
    operate(0) //=>相当于div2(mul3(add1(add1(0)))) 
    operate(2) //=>相当于div2(mul3(add1(add1(2))))
​
    简而言之：compose可以把类似于f(g(h(x)))这种写法简化成compose(f, g, h)(x)，请你完成 compose函数的编写 
*/
const add1 = x => x + 1;
const mul3 = x => x * 3;
const div2 = x => x / 2;
console.log(div2(mul3(add1(add1(0))))); //=>3

/* const compose = (...funcs) => {
    // funcs：未来需要执行的函数集合「执行顺序是从后到前」

    return x => {
        // x是执行第一个函数的初始实参值
        let len = funcs.length;
        if (len === 0) return x;
        if (len === 1) return funcs[0](x);
        // funcs -> [div2, mul3, add1, add1]
        return funcs.reduceRight((result, func) => {
            return func(result);
        }, x);
    };
}; */

function compose(...funcs) {
    if (funcs.length === 0) {
        return arg => {
            return arg;
        };
    }
    if (funcs.length === 1) {
        return funcs[0];
    }

    // funcs -> [div2, mul3, add1, add1]
    return funcs.reduce((a, b) => {
        // 1  a->div2  b->mul3
        // 2  a->x1(return div2(mul3(x)))  b->add1
        // 3  a->x2(return x1(add1(x))) b->add1
        // 4  a->x3(return x2(add1(x))) b->undefined 
        return x => {
            return a(b(x));
        };
    });
}

const operate = compose(div2, mul3, add1, add1);
console.log(operate(0));

// operate(0)=>x3{return x2(add1(x))}
//   + add1(0) 1
//   + x2(1) => x2{return x1(add1(x))}
//     + add1(1) 2
//     + x1(2) => x1{return div2(mul3(x))}
//        + mul3(2) 6
//        + div2(6) 3
// div2(mul3(add1(add1(x))))