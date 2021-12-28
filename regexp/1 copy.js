var str = 'good good study, day day up!'


// 方案1
// var reg = /([a-z]+)/g
// // 函数被执行6次
// str = str.replace(reg, function (big, $1) {
//     return $1[0].toUpperCase() + $1.slice(1,)
// })

// // 结果
// console.log(str) // Good Good Study, Day Day Up!


// 方案2
// var reg = /\b([a-zA-Z])[a-zA-Z]*\b/g
// str = str.replace(reg, function (big, $1) {
//     return $1.toUpperCase() + big.substring(1)
// })

// console.log(str)


// 方案3
var reg = /\s([a-z]+)/g
str = str.replace(reg, function (big, $1) {
    return ' ' + $1[0].toUpperCase() + $1.slice(1,)
})
str = str.charAt(0).toUpperCase() + str.slice(1,)
console.log(str)