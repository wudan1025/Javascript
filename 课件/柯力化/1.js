// add(2)(3)(4) => 9
// add(2, 3)(4)  => 9
// add(2, 3, 4)=> 9

// 开始 5:25 结束 5:35

function add(...arg1) {
    let result = 0
    return function (...arg2) {
        console.log(arg2)
        // arg2.forEach((item) => {
        //     result += item
        // })
        result = arg2.reduce((total, item) => {
            return total + item
        })
        arg1.forEach((item) => {
            result += item
        })
        // console.log(result)
        return result
    }
}

console.log(add(2, 3)(4))

// const fn = (...params) => {
//     // 闭包:params -> [1,2]
//     return (...args) => {
//         return params.concat(args).reduce((total, item) => {
//             return total + item;
//         });
//     };
// };
// fn(1, 2)(3);