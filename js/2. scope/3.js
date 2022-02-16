/*
 * @LastEditors: wudan01
 * @description: 文件描述
 */

// reduce
// var arr = [2, 4, 8];
// var result = arr.reduce((result, item, index) => {
//   console.log('---');
//   console.log('result' + result);
//   console.log('item' + item);
//   console.log('index' + index);
//   console.log('---');
//   return result + item;
// },1);

// console.log(result);

// reduceRight;  从右向左
// var arr = [2, 4, 8];
// var result = arr.reduceRight((result, item, index) => {
//   console.log('---');
//   console.log('result' + result);
//   console.log('item' + item);
//   console.log('index' + index);
//   console.log('---');
//   return result + item;
// }, 1);

// console.log(result);

Array.prototype.reduce = function (cb, init) {
  if (typeof cb != 'function') {
    throw new Error('第一个参数必须是function');
    // return;
  }

  var len = this.length,
    nextResult = arr[0],
    i = 1;

  if (init != undefined) {
    i = 0;
    nextResult = init;
  }

  for (; i < len; i++) {
    nextResult = cb(nextResult, arr[i], i, this);
  }
  return nextResult;
};

Array.prototype.reduceRight = function reduceRight(callback, initial) {
  let self = this;
  self = self.reverse();
  return self.reduce(callback, initial);
};

var arr = [2, 4, 8];
var result = arr.reduce((result, item, index) => {
  console.log('---');
  console.log('result' + result);
  console.log('item' + item);
  console.log('index' + index);
  console.log('---');
  return result + item;
}, 3);

console.log(result);
