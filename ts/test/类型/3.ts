/*
 * @LastEditors: wudan01
 * @description: 文件描述
 */
// 测试 const
// 和 readonly 是否完全一致

//const arr=[10,30,40,"abc"]
//arr=[100,30,40,"abc"]
//arr[0]=100

const arr = [10, 30, 40, 'abc'] as const;
// arr = [100, 30, 40, "abc"]
// arr[0] = 100; //错误 无法分配到 "数组的索引为0位置的元素" ，因为它是只读属性

const brr: readonly [10, 30, 40, 'abc'] = [10, 30, 40, 'abc'];

// 报错 仅允许对数组和元组文本类型使用 "readonly" 类型修饰符。
// TODO 原因
// const crr: readonly Array<string | number> = [10, 30, 40, 'abc'];

// brr[0] = 100;

function showArr(arr: readonly any[]) {
  //类型“readonly any[]”中的索引签名仅允许读取。
  //arr[0] = 100;
  console.log(arr);
}

showArr(arr);
