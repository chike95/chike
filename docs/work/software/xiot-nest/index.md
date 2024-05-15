# Nest 健康监测系统

## 开发流程

需求分析和规划
确定系统功能和需求：包括数据采集、数据处理、数据存储、数据提供接口等。
确定系统的技术栈和架构：NestJS、TCP/UDP通讯、MySQL数据库等。
2. 项目初始化
创建一个新的NestJS项目。
配置项目的基本设置，如端口号、数据库连接等。
3. TCP/UDP通讯模块开发
使用NestJS的模块化结构创建一个专门处理TCP/UDP通讯的模块。
使用Node.js的net或dgram模块实现TCP/UDP通讯功能。
接收传感器和采集模块发送的数据，并将数据传递给数据处理模块。
4. 数据处理模块开发
创建一个数据处理模块，负责接收从TCP/UDP通讯模块传来的数据。
对接收到的数据进行必要的转换和处理，确保数据格式的统一性和准确性。
将处理后的数据传递给数据存储模块。
5. 数据存储模块开发
使用NestJS的数据库模块连接MySQL数据库。
创建相应的实体（Entity）和存储库（Repository）来定义数据模型和进行数据库操作。
将处理后的数据存储到MySQL数据库中。
6. 接口开发
使用NestJS创建RESTful API接口，将存储在数据库中的数据提供给前端开发者。
设计和实现必要的接口路由、控制器和服务。
使用DTO（数据传输对象）确保数据的有效验证和格式化输出。
7. 测试和调试
编写单元测试和集成测试，确保系统的各个模块和功能的稳定性和可靠性。
使用Postman或类似工具测试API接口的功能和性能。
8. 部署和监控
部署系统到服务器上，并确保系统的高可用性和可扩展性。
使用监控工具（如Prometheus、Grafana等）监控系统的运行状态和性能指标，及时发现和解决问题。

## 需求分析和项目规划

采集、展示

## 技术架构

前端：

- Vue-Vben-Admin

后端

- nodejs
- nestjs

## 前端

### Spring 接口测试

测试项目：<http://58.247.45.77:53501/>

### 登录页

### 菜单栏

### 实时监测

### 历史数据

### 参数配置

### 用户中心

## 后端

### 模块划分

1. 用户认证模块 (Auth Module)
   这个模块负责处理用户身份验证和授权，包括注册、登录、令牌生成和验证等功能。

2. 设备管理模块 (Device Module)
   该模块用于管理物联网设备，包括设备的注册、删除、更新等操作。

3. 数据采集模块 (Data Collection Module)
   数据采集模块负责接收来自物联网设备的数据，并将数据存储到数据库中。它可能包括数据处理、验证和转换等功能。

4. 数据查询模块 (Data Query Module)
   这个模块提供 API 接口，允许用户查询存储在数据库中的数据。它可以支持各种查询操作，如按时间范围查询、按设备查询等。

5. 日志记录模块 (Logging Module)
   日志记录模块负责记录系统运行时的各种事件和错误信息，以便进行故障排除和监控。

6. 配置模块 (Configuration Module)
   配置模块负责管理应用程序的配置信息，如数据库连接信息、日志记录级别等。

7. 共享模块 (Shared Module)
   共享模块包含多个模块之间共享的代码、服务和工具函数，以避免重复编写代码。

8. 测试模块 (Test Module)
   测试模块包含单元测试和集成测试，用于确保应用程序的质量和稳定性。

9. 其他功能模块 (Other Feature Modules)
   根据具体需求，你可能还需要其他功能模块，如报警模块、数据分析模块等。
