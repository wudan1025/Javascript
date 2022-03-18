/*
 * @LastEditors: wudan01
 * @description: 文件描述
 */
/*
类库：全局类库，模块类库，umd类库
// todo umd 类库？支持 import 也支持<Script> 导入？？
// tod  umd 是如何导出的

查询 types 网站 https://definitelytyped.org/
看jquery d.ts 文件
*/
import $ from 'jquery';

$('.app').css('color', 'red');

globalLib({ x: 1 });
globalLib.doSomething();

import moduleLib from './module-lib';
moduleLib({ y: 2 });
moduleLib.doSomething();

// 引入umd
import umdLib from './umd-lib';
umdLib.doSomething();

// 模块插件
import m from 'moment';
// 给外部类库添加定义
// declare module 'moment' {
//   export function myFunction(): void;
// }
m.myFunction = () => {};

// 全局插件
// 给全局类库添加定义
declare global {
  namespace globalLib {
    function doAnyting(): void;
  }
}
globalLib.doAnyting = () => {};
