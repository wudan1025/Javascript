// 命名空间 现在实际用法 看PPT
// 不要在模块中使用命名空间 
var Shape;

(function (Shape) {
    var pi = Math.PI;
    function cricle(r) {
        return pi * Math.pow(r, 2);
    }
    Shape.cricle = cricle;
})(Shape || (Shape = {}));
