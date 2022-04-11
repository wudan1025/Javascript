/*
 * @LastEditors: wudan01
 * @description: 文件描述
 */
// let obj = { username: "wangwu", age: 23 }
// 改为 var usernamr:readony = "username" 是否可行
// const username = "username"
// obj[username]
var obj = { username: 'wangwu', age: 23 };
var username = 'username';
// 解决办法1
// let result = (obj as any)[username];
// todo 解决办法2 obj 使用类型限制确定有  这个方法
var result2 = obj[username];
