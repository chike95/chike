# TypeScript

官网：<https://www.typescriptlang.org/>

在线调试：<https://www.typescriptlang.org/zh/play?#code/Q>

小满TS：<https://www.bilibili.com/video/BV1wR4y1377K/>

小满笔记：<https://blog.csdn.net/qq1195566313/category_11559497.html>

### 安装运行
```bash
lxm18@lxm_hp MINGW64 /d/projectTest/xiaoman-ts
$ npm i typescript -g

added 1 package in 9s

lxm18@lxm_hp MINGW64 /d/projectTest/xiaoman-ts
$ tsc -v
Version 5.4.5

lxm18@lxm_hp MINGW64 /d/projectTest/xiaoman-ts
$ tsc index.ts 

lxm18@lxm_hp MINGW64 /d/projectTest/xiaoman-ts
$ nodemon index.js
```

### 配置文件
执行以下命令创建配置项: tsconfig.json
```bash
tsc --init
```

然后执行以下命令使用配置项的定义进行监测
```bash
tsc -w
```

配置	说明

noImplicitAny	禁止使用隐含的 any 类型，如函数参数没有设置具体类型

strictNullChecks	开启时不否允许将 null、undefined 赋值给其他类型比如字符串

target	转换成 JS 的版本

strict	是否严格模式执行

module	使用的模块系统

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
