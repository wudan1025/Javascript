// 实现比set 取值更方便的结合,使用方法重载实现remove
// 根据 id 删除元素,remove 返回数字
// todo 如何获取到 key 一样的对象？
// 根据 对象 删除，remove 返回删除的对象
var ArrayList = /** @class */ (function () {
    function ArrayList(elements) {
        this.elements = elements;
    }
    // 根据索引查询数组中指定元素
    ArrayList.prototype.get = function (index) {
        return this.elements[index];
    };
    // 输出
    ArrayList.prototype.show = function () {
        this.elements.forEach(function (ele) {
            console.log(ele);
        });
    };
    // 报错todo 
    // remove(value: number | object): (number | object){
    ArrayList.prototype.remove = function (value) {
        debugger
        if (typeof value == 'number') {
            // this.get(value)
            this.elements.splice(value, 1);
            return value;
        }
        else if (typeof value == 'object') {
            var result_1 = null;
            this.elements.forEach(function (el, index) {
                if (el == value) {
                    debugger
                    result_1 = index;
                }
            });
            var delel = this.elements.splice(result_1, 1);
            return delel;
        }
    };
    return ArrayList;
}());
var a = new ArrayList([{
    a: 1
}, {
    b: 2
}, {
    c: 3
}]);
a.remove(1);
a.remove(a.get(0));
console.log(a);
