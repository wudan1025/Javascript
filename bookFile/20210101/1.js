/* new Promise(resolve => {
    console.log('promise1');
    resolve();
}).then(() => {
    console.log('then11');
    // return 
    new Promise(resolve => {
        console.log('promise2');
        resolve();
    }).then(() => {
        console.log('then21');
    }).then(() => {
        console.log('then22');
    });
}).then(() => {
    console.log('then12');
}); */

// Promise.all([promise数组:{要求数组中的每一项尽可能都是promise实例}])：返回一个新的promise实例AA，AA成功还是失败，取决于数组中的每一个promise实例是成功还是失败，只要有一个是失败，AA就是失败的，只有都成功AA才是成功的
// Promise.race：最先知道状态的promise实例，是成功还是失败，决定了AA是成功还是失败

/* function fn(interval) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(interval);
        }, interval);
    });
}
let p1 = fn(3000);
let p2 = fn(1000);
let p3 = Promise.reject(0);

Promise.all([p1, p2, p3]).then(results => {
    // 不论谁先知道状态，最后结果的顺序和传递数组的顺序要保持一致
    console.log(results);
}).catch(reason => {
    // 处理过程中，遇到一个失败，则All立即为失败，结果就是当前实例失败的原因
    console.log(reason);
}); */

// 需求
//    api1 / api2 / api3 

const api1 = () => {
    return new Promise(resolve => {
        $.ajax({
            url: '/api1',
            success(result1) {
                resolve(result1);
            }
        });
    });
};
const api2 = () => {
    return new Promise(resolve => {
        $.ajax({
            url: '/api2',
            success(result2) {
                resolve(result2);
            }
        });
    });
};
const api3 = () => {
    return new Promise(resolve => {
        $.ajax({
            url: '/api3',
            success(result3) {
                resolve(result3);
            }
        });
    });
};

/* api1().then(result1 => {
    return api2();
}).then(result2 => {
    return api3();
}).then(result3 => {

});

Promise.all([api1(), api2(), api3()]).then(results => {
    
});
*/

(async function () {
    let result1 = await api1();
    let result2 = await api2();
    let result3 = await api3();
})();


// JQ:$.ajax 回调函数的方式管理异步编程
//   回调地狱
/* $.ajax({
    url: '/api1',
    success(result1) {
        $.ajax({
            url: '/api2',
            success(result2) {
                $.ajax({
                    url: '/api3',
                    success(result3) {

                    }
                });
            }
        });
    }
}); */

/* var total = 3,
    i = 0;
function complete() {
    i++;
    if(i===total){

    }
}
$.ajax({
    url: '/api1',
    success(result1) {
        complete();
    }
});
$.ajax({
    url: '/api2',
    success(result2) {
        complete();
    }
});
$.ajax({
    url: '/api3',
    success(result3) {
        complete();
    }
}); */