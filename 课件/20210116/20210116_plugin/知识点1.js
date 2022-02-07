// 函数传参方案：
//  1.一个个的传递和接受（形参和实参）
//    约束：传递值的顺序和必传，如果某些值不传「尤其是开头或者中间的」，想为其设置默认值，并且把传递的值顺移到下一个形参，处理起来很麻烦，有些时候还是实现不了的
//    最好：每一个都传递，而且顺序是严格保证的
//    三个及以上参数这样处理就非常麻烦了，两个及以内参数的处理，是可以这样搞的！！
/* function fn(x, y) {
    // x:数字
    // y:布尔
    if (typeof x === "boolean") {
        y = x;
    }
    typeof x !== "number" ? x = 0 : null;
    typeof y !== "boolean" ? y = false : null;
}
fn(true);
fn(10);
fn();
fn(10, true); */

/* function fn(x, y, z) {
    if (typeof x === "boolean") {
        y = x;
        x = 0;
    }
    if (typeof x === "string") {
        z = x;
        x = 0;
        y = false;
    }
    if (typeof y === "string") {
        z = y;
        y = false;
    }
    if (typeof z === "undefined") {
        z = '';
    }
    if (typeof x === "undefined") {
        x = 0;
    }
    if (typeof y === "undefined") {
        y = false;
    }
}
fn(10, true, 'zhufeng');
fn(true, 'zhufeng');
fn('zhufeng');
fn(10, 'zhufeng');
fn(10, true);
fn(); */

// 2.传递多个参数的处理 「基于配置对象的方式处理」
//   优势：无需考虑传递的顺序，而且对于不传递的项，设置默认值也非常的方便
function fn(options) {
    options == null ? options = {} : null;
    typeof options !== "object" ? options = {} : null;
    // 传递的以自己传递的为主，不传递的走默认值
    /* let {
        x = 0,
            y = 0,
            z = 0,
            n = 0,
            m = 0
    } = options; */

    /* let defaults = {
        x: 0,
        y: 0,
        z: 0,
        n: 0,
        m: 0
    };
    defaults = Object.assign(defaults, options); */
}
fn();
fn({
    n: 100,
    x: 100,
});