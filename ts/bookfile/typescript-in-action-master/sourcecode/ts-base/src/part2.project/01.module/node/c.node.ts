let c1 = require('./a.node')
let c2 = require('./b.node')
let c3 = require('../es6/a')
// 兼容写法？
import c4 = require('../es6/d')

console.log(c1)
console.log(c2)
// c3()
// console.log(c3)
// c3.default()
c4()
