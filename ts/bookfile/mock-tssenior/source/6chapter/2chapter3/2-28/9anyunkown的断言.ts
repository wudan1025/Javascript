// any 所有类型父类， 所有类型子类
// unkonw 所有类型父类，不能所有类型子类

// 加法运算例子
function add(one: string | number, two: string | number) {
  return one as any + two as any
}

console.log(add(3, 5))
console.log(add("3", 5))