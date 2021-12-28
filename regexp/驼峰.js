var str = 'xue-er-si-wang-xiao'
// 方法1
// str = str.replace(/-([a-zA-Z])/g, function (value, $1) {
//     console.log($1)
//     return $1.toUpperCase()
// })

// console.log(str)

// 方法2
var reg = /([a-z]+)/g
str = str.replace(reg, function (big, $1) {
    return $1[0].toUpperCase() + $1.slice(1,)
})

str = str.replace(/-/g, '')

console.log(str)
