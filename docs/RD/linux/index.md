# linux

## 未分类

### 查看系统信息

```bash
ubuntu@ubuntu:/etc/apt$ uname -a

Linux ubuntu 3.4.39 #50 SMP PREEMPT Fri Jul 29 10:10:50 CST 2022 armv7l armv7l armv7l GNU/Linux
```

### 重启网络服务

```bash
sudo systemctl restart NetworkManager

或者

sudo service network-manager restart
```

### 内存情况

```bash
free -h
```

### 硬盘情况

```bash
df -h
```

### 清理磁盘

清理下载的软件包的缓存

```bash
sudo apt-get autoclean
sudo apt-get clean

```

### 查看端口使用情况

```sh
netstat -an
netstat -an|grep 40023


netstat -tuln
netstat -tuln | grep 8081
```

- t: 显示 TCP 端口
- u: 显示 UDP 端口
- l: 仅显示监听的端口
- n: 以数字形式显示端口和 IP 地址，而不是尝试解析成主机名

  ![alt text](img/image.png)

## 文件处理

### 创建文件

```bash
touch ~
```

### 复制文件

```bash
cp /etc/project/myfile.txt /home/myfolder
```

### 创建文件夹

```bash
mkdir myfolder

```

### 移动文件

```bash
mv /etc/project/myfile.txt /home/myfolder
```

### 删除文件

```bash
rm -r myfolder
```

### 实时输出文件内容

```bash
tail -f tl-whal.log
```

## 软件

### 7zip 解压

```bash
sudo apt update

sudo apt install p7zip-full

7z x node_modules.7z
```

## 源头

### arm 源

```bash
sudo vim /etc/apt/sources.list
```

```bash
# See http://help.ubuntu.com/community/UpgradeNotes for how to upgrade to
# newer versions of the distribution.
deb http://mirrors.ustc.edu.cn/ubuntu-ports/ bionic main restricted
# deb-src http://mirrors.ustc.edu.cn/ubuntu-ports/ bionic main restricted

## Major bug fix updates produced after the final release of the
## distribution.
deb http://mirrors.ustc.edu.cn/ubuntu-ports/ bionic-updates main restricted
# deb-src http://mirrors.ustc.edu.cn/ubuntu-ports/ bionic-updates main restricted

## N.B. software from this repository is ENTIRELY UNSUPPORTED by the Ubuntu
## team. Also, please note that software in universe WILL NOT receive any
## review or updates from the Ubuntu security team.
deb http://mirrors.ustc.edu.cn/ubuntu-ports/ bionic universe
# deb-src http://mirrors.ustc.edu.cn/ubuntu-ports/ bionic universe
deb http://mirrors.ustc.edu.cn/ubuntu-ports/ bionic-updates universe
# deb-src http://mirrors.ustc.edu.cn/ubuntu-ports/ bionic-updates universe

## N.B. software from this repository is ENTIRELY UNSUPPORTED by the Ubuntu
## team, and may not be under a free licence. Please satisfy yourself as to
## your rights to use the software. Also, please note that software in
## multiverse WILL NOT receive any review or updates from the Ubuntu
## security team.
deb http://mirrors.ustc.edu.cn/ubuntu-ports/ bionic multiverse
# deb-src http://mirrors.ustc.edu.cn/ubuntu-ports/ bionic multiverse
deb http://mirrors.ustc.edu.cn/ubuntu-ports/ bionic-updates multiverse
# deb-src http://mirrors.ustc.edu.cn/ubuntu-ports/ bionic-updates multiverse

## N.B. software from this repository may not have been tested as
## extensively as that contained in the main release, although it includes
## newer versions of some applications which may provide useful features.
## Also, please note that software in backports WILL NOT receive any review
## or updates from the Ubuntu security team.
deb http://mirrors.ustc.edu.cn/ubuntu-ports/ bionic-backports main restricted universe multiverse
# deb-src http://mirrors.ustc.edu.cn/ubuntu-ports/ bionic-backports main restricted universe multiverse

## Uncomment the following two lines to add software from Canonical's
## 'partner' repository.
## This software is not part of Ubuntu, but is offered by Canonical and the
## respective vendors as a service to Ubuntu users.
# deb http://archive.canonical.com/ubuntu bionic partner
# deb-src http://archive.canonical.com/ubuntu bionic partner

deb http://mirrors.ustc.edu.cn/ubuntu-ports/ bionic-security main restricted
# deb-src http://mirrors.ustc.edu.cn/ubuntu-ports/ bionic-security main restricted
deb http://mirrors.ustc.edu.cn/ubuntu-ports/ bionic-security universe
# deb-src http://mirrors.ustc.edu.cn/ubuntu-ports/ bionic-security universe
deb http://mirrors.ustc.edu.cn/ubuntu-ports/ bionic-security multiverse
# deb-src http://mirrors.ustc.edu.cn/ubuntu-ports/ bionic-security multiverse


#deb http://mirrors.aliyun.com/ubuntu/ bionic main restricted universe multiverse
#deb-src http://mirrors.aliyun.com/ubuntu/ bionic main restricted universe multiverse
#deb http://mirrors.aliyun.com/ubuntu/ bionic-security main restricted universe multiverse
#deb-src http://mirrors.aliyun.com/ubuntu/ bionic-security main restricted universe multiverse
#deb http://mirrors.aliyun.com/ubuntu/ bionic-updates main restricted universe multiverse
#deb-src http://mirrors.aliyun.com/ubuntu/ bionic-updates main restricted universe multiverse
#deb http://mirrors.aliyun.com/ubuntu/ bionic-backports main restricted universe multiverse
#deb-src http://mirrors.aliyun.com/ubuntu/ bionic-backports main restricted universe multiverse
#deb http://mirrors.aliyun.com/ubuntu/ bionic-proposed main restricted universe multiverse
#deb-src http://mirrors.aliyun.com/ubuntu/ bionic-proposed main restricted universe multiverse

```

```bash
sudo apt-get update
```
