# 功能代码

## TcpServer

这段代码是一个基于 Node.js 中 net 模块实现的简单的 TCP 服务器类 TcpServer。

```js
const net = require("net");

class TcpServer extends net.Server {
  constructor(address, port) {
    super();
    this.address = address; //127.0.0.1是监听本机 0.0.0.0是监听整个网络
    this.port = port; //监听端口
    this.timeout = 0; //超时时间(单位：毫秒)
    this.clients = []; //客户端信息
  }

  start() {
    this.listen(this.port, this.address);
    this.on("connection", this._handleConnection.bind(this));
    this.on("listening", () => {
      console.log("Server listening: %s:%s.", this.address, this.port);
    });
    this.on("error", (err) => {
      console.log("Server error: %s.", err);
    });
  }

  _handleConnection(socket) {
    this.clients.push({
      socket: socket,
      ip: socket.remoteAddress,
      port: socket.remotePort,
    });
    const client = this.getClient("socket", socket);
    if (this.timeout !== 0) {
      client.lastTime = Date.now();
      client.interval = setInterval(() => {
        if (Date.now() - client.lastTime > this.timeout) {
          this.closeClient(client);
        }
      }, this.timeout);
    }
    this.emit("connect", client);

    socket.on("data", (data) => {
      if (this.timeout !== 0) {
        client.lastTime = Date.now();
      }
      client.data = data;
      this.emit("data", client, data);
    });
    socket.on("close", () => {
      this.closeClient(client);
    });
    socket.on("error", (err) => {
      this.closeClient(client);
    });
  }

  setTimeout(time) {
    this.timeout = time;
  }
  getClient(where, val) {
    for (let i = 0; i < this.clients.length; i++) {
      if (this.clients[i][where] == val) {
        return this.clients[i];
      }
    }
    return null; // 添加默认返回值
  }
  closeClient(client) {
    clearInterval(client.interval); //停止超时判定
    this.emit("close", client);
    client.socket.destroy();
    const index = this.clients.findIndex((c) => c === client);
    if (index !== -1) {
      this.clients.splice(index, 1);
    }
  }

  broadcast(data) {
    for (let i = 0; i < this.clients.length; i++) {
      this.clients[i].socket.write(data);
    }
  }
}

module.exports = TcpServer;
```

主要功能包括：

    1. 构造函数：接收地址和端口参数，并初始化一些属性，如地址、端口、超时时间、客户端数组。
    2. start 方法：启动服务器并监听指定的地址和端口，同时注册 connection、listening、error 事件的处理函数。
    3. _handleConnection 方法：处理客户端连接事件，将客户端信息存储到 clients 数组中，监听客户端的 data、close、error 事件，并触发相应的事件。
    4. setTimeout 方法：设置超时时间。
    5. getClient 方法：根据条件查找并返回对应的客户端信息。
    6. closeClient 方法：关闭客户端连接，并从 clients 数组中移除相应的客户端信息。
    7. broadcast 方法：向所有客户端发送数据。

整体来说，该代码实现了一个简单的 TCP 服务器，可以接收客户端连接并进行数据通信，支持设置超时时间和广播消息给所有客户端。需要注意的是，该代码还可以进一步完善，比如添加错误处理机制、优化客户端查找方法等。
