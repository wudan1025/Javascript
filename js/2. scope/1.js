// var a = { n: 12 };
// var b = a;
// b = { n: 13 };
// console.log(a.n); // 12

// todo 错误
// var a = { n: 1 };
// var b = a;
// a.x = a = { n: 2 };
// console.log(a.x); // {n:2}
// console.log(b); // {n:1}

// todo 错误
var x = [12, 23];
function fn(y) {
  y[0] = 100;
  y = [100];
  y[1] = 200;
  console.log(y); // [100,200]
}
fn(x);
console.log(x); // [100,200]
