var cat = '有鱼';
// person 作用域是 当前 - 全局
function person() {
    console.log(cat); // 有鱼
}
function student() {
    var cat = '年年';
    person();
}
student(); // '有鱼'