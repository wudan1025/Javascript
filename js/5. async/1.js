/*
setTimeout(() => {
  console.log(1);
}, 20);
console.log(2);
setTimeout(() => {
  console.log(3);
}, 10);
console.log(4);
console.time('AA');
for (let i = 0; i < 90000000; i++) {
  // do soming
}
console.timeEnd('AA'); //=>AA: 79ms 左右
console.log(5);
setTimeout(() => {
  console.log(6);
}, 8);
console.log(7);
setTimeout(() => {
  console.log(8);
}, 15);
console.log(9);
*/

/*
async function async1() {
  console.log('async1 start');
  await async2();
  console.log('async1 end');
}
async function async2() {
  console.log('async2');
}
console.log('script start');
setTimeout(function () {
  console.log('setTimeout');
}, 0);
async1();
new Promise(function (resolve) {
  console.log('promise1');
  resolve();
}).then(function () {
  console.log('promise2');
});
console.log('script end');
*/

/*
let body = document.body;
body.addEventListener('click', function () {
  Promise.resolve().then(() => {
    console.log(1);
  });
  console.log(2);
});
body.addEventListener('click', function () {
  Promise.resolve().then(() => {
    console.log(3);
  });
  console.log(4);
});*/

/*
console.log('start');
let intervalId;
Promise.resolve()
  .then(() => {
    console.log('p1');
  })
  .then(() => {
    console.log('p2');
  });
setTimeout(() => {
  Promise.resolve()
    .then(() => {
      console.log('p3');
    })
    .then(() => {
      console.log('p4');
    });
  intervalId = setInterval(() => {
    console.log('interval');
  }, 3000);
  console.log('timeout1');
}, 0);
*/

/*
setTimeout(() => {
  console.log('a');
});
Promise.resolve()
  .then(() => {
    console.log('b');
  })
  .then(() => {
    return Promise.resolve('c').then((data) => {
      setTimeout(() => {
        console.log('d');
      });
      console.log('f');
      return data;
    });
  })
  .then((data) => {
    console.log(data);
  });
*/

/*
function func1() {
  console.log('func1 start');
  return new Promise((resolve) => {
    resolve('OK');
  });
}
function func2() {
  console.log('func2 start');
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('OK');
    }, 10);
  });
}
console.log(1);
setTimeout(async () => {
  console.log(2);
  await func1();
  console.log(3);
}, 20);
for (let i = 0; i < 90000000; i++) {} //循环大约要进行80MS左右
console.log(4);
func1().then((result) => {
  console.log(5);
});
func2().then((result) => {
  console.log(6);
});
setTimeout(() => {
  console.log(7);
}, 0);
console.log(8);
*/

/*
new Promise((resolve) => {
  console.log('promise1');
  resolve();
})
  .then(() => {
    console.log('then11');
    // return
    new Promise((resolve) => {
      console.log('promise2');
      resolve();
    })
      .then(() => {
        console.log('then21');
      })
      .then(() => {
        console.log('then22');
      });
  })
  .then(() => {
    console.log('then12');
  }); 
  */

/*
async function fn() {
  return 10;
}
console.log(fn());
*/

/*
function api(interval) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // resolve(interval);
      reject();
    }, interval);
  });
}

async function func() {
  let result1 = await api(1000);
  console.log(result1);
  let result2 = await api(3000);
  console.log(result2);
}

func();
*/

