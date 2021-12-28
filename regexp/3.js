// window.location.search.substring(1);
let query =
    'fileJson=https://mv.xesimg.com/XESlides/slidev2/slide_172077/1623135301208.json&env=3&startPage=62#thisishash';

/*
// 方法1
// 相同
// let reg = /([a-zA-Z0-9:/._]+)=([a-zA-Z0-9:/._]+)&?/g;
let reg = /([\w:/._]+)=([\w:/._]+)&?/g;

let result = [];
query = query.replace(reg, function ($0, $1, $2) {
result.push({
    [$1]: $2,
});
return $0;
});

console.log(result);
console.log(query);
*/


// /*
// 方法二
let result = {}
let reg = /([^?=&#]+)=([^?=&#]+)/g;
query.replace(reg, ($0, $1, $2) => {
    result[$1] = $2

})

let hashReg = /#([^?=&#]+)/g
query.replace(hashReg, ($0, $1) => {
    console.log($0);
    console.log($1);
    result.hash = $1 ? $1 : null;
})

console.log(result)
//  */