/*
 * @LastEditors: wudan01
 * @description: 文件描述
 */
let str = `"<div style="width: 100%;height: 100%;opacity:1.0;border-width:0;border-color:#5E5E5E;border-style:solid;border-radius:0px 0px 0px 0px;overflow: hidden;background-color: rgba(0,0,0,0);position: absolute;box-shadow: 0 0 0 rgb(94,94,94);">
      <img style="width:426.68868998678687px;height:568.1809954751131px;position:absolute;left:0px;top:-241.18099547511315px;clip-path:url(#clippath_pic_fd4803ee9e036ff817220828eb0e434b);" src="https://kjds-cdn.speiyou.com/resource/1786406645384e87b3d986170266a9fe/img/C01B5A442F5032F94205815871C0A0D3.png">
      <p style="display:none;position:fixed;bottom:0;top:auto;width:100%;height:48px;background:rgba(0,0,0,0.7);line-height:48px;text-align:center;text-overflow:ellipsis;overflow:hidden;white-space:nowrap;font-size:26px;font-family:Arial,Microsoft YaHei;color:#fff;"></p>
      <svg style="width:100%;height:100%">
    
    <clipPath
      id=clippath_pic_fd4803ee9e036ff817220828eb0e434b  
      style="transform: translate(0px, 241.18099547511315px);display:none;" 
    >
      <defs></defs><ellipse cx="166" cy="163.5" rx="165.5" ry="163" fill="none" stroke="#d8d8d8" style="stroke-dasharray: none; stroke-width: 1;"></ellipse>
    </clipPath>
  
  </svg>
      </div>"`;

// let reg = /<clipPath([.|\s|\n]*)>/g;
// 正确2
let reg = /<clipPath(?:.|\n)+?style=((?:.|\n)+?)>/g;
// /<clipPath(?:[\s|,|\n|.|\w|=|"|'|:|(|)|,|;]*)>/g;
// 正确1
// /<clipPath(?:[\s|\w|=|"|'|:|(|)|,|\n]*)style=([\s|.|\w|=|"|'|:|(|)|,|;]*)>/g;
// /<clipPath[.|\n|\s]*style=([\s|.|\w|=|"|'|:|(|)|,|;]*)>/;
// /<clipPath(?:.|\n|\s)*style(.|\s)+?>/;
// 死循环？？？
// /<clipPath(?:.|\n|\s)*style=([\s|.|\w|=|"|'|:|(|)|,|;]*)>/;
console.log(reg.test(str));
str = str.replace(reg, function ($0, $1) {
  let result = $0.replace($1, function ($0) {
    // 非分号没生效 todo?
    // let reg = /(transform:(.|[^;])*)/g;
    // todo 如何让 . 在 [] 中也可以保持特殊含义？
    let reg = /(transform[\s|.|\w|=|:|(|)|,]*)/g;
    console.log(reg.test($0));
    let result = $0.replace(reg, function ($0, $1, $2, $3) {
      console.log($0);
      console.log($1);
      console.log($2);
      console.log($3);
      return '';
    });
    // console.log(result);
    return result;
  });
  return result;
});

console.log(str);

/*
str = str.replace(reg, function ($0, $1) {
  let result = $0.replace($1, function ($0) {
    let reg = /(transform:[\s|.|\w|=|:|(|)|,]*)/g;
    let result = $0.replace(reg, function ($0, $1, $2) {
      return '';
    });
    return result;
  });
  return result;
});

console.log(str);
*/

/*
let str2 = `clipPath
      id=clippath_pic_fd4803ee9e036ff817220828eb0e434b  
      style='transform: translate(0px, 241.18099547511315px);display:none;' 
    `;
// let reg2 = /^[\s|.|\w|=|"|'|:|(|)|,|\n|;]*$/g;
// true
// let reg2 = /^(.|\n|\s)*$/g;
// false
let reg2 = /^[.|\n|\s]*$/g;

// console.log(reg2.test(str2));

// let str3 = `cid;
//       =() ',.;`;

let str3 = `;cidabc`;
let reg3 = /(?:.|\n|\s)*(abc)/g;
// console.log(reg3.test(str3));

str3.replace(reg3, function ($0, $1) {
  // console.log($0);
  // console.log($1);
});

// https://www.javacoder.cn/?p=1115
// https://www.cnblogs.com/caijinghong/p/14333615.html
// var str4 = 'aaa<div style="font-color:red;">123456</div>bbb';

// console.log(str4.match(/<.+?>/));

// console.log(str4.match(/<.+>/));
*/
