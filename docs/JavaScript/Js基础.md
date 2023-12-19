# JavaScript 基础

## 预解析

预解析也叫提升，且分为 **变量提升** 和 **函数提升**

### 变量提升

变量提升(变量预解析)是 JavaScript 引擎的工作方式产生的一个特性，它允许在变量声明之前即被访问。

JS 引擎在运行一份代码的时候，会按照下面的步骤进行工作：

- 首先，对代码进行预解析，并获取声明的所有变量
- 然后，将这些变量的声明语句统一放到代码的最前面
- 最后，开始一行一行运行代码

变量提升会把代码中声明的变量，提前解析到当前(提升到)作用域最前面，但是**只定义，不赋值**

```js
// 事例
console.log(x);

var x = 1;

function b() {
  console.log(x);
}

b(); // 1

// 经过转化就是
var x = undefined;

console.log(x); // undefined

x = 1;
function b() {
  console.log(x);
}

b(); // 1
```

> var 有变量提升，let、const 没有(有人认为 let 是有预解析，let 只能先声明再去使用。)

### 函数提升

函数提升(函数预解析)就是指函数在声明之前即可被调用

调用执行函数前会预解析也就是浏览器先扫描一下，会在内存中开辟个空间把预解析放进去。然后再去调用执行，执行完就会关闭空间，销毁里面的变量。这样就是为什么调用函数 fn()写在声明函数前面依然有结果的原因

## 作用域

js 中有全局作用域、函数作用域，在 es6 中又增加了块级作用域。作用域的最大用途就是隔离变量或函数，并控制他们的生命周期。作用域是在函数执行上下文创建阶段时定义好的，不是函数执行时定义的。

为什么我这样说呐，看以下代码：

```js
function a() {
  return function b() {
    var name = "xiaoxin";
    console.log(name); // xiaoxin
  };
}
function c() {
  var name = "Tom";
  b();
}

var b = a();
c();

// 当注销var name = 'xiaoxin'
function a() {
  return function b() {
    // var name = 'xiaoxin'
    console.log(name); // 然后这里就会报错！
  };
}
function c() {
  var name = "Tom";
  b();
}

var b = a();
c();
```

## 作用域链

当一个代码块或函数嵌套在另一个代码块或函数中时，就发生了作用域的嵌套。在当前函数中如果 js 引擎无法找到某个变量，就会往上一级嵌套的作用域中去寻找，直到找到该变量或抵达全局作用域，这样的链式 关系就称为作用域链(Scope Chain)

> 如果对执行上下文有一定理解的，可以这样去想：首先函数执行都会创建一个可执行上下文，每个可执行上下文中存在对外部的引用，那么通过该引用就可以获得外部词法环境中的变量和声明等。那么引用串联起来就形成了 scope chain，也就是 **作用域链**。

## 闭包

红宝书中：是指有权访问另一个函数作用域中的变量的函数

通常被用来封装 **私有变量**，很多源码处都有使用。但不正当的使用闭包可能会造成内存泄漏。一般是将引用置空

```js
function fn() {
  let num = 123;
  return function fun() {
    console.log(num);
  };
}

let re = fn(); // re变量就是return后面的函数
console.log(re); // 打印出来就是return后面的函数
re(); // 看上去调用变量，其实就在调用return后面的函数
re = null; // 将引用置空
```

## 原型对象

在 JavaScript 中，除去一部分内建函数，绝大多数的函数都会包含有一个叫做 `prototype` 的属性，用来指向原型对象，这个对象包含了通过调用该构造函数所创建的对象共享的属性和方法

例如我们的 `hasOwnProperty`, `toString` ⽅法等其实是 Obejct 原型对象的方法，它可以被任何对象当做⾃⼰的⽅法来使⽤。

## 原型链

我们都知道当读取实例的属性时，如果找不到，就会查找与对象关联的原型中的属性，如果还查不到，就去找原型的原型，⼀直找到最顶层为止。

在 JavaScript 中，每个对象中都有一个 `__proto__` 属性，这个属性指向了当前对象的构造函数的原型。对象可以通过自身的 `__proto__`属性与它的构造函数的原型对象连接起来，而因为它的原型对象也有 `__proto__`，因此这样就串联形成一个链式结构，也就是我们称为的 **原型链**。

## 执行上下文

当函数执行时，就会创建一个称为执行上下文的环境，分为创建和执行两个阶段。

**创建阶段：** 是指函数被调用但还未执行任何代码的时候，此时呐创建了一个对象，此对象有三个属性：

```js
// 执行上下文
executionContext = {
  scopeChain: {...}, // 创建作用域链（scope chain）
  this: {...}, // 指定的this
  variableObject: {...}, // 初始化变量、函数、形参
}
```

> 现在明白前文提到的变量提升是在什么阶段出现的吧

**执行阶段：** 是指函数内的代码被执行的时候。分配变量和函数的引用，以及赋值。

## this

在绝大多数情况下，函数的调用方式决定了 `this` 的值（运行时绑定）。this 不能在执行期间被赋值，并且在每次函数被调用时 `this` 的值也可能会不同。ES5 引入了 bind 方法来设置函数的 this 值，而不用考虑函数如何被调用的。ES6 引入了**箭头函数**，箭头函数不提供自身的 `this` 绑定（this 的值将保持为闭合词法上下文的值）。 当然了，this 关键值在 js 中的严格和非严格模式下还是有一定差别的。

this 指向的问题，我在这里总结 5 点：

### 1、函数直接调用

```js
function ikun() {
  console.log('this:', this) // window或者undefined(严格模式下)
}

ikun()

--------------------------------

function xkun() {
  function ikun() {
    console.log('this:', this) // 依旧是window或者undefined(严格模式下)
  }
  return ikun
}

function akun() {
  let zkun = xkun()
  zkun()
}

akun()
```

### 2、函数被调用

```js
function ikun() {
  console.log("this:", this); // abc
}

let abc = {
  myFun: ikun,
};

abc.myFun();
```

### 3、new 个实例

```js
function Ikun() {
  this.name = ikun;
  console.log("this:", this); // Ikungg
}

let Ikungg = new Ikun();
```

### 4、call、apply、bind

```js
function getIkun(name) {
  this.name = name;
  console.log("this:", this);
}

function Ikun(name, username) {
  this.username = username;
  getIkun.call(this, username); // 这里this从getIkun，变成了ikun
}

let ikun = new Ikun("xx", "阿坤塌房了");

// call、apply、bind都是改变函数的this指向，但除了第一个指向对象参数一致以外有亮点：
// 1、携带参数不一致
// 函数.call(this，arg1, arg2,......)
// 函数.apply(this, [arg1, arg2,......])
// 函数.bind(this, arg1, arg2,......)

// 2、调用执行
// call、apply调用会自动执行函数，而bind不会
```

### 5、箭头函数

```js
// 通过Babel 转换前后的代码来更清晰的理解箭头函数
const obj = {
  test() {
    return () => {
      console.log('this:', this)
    }
  },
}
ikun = obj.test()
ikun()      // obj
------------------------------------------
// 转换后的 ES5 代码
var obj = {
  test: function getArrow() {
    var that = this
    return function () {
      console.log('this:', that)
    }
  },
}

ikun = obj.test()
ikun()      // obj
```

## 拷贝

### 浅拷贝

浅拷贝只是复制了对象的引用地址，两个对象指向同一个内存地址，所以修改其中任意的值，另一个值都会随之变化，这就是**浅拷贝**  
创建一个新的对象，去拷贝另一个对象的属性和属性值。如果是基础类型的数据就直接拿来用，如果是复杂数据类型的，只是复制的是地址。浅拷贝只拷贝第一层的属性和属性值。有三种方法。

**1、for in**

```js
let obj1 = { name: "ikun", age: 18 };
let obj2 = {};

for (let key in obj1) {
  obj2[key] = obj1[key];
}

console.log(obj2); // { name: 'ikun', age: 18 }
```

**2、扩展运算符（...）**

在 ES6 中，对象的拓展运算符（...）是可用于浅拷贝的，扩展运算符(…)用于取出参数对象中的所有可遍历属性，拷贝到当前对象之中。

```js
let obj = {
  name: "zs",
  age: 18,
};
let obj2 = {
  ...obj,
};
```

**3、Object.assign(target,source)**

`Object.assign()` 方法可以把任意多个的源对象自身的可枚举属性拷贝给目标对象，然后返回目标对象。接收两个参数，第一个是目标对象，第二个是被复制的对象

```js
let target = { name: "ikun", age: 22 };

let source = { state: "优秀" };

let result = Object.assign(target, source);

console.log(target, target == result); // {name: 'ikun', age: 22, state: '优秀'} , true
```

### 深拷贝

**1、JSON.parse(JSON.stringify())**

`JSON.parse(JSON.stringify())` 可以将对象序列化地转成字符串，以达到深拷贝的目的。但不推荐此方法，有 **5** 点问题。

> 1、对象中 undefined、函数 function 会在序列化的时候被忽略  
> 2、对象中有日期对象的话，序列化之后会被转成字符串类型  
> 3、对象中出现循环引用的时候，会直接报错  
> 4、对象中存在 NAN、Infinity 都会变成 null （Infinity:js 中的正无穷大）  
> 5、对象的原型链上的属性，会丢失

这里给大家拓展个有意思的

```js
JSON.stringify(data, replacer, indent);
// example
JSON.stringify(data, null, 2);
// data: 要转换的数据
// replacer?: 用于过滤或替换对象的键值对。如果这个参数为 null，那么它不会过滤或替换任何键值对
// indent?: 用于指定用于缩进的字符数
```

**2、lodash 中的 cloneDeep()**

lodash 是一个 JavaScript 工具库，提供各种工具函数，lodash 中的 cloneDeep() 方法可以深拷贝一个对象，可以解决循环引用的问题

```js
import cloneDeep from "lodash/cloneDeep";

let obj = {
  name: "ikun",
  age: 18,
  info: {
    name: "zs",
    age: 18,
  },
};

let obj2 = cloneDeep(obj);
```
