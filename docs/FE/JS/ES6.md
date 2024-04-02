# ES 6-13

## 知识点

### 基本介绍

#### 什么是 ECMAScript?

    ECMAScript [ek - ma - script] 在中文中, ECMAScript 可以读作 "伊克玛 Script"

    官方定义: ECMAScript 是定义脚本语言的规范, 而 JavaScript 是遵循 ECMAScript 规范实现的一种编程语言

    通俗说法: ECMAScript 好比是一本书的目录, 而 JavaScript 是这本书的具体内容

#### ES6 和 JavaScript 有什么区别？

    ES6(ECMAScript 2015)是ECMAScript规范的第六个版本,而JavaScript是基于ECMAScript规范实现的编程语言,

    ES6可以被看作是 JavaScript 的一个重要的版本更新

    ES6引入了"块级作用域",使用let和const关键字来声明变量和常量,使变量的作用域清晰可控

    ES6引入了"箭头函数",箭头函数比传统的函数语法更简洁, 具有更少的冗余代码

    ES6引入了"类(Class)"的概念,这是一种基于原型的面向对象编程的语法糖, 使用类可以更方便地创建和管理对象

    ES6引入了"模板字符串", 使用反引号(`)创建字符串可以方便地嵌入变量和表达式

    ES6引入了"解构赋值", 这是一种新的赋值语法,可以将数组或对象的属性直接赋值给变量

    ES6引入了"函数参数默认值"

    ES6引入了"Promise对象", 简化了异步编程, 使其更可读和可维护

    ES6引入了 Set、Map 等

    ES6引入了"模块化"(ES Module)

#### ES6 ~ ES13 新特性

ES6(ECMAScript 2015)

    let和const关键字用于声明块级作用域变量和常量

    箭头函数表达式

    类定义和继承

    模板字符串

    解构赋值

    函数参数默认值

    Promise 异步编程

    异步函数 async/await

    Map 和 Set 数据结构

    模块化 import 和 export

ES7(ECMAScript 2016)

        数组 includes() 方法

        指数运算符

        Array.prototype.includes()

ES8(ECMAScript 2017)

        async/await 异步编程解决方案的改进

        共享内存和原子操作的支持

        Object.values() 和 Object.entries()

        String.prototype.padStart() 和 String.prototype.padEnd()

ES9(ECMAScript 2018)

        异步迭代器

        Promise finally() 方法

        Rest/Spread 属性

        正则表达式具有命名捕获组

ES10(ECMAScript 2019)

        Array.prototype.flat() 和 Array.prototype.flatMap()

        Object.fromEntries()

        String.prototype.trimStart() 和 String.prototype.trimEnd()

        catch 块可以省略参数

ES11(ECMAScript 2020)

        可选链 ?. 和 Nullish 合并运算符 ??

        Promise.allSettled() 方法

        动态 import()

        全局对象globalThis

ES12(ECMAScript 2021)

        String.prototype.replaceAll()

        数字分隔符

        WeakRefs 弱引用

        Promise.any() 方法

ES13(ECMAScript 2022)

        Class fields 类字段

        SIMD(Single Instruction, Multiple Data)指令集

        更好的BigInt支持

### 变量和常量

什么是变量?

变量(Variable) 是用于存储数据的名称(标识符), 变量可以是任何类型, 如 "数值、字符串" 等

字符串

```js
//字符串类型 string
let name = "邓瑞"; //let 用于声明一个名为 "name" 的块级作用域变量, 并将其赋值为 "邓瑞"

console.log("姓名:", name); //console.log() 用于打印输出信息到控制台窗口

console.log("姓名类型:", typeof name); //typeof 数据类型

//数值类型 number

let balance = 100; //使用 number 类型 表示整数

console.log("余额:", balance);

console.log("余额类型:", typeof balance);

let weight = 70.5;

console.log("体重:", weight);

console.log("体重类型:", typeof weight);

//let weight = 60 //错误示范 在同一个作用域下不可以声明两个相同名称的变量

//先声明后赋值

let web;

web = "dengruicode.com";

console.log("web:", web);
```

注:ES6 不区分整型和浮点型, 所有数字都使用 number 类型 来表示

什么是常量?

常量(Constant) 是一个固定的值, 在程序运行中常量的值保持不变

常量通常用来表示不会改变的值, 如数学中的 π(圆周率) PI≈3.14159265359

```js
const PI = 3.14 //const 用于声明一个名为 "PI" 的块级作用域常量, 并将其赋值为 3.14

console.log("PI", PI)`
```

变量和常量有什么区别？

```js
let age = 18;
age = 22; //常量可以重新赋值
console.log("age:", age);

//PI = 3.1415926 //错误示范
```

### 数据类型

#### 字符串类型 string

定义 字符串类型用于存储字符序列

```js
let name = "邓瑞"; //姓名为邓瑞

let web = "dengruicode.com"; //网址为 dengruicode.com
```

#### 数值类型 number

定义 用于存储数字, 可以表示整数、浮点数

```js
let balance = -100; //账户余额为-100元

let weight = 60.5; //体重为60.5公斤
```

#### 布尔类型 boolean

定义 布尔类型只能取两个值,true(真) 和 false(假)

```js
let tv = true; //电视 - true(开)
```

#### 对象 object

定义 对象是一种复合的数据类型, 可以通过键值对的方式存储多个值

```js
//定义了一个包含姓名、年龄和体重的对象

let boy = {
  name: "David",

  age: 28,

  weight: 70.5,
};

console.log("boy", boy);
```

#### map

定义 map 是一种特殊的数据结构,用于存储键值对的有序集合,

```js
//定义了一个包含姓名、年龄和体重的map

let girl = new Map([
  ["name", "Luna"],
  ["age", 20],
  ["weight", 50.5],
]);

console.log("girl", girl);
```

注

       Map相对于对象提供了更灵活、有序、高效的键值对存储和操作方式,当需要在大量键值对中快速查找或删除特定键值对时, Map比对象更高效

       Map提供了一些便捷的方法来操作键值对, 如: get()、set()、delete()

       Map提供了一些便捷的迭代方法, 如: forEach()、keys()、values()、entries()

#### set

定义 Set 是一种特殊的数据结构, 用于存储无序且唯一的值的集合

```js
let number = new Set([1, 2, 3, 4, 5]); //定义了一个包含5个"不重复"的整数的集合

console.log("number", number);

//let numbers = new Set([1, 2, 3, 4, 5, 5]) //错误示范
```

#### 数组 array

定义 数组是一种有序集合, 可以包含不同类型的元素，并且数组的长度是可变的

```js
let str = ["a", "b", "c", "b"]; //定义了一个包含4个字符串的数组
console.log("str", str);

let arr = ["1", "3.14", "a"];
console.log("arr", arr);
```

#### 函数 function

定义 函数是一段可重复执行的代码块，可以接收输入参数并返回一个值或执行某些操作

```js
function add(a, b) {
  return a + b;
}

console.log("add", add(1, 2));
```

#### 类 class

定义 类是一种蓝图或模板，用于创建具有相同属性和方法的对象

```js
class Person {
  constructor(name, age) {
    this.name = name;

    this.age = age;
  }

  info() {
    console.log("姓名", this.name, "年龄", this.age);
  }
}

const person = new Person("瑶瑶", 20);

person.info();
```

### 函数

```js
<script>
//定义函数
function getWeb() {
return "dengruicode.com"
}
console.log("网站", getWeb())

//传参
function add(number) {
return number + 10
}
console.log("add", add(20))

//默认值
function getPage(page = 1) {
return page
}
console.log("getPage - 默认值", getPage())
console.log("getPage", getPage(6))

/*
匿名函数 [匿名函数没有显式的名称, 被视为一个函数表达式]
匿名函数可以在不需要额外命名的情况下进行定义和使用, 通常被用作回调函数, 即将函数作为参数传递给其他函数

回调函数是一种在特定事件或条件发生时被调用的函数, 回调函数通常用于异步编程中,
比如 success 是 ajax 中的一个回调函数, 用于处理请求成功的结果
*/
let sub = function (x, y) { //函数赋值给了一个变量 sub, 函数本身并没有一个具名标识符
return x - y
}
console.log("sub", sub(30, 5))

//箭头函数 [箭头函数是一种匿名函数]
let plus = (a, b) => { //省略 function 添加 =>
return a + b
}
console.log("plus", plus(5, 10))

//隐式返回 [在函数体内只有一个表达式的情况下, 可以省略花括号 {} 和 return 关键字]
let plus2 = (a, b) => a + b
console.log("plus2", plus2(10, 20))
</script>

```

### 数组

```html
<script>
  //定义数组
  let arr = [10, 11];
  console.log("arr", arr);

  //向数组末尾添加一个或多个元素, 并返回修改后数组的长度
  let arrLength = arr.push(12, 13);
  console.log("arr", arr); //[10, 11, 12, 13]
  console.log("arrLength", arrLength);

  //向数组开头添加一个或多个元素, 并返回修改后数组的长度
  arrLength = arr.unshift(8, 9);
  console.log("arr", arr); //[8, 9, 10, 11, 12, 13]
  console.log("arrLength", arrLength);

  //删除数组中第一个元素, 并返回被删除元素
  let delElement = arr.shift();
  console.log("arr", arr); //[9, 10, 11, 12, 13]
  console.log("delElement", delElement); //8

  //删除数组最后一个元素, 并返回被删除元素
  delElement = arr.pop();
  console.log("arr", arr); //[9, 10, 11, 12]
  console.log("delElement", delElement); //13

  //删除元素, 并返回包含被删除元素的数组 splice(要删除元素的索引位置, 要删除的元素数量)
  //let delArr = arr.splice(2, 1) // 删除第3个元素 [数组的索引是从 0 开始]
  let delArr = arr.splice(2, 2); // 删除第3和第4个元素
  console.log("arr", arr); //[9, 10]
  console.log("delArr", delArr); //[11, 12]

  //颠倒数组中元素的顺序
  arr.reverse();
  console.log("arr", arr); //[10, 9]

  //数组中的元素按照首字母顺序排序
  let arr2 = ["banana", "apple", "orange"];
  arr2.sort();
  console.log("arr2", arr2); //['apple', 'banana', 'orange']

  //数组中的元素按照数字排序
  let arr3 = [5, 20, 13, 1, 4];
  //arr3.sort() //默认情况下 sort() 方法使用字符串排序, 导致并没有按照数字大小排序
  /*
        比较函数 (a, b) => a - b 接收两个参数 a 和 b, 用于比较这两个元素的大小, 返回 a - b 的结果决定了 sort() 方法的排序顺序
        若 a < b, 则 a - b 是一个负数, 表示 a 应该在 b 前面
        若 a = b, 则 a - b 是 0, 位置保持不变
        若 a > b, 则 a - b 是一个正数, 表示 a 应该在 b 后面
    */
  arr3.sort((a, b) => a - b);
  console.log("arr3", arr3); //[1, 4, 5, 13, 20]

  //筛选符合条件的元素, 返回一个新的数组
  let arr4 = [10, 11, 12, 13, 14, 15];
  let newArr = arr4.filter((value, index) => {
    return value > 12;
  });
  console.log("newArr", newArr); //[13, 14, 15]

  //将多个数组或值合并为一个新数组
  let arr5 = ["十六", "十七", "十八"];
  //newArr = arr3.concat(arr5) //[1, 4, 5, 13, 20, '十六', '十七', '十八']
  newArr = arr4.concat(arr5, 19, 20); //[10, 11, 12, 13, 14, 15, '十六', '十七', '十八', 19, 20]
  console.log("newArr", newArr);

  //使用for...of循环遍历数组
  let arr6 = ["邓瑞", "dengruicode.com", 100]; //数组可以包含不同的数据类型
  for (let item of arr6) {
    console.log("for...of", item);
  }

  //使用forEach方法来遍历数组
  arr6.forEach((value, index) => {
    console.log("forEach", value, "index", index);
  });
</script>
```

### Set 集合、扩展运算符

```js
//创建Set集合
//let fruits = new Set() //创建一个空的Set集合
let fruits = new Set(["apple", "orange", "banana"]); //创建一个包含初始值的Set集合

//向Set集合中添加新的元素
fruits.add("mango");
//fruits.add("orange") //若该元素已经存在, 则不会重复添加, 因为 Set 中的元素必须唯一
console.log("fruits", fruits);

//从Set集合中删除元素
fruits.delete("banana");
console.log("fruits", fruits);

//检查Set集合是否包含指定元素
console.log("fruits.has", fruits.has("banana"));

//获取Set集合的大小
console.log("fruits.size", fruits.size);

//使用 Array.from() 方法将 Set集合 转换为 数组
let arr = Array.from(fruits);
console.log("arr", arr);

//使用扩展运算符将 Set集合 转换为 数组
let arr2 = [...fruits];
console.log("arr2", arr2);

//扩展运算符是用于展开可迭代对象(如数组、字符串等)
//let web = 'dengruicode.com'
let web = "邓瑞编程";
let webArr = [...web]; //使用扩展运算符将 字符串 转换为 数组
console.log("webArr", webArr); //['邓', '瑞', '编', '程']

//使用for...of循环遍历 Set集合
for (let item of fruits) {
  console.log("for...of", item);
}

//使用forEach方法来遍历 Set集合
fruits.forEach((value) => {
  console.log("forEach", value);
});

//清空 Set
fruits.clear();
console.log("fruits.size", fruits.size);

//将 数组 转换为 Set集合 实现数组去重
let numberArr = [1, 2, 3, 3, 2, 1];
let numberSet = new Set(numberArr);
console.log(numberSet);
```

### map

```js
//let person = new Map() //创建一个空的Map集合
let person = new Map([
  ["name", "邓瑞"],
  ["gender", "男"],
  ["web", "dengruicode.com"],
]);

//向Map集合中添加新的元素
person.set("height", 175);
//在Map集合中, 每个键都是唯一的, 当使用相同的键再次调用 set() 方法时, 会替换原来键对应的值
person.set("web", "www.dengruicode.com");
console.log("person", person);

//删除元素
person.delete("gender");
console.log("person", person);

//检查Map集合是否包含指定元素
console.log("person.has", person.has("gender"));

//获取Map集合的大小
console.log("person.size", person.size);

//将Map集合转换为数组
let arr = Array.from(person);
console.log("arr", arr);

//使用扩展运算符将 Map集合 转换为 数组
let arr2 = [...person];
console.log("arr2", arr2);

//使用for...of循环遍历Map集合
//解构可以从数组或对象中提取值并赋给变量
//[key, value] 就是一种解构语法, 用于将 Map 集合中的键值对解构为 key 和 value 两个变量
for (let [key, value] of person) {
  console.log("for...of", key, value);
}

//使用forEach方法遍历Map集合的键值对
person.forEach((value, key) => {
  console.log("forEach", key, value);
});

//清空Map集合
person.clear();
console.log("person.size", person.size);
```

### 对象

```js
let person = {
  name: "邓瑞",
  gender: "男",
  web: "dengruicode.com",
};

//向对象中添加新的属性
person.height = 175;
//在对象中，每个键都是唯一的，当使用相同的键再次赋值时，会替换原来键对应的值
person.web = "www.dengruicode.com";
console.log("person", person);

//删除属性
delete person.gender;
console.log("person", person);

//检查对象是否包含指定属性
let has = "gender" in person;
console.log("has", has);

//获取对象的属性数量
console.log("keysArr", Object.keys(person)); //Object.keys() 用于获取对象属性名的数组
console.log("length", Object.keys(person).length);

//将对象转换为数组
let arr = Object.entries(person); //Object.entries() 用于获取对象的键值对数组
console.log("arr", arr);

//使用for...in循环遍历对象
//for...of 用于遍历可迭代对象[如数组、Set、Map、字符串等]
//for...in 用于遍历对象的可枚举属性
for (let key in person) {
  console.log("for...in", key, person[key]);
}

//使用forEach方法遍历对象的属性和值
Object.entries(person).forEach(([key, value]) => {
  console.log("forEach", key, value);
});

//清空对象
person = {};
console.log("length", Object.keys(person).length);
```
