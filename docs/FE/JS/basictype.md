# 基本类型

## String

## Boolean

## Number

toFixed() 是用于将数字转换为指定小数位数的字符串的方法。

## Math

Math.random() 生成一个 0-1 之间的随机数

```js
var temData = 20 + Math.random().toFixed(2) * 10;
// toFixed() 是用于将数字转换为指定小数位数的字符串的方法。
```

## Date

```js
// 用于获取当前时间，并将小时、分钟和秒拼接成一个时间字符串，然后输出到控制台。
var time = new Date();
var timeData =
  time.getHours() + ":" + time.getMinutes() + ":" + time.getSeconds();
console.log("时间: " + timeData);
```
