<!--
 * @LastEditors: wudan01
 * @description: 文件描述
-->
target: 控制编译出文件版本
module: 控制编译的文件导出模块类型 ，默认commonjs
allowUmdGlobalAccess: umd 模块可以通过 全局引入

文件相关的
exclude 排除的文件
inclue 编译的文件 
files 编译的单个文件列表？？ 和 incluede 关系？

extends 继承其他config配置



ts / d.ts / tsx


```
{
  "compilerOptions": {
    // "incremental": true,                // 增量编译，提高编译速度
    // "tsBuildInfoFile": "./buildFile",   // 增量编译文件的存储位置
    // "diagnostics": true,                // 打印诊断信息
    // "target": "es5",           // 目标语言的版本
    // "module": "commonjs",      // 生成代码的模块标准
    // "outFile": "./app.js",     // 将多个相互依赖的文件生成一个文件，可以用在 AMD 模块中
    // todo 尝试[1,2,[3,4]].flat ,新增es2019.array
    // "lib": [],                 // TS 需要引用的库，即声明文件，es5 默认 "dom", "es5", "scripthost"
    // "allowJs": true,           // 允许编译 JS 文件（js、jsx）
    // "checkJs": true,           // 允许在 JS 文件中报错，通常与 allowJS 一起使用
    // "outDir": "./out",         // 指定输出目录
    // "rootDir": "./",           // 指定输入文件目录（用于输出）
    // "declaration": true,         // 自动生成声明文件,包括输出js? 
    // "declarationDir": "./d",     // 声明文件的路径
    // "emitDeclarationOnly": true, // 只生成声明文件，不生成js
    // "sourceMap": true,           // 生成目标文件的 sourceMap
    // "inlineSourceMap": true,     // 生成目标文件的 inline sourceMap
    // "declarationMap": true,      // 生成声明文件的 sourceMap
    // "typeRoots": [],             // 声明文件目录，默认 node_modules/@types
    // "types": [],                 // 声明文件包
    // "removeComments": true,    // 删除注释
    // "noEmit": true,            // 不输出文件
    // "noEmitOnError": true,     // 发生错误时不输出文件
    // todo helps 函数作用？
    // "noEmitHelpers": true,     // 不生成 helper 函数，需额外安装 ts-helpers
    // "importHelpers": true,     // 通过 tslib 引入 helper 函数，文件必须是模块
    // "downlevelIteration": true,    // 降级遍历器的实现（es3/5）
    // "strict": true,                        // 开启所有严格的类型检查
    // "alwaysStrict": false,                 // 在代码中注入 "use strict";
    // "noImplicitAny": false,                // 不允许隐式的 any 类型
    // "strictNullChecks": false,             // 不允许把 null、undefined 赋值给其他类型变量
    // "strictFunctionTypes": false           // 不允许函数参数双向协变
    // "strictPropertyInitialization": false, // 类的实例属性必须初始化
    // "strictBindCallApply": false,          // 严格的 bind/call/apply 检查
    // "noImplicitThis": false,               // 不允许 this 有隐式的 any 类型
    // "noUnusedLocals": true,                // 检查只声明，未使用的局部变量
    // "noUnusedParameters": true,            // 检查未使用的函数参数
    // "noFallthroughCasesInSwitch": true,    // 防止 switch 语句贯穿
    // "noImplicitReturns": true,             // 每个分支都要有返回值, 例如if / else 每个分支都要有返回值
    // "esModuleInterop": true,               // 允许 export = 导出，由import from 导入
    // "allowUmdGlobalAccess": true,          // 允许在模块中访问 UMD 全局变量
    // "moduleResolution": "node",            // 模块解析策略，默认node ,另一种classic
    // "baseUrl": "./",                       // 解析非相对模块的基地址,默认当前目录
    // "paths": {                             // 路径映射，相对于 baseUrl
    //   "jquery": ["node_modules/jquery/dist/jquery.slim.min.js"]
    // },
    // 编译器认为 src 和 out 在同一个目录下，src 下引用out 文件不需要改变引用地址
    // "rootDirs": ["src", "out"],            // 将多个目录放在一个虚拟目录下，用于运行时
    // "listEmittedFiles": true,        // 打印输出的文件
    // "listFiles": true,               // 打印编译的文件（包括引用的声明文件）
  }
}
```


```
{
  "compilerOptions": {
    "target": "es2020", // 指定 TS 编译成 JS 后的js版本
    "module": "commonjs", // TS 编译成 JS 后采用的模块规范 commonjs amd cmd  es等         
    "lib": ["DOM","ES2020"], /*  指定 TS 编码期间可以使用的库文件版本 比如：ES5就不支持Set集合 */
    "outDir": "./dist", //     指定 TS 文件编译成 JS 后的输出目录                
    /* Redirect output structure to the directory. */
    "rootDir": "./src", // 指定 TS 文件源码目录
    "strict": true, // 启用严格检查模式
    "strictNullChecks":false,// null 和 undefined即是值，也是类型, null 和 undefined 值 只能赋值给 any ,unknown和它们各自的类型
    "noImplicitAny": true, // 一般是指表达式或函数参数上有隐含的 any类型时报错
    "experimentalDecorators": true, /* 启用ES7装饰器实验开启选项 */
    "emitDecoratorMetadata": true, /* 启用装饰器元数据开启选项 */
    "declaration": true, // 指定 TS 文件编译后生成相应的.d.ts文件
    "removeComments": false, // TS 文件编译后删除所有的注释
    
    "baseUrl": "src", /* 工作根目录  解析非相对模块的基地址*/
    "paths": {
        "@/datatype/*": ["datatype/*"],
        "@/131/*": ["131/*"],
        "@/132/*": ["132/*"]
      },    
    // 有些依赖库底层 为了兼容CommonJs规范、AMD规范这二者的规范中相互兼容，
    // 使用了 export =，将二者规范统一。
    // "esModuleInterop":true表示允许依赖库中出现export = 这种兼容规范导出的格式，
    //  TS 可以用import from导入 
    "esModuleInterop": true,  
  },
  "include": [ // 需要编译的ts文件一个*表示文件匹配**表示忽略文件的深度问题
    "./src/**/*.ts" // 匹配src下所有的ts文件
, "src/datatype/typepsenumts"  ],
   "exclude": [
    "./src/**/test",
    "./src/**/premit", 
  ]
}
```