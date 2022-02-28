/*
 * @LastEditors: wudan01
 * @description: 文件描述
 */

/*
// eg1
const age: any = 10;

const unknownAge: unknown = 10;

const number1: number = age;

// const number2: number = unknownAge;

const number3 = typeof unknownAge === 'number' ? unknownAge : 0;
*/

// const magicFunction = (param: any) => {
//   console.log(Math.round(param)); // number
//   console.log(param.charAt(0)); // string
//   console.log(param.push(1)); // array
// };

/*
// 同样的方法换成 unknown 会报错
// const magicFunction = (param: unknown) => {
// console.log(Math.round(param)); // number
// console.log(param.charAt(0)); // string
// console.log(param.push(1)); // array
// };
*/

// 需要加类型判断
// unknown 可以理解为更安全的 any
// 如果要对 unknown 执⾏操作，必须使⽤类型断⾔或者缩⼩到特定的类型
const magicFunction = (param: unknown) => {
  if (typeof param === 'number') {
    console.log(Math.round(param));
  } else if (typeof param === 'string') {
    console.log(param.charAt(0));
  } else if (Array.isArray(param)) {
    console.log(param.push(1));
  }
};

magicFunction([1, 2, 3]);
