# 软件调试

## 发送指令

#### 代码逻辑

1 建立TCP服务

2 将所有客户端存入数组

3 监听客户端、发送指令

4 打印返回

```js
var net = require('net');
var TCP_PORT = 17100;
var HOST = '0.0.0.0';
var tcpClients = {};

var tcpServer = net.createServer(function (socket) {
    var addr = socket.remoteAddress + ':' + socket.remotePort;
    console.log('TCP Server connected:' + addr);
    tcpClients[addr] = socket;
    clientList = Object.keys(tcpClients);
    console.log('tcpClients.length: ' + Object.keys(tcpClients).length + '    clientsList: ' + clientList);

    // 发送指令
    const hexData = '120302580008C6C4';
    tcpClients[addr].write(Buffer.from(hexData, 'hex'));

    // 接收数据
    socket.on('data', function (data) {
        console.log('TCP Server recieve data from:' + addr);
        console.log('Received data in hex: ' + data.toString('hex'));
    })

    socket.on('close', function () {
        console.log('TCP Server closed:' + addr);
        delete tcpClients[addr];
        console.log('tcpClients.length: ' + Object.keys(tcpClients).length + '    clientsList: ' + clientList);
    })
    socket.on('error', function (err) {
        console.log(err);
    })
});

tcpServer.on("error", function (err) {
    console.log("TCP Server error:" + err.message);
})

tcpServer.listen(TCP_PORT, HOST, function () {
    console.log('TCP Server Listening on : ' + TCP_PORT);
});
```