# 端口分配

## 123.206.175.241

### 中川机场

本地：40001

远程：40002

### 泰康

2024-04-15

本地：40022

远程：40023

命令

```sh
sudo autossh -M 40022 -fCNR '*:40023:127.0.0.1:22' root@123.206.175.241
```

## 58.247.45.77

### 泰康

2024-04-17

网页：53501

传感器：53502

```bash
#!/bin/bash
su root

cd /srv/project
./start.sh
autossh -M 40021 -fCNR '*:40022:127.0.0.1:22' ubuntu@123.206.175.241 -o ServerAliveInterval=60 &
autossh -M 50553 -fCNR '*:50552:127.0.0.1:22' ubuntu@123.206.175.241 -o ServerAliveInterval=60 &
autossh -M 50551 -fCNR '*:50550:127.0.0.1:8098' ubuntu@123.206.175.241 -o ServerAliveInterval=60 &
echo "autossh started!" > /usr/local/assh.log

exit 0

```

### 新天地

2024-04-17

网页：53591

应变：53592
