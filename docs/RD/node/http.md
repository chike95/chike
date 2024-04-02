# HTTP服务

## 基本使用

HTTP通信协议 -计算机网络
 
#### 原生node实现http服务器逻辑

1.使用node创建http服务，并能接收到客户端发来的请求

2.获取客户端发来的具体数据，根据不同的请求数据进行处理

3.将处理后的数据返回给客户端，并关闭连接


```js
// 导入http模块
var http = require('http');

// 创建服务器（获取实例对象）
var server = http.createServer();

// 请求事件，返回处理结果
server.on('request', function (req, res) {
    console.log(req.method)
    //向客户端响应内容
    res.write('yefenglin')
    //告之客户端数据响应完毕
    res.end()
})

// 监听端口
server.listen(3000, function () {
    console.log('127.0.0.1:3000');
})
```

### 主机名

如果不设置主机名，或设置为 0.0.0.0 表示允许任何IP 访问，这样局域网其他电脑可以通过 IP 访问到你的项目。你可以通过 ifconfig 查看本机 IP 地址，然后通过 IP 地址进行访问

```js
server.listen(3000, '0.0.0.0', () => {
  console.log('HOST: http://localhost:3000')
})
```

设置第二个参数主机设置为 127.0.0.1，表示只允许本地访问

```js
server.listen(3000, '127.0.0.1', () => {
  console.log('HOST: http://localhost:3000')
})
```

### 头信息

通过 setHeader 与 statusCode 设置响应头信息

文本：text/plain;charset=utf-8

```js
res.setHeader('Content-type', 'text/plain;charset=utf-8')
```

超文本：text/html;charset=utf-8

```js
res.setHeader('Content-type', 'text/html;charset=utf-8')
```

### 请求方法

GET : 获取服务器资源

POST：提交数据给服务器

PUT：修改服务器资源

DELETE：删除服务器资源

HEAD：获取服务器响应首部

OPTIONS：获取服务器支持的方法

查看请求方法：req.method


## 响应数据

### HTML

通过设置头信息来告之浏览器

```js
server.on('request', function (req, res) {
    fs.readFile('./index.html', function (err, data) {
        res.write(data);
        res.end();
    })
})
```

页面包含图片无法响应: index.html内容

```html
    你好啊
    <img src="./hero.png" alt="">
```

查看标头：

请求网址: http://127.0.0.1:3000/hero.png

解决办法：判断请求对象

查看请求: req.url
```
/
/hero.png
/favicon.ico
```

```js
server.on('request', function (req, res) {
    console.log(req.url);
    if (req.url == '/') {
        fs.readFile('./index.html', 'utf-8', function (err, data) {
            res.write(data);
            res.end();
        })
    } else {
        fs.readFile('./hero.png', function (err, data) {
            res.end(data);
        })
    }
})
```

### JSON

后端做为接口时，需要传递 JSON 数据给前端

```js
var http = require('http')

const user = [{ name: '夜枫林' }, { name: 'chike95' }]

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-type': 'application/json',
    })
    res.end(JSON.stringify(user))
})

server.listen(3000, () => {
    console.log(`host: http://localhost:3000`)
})
```

## 路由基础

创建简单路由，根据不同请求响应不同结果

```js
var http = require('http')

const service = http.createServer((req, res) => {
    res.statusCode = 200
    res.setHeader('Content-Type', 'text/html;charset=utf8')
    switch (req.url) {
        case '/home':
            res.write('<h1>夜枫林</h1>')
            res.end()
            break
        case '/about':
            res.end('<h2>关于我们</h2>')
            break
        case '/user':
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ name: '夜枫林' }))
            break
        default:
            res.end('404')
    }
})

service.listen(3000, () => {
    console.log(`host: http://localhost:3000`)
})
```








## 表单数据

### 获取GET参数

http://127.0.0.1:3000/user?id=123

url.parse(req.url) 

```js
  search: '?id=123',
  query: 'id=123',  
  pathname: '/user',
  path: '/user?id=123',
  href: '/user?id=123'
```
url.parse(req.url, true)

```js
  search: '?id=123',
  query: [Object: null prototype] { id: '123' },
  pathname: '/user',
  path: '/user?id=123',
  href: '/user?id=123'
```

获取id：url.parse(req.url, true).query.id

```
123
```

### 获取POST参数


