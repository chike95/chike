# 二、技术选型和知识点介绍

    本章内容:

    * 技术选型概述

    * 知识点介绍

    * 产出：koa2开发环境

## 2.1 技术选型概述

#### 框架选型

koa2 VS express VS egg

异步编程：排除 express

学习范围：egg 太顶层，不利于理解

#### 数据库选型

mysql VS mongodb

mysql 应用广泛，成本低

#### 登录技术

session VS jwt

#### 前端页面

ejs 后端模板引擎 VS vue/react 前端框架

前端框架复杂程度高，本课程核心关注后端

#### 缓存数据库

redis

#### 单元测试

jest

## 2.2 KOA2

### 2.2.1 项目创建

（1）koa-generator

包地址：<https://www.npmjs.com/package/koa-generator>

（2）快速创建

```
# 1. 全局安装：
cnpm i -g koa-generato

# 2. 创建项目
koa2 -e koa2-weibo-code

# 3. 启动项目
cd koa2-weibo-code
cnpm install

# 4. 启动项目
npm run dev

# 5. 访问网址

localhost:3000

```

（3）启动报错

问题：通过 npm run dev 报错

解决办法：<https://www.jianshu.com/p/815f3f8c635a>

package.json

```js
  "scripts": {
    ...
    "dev": ".\\node_modules\\.bin\\nodemon bin\\www"
  }
```

（4）修改端口

/bin/www

```js
var port = normalizePort(process.env.PORT || "3000");
```

（5）添加 gitignore，远程到 git 仓库

（6）设置环境变量

插件安装

```
cnpm i cross-env -D
```

修改 package.json

```js
  "scripts": {
    "start": "node bin/www",
    "dev": "cross-env NODE_ENV=dev .\\node_modules\\.bin\\nodemon bin\\www",
    "prd": "cross-env NODE_ENV=production pm2 start bin/www",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

### 2.2.2 代码结构

目录结构

```
.
+-- bin
|   +-- www               // 项目启动必备文件,配置端口等服务信息
+-- node_modules          // 项目依赖，安装的所有模块都会在这个文件夹下
+-- public                // 存放静态文件，如样式、图片等
|   +-- images            // 图片
|   +-- javascript        // js文件
|   +-- stylesheets       // 样式文件
+-- routers               // 存放路由文件，如果前后端分离的话只用来书写api接口使用
|   +-- index.js
|   +-- user.js
+-- views                 // 存放存放模板文件，就是前端页面，如果后台只是提供api的话，这个就是备用
|   +-- error.pug
|   +-- index.pug
|   +-- layout.pug
+-- app.js                // 主入口文件
+-- package.json          // 存储项目名、描述、作者、依赖等等信息
+-- package-lock.json     // 存储项目依赖的版本信息，确保项目内的每个人安装的版本一致
```

新建 src 目录，将 public routers views app.js 放入 src 目录中，并修改 www.js，使其能够正确引用 src 目录中的代码。

```
var app = require('../src/app');
```

github 提交：refactor 调整目录结构

### 2.2.3 开发路由

（1）GET 方法获取动态参数

```js
router.get("/profile/:userName", async (ctx, next) => {
  const { userName } = ctx.params;
  ctx.body = {
    title: "this is profile page",
    userName,
  };
});
```

localhost:3000/profile/lisi

{
"title": "this is profile page",
"userName": "lisi"
}

```js
router.get("/loadMore/:userName/:pageIndex", async (ctx, next) => {
  const { userName, pageIndex } = ctx.params;
  ctx.body = {
    title: "this is loadMore page",
    userName,
    pageIndex,
  };
});
```

localhost:3000/loadMore/zhangsan/3

{
"title": "this is loadMore page",
"userName": "zhangsan",
"pageIndex": "3"
}

（2）Post 方法获取动态参数

```js
router.post("/login", async (ctx, next) => {
  const { userName, password } = ctx.request.body;
  ctx.body = {
    tag: 100,
    userName,
    password,
  };
});
```

测试（postman）：localhost:3000/users/login

{
"userName": "zhangsan",
"password": "Aa112211"
}

结果:
{
"tag": 100,
"userName": "zhangsan",
"password": "Aa112211"
}

github 提交；feat：路由的演示

## 2.3 EJS

#### 变量

<%= title %>

#### 条件

```ejs
<% if (isMe){ %>
  <a href="#">@ 提到我的(3)</a>
<% } %>
```

#### 组件

<%- include('widgets/user-info',{ isMe }) %>

#### 循环

```
blogList: [
  {
    id: 1,
    title: 'hello'
  }, {
    id: 2,
    title: "hi"
  }
]
```

<%- include('widgets/blog-list', {blogList}) %>

```
<ul>
    <% blogList.forEach(blog=> { %>
        <li data-id="<%=blog.id %>">
            <%= blog.title %>
        </li>
        <% }) %>
</ul>
```

## 2.4 Mysql

users 表：

![Alt text](./img/users-table.png)

blogs 表：

![Alt text](./img/blogs-table.png)

#### 基本 sql 语句

use koa2_weibo_code;

select \* from users;

select \* from blogs;

#### 增删改查

增加：

insert into users(username, `password`, nickname) values('zhansan', '124', '张三');

删除：

delete from blogs where id='3';

更新：

update blogs set content='内容 1 内容 1' where id='1';

查询：

select \* from users order by id desc;

select username, nickname from users where username='zhangsan'and`password`='124';

#### 查询总数，分页

查询总数：

select count(id) as sum from blogs;

分页：

select \* from blogs order by id desc limit 2 offset 0;

#### 外键

创建

![Alt text](./img/foreign-key.png)

更新限制 & 删除级联

insert into blogs(title, content, userid) values('标题 7','内容 7', 4);

插入不存在的 id，会报错

delete from users where id=2;

删除 id=2 的 user，会删除关联的 blog

联表查询

select \* from blogs inner join users on users.id = blogs.userid;

![Alt text](./img/lianbiao.png)

select blogs.\* ,users.username, users.nickname from blogs inner join users on users.id = blogs.userid;

![Alt text](./img/lianbiao2.png)

select blogs.\* ,users.username, users.nickname from blogs inner join users on users.id = blogs.userid where users.username = 'lisi'

![Alt text](./img/lianbiao3.png)

## 2.5 Sequelize

官网：<https://www.sequelize.cn/>

- 数据表，用 js 中的模型（class 或对象）代替

- 数据记录，用 js 中的对象或数组代替

- sql 语句，用对象方法代替

cnpm i mysql2 sequelize

测试

```js
const Sequelize = require("sequelize");

const conf = {
  host: "localhost",
  dialect: "mysql",
};
const seq = new Sequelize("koa2_weibo_code", "root", "", conf);

// 测试连接

seq
  .authenticate()
  .then(() => {
    console.log("ok");
  })
  .catch(() => {
    console.log("error");
  });
```

连接池代码：

```js
const mysql = require("mysql2");
const Sequelize = require("sequelize");

// 创建数据库连接池
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "koa2_weibo_code",
});

// 封装数据库连接函数
function connectToDatabase() {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      // 从连接池获取连接
      if (err) reject(err);
      else resolve(connection); // 将连接对象传递给回调函数
      console.log("成功连接到 MySQL");
    });
  });
}

connectToDatabase();
```

### 2.5.1 建模 & 同步数据

创建模型

```js
const Sequelize = require("sequelize");
const seq = require("./seq");

// 创建 User 模型，表名会是users
const User = seq.define("user", {
  // id会自动创建，并设为主键自增
  userName: {
    type: Sequelize.STRING, // varchar(255)
    allowNull: false, // 是否允许为空
  },
  password: {
    type: Sequelize.STRING, // varchar(255)
    allowNull: false, // 是否允许为空
  },
  nickName: {
    type: Sequelize.STRING, // varchar(255)
    comment: "昵称",
  },
});
module.exports = {
  User,
};
```

![Alt text](./img/ertu.png)

### 2.5.2 基本操作

写入数据

```js
const { Blog, User } = require("./model");

!(async function () {
  // 创建用户
  const zhangsan = await User.create({
    userName: "zhangsan",
    password: "123456",
    nickName: "张三",
  });

  console.log("zhangsan: ", zhangsan.dataValues);
})();
```

```
zhangsan:  {
  id: 2,
  userName: 'zhangsan',
  password: '123456',
  nickName: '张三',
  updatedAt: 2024-01-29T09:34:22.758Z,
  createdAt: 2024-01-29T09:34:22.758Z
}
```

查询数据

```js
const { Blog, User } = require("./model");

!(async function () {
  const zhangsan = await User.findOne({
    where: {
      userName: "zhangsan",
    },
  });

  console.log(zhangsan.dataValues);

  // 查询特定的列
  const zhangsan2 = await User.findOne({
    attributes: ["userName", "nickName"], // 指定要查询的列名数组，不指定则查询所有列
    where: {
      userName: "zhangsan",
    },
  });
  console.log(zhangsan2.dataValues);
})();
```

```
{
  id: 1,
  userName: 'zhangsan',
  password: '123456',
  nickName: '张三',
  createdAt: 2024-01-29T09:44:09.000Z,
  updatedAt: 2024-01-29T09:44:09.000Z
}


{ userName: 'zhangsan', nickName: '张三' }

```

```js
// 查询一个列表
const zhangsanBlogList = await Blog.findAll({
  where: {
    userId: zhangsan.dataValues.id,
  },
  order: [["id", "desc"]],
});
console.log(zhangsanBlogList.map((blog) => blog.dataValues));
```

```
[
  {
    id: 2,
    title: '标题2',
    content: '内容2',
    userId: 1,
    createdAt: 2024-01-29T09:44:09.000Z,
    updatedAt: 2024-01-29T09:44:09.000Z
  },
  {
    id: 1,
    title: '标题A',
    content: '内容A',
    userId: 1,
    createdAt: 2024-01-29T09:44:09.000Z,
    updatedAt: 2024-01-29T09:44:09.000Z
  }
]

```

分页

```js
//分页
const blogPageList = await Blog.findAll({
  limit: 3,
  offset: 0,
});
console.log(blogPageList.map((blog) => blog.dataValues));
```

总数

```js
// 查询总数
const blogLsitAndCount = await Blog.findAndCountAll({
  limit: 2,
  offset: 0,
  order: [["id", "desc"]],
});
console.log(
  blogLsitAndCount.count,
  blogLsitAndCount.rows.map((blog) => blog.dataValues)
);
```

```
20 [
  {
    id: 20,
    title: '标题4',
    content: '内容4',
    userId: 10,
    createdAt: 2024-01-29T09:55:55.000Z,
    updatedAt: 2024-01-29T09:55:55.000Z
  },
  {
    id: 19,
    title: '标题3',
    content: '内容3',
    userId: 10,
    createdAt: 2024-01-29T09:55:55.000Z,
    updatedAt: 2024-01-29T09:55:55.000Z
  }
]
```

## 2.6 Redis

【GeekHour】一小时 Redis 教程:

<https://www.bilibili.com/video/BV1Jj411D7oG/>

课程：第 3 章 技术选型和知识点介绍[下]

redis：内存数据库（缓存）

mysql：磁盘数据库

适用：公共数据，秒杀，热点数据，读多写少，微博广场页，数据一致，session

### 2.6.1 下载安装

windows：<https://github.com/tporadowski/redis/releases>

默认端口：6379

启动：redis-cli

值类型：string

设置值：set key value

获取值：get key

所有值：keys \*

删除值：del key

### 2.6.2 nodejs 操作 redis

/src/conf/db.js

代码文件注释(js doc)

```js
/**
 * @description 存储配置
 * @author 夜枫林
 */
```

/src/cache/\_redis.js

```js
/**
 * @description 连接 redis 的方法 get set
 * @author 夜枫林
 */
```

## 2.7 Cookie 和 Session

![Alt text](./img/session.png)

![Alt text](./img/sessionandredis.png)

session 数据隔离

解决方案

![Alt text](./img/webserver.png)

- 将 web server 和 redis 拆分为两个单独的服务

- 双方都是独立的，都是可扩展的(例如都扩展成集群)

- (包括 mysql，也是一个单独的服务，也可扩展)

为何 session 适合用 redis ?

- session 访问频繁，对性能要求极高

- session 可不考虑断电丢失数据的问题(内存的硬伤)

- session 数据量不会太大(相比于 mysql 中存储的数据)

为何网站数据不适合用 redis ?

操作频率不是太高(相比于 session 操作)

断电不能丢失，必须保留

数据量太大，内存成本太高

### jwt

jwt - json web token

用户认证成功之后，server 返回一个加密的 token 给浏览器

浏览器保存 token，每次请求都带上这个 token

server 验证 token，如果有效，返回数据

koa2 实现 jwt

### 2.7.1 session 存储 redis

### 2.7.2 koa2 中使用

## 2.8 Jest

定义：

单个功能或者接口，给定输入，得到输出，查看输出是否符合预期

需要手动编写用例代码，然后统一执行

意义：能一次性执行所有单测，短时间内验证所有功能是否正常

### 使用 jest

\*.test.js 文件

/test/demo.test.js

```js
/**
 * @description test demo
 * @author 夜枫林
 */

function sum(a, b) {
  return a + b;
}

test(" 10 + 20 应该等于三十", () => {
  const res = sum(10, 20);
  expect(res).toBe(30);
});
```

```
Administrator@DESKTOP-7JI4F1U MINGW64 /d/project/koa2-weibo-code (main)
$ npm run test

> koa2-weibo-code@0.1.0 test
> cross-env NODE_ENV=test jest --runInBand --forceExit --colors --detectOpenHandles

 PASS  test/demo.test.js
  √  10 + 20 应该等于三十 (4 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        0.822 s, estimated 1 s
Ran all test suites.
```

常用的断言

.toBe

.not.toBe

.toEqual

.not.toEqual

.toBeNull

.toBeUndefined

.toBeDefined

测试 http 接口

```
$ cnpm i supertest --save-dev
```

### 完善开发环境

#### Eslint

.eslintrc.js

```js
{
    "parser": "babel-eslint",
    "env": {
        "es6": true,
        "commonjs": true,
        "node": true
    },
    "rules": {
        "indent": [
            "error",
            4
        ],
        "quotes": [
            "error",
            "single",
            {
                "allowTemplateLiterals": true
            }
        ],
        "semi": [
            "error",
            "never"
        ]
    }
}
```

```
$ cnpm i eslint babel-eslint --save-dev
```

#### Inspect 调试

#### 404 和错误页
