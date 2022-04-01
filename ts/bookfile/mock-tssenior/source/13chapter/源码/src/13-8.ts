// bigint
// 修改
// lib:['DOM','ES2020'] 才会识别 bigint
// target es2020

// const max = Number.MAX_SAFE_INTEGER;
// console.log(max)
// const maxBigOne = max + 1
// console.log(maxBigOne)
// const maxBigtwo = max + 2
// console.log(maxBigtwo)

// console.log(maxBigOne === maxBigtwo)


// const max = BigInt(Number.MAX_SAFE_INTEGER);
// console.log(max)
// 转换为 bigint
// const maxBigOne = max + BigInt(1)
// console.log(maxBigOne)
// const maxBigtwo = max + BigInt(2)
// console.log(maxBigtwo)

// console.log(maxBigOne === maxBigtwo)


const max = BigInt(Number.MAX_SAFE_INTEGER);
console.log(max)
const maxBigOne = max + 1n
console.log(maxBigOne)
const maxBigtwo = max + 2n
console.log(maxBigtwo)

console.log(maxBigOne === maxBigtwo)



export { }