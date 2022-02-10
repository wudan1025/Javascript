/*
 * EC(G) 
 *   变量提升
 *     var a;
 *     var b;
 *     var c;
 *     fn = 0x0001; [[scope]]:EC(G)
 */
console.log(a, b, c); //undefined*3
var a = 12,
    b = 13,
    c = 14;

function fn(a) {
    /*
     * EC(FN)
     *   作用域链:<EC(FN),EC(G)>
     *   形参赋值:a=10
     *   变量提升:--
     */
    console.log(a, b, c); //10 13 14
    a = 100; //私有
    c = 200; //全局
    console.log(a, b, c); //100 13 200
}
b = fn(10);
console.log(a, b, c); //12 undefined 200


/*
 * EC(G) 
 *   变量提升
 *    var a;
 *    var obj;
 *    fn = 0x0001; [[scope]]:EC(G)
 */
var a = 1;
var obj = { //-> obj=0x0002
    name: "tom" //'jack'
};

function fn() {
    /*
     * EC(FN)
     *   作用域链:<EC(FN),EC(G)>
     *   形参赋值:--
     *   变量提升:var a2;
     */
    var a2 = a; //私有的a2=1
    // console.log(obj2); //Error:obj2 is not defined
    obj2 = obj; //window.obj2=0x0002
    a2 = a; //私有的a2=1
    obj2.name = "jack";
}
fn();
console.log(a); //1
console.log(obj); //{name:'jack'}


/*
 * EC(G) 
 *   变量提升
 *    var a;
 *    fn = 0x0001; [[scope]]:EC(G)
 */
var a = 1;

function fn(a) {
    /*
     * EC(FN)
     *   作用域链:<EC(FN),EC(G)>
     *   形参赋值:a=1
     *   变量提升:
     *     var a;
     *     function a -> 声明(不需要重复声明)+定义 -> 0x0002
     */
    console.log(a); //=>函数
    var a = 2; //私有a=2
    function a() {}
}
fn(a); //fn(1)


/*
 * EC(G) 
 *   变量提升
 *    var a;
 *    fn = 0x0001; [[scope]]:EC(G)
 */
console.log(a); //undefined
var a = 12;

function fn() {
    /*
     * EC(FN)
     *   作用域链:<EC(FN),EC(G)>
     *   形参赋值:--
     *   变量提升:
     *     var a;
     */
    console.log(a); //undefined
    var a = 13;
}
fn();
console.log(a); //12


/*
 * EC(G) 
 *   变量提升
 *    var a;
 *    fn = 0x0001; [[scope]]:EC(G)
 */
console.log(a); //undefined
var a = 12;

function fn() {
    /*
     * EC(FN)
     *   作用域链:<EC(FN),EC(G)>
     *   形参赋值:--
     *   变量提升:--
     */
    console.log(a); //12
    a = 13;
}
fn();
console.log(a); //13


/*
 * EC(G) 
 *   变量提升
 *    fn = 0x0001; [[scope]]:EC(G)
 */
console.log(a); //报错
a = 12;

function fn() {
    console.log(a);
    a = 13;
}
fn();
console.log(a);



/*
 * EC(G) 
 *   变量提升
 *     var foo;
 */
var foo = 'hello';
(function (foo) { //自执行函数执行：创建函数 [[scope]]:EC(G)、把函数执行
    /*
     * EC(FOO)
     *   作用域链:<EC(FOO),EC(G)>
     *   形参赋值:foo='hello'
     *   变量提升:var foo;
     */
    console.log(foo); //->'hello'
    var foo = foo || 'world';
    console.log(foo); //->'hello'
})(foo); //'hello'
console.log(foo); //->'hello'

/* // ||逻辑或  A||B  首先隐式把A转换为布尔看真假，如果A是真，返回A的值，否则返回B的值
// &&逻辑与  A&&B  如果A是真，返回B的值，否则返回A的值
// 同时出现，&&优先级要高于||
// function fn(x=0){}  ES6形参赋值默认值「这就是一个坑」
function fn(x,callback) {
    // x如果不传递，默认值为0
    if (typeof x === "undefined") {
        x = 0;
    }
    x = x || 0; //不严谨，它是x只要是假，不一定是没传「但是可以这样玩」

    typeof callback==="function"?callback():null;
    callback && callback();
}
fn(10,function(){}); */