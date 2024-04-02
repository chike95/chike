# Express

官网：<https://www.expressjs.com.cn/>







## 创建项目

### 手动创建

创建项目文件夹并初始化

```
> mkdir express-server

> cd express-server

> npm init -y
```

安装express

```
> npm i express 
```

创建项目主文件

```
> touch app.js
```

在app.js中写入

```js
const express = require('express')

const app = express()

app.get('/', (req, res) => {
    console.log(req.url);
    res.send('hello world')
})

app.listen(3006, () => {
    console.log('running: 127.0.0.1:3006');
})
```

启动项目

```
> node app.js
```

访问localhost:3000

### 工具生成

使用代码生成工具：express-generator

```
> npm i express-generator -g
```

```
> express --view=pug express-server
```

目录结构

```
express-server
    |- bin/
    |		|- www
    |- public/
    |		|- images/
    |		|- javascripts/
    |		|- stylesheets/
    |- routes/
    |		|- index.js
    |		|- users.js
    |- views/
    |		|- error.pug
    |		|- index.pug
    |		|- layout.pug
    |- app.js
    |- package-lock.json
    |- package.json          

```

其中：

app.js是项目主文件；

views目录用于存放页面文件；

routes目录用于存放路由文件；

public用于存放静态文件；

bin中的www是项目的启动文件；

启动项目

```
> cd ./express-server/

> npm install

> npm start
```

访问：<localhost:3000>

如果页面空白，可能是端口占用，修改 ./bin/www 即可

```js
var port = normalizePort(process.env.PORT || '3006');
app.set('port', port);
```


## 基本使用

### 获取内容

app.js

```js
const express = require('express')
const fs = require('fs')
const { promisify } = require('util')

const readFile = promisify(fs.readFile)

const app = express()

app.get('/', async function (req, res) {
    let back = await readFile('./db.json', 'utf8')
    try {
        let back = await readFile('./db.json', 'utf8')
        const obj = JSON.parse(back)
        res.send(obj.users)
    } catch (error) {
        res.status(500).json({ error })
    }
})

app.listen(3006, () => {
    console.log('running: 127.0.0.1:3006');
})
```

db.json

```json
{
    "users": [
        {
            "id": 1,
            "name": "John",
            "email": "john@gmail.com"
        },
        {
            "id": 2,
            "name": "Doe",
            "email": "doe@gmail.com"
        }
    ],
    "video": []
}
```

页面输出

[{"id":1,"name":"John","email":"john@gmail.com"},{"id":2,"name":"Doe","email":"doe@gmail.com"}]

### 添加内容



### 删除内容




