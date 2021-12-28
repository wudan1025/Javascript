// 找出出现次数最多的字符串

// 方法1 字符串循环分割

// var str = 'sdsfeifnsdlkfogqpwmsmdn'
// var obj = {};

// // 找出每个字符串出现的次数
// [].forEach.call(str, char => {
//     if (typeof obj[char] != "undefined") {
//         obj[char]++;
//         return;
//     }
//     obj[char] = 1
// })

// let max = 1, res = []

// // 找出出现次数最多的字符
// for (let key in obj) {
//     let item = obj[key]
//     item > max ? max = item : null
// }

// // 找出出现的最大值
// for (let key in obj) {
//     let item = obj[key]
//     if (item == max) {
//         res.push(key)
//     }
// }

// console.log(`出现次数最多的字符串是 ${res}, 出现了${max}次`)


// 方法2 正则
// var str = 'sdsfeifnsdlkfogqpwmsmdn'

// dddefffgiklmmnnopqssssw
// str = str.split('').sort((a, b) => a.localeCompare(b)).join('')
// // \1 
// let reg = /([a-zA-Z])\1+/g

// 匹配出相同的字符串
// var result = str.match(reg)

// console.log(`正则匹配后结果${result}`) // [ 'ddd', 'fff', 'mm', 'nn', 'ssss' ]

// result = result.sort(function (a, b) {
//     return b.length - a.length // 降序
// })

// // 排序后结果ssss,ddd,fff,mm,nn
// console.log(`排序后结果${result}`)


// // 字符串中出现最多的字符串是s,出现了4次 
// console.log(`字符串中出现最多的字符串是${result[0].charAt(0)},出现了${result[0].length}次`)

// 方法3
// var str = 'sdsfeifnsdlkfogqpwmsmdn'
// str = str.split('').sort((a, b) => (a.localeCompare(b))).join('')
// var max = 0, res = [], flag = false
// console.log(str)

// for (let i = str.length - 1; i > 0; i--) {
//     var reg = new RegExp(`([a-zA-Z])\\1{${i - 1}}`, "g")

//     // 方案1
//     var result = reg.exec(str)
//     if (result) {
//         res.push(result[0].charAt(0))
//         max = result[0].length
//         flag = true
//     }

//     // 方案2
//     // i 从大到小，匹配出第一个就是 最长的字符串
//     // str.replace(reg, (content, $1) => {
//     //     // content 
//     //     console.log($1)
//     //     res.push($1)
//     //     max = i
//     //     flag = true
//     // })

//     if (flag) break
// }

// console.log(`出现次数最多的字符串是 ${res}, 出现了${max}次`)