
// todo 答案
function add6(x: number, y = 0, z: number, q = 1) {
    console.log('x' + x)
    console.log('y' + y)
    console.log('z' + z)
    console.log('q' + q)
    return x + y + z + q
}
add6(1, undefined, 3)