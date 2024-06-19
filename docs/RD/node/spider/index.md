# node 爬虫

## 快速开始

### 发送请求

```js
// 1.引入 https 模块
const https = require("https");

// 2.创建请求对象（未发送请求）
let req = https.request("https://www.528btc.com/coin/3007.html", (res) => {
  // 异步响应
  let chunks = [];

  // 4.监听data事件，获取数据片段
  res.on("data", (data) => {
    chunks.push(data);
  });

  //5.监听end事件，数据接收完毕时触发
  res.on("end", () => {
    // 6.将数据片段合并成完整数据
    let body = Buffer.concat(chunks);
    console.log(body.toString("utf-8"));
  });
});

// 3.发送请求
req.end();

```

### Cheerio

npm 地址：<https://www.npmjs.com/package/cheerio>
Cheerio 是一个类似 jQuery 的库，用于在服务器端解析 HTML 和操作 DOM。适用于构建简单的网络爬虫和数据抓取工具。

```js
const cheerio = require('cheerio');
const $ = cheerio.load('<h2 class="title">Hello world</h2>');

$('h2.title').text('Hello there!');
$('h2').addClass('welcome');

$.html();
//=> <html><head></head><body><h2 class="title welcome">Hello there!</h2></body></html>
```


### download
