# TCP

node 模块：net


## 创建服务器

### 服务器端

```js
const net = require('net')

// 创建服务端实例
const PORT = 9002
const HOST = '127.0.0.1'

const tcpServer = net.createServer((socket) => {
    socket.on('data', (data) => {
        let msg = data.toString()
        console.log(msg);
    })

    socket.on('end', () => {
        console.log('客户端断开连接')
    })

    socket.write('hello client\n')
})

tcpServer.listen(PORT, HOST, () => {
    console.log(`tcpServer listening on ${HOST}:${PORT}`)
})

tcpServer.on('close', () => {
    console.log('tcpServer关闭');
})

tcpServer.on('error', (err) => {
    if (err.code == 'EADDRINUSE') {
        console.log('端口被占用')
    } else {
        console.log(err);
    }
})
```

### 客户端

```js
const net = require('net');
const client = net.createConnection({ port: 9002, host: '127.0.0.1' })

client.on('connect', () => {
    console.log('client connected');
    client.write('hello server!\r\n');
});
client.on('data', function (data) {
    console.log(data.toString());
});
client.on('end', () => {
    console.log('client disconnected');
})


```

## 通信事件

### 连接事件

### 数据事件

### 错误事件

### 关闭事件