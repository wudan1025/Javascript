/*
 * 生成器对象是由一个generator function返回的,并且它符合可迭代协议和迭代器协议
 *   https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Generator
 * 
 * 普通函数 VS 生成器函数
 *    生成器函数 [[IsGenerator]]:true
 *    
 *   「把它当做一个实例 __proto__」
 *       普通函数是 Function 的实例，普通函数.__proto__===Function.prototype
 *       生成器函数是 GeneratorFunction 的实例，生成器函数.__proto__===GeneratorFunction.prototype -> 
 *                  GeneratorFunction.prototype.__proto__===Function.prototype
 *      ({}).toString.call(生成器函数) => "[object GeneratorFunction]"
 *    
 *   「把它作为一个构造函数 prototype」
 *      生成器函数不能被new执行  Uncaught TypeError: func is not a constructor
 *      当做普通函数执行，返回的结果就是生成器函数的一个实例
 *      itor.__proto__ -> func.prototype「空对象，没有constructor」 -> Generator.prototype「constructor:GeneratorFunction」{next/return/throw/Symbol(Symbol.toStringTag): "Generator"} -> 一个具备迭代器规范的对象「Symbol(Symbol.iterator)」 -> Object.prototype
 */

/* function* func() {
    console.log(1);
    return 2;
}
let itor = func();
console.log(itor.next()); //->{done:true,value:2}
console.log(itor.next()); //->{done:true,value:undefined} */

// 每一次执行next，遇到yield会暂停函数的执行
//   + done
//   + value -> yield后面的值
/* function* func() {
    console.log('A');
    yield 1;

    console.log('B');
    yield 2;

    console.log('C');
    yield 3;

    console.log('D');
    return 4;
}
let itor = func(); */

/* console.log(itor.next()); //->{done:false,value:1}
console.log(itor.next()); //->{done:false,value:2}
console.log(itor.next()); //->{done:false,value:3}
console.log(itor.next()); //->{done:true,value:4}
console.log(itor.next()); //->{done:true,value:undefined} */

/* console.log(itor.next()); //->{done:false,value:1}
console.log(itor.next()); //->{done:false,value:2}
console.log(itor.return(10)); //->{done:true,value:10}  把生成器内部的执行直接停止，让done变为true「throw直接抛异常，下面代码都不执行了」
console.log(itor.next()); //->{done:true,value:undefined}
console.log(itor.next()); //->{done:true,value:undefined} */


// 执行next还可以传递值「第一次没必要，其余每次传递的值，都是给上一次yield的处理结果」
// 生成器函数中的this不是其实例，而是window/undefined
/* function* func() {
    let x1 = yield 1;
    console.log(x1);

    let x2 = yield 2;
    console.log(x2);
}
let itor = func();
console.log(itor.next()); //->{done:false,value:1}
console.log(itor.next(10)); //->{done:false,value:2}
console.log(itor.next(20)); //->{done:true,value:undefined} */

/* function* func1() {
    yield 1;
    yield 2;
}

function* func2() {
    yield 3;
    yield* func1();
    yield 4;
}
let itor = func2();
console.log(itor.next()); //->{done:false,value:3}
console.log(itor.next()); //->{done:false,value:1}
console.log(itor.next()); //->{done:false,value:2}
console.log(itor.next()); //->{done:false,value:4} */




//==============
const query = interval => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(interval);
        }, interval);
    });
};

/* query(1000).then(res1 => {
    return query(2000);
}).then(res2 => {
    return query(3000);
}).then(res3 => {
    console.log(res3);
}); */

/* (async () => {
    let res1 = await query(1000);
    console.log(res1);

    let res2 = await query(2000);
    console.log(res2);

    let res3 = await query(3000);
    console.log(res3);
})(); */


var isPromise = function isPromise(x) {
    if (x == null) return false;
    if (/^(object|function)$/i.test(typeof x)) {
        if (typeof x.then === "function") {
            return true;
        }
    }
    return false;
};
// async await处理的事情：构建generator执行器
function AsyncFunction(generator) {
    return new Promise(resolve => {
        let itor = generator();
        const next = x => {
            let {
                value,
                done
            } = itor.next(x);
            if (done) {
                resolve(value);
                return;
            }
            if (!isPromise(value)) value = Promise.resolve(value);
            value.then(next).catch(reason => {
                // 如果返回的实例是失败态，则抛出异常信息
                itor.throw(reason);
            });
        };
        next();
    });
}
AsyncFunction(function* () {
    try {
        let res1 = yield query(1000);
        console.log(res1);

        let res2 = yield Promise.reject('NO');
        console.log(res2);

        let res3 = yield query(3000);
        console.log(res3);
    } catch (err) {
        console.log(err);
    }
    return 'ok';
}).then(result => {
    console.log('generator都执行完', result);
});

/* function* gen() {
    let res1 = yield query(1000);
    console.log(res1);

    let res2 = yield query(2000);
    console.log(res2);

    let res3 = yield query(3000);
    console.log(res3);
}
let itor = gen();
// console.log(itor.next()); //->{done:false,value:promise实例}
itor.next().value.then(res1 => {
    // res1->第一个请求的结果
    itor.next(res1).value.then(res2 => {
        // res2->第二个请求的结果
        itor.next(res2).value.then(res3 => {
            // res3->第二个请求的结果
            itor.next(res3); //->此时{done:true,value:undefined}
        });
    });
}); */