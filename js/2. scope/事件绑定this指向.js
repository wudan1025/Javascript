// 事件绑定中 回调函数的 this
const load = document.getElementById('load');
load.addEventListener('click', () => {
    // 与外层this相同，为window
    // 严格/非严格模式下 都是 window
    console.log(this)
});

// c 小写
load.onclick = function () {
    // 指向当前元素
    console.log(this)
}

load.addEventListener('click', function () {
    // 指向当前元素
    console.log(this)
});

// IE 678 特殊
load.attachEvent('click', function () {
    // 指向window
    console.log(this)
});