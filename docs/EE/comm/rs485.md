# rs485

单片机应用实践篇之RS485通信及MODBUS通信协议——MODBUS通信协议简介

<https://www.bilibili.com/video/BV1Gq4y1y7FG/>

rs485是硬件层通信标准，解决数据传输问题

modbus协议是应用层协议，解决的是应用层数据传输问题,数据传输的含义

接口芯片：MAX485电平转换芯片

MCU-TTL信号逻辑：0：0v，1：5v

485-差分信号逻辑：0：B>A , 1：B<A

两线制：半双工

四线制：全双工