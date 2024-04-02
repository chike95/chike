# Redis

## 基础内容

redis：内存数据库 非关系型数据库 key-value 数据库

优点：速度快、类型多

### 下载安装

官网： <https://redis.io/download/>

中文： <http://www.redis.cn/>

github：<https://github.com/MSOpenTech/redis/releases>

Linux 安装

可以直接用命令下载：

    wget http://download.redis.io/releases/redis-5.0.4.tar.gz

安装 Redis Desktop Manage 管理工具

Another Redis Desktop Manager（goanother.com/cn/）

默认服务：

    127.0.0.1:6379

### 启动

    redis-server

启动临时服务：redis-server.exe redis.windows.conf

(备注：通过这个命令，会创建 Redis 临时服务，不会在 window Service 列表出现 Redis 服务名称和状态，此窗口关闭，服务会自动关闭。)

### 关闭

    redis-cli shutdown

    exit

### 连接

    redis-cli -h 127.0.0.1 -p 6379

### 数据类型

    string  字符串
    hash    哈希
    list    列表
    set     集合
    zset    有序集合

### 常用命令

查看当前数据库中 key 的数目：dbsize

使用其他数据库，命令是 select index

删除当前库的数据：flushdb

删除所有库的数据：flushall

    set key value
    get key
    del key             删除存在的key
    keys *              查询所有 key
    exists key          key 是否存在
    type key            查看key 所存储值的数据类型
    expire key seconds
    incr key
    decr key
    incrby key increment
    decrby key decrement
    mget key1 key2 ...
    mset key1 value1 key2 value2

## nodejs

安装插件：

    npm install redis -d

### 连接

```js
// 引入 redis 包
const redis = require("redis");

// 创建客户端
const client = redis.createClient({
  host: "196.120.002.225",
  port: 6379,
  no_ready_check: true,
  auth_pass: 123456,
});

// 监听连接事件
client.on("connect", () => {
  console.log("Connected to Redis server");
});

// 监听错误事件
client.on("error", (err) => {
  console.error("Error:", err);
});

// 设置键值对
client.set("key", "value", (err, reply) => {
  if (err) {
    console.error("Error:", err);
  } else {
    console.log("Set key:", reply);
  }
});

// 获取键值对
client.get("key", (err, reply) => {
  if (err) {
    console.error("Error:", err);
  } else {
    console.log("Get key:", reply);
  }
});

// 暴露 client 实例
module.exports = client;
```
