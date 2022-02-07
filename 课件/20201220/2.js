/*
 * 函数的多种角色
 *   + 函数
 *     + 普通函数「闭包作用域」
 *     + 构造函数「类、实例」
 *     + 生成器函数
 *   + 对象
 */
function Foo() {
    getName = function () {
        console.log(1);
    };
    return this;
}
Foo.getName = function () {
    console.log(2);
};
Foo.prototype.getName = function () {
    console.log(3);
};
var getName = function () {
    console.log(4);
};
function getName() {
    console.log(5);
}
Foo.getName();
getName();
Foo().getName();
getName();
new Foo.getName();
new Foo().getName();
new new Foo().getName();