


## 基本知识

### 是什么？

非独立编程语言或者框架

js运行环境：比较著名的引擎是chrome 的v8，它是由c++编写的，而且它有个特点可以内置到其他C++程序中，这就为node.js的实现提供的基础。可以把nodejs简单来理解为使用v8引擎可以解析javascript语法，同时也可以调用c++功能进行文件操作，网络通信等系统操作功能。

### 做什么？

后端web服务器与网络爬虫

脚手架命令行工具

图像界面开发


## 下载安装

### windows

官网访问 <https://nodejs.org/zh-cn/> ,下载LTS版本，因为nodejs是开源的你也可以访问github (opens new window)了解源码。

安装后执行以下命令，查看安装的nodejs版本

```ssh
node -v
```

### linux

```ssh
sudo apt-get install node.js
```

查看版本

```ssh
node --version
```

### 运行代码

```ssh
node hello.js
```


## 类型支持

