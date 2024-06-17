# 通信原理

### ModBus

ModBus 是工业领域标准通信协议，1979 年由莫迪康开发的应用层报文传输协议，包括 ASCII、RTU、TCP 等。TCP 和 RTU 比 ASCII 常见，其中 TCP 的使用频率更高一些。

#### 基本概念

MODBUS 是 OSI 模型第 7 层上的应用层报文传输协议，它在连接至不同类型总线或网络的设备之间提供客户机/服务器通信。

MODBUS 支持主从通信模式（Master-Slave），是一个请求/应答协议，并且提供功能码规定的服务。MODBUS 功能码是 MODBUS 请求/应答 PDU 的元素。

互联网组织能够使 TCP/IP 栈上的保留系统端口 502 访问 MODBUS。

#### Modbus 帧结构

（1）地址域

- 标识连接到网络上的从设备的地址。
- 地址范围从 1 到 247，0 用于广播。

（2）功能码

- 标识要执行的操作类型，如读、写等。

（3）数据域

- 包含具体的命令数据，如寄存器地址和数据值。
- 数据长度和格式取决于功能码和具体操作。

（4）错误检查域

- 用于检测数据传输中的错误。
- Modbus RTU 使用 CRC（循环冗余校验），Modbus ASCII 使用 LRC（纵向冗余校验）。

#### Modbus RTU

- 数据格式：二进制
- 传输介质：RS-232、RS-485 等
- 帧结构：起始位、地址域、功能码、数据域、CRC 校验

#### Modbus TCP

- 数据格式：二进制
- 传输介质：以太网
- 帧结构：MBAP 报头、功能码、数据域

#### Modbus ASCII

- 数据格式：ASCII 字符
- 传输介质：RS-232、RS-485 等
- 帧结构：起始字符、地址域、功能码、数据域、LRC 校验、结束字符

#### 存储区(寄存器)

<!-- ![Alt text](./img/cunchuqu.png) -->

<table><thead><tr><th style="text-align: left;"><div><div class="table-header"><p>寄存器种类</p></div></div></th><th style="text-align: left;"><div><div class="table-header"><p>数据类型</p></div></div></th><th style="text-align: left;"><div><div class="table-header"><p>访问类型</p></div></div></th><th style="text-align: left;"><div><div class="table-header"><p>功能码</p></div></div></th></tr></thead><tbody><tr><td style="text-align: left;"><div><div class="table-cell"><p>线圈</p></div></div></td><td style="text-align: left;"><div><div class="table-cell"><p>位</p></div></div></td><td style="text-align: left;"><div><div class="table-cell"><p>读写</p></div></div></td><td style="text-align: left;"><div><div class="table-cell"><p>01H  05H  0FH</p></div></div></td></tr><tr><td style="text-align: left;"><div><div class="table-cell"><p>离散输入</p></div></div></td><td style="text-align: left;"><div><div class="table-cell"><p>位</p></div></div></td><td style="text-align: left;"><div><div class="table-cell"><p>读写(主站只读)</p></div></div></td><td style="text-align: left;"><div><div class="table-cell"><p>02H</p></div></div></td></tr><tr><td style="text-align: left;"><div><div class="table-cell"><p>保持寄存器</p></div></div></td><td style="text-align: left;"><div><div class="table-cell"><p>字</p></div></div></td><td style="text-align: left;"><div><div class="table-cell"><p>读写</p></div></div></td><td style="text-align: left;"><div><div class="table-cell"><p>04H</p></div></div></td></tr><tr><td style="text-align: left;"><div><div class="table-cell"><p>输入寄存器</p></div></div></td><td style="text-align: left;"><div><div class="table-cell"><p>字</p></div></div></td><td style="text-align: left;"><div><div class="table-cell"><p>读写(主站只读)</p></div></div></td><td style="text-align: left;"><div><div class="table-cell"><p>03H  06H  10H</p></div></div></td></tr></tbody></table>

#### 功能码
