# 一、系统安装

阿里源：<https://blog.csdn.net/lx7820336/article/details/124703404>

## 1.1 Ubuntu Server

1. 选择系统语言-English

![Alt text](./img/1601.png)

2. 选择操作-Install Ubuntu Server

![Alt text](./img/1602.png)

3. 选择安装过程和系统的默认语言-English

![Alt text](./img/1603.png)

4.选择区域-other

![Alt text](./img/1604.png)

5. 选择亚洲-Asia

![Alt text](./img/1605.png)

6. 选择国家-China

![Alt text](./img/1606.png)

7. 选择字符集编码-United States

![Alt text](./img/1607.png)

8. 是否检测键盘布局，选择No

![Alt text](./img/1608.png)

9. 选择键盘类型-English (US)

![Alt text](./img/1609.png)

10.选择键盘布局-English (US)

![Alt text](./img/1610.png)

11. 配置网络，选择Continue

![Alt text](./img/1611.png)

12. 选择手动配置网络-configure network manually

![Alt text](./img/1612.png)

13. 设置主机ip: 192.168.30.100

![Alt text](./img/1613.png)

14. 设置主机子网掩码: 255.255.255.0

![Alt text](./img/1614.png)

15. 设置主机网关: 192.168.30.1

![Alt text](./img/1615.png)

16. 设置主机dns: 192.168.30.1

![Alt text](./img/1616.png)

17. 设置主机名(项目名称-taizhou)

![Alt text](./img/1617.png)

18. 设置域名-可以选择不填，直接Continue

![Alt text](./img/1618.png)

19. 设置用户名（tonglei）-Continue

![Alt text](./img/1619.png)

20. 设置登陆账号（tonglei）-Continue

![Alt text](./img/1620.png)

21. 设置登录密码（空格选择“Show Password in Clear”可以显示密码）-Continue

![Alt text](./img/1621.png)

22. 重复上一步设置的登录密码-Continue

23. 是否使用弱密码，选择是-Yes

![Alt text](./img/1623.png)

24. 是否加密home文件夹，选择否-No

![Alt text](./img/1624.png)

25. 确认时区是否正确(这里是“Asia/Shanghai”或者“Asia/Shanghai”都可以)，选择是-Yes

![Alt text](./img/1625.png)

26. 选择分区方式(分区向导-使用整个磁盘和设置逻辑分区LVM)-“Guided-use entire disks and set up LVM”

也可以不分区：“Guided-use entire disk”

![Alt text](./img/1626.png)

27. 选择要分区的磁盘(这里只有一块)-“SCSI3 （0,0,0）(sda) -53.7GB VMware Virtual disk”

![Alt text](./img/1627.png)

28. 是否将变更写入磁盘，选择是-Yes

![Alt text](./img/1628.png)

29. 用于指导分区的卷组数量,默认即可，选择-Continue

![Alt text](./img/1629.png)

30. 是否写入变更的磁盘，选择是-Yes

![Alt text](./img/1630.png)

31. 设置HTTP代理，无需填写直接下一步-Continue

![Alt text](./img/1631.png)

32. 设置系统升级方式，选择没有自动更新-No automatic updates

![Alt text](./img/1632.png)

33. 选择要安装的软件，选择：lamp server 和 OpenSSH Server，然后下一步-Continue

![Alt text](./img/1633.png)

34. 是否安装GRUB引导程序，选择是-Yes

![Alt text](./img/1634.png)

35.完成安装，选择下一步-Continue

![Alt text](./img/1635.png)

36.系统安装完会自动启动主机

![Alt text](./img/1636.png)

37.输入设置好的登录账户和密码就可以开始使用了

![Alt text](./img/1637.png)


## 1.2 硬盘挂载

参考链接：<https://blog.csdn.net/tiansyun/article/details/131258926>

（1）检查硬盘：

插入要挂载的硬盘，确保系统能够正确识别它。您可以使用以下命令查看已连接的硬盘列表：
```
sudo fdisk -l
```

```sh
tonglei@zhongchuanjichang:/srv$ sudo fdisk -l
Disk /dev/sda: 119.2 GiB, 128035676160 bytes, 250069680 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disklabel type: gpt
Disk identifier: DA596F5B-3DD5-40E5-AD14-F7E40B2EADC5

Device       Start       End   Sectors   Size Type
/dev/sda1     2048   1050623   1048576   512M EFI System
/dev/sda2  1050624 250068991 249018368 118.8G Linux filesystem


Disk /dev/sdb: 1.8 TiB, 2000398934016 bytes, 3907029168 sectors
Units: sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 4096 bytes
I/O size (minimum/optimal): 4096 bytes / 4096 bytes
Disklabel type: dos
Disk identifier: 0x949209bd

Device     Boot Start        End    Sectors  Size Id Type
/dev/sdb1        2048 3907026943 3907024896  1.8T  7 HPFS/NTFS/exFAT 
```

找到 2TB 硬盘的设备标识符：/dev/sdb1

格式化硬盘：
```sh
tonglei@zhongchuanjichang:/srv$ sudo mkfs.ext4 /dev/sdb1

mke2fs 1.44.1 (24-Mar-2018)
/dev/sdb1 contains a ntfs file system
Proceed anyway? (y,N) 
```
硬盘 /dev/sdb1 上包含的是 NTFS 文件系统。如果你想将其格式化为 ext4 文件系统，需要先确认是否要继续进行该操作。

请注意，格式化会删除硬盘上的所有数据，因此在执行格式化之前，请确保你已经备份了重要的数据。如果你确定要继续格式化操作，请输入 y 并按下 Enter 键。如果你不想继续，请输入 N 并按下 Enter 键。

（2）创建一个用于挂载的目录。运行以下命令创建 /srv/data 目录：
```
sudo mkdir /srv/data
```

（3）将硬盘挂载到 /srv/data 目录。运行以下命令：
```
sudo mount /dev/sdb1 /srv/data
```

这将临时挂载硬盘到 /srv/data 目录。

（5）如果你希望系统重启后仍然保持挂载状态，需要更新 /etc/fstab 文件。运行以下命令打开 /etc/fstab 文件进行编辑：
```
sudo nano /etc/fstab
```
（6）在文件的末尾添加以下行：
```
/dev/sdb1  /srv/data  ext4  defaults  0  2
```

保存并关闭文件（使用 Ctrl + X，然后按 Y 和 Enter）。

（7）如果您想要卸载挂载的硬盘，可以执行以下命令：
```
sudo umount /srv/data
```

（8）要查看硬盘的使用状态，你可以使用 df 命令。运行以下命令可以获取硬盘的使用情况：
```
df -h
```

这将显示系统中所有挂载点的磁盘空间使用情况，包括硬盘的使用情况。

如果你只想查看特定硬盘（例如 /dev/sdb1）的使用情况，可以运行以下命令：
```
df -h /dev/sdb1
```

这将仅显示 /dev/sdb1 硬盘的使用情况。请注意，/dev/sdb1 在查看之前必须已经被挂载。

## 1.3 网络管理

### 1.3.1 修改 IP

```
ls /etc/netplan
```
> 01-netcfg.yaml [文件名具体看情况]

sudo vim 01-netcfg.yaml
按照如下内容编辑（冒号后面有空格）

![Alt text](./img/changeip.png)

(enp5s0:注意需要通过ifconfig –a 确认)
```
# This file describes the network interfaces available on your system
# For more information, see netplan(5).
network:
  version: 2
  renderer: networkd
  ethernets:
    enp1s0:
      dhcp4: no
      addresses: [192.168.30.100/24]
      optional: true
      gateway4: 192.168.30.1
      nameservers:
              addresses: [192.168.30.1]
    enp2s0:
      dhcp4: true
```

保存并退出

应用配置
```
sudo netplan apply
```

重启网卡服务
```
sudo service networking restart
```

https://www.136.la/nginx/show-54974.html

查看ip
```
ifconfig
```

![Alt text](./img/ifconfig.png)
