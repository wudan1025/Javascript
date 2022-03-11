interface Length {
    length: number
}

function logAdvance2<a extends Length>(value: a): a {
    console.log(value, value.length);
    return value;
}
logAdvance2([1])
logAdvance2('123')
logAdvance2({ length: 3 })