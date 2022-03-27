/**
 索引类型
 */
var obj = {
    a: 1,
    b: 2,
    c: 3
};
// 改造前
// function getValues(obj: any, keys: string[]) {
//     return keys.map(key => obj[key])
// }
// todo 思考
// 改造后  T 约束 obj, K 约束 keys
// K 增加约束，继承 obj 所有属性的联合类型
function getValues(obj, keys) {
    return keys.map(function (key) { return obj[key]; });
}
console.log(getValues(obj, ['a', 'b']));
var key;
console.log(key);
// T[K] 索引访问操作符
var value;
// 泛型约束
// T extends U
