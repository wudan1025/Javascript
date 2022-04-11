"use strict";
exports.__esModule = true;
/*
 * @LastEditors: wudan01
 * @description: 文件描述
 */
//13-4 any 和 unknown 的两个区别
var price = 'abc';
var total = price;
var stuObj = { username: 'wangwu', age: 23 };
// any 可以任意加 所有属性
stuObj.username = 123;
var stuName = { username: 'wangwu', age: 23 };
