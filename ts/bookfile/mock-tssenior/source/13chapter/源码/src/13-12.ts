// 枚举，存放固定常量的序列
// // 数字枚举
// 后面的值默认 + 1
// enum Week {
//   Monday = 1,
//   Tuesday,
//   Wensday,
//   ThirsDay,
//   Friday,
//   Sarturday,
//   Sunday
// }

// 取值的两种形式
// console.log(Week.Monday)
// console.log(Week["Monday"])

// todo
// 可以参考实现原理

// 0 可以取到吗？ 如果从-1开始，-1 能不能取到？
// console.log(Week[1])
// console.log(Week[5])



//  字符串枚举
enum WeekEnd {
  Monday = "myMonday",
  Tuesday = "Tuesday",
  Wensday = "Wensday",
  ThirsDay = "ThirsDay",
  Friday = "Friday",
  Sarturday = "Sarturday",
  Sunday = "Sunday"
}

console.log(WeekEnd.Monday)
console.log(WeekEnd["Monday"])

// 不能通过由值取key todo 尝试
// console.log(WeekEnd["myMonday"])

export { }