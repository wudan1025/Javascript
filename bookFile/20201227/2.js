/* 
// 1.向jQuery的prototype和对象上扩展属性和方法
$.extend({ //给jQuery对象扩展xxx属性方法 -> $.xxx() -> 完善类库
    xxx() {}
});
$.fn.extend({ //给jQuery.prototype扩展xxx方法 -> $().xxx() -> JQ插件编写
    xxx() {}
}); 

$.fn.extend({
    buttonClick() {
        // this -> JQ实例
        let $self = this;
        $self.click(function () {
            $self.css('background', 'lightblue');

            let text = $self.html();
            $self.html(text + text);
        });
    }
});
let $btn1 = $('#btn1'),
    $btn2 = $('#btn2');
$btn1.buttonClick();
$btn2.buttonClick(); 
*/

/*
 * 2. 实现对象和对象之间的比较和合并「深合并、浅合并」
 */
/* let obj1 = {
    name: 'zhufeng',
    age: 12,
    headers: {
        token: 'javascript',
        x: 200,
        y: {
            n: 10
        }
    }
};
let obj2 = {
    name: 'zhouxiaotian',
    headers: {
        token: 'good good study',
        score: 100,
        y: {
            m: 20
        }
    },
    height: 180
};
let obj3 = {
    age: 18,
    height: 190,
    weight: '60KG',
    headers: {
        name: '哇咔咔'
    }
};

let obj = _.merge(true, obj1, obj2, obj3);
console.log(obj === obj1, obj); */

// let obj = $.extend(true, obj1, obj2);
// console.log(obj === obj1, obj);

// console.log($.extend(obj1, obj2, obj3));
// console.log($.extend({}, obj1, obj2, obj3));

// 浅合并，等价于Object.assign
// let obj = $.extend(obj1, obj2);
// console.log(obj === obj1, obj);

// 基于浅比较的合并：只比较第一级结构，从而进行合并「浅合并」
// let obj = Object.assign(obj1, obj2);
// console.log(obj === obj1, obj);


let obj = {
    x: 100,
    y: 200,
    score: [100, 200],
    detai: {
        english: 100,
        math: 200,
        total: {
            1: 100,
            2: 200
        }
    },
    queryDetail: function () {
        console.log(this.detai);
    },
    reg: /^\d+$/,
    time: new Date,
    pai: null,
    zou: undefined,
    xxx: new Error()
};
obj.obj = obj;

// 数组和对象的深拷贝 : JSON.stringify / JSON.parse -> 在parse的时候，浏览器会重新开辟所有需要的内存空间
//   + 在JSON.stringify变为字符串的时候，很多类型的属性值都会有问题
//     + 正则/Error->{}
//     + 日期->字符串
//     + undefined/function/symbol->丢了
//     + bigint->直接报错

let copy = _.clone(true, obj);




//-----------下面所有的方法都是浅拷贝
// 1.最low
// let copy = {};
// _.each(obj, (value, key) => copy[key] = value);

// 2.基于ES6
// let copy = {
//     ...obj
// };
// let copy = Object.assign({}, obj);

// 3.数组中的拷贝，方法更多
// let arr = [10, 20];
// let copy = [...arr];
// copy = arr.slice(0);