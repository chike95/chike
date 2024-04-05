# TypeScript

官网：<https://www.typescriptlang.org/>

类型推断

当没有明确设置类型时，系统会根据初值推断变量的类型

![alt text](./img/leixingtuiduan.png)

类型注解

```js
let str: string;

str = "abc";
```

类型断言

```js
let numArr = [1, 2, 3];

const result = numArr.find((item) => item > 2);

result * 5; // 报错: 'result' is possibly 'undefined'.
```

类型断言

```js
let numArr = [1, 2, 3];

const result = numArr.find((item) => item > 2) as number;

result * 5; // 报错: 'result' is possibly 'undefined'.
```

基础类型

字符串

数字

布尔值

null

undefined

联合类型

```js
// 限制值类型
let str: string | number;
str = "abc";
str = 123;

// 限定值选项
let str2: 1 | 2 | 3;
str2 = 1;
str2 = 2;
str2 = 3;
```

数组

```js
// 两种书写方式
let arr: number[] = [1, 2, 3];
let arr2: Array<number> = [1, 2, 3];

let arr3: (number | string)[] = [1, "abc", 2, "def"];
```

元组

```js
let t1: [string, number] = ["abc", 123];

t1[0] = 100; // 报错: Type 'number' is not assignable to type 'string'.

// 设置可选值
let t2: [string, number, string?];
t2 = ["abc", 123];
```

枚举

```js
enum MyEnum{
    A,
    B,
    C
}

console.log(MyEnum.A); // 0
console.log(MyEnum[0]); // A
```

void

函数

```js
function MyFunc(a: number, b: number) {
  return a + b;
}
```

void 表示函数没有返回值

```js
function MyFunc(): void {
  console.log("abc");
}
```

接口

```js
interface MyInterface {
  name: string;
  age: number;
}

let obj: MyInterface = {
  name: "abc",
  age: 12,
  sex: "male", // 报错: Object literal may only specify known properties, and 'sex' does not exist in type 'MyInterface'.
};
```

类型别名

type

```js
type MyType = string | number;

let str: MyType = "abc";
let num: MyType = 123;
```

泛型

```js
function MyFunc<T>(a: T): T {
  return a;
}

let str: string = MyFunc < string > "abc";
let num: number = MyFunc < number > 123;
```

进阶内容

函数重载

```js
function MyFunc(a: number, b: number): number;
function MyFunc(a: string, b: string): string;
function MyFunc(a: any, b: any): any {

}

```

接口继承

```js
interface MyInterface1 {
  name: string;
}

interface MyInterface2 extends MyInterface1 {
  age: number;
}

let obj: MyInterface2 = {
  name: "abc",
  age: 12,
};
```

类的修饰符

```js

```
