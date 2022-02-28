/*
 * @LastEditors: wudan01
 * @description: 文件描述
 */
// never 用于永远不会出现的场景
// 收窄的过程
var strOrNum = 'foo';
if (typeof strOrNum === 'string') {
    console.log('str!');
}
else if (typeof strOrNum === 'number') {
    console.log('num!');
}
else {
    var _exhaustiveCheck = strOrNum;
    throw new Error("Unknown input type: ".concat(_exhaustiveCheck));
}
