# 三、程序部署

## 3.1 文件迁移

### 3.1.1 配置修改



## 3.2 数据库

## 3.3 开机自启

参考教程：

<https://blog.csdn.net/djstavaV/article/details/88166805>

<https://xugaoxiang.com/2019/12/05/systemd-rc-local-on-boot/>

### 3.3.1 建立rc-local.service
```
sudo vim /etc/systemd/system/rc-local.service
```

将下列内容复制进rc-local.service文件
```
[Unit]
Description=/etc/rc.local Compatibility
ConditionPathExists=/etc/rc.local
 
[Service]
Type=forking
ExecStart=/etc/rc.local start
TimeoutSec=0
StandardOutput=tty
RemainAfterExit=yes
SysVStartPriority=99
 
[Install]
WantedBy=multi-user.target
```
### 3.3.2 创建rc.local
```
sudo vim /etc/rc.local
```

下列内容复制进rc.local文件

tomcat 项目配置

```
#!/bin/sh -e
#
# rc.local
#
# This script is executed at the end of each multiuser runlevel.
# Make sure that the script will "exit 0" on success or any other
# value on error.
#
# In order to enable or disable this script just change the execution
# bits.
#
# By default this script does nothing.
#!bin/bash -e
time=$(date "+%Y-%m-%d %H:%M:%S")
su root

sudo autossh -M 50721 -fCNR '*:50722:127.0.0.1:22' root@123.206.175.241 &

cd /srv/project/donganhu
./start-t.sh
cd /srv/apache-tomcat-7.0.63/bin
./startup.sh
echo '${time} restart autossh at 50522' >> /srv/project/donganhu/restart.log
echo 'donganhu-t jar restarted!' >> /srv/project/donganhu/restart.log
exit 0
```

这段脚本是一个启动脚本，通常用于在系统启动后执行一些必要的操作。根据脚本的内容，它执行以下操作：

    获取当前时间并将其保存到变量 time 中。
    使用 su root 切换到 root 用户。请注意，这里没有提供密码，所以需要确认系统已经配置为允许该用户无需密码切换到 root 用户。
    使用 autossh 命令建立一个反向 SSH 隧道，将远程主机的 22 端口映射到本地的 50722 端口。这样可以实现对远程主机的安全访问。
    切换到 /srv/project/donganhu 目录，并执行名为 start-t.sh 的脚本。
    切换到 /srv/apache-tomcat-7.0.63/bin 目录，并执行 startup.sh 脚本，启动 Tomcat 服务器。
    将重启信息和日志记录到 /srv/project/donganhu/restart.log 文件中。
    最后，脚本退出。


springboot 项目配置
```
#!/bin/sh -e
#
# rc.local
#
# This script is executed at the end of each multiuser runlevel.
# Make sure that the script will "exit 0" on success or any other
# value on error.
#
# In order to enable or disable this script just change the execution
# bits.
#
# By default this script does nothing.

#!bin/bash -e
time=$(date "+%Y-%m-%d %H:%M:%S")
su ysb

sudo autossh -M 50755 -fCNR '*:50754:127.0.0.1:22' root@123.206.175.241 &
sudo autossh -M 50766 -fCNR '*:50763:127.0.0.1:8010' root@123.206.175.241 &

cd /srv/project/
./start.sh
echo ${time}' restart autossh' >> /srv/project/restart.log
echo 'tl-twg jar restarted!' >> /srv/project/restart.log
exit 0
```


这段脚本也是一个启动脚本，和之前的脚本类似，它执行以下操作：

    获取当前时间并将其保存到变量 time 中。
    使用 su ysb 切换到名为 ysb 的用户。
    使用 autossh 命令建立两个反向 SSH 隧道，将远程主机的 22 端口映射到本地的 50754 端口和远程主机的 8010 端口映射到本地的 50763 端口。这样可以实现对远程主机的安全访问。
    切换到 /srv/project/ 目录，并执行名为 start.sh 的脚本。
    将重启信息和日志记录到 /srv/project/restart.log 文件中。
    最后，脚本退出。

