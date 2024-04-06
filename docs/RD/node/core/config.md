## 基本知识

### 是什么？

js 运行环境：比较著名的引擎是 chrome 的 v8，它是由 c++编写的，而且它有个特点可以内置到其他 C++程序中，这就为 node.js 的实现提供的基础。可以把 nodejs 简单来理解为使用 v8 引擎可以解析 javascript 语法，同时也可以调用 c++功能进行文件操作，网络通信等系统操作功能。

### 做什么？

后端 web 服务器与网络爬虫

脚手架命令行工具

图像界面开发

## 下载安装

### windows

官网访问 <https://nodejs.org/> ,下载 LTS 版本，长期支持稳定。

安装后执行以下命令，查看安装的 nodejs 版本

```sh
lxm18@lxm_hp MINGW64 /e/chike (main)
$ node -v
v20.5.1

lxm18@lxm_hp MINGW64 /e/chike (main)
$ npm -v
9.8.1
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

## 库管理

### npm

### pnpm

## 版本控制：nvm
