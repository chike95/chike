# KOA2

中文文档：<https://koa.bootcss.com/index.html#>

入门视频：<https://www.bilibili.com/video/BV18h411H7GE>

编写服务程序

导入 koa 包

实例化 app 对象

编写中间件

启动服务

## 中间件

定义：在请求和响应中间的处理程序（函数）

#### 链式调用

### 洋葱圈模型

原因：递归

### 异步操作

## 路由

## 相关插件

### koa-redis

koa2 新浪微博 /src/cache/\_redis.js

```js
/**
 * @description 连接 redis 的方法 get set
 * @author 夜枫林
 */

const redis = require("redis");
const { REDIS_CONF } = require("../conf/db");

// 创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host);

redisClient.on("error", (err) => {
  console.error(err);
});

/**
 * redis set
 * @param {string} key 键
 * @param {string} val 值
 * @param {number} timeout 过期时间，单位：s
 */
function set(key, val, timeout = 60 * 60) {
  if (typeof val === "object") {
    val = JSON.stringify(val);
  }
  redisClient.set(key, val);
  redisClient.expire(key, timeout);
}

/**
 * redis get
 * @param {string} key 键
 */
function get(key) {
  return new Promise((resolve, reject) => {
    redisClient.get(key, (err, val) => {
      if (err) {
        reject(err);
        return;
      }
      if (null) {
        resolve(null);
        return;
      }
      try {
        resolve(JSON.parse(val));
      } catch (e) {
        resolve(val);
      }
    });
  });
}

module.exports = {
  set,
  get,
};
```

### koa-session

app.js

```js
const session = require("koa-generic-session");
const redisStore = require("koa-redis");
const { REDIS_CONF } = require("./conf/db");

// 3-5 session 配置
app.keys = [SESSION_SECRET_KEY]; // 设置session的密钥，用于加密session数据。
app.use(
  session({
    key: "weibo.sid", // cookie name (default is koa.sid)
    prefix: "weibo:sess:", // 前缀：cookie prefix (default is empty string)
    cookie: {
      path: "/", // cookie的path (default is '/')
      httpOnly: true, // 是否只允许http访问cookie (default is true)
      maxAge: 24 * 60 * 60 * 1000, // cookie的过期时间 maxAge in ms
    },
    // ttl: 24 * 60 * 60 * 1000,
    store: redisStore({
      all: `${REDIS_CONF.host}:${REDIS_CONF.port}`,
    }),
  })
);
```

## 源码分析
