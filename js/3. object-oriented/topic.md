# 1 
```
function Fn() {
  this.x = 100;
  this.y = 200;
  this.getX = function () {
    console.log(this.x);
  }
}
Fn.prototype.getX = function () {
  console.log(this)
  console.log(this.x);
};
Fn.prototype.getY = function () {
  console.log(this.y);
};
let f1 = new Fn;
let f2 = new Fn;
// console.log(f1.getX === f2.getX); // false
// console.log(f1.getY === f2.getY); // true
// console.log(f1.__proto__.getY === Fn.prototype.getY); // true
// console.log(f1.__proto__.getX === f2.getX); // false
// console.log(f1.getX === Fn.prototype.getX); // false
// console.log(f1.constructor); // Fn

// todo
console.log(Fn.prototype);
console.log(Fn.prototype.__proto__);
console.log(Fn.prototype.__proto__.constructor); // Object


// f1.getX(); // 100
// f1.__proto__.getX(); // undefined this 指向？
// f2.getY(); // 200
// Fn.prototype.getY(); // 200
```

# 2 
> todo
```

let obj = {
  2: 3,
  3: 4,
  length: 2,
  push: Array.prototype.push
}
obj.push(1);
obj.push(2);
console.log(obj);
```
#### 答案
```
{2: 1, 3: 2, length: 4, push: ƒ}
2: 1
3: 2
length: 4
push: ƒ push()
[[Prototype]]: Object
```

# 3
> 再来一次
```
function C1(name) {
  if (name) {
    this.name = name;
  }
}
function C2(name) {
  this.name = name;
}
function C3(name) {
  this.name = name || 'join';
}
C1.prototype.name = 'Tom';
C2.prototype.name = 'Tom';
C3.prototype.name = 'Tom';

console.log(new C1().name)
console.log(new C2().name)
console.log(new C3().name)
```

```
Tom
undefined
join

```

# 4
> 回答错误？
> 解析看 20201220/2.png 
```
function Foo() {
  getName = function () {
    console.log(1);
  };
  return this;
}
Foo.getName = function () {
  console.log(2);
};
Foo.prototype.getName = function () {
  console.log(3);
};
var getName = function () {
  console.log(4);
};
function getName() {
  console.log(5);
}
Foo.getName(); // 2
getName(); // 4

// 修改 window 下 getFoo
Foo().getName(); // 1

// window 下 getName
getName(); // 1 

new Foo.getName(); // 2 不明白？ 执行顺序 (new (Foo.getName()))

//new Foo 和 new Foo() 差别

new Foo().getName(); // 3 
new new Foo().getName(); // 执行顺序？
```