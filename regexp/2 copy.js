
String.prototype.formatTime = function (template = "{0}年{1}月{2}日{3}时{4}分{5}秒") {
    // 老师的做法
    // 使用模板匹配替代
    let timeARR = this.match(/\d+/g)
    console.log(timeARR)
    return template = template.replace(/\{(\d+)\}/g, (content, $1) => {
        // return timeARR[$1]
        let time = timeARR[$1] || "00"
        return time.length < 2 ? "0" + time : time
    })


    // 我的做法
    // console.log(this)
    // var [dateStr, timeStr] = this.split(' ')
    // // console.log(dateStr, timeStr)
    // var dateReg = /(\d{4})[-/](\d{1,2})[-/](\d{1,2})/
    // dateStr = dateStr.replace(dateReg, function ($0, $1, $2, $3) {
    //     console.log($0, $1, $2, $3)
    //     return `${$1}年${$2}月${$3}日`
    // })
    // console.log(dateStr)
}


// 时间字符串格式化

var time = '2019-8-13 16:51:3'
// 2019/8/13 16:51:3

// 转化为
// 08月13日 16时51分
// 2019年08月13日
// 可以通过模板 生成各种模式的数据
console.log(time.formatTime()) // 2019年08月13日16时51分03秒
console.log(time.formatTime("{0}年{1}月{2}日"))  // 2019年08月13日
console.log(time.formatTime("{1}-{2} {3}:{4}")) // 08-13 16:51

var time = '2019-8-13'
console.log(time.formatTime()) // 2019年08月13日00时00分00秒
console.log(time.formatTime("{0}年{1}月{2}日"))  // 2019年08月13日
console.log(time.formatTime("{1}-{2} {3}:{4}")) // 08-13 00:00




