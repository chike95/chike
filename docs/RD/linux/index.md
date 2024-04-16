# linux

### 查看端口使用情况

```sh
netstat -tuln

netstat -tuln | grep 8081
```

- t: 显示 TCP 端口
- u: 显示 UDP 端口
- l: 仅显示监听的端口
- n: 以数字形式显示端口和 IP 地址，而不是尝试解析成主机名

  ![alt text](img/image.png)
