<!--
 * @LastEditors: wudan01
 * @description: 文件描述
-->

# 1. never
> 永远不会出现的类型

> 出现在 错误路径 的错误提示 / 死循环 等错误提示场景
```
var strOrNum: string | number = 'foo';

if (typeof strOrNum === 'string') {
  console.log('str!');
} else if (typeof strOrNum === 'number') {
  console.log('num!');
} else {
  const _exhaustiveCheck: never = strOrNum;
  throw new Error(`Unknown input type: ${_exhaustiveCheck}`);
}
```