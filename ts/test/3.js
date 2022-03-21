/*
作业题目的：

扩展函数重载更多应用。

作业题目：

以下是 老师对 JWT 底层 decode 重载函数稍作优化后的 TS 代码，代码已经给出： 请写出你对 S100 行下方 decode 函数重载方法的理解。

提示 1： decode 重载函数用到了 & ， & 为对象交叉，本课程第八章会讲到，但这里相对简单，测试下就能明白其含义。

提示 2：作为对本章函数重载的延申拓展，重心放在 TS 语法上，不要关注功能实现。

*/

interface DecodeOptions {
    complete?: boolean | undefined;
    json?: boolean | undefined;
}

interface CompleteInter {
    complete: true
}



interface JsonInter {
    json: true
}


interface JwtHeader {
    alg: string | Algorithm;
    typ?: string | undefined;
    // ...其他key-value省略
}