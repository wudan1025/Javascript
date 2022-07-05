/*
 * @LastEditors: wudan01
 * @description: 文件描述
 */

let str = `
  <div contenteditable="true" data-direction="0" data-align-h="left" class="xes-richtext-base" style="--defFontSize:14px; --defFontWeight:400; padding: 4px 12px 8px;" data-format="true">
  <div style="">
  <span style="">decdcffdedeffr333frfredededeer1112ded</span>
  <img src="https://paperfz-cdn.jiaoyanyun.com/paperWord/images/peiyou/007e756681411452bbf4318b07135d90.png" alt="img loading...">
  <img taskid="a6vk19zkf4g" src="loading..." alt="img loading...">
  <img taskid="jt1atxcbfzk" resid="cb20upfjqoga09b4ojq0" src="loading..." alt="img loading...">
  <img resid="cb20upfjqoga09b4ojq0" src="loading..." alt="img loading...">
  </div>
  </div>
`;

let reg = /<img.*(taskid="(.*?)"|resid="(\w*?)").*(?:>|\/>)/gi;

str.replace(reg, function ($0, $1, $2, $3) {
  console.log('---');
  console.log($0);
  console.log($1);
  console.log($2);
  console.log($3);
  console.log('---');
});
