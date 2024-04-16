# initServer

## 整体分析

```java
package com.example.xiot;

import ...

@Component
public class InitService implements CommandLineRunner {
    // 定义常量
    public static final String DynTyp = "AIOT-EXP-08";
    ...

    // 定义私有静态配置子类 **************************************************************************
	private static class StmNode extends Thread // 连接流节点类

    private static class CnnNode extends Thread // 连接节点类

    private static class SrvNode // 服务节点类

	// 定义公有静态配置类 ****************************************************************************
	public static class CfgRoot // 设备配置根类

    public static class TypRoot // 设备类型类 ********************************************************

    public static class SysCtxt // 系统环境类 ********************************************************

    public static class IotData // 物联数据类 ********************************************************

    // 主服务线程 ************************************************************************************
    private static boolean runFlg; // 运行标志

    public static void over(){} // 终止运行

    private Thread rt = null;

    @Override
	public void run(String... args){}

    private String doSend(String fName, String start, String stop){}
}
```

::: info
包名和导入语句：

- 包名为 com.example.xiot 声明了该类所属的包
- 导入了一些需要使用的 Java 类库

@Component 注解：

- 标注该类为 Spring 组件，表示它会被 Spring 自动扫描并装配到应用上下文中。

类定义和字段：

- 类名为 InitService。
- 声明常量 ...

内部静态类定义：

- StmNode、CnnNode、SrvNode 等内部静态类的定义，每个类似乎都是用于表示特定类型的节点或配置。
- CfgRoot、TypRoot、SysCtxt、IotData 等公有静态类的定义，可能是表示不同的配置或数据类。

主服务线程相关：

- runFlg 是一个私有的静态布尔类型字段，用于标识主服务线程是否运行。
- over 方法用于终止主服务线程的运行。
- rt 是一个线程对象，用于启动主服务线程。
- run 方法实现了 CommandLineRunner 接口的 run 方法，用于在应用启动时执行初始化操作。

doSend 方法：

- 一个私有方法，返回类型为字符串，接受三个字符串参数 fName、start、stop。
- 该方法的具体功能未在注释中描述，但根据方法名和参数推测，可能是用于发送数据的方法。
  :::

## 启动

```java
    @Override
    public void run(String... args) {
        if (!TypRoot.open() || !CfgRoot.open() || !IotData.open(null)) {
            System.out.println("InitService.run DB异常");
            return;
        }
        runFlg = true; // 中止循环标记
        byte num = 0;
        Socket skt;
        try {
            while (runFlg) {
                try {
                    Thread.sleep(Sleep);
                } // 休眠指定毫秒数
                catch (InterruptedException ie) {
                }
                if (TypRoot.Lst().size() == 0) over();
                for (String k0 : CfgRoot.srvKeys()) {
                    try {
                        SrvNode srv = CfgRoot.getSrv(k0);
                        if (srv == null) continue;
                        skt = srv.srvSkt.accept(); // 接受连接 等待Timeout毫秒
                        skt.setSoTimeout(Timeout); // *读取数据超时Timeout毫秒*
                        String cltport = "" + skt.getPort();
                        synchronized (CfgRoot.srvs) {
                            CnnNode cnn = srv.clts.get(cltport);
                            if (cnn == null) // 没配置
                            {
                                Socket old = srv.baks.get(cltport); // 已有的关闭 一般已失效
                                if (old != null && !old.isClosed()) {
                                    old.close();
                                    srv.baks.remove(cltport);
                                }
                                cnn = srv.clts.get(AnyPort);
                                if (cnn == null) srv.baks.put(cltport, skt);
                                else {
                                    if (cnn.cnnSkt == null) {
                                        cnn.cnnSkt = skt;
                                        cnn.start();
                                    } // 首连启动采集线程
                                    else if (cnn.cnnSkt.isClosed()) cnn.cnnSkt = skt; // 换个连接
                                    else {
                                        srv.baks.put("" + cnn.cnnSkt.getPort(), cnn.cnnSkt);
                                        cnn.cnnSkt = skt;
                                    }
                                    //	System.out.println("\nchg AnyPort: " + cnn.scPorts);
                                }
                            } else // 配置过的
                            {
                                if (cnn.cnnSkt == null) {
                                    cnn.cnnSkt = skt;
                                    cnn.start();
                                } // 首连启动采集线程
                                else {
                                    if (!cnn.cnnSkt.isClosed()) cnn.cnnSkt.close();
                                    cnn.cnnSkt = skt;
                                }
                            } // 已有的关闭 一般已失效 换个socket连接
                        } // 超时异常跳出 每过10秒输出一个"."
                    } catch (IOException ioe) {
                        if (++num % (10000 / Timeout) == 0) {
                            num = 0;
                            System.out.print(".");
                        }
                    }
                }
                if (rt == null && runFlg) {
                    rt = new Thread() {
                        @Override
                        public void run() {
                            try {
                                Thread.sleep(Ums + Mms - (System.currentTimeMillis() % Ums));
                            } // 等到下个Ums时间
                            catch (InterruptedException ie) {
                                System.out.println("rt.run线程异常: " + ie.toString());
                            }
                            long mst, msp = System.currentTimeMillis(), tst, tsp; // 1662905822664, .., 1662904800000, ..
                            String stt, stp = "" + msp, hrt, hrp; // "1662905822664", .., "22091114", ..
                            if (SysCtxt.open()) {
                                HashMap<String, String> tss = SysCtxt.Lst();
                                HashMap<String, String> dvs = CfgRoot.Lst();
                                SimpleDateFormat sdf = new SimpleDateFormat(DF);
                                for (String k : dvs.keySet()) {
                                    stt = tss.get(k);
                                    if (stt == null) {
                                        mst = Genesis;
                                        stt = "" + Genesis;
                                    } else mst = Long.parseLong(stt);
                                    hrt = sdf.format(new Date(mst));
                                    hrp = sdf.format(new Date(msp));
                                    try {
                                        if (hrt.equals(hrp)) stp = doSend(k + SubRgx + hrt, stt, stp);
                                        else {
                                            tst = sdf.parse(hrt).getTime() + Xms;
                                            tsp = sdf.parse(hrp).getTime();
                                            doSend(k + SubRgx + hrt, stt, "" + tst);
                                            for (long j = tst; j < tsp; j += Xms)
                                                doSend(k + SubRgx + hrt, "" + j, "" + (j + Xms));
                                            stp = doSend(k + SubRgx + hrp, "" + tsp, stp);
                                        }
                                        tss.put(k, stp);
                                        SysCtxt.PutVar(k, stp);
                                    } catch (ParseException pe) {
                                        System.out.println("rt.run解析异常: " + pe.toString());
                                    }
                                }
                                for (String k : tss.keySet()) if (dvs.get(k) == null) SysCtxt.RmvVar(k);
                                SysCtxt.save();
                                hrp = sdf.format(new Date(Long.parseLong(stp)));
                                String[] keys = new String[IotData.dfKeys().size()];
                                IotData.dfKeys().toArray(keys);
                                for (int k = 0; k < keys.length; k++)
                                    if (hrp.compareTo(keys[k].split(SubRgx)[3]) > 0) IotData.close(keys[k]);
                            } // TypRoot.save(); CfgRoot.save();
                            rt = null;
                        }
                    };
                    rt.start();
                }
            }
        } catch (Exception e) {
            System.out.println("InitService.run异常: " + e.toString());
        }
        // 释放资源
        CfgRoot.close();
        TypRoot.close();
        SysCtxt.close();
        IotData.closeAll();
    }

```

## CnnNode

### 初始化

```java
public Socket cnnSkt = null;
public String scPorts = null;
public HashMap<String, String[]> subs; // String[]={设备类,采样间隔(分钟1,2,5,10,30,60),其他}
private boolean runFlg; // 工作属性
```

这个类有以下成员变量：

- cnnSkt：表示一个 Socket 对象，用于与其他节点建立连接。
- scPorts：表示一个字符串，可能用于保存节点的端口信息。
- subs：表示一个 HashMap，用于存储订阅信息。键是设备类别，值是一个字符串数组，数组中包含采样间隔和其他相关信息。
- runFlg：表示线程是否应该继续运行的标志。默认值为 true。

```java
public CnnNode() { subs = new HashMap<String, String[]>(); runFlg = true; }
public void over() { runFlg = false; } // 终止运行
```

- CnnNode() 构造函数：初始化 subs 和 runFlg。
- over() 方法：用于设置 runFlg 为 false，以便终止运行该线程。

### run() 方法

#### 整体分析

- run() 方法是一个实现了 Runnable 接口的线程运行方法，用于在单独的线程中执行任务。
- 方法中有一个 while 循环，只要 runFlg 为真，就会一直运行。
- 在循环中，首先通过 Thread.sleep() 方法等待下一分钟开始，确保每分钟执行一次。
- 然后检查 cnnSkt 是否可用，获取输入输出流。
- 遍历一个名为 subs 的映射，其中键是设备地址字符串，值是设备设置。
- 对每个设备设置进行处理，获取设备地址、指令、数据等信息。
- 构造读取数据的指令并发送到设备。
- 接收设备返回的数据，并保存或处理。

#### 变量

```java
OutputStream os;
InputStream is;
long ms = Mms;
String[] strs, addrs, cmds, datas;
byte[] cmd, buf = new byte[BufLen];
int num, addrStart, addrLen, cmdStart, crcHandleStart, crcHandleLen;
```

声明了一系列变量，用于在后续的通信过程中使用：

- OutputStream os;：用于向设备发送数据的输出流。
- InputStream is;：用于从设备接收数据的输入流。
- long ms = Mms;：表示时间间隔的长整型变量，初始值设定为 Mms。这里可能是一个时间间隔的设定，用于控制设备通信的频率。
- String[] strs, addrs, cmds, datas;：分别用于存储设备设置、设备地址、指令、数据等字符串数组。
- byte[] cmd, buf = new byte[BufLen];：cmd 用于存储构造的指令，buf 用于存储接收到的数据。buf 被初始化为长度为 BufLen 的字节数组。
- int num, addrStart, addrLen, cmdStart, crcHandleStart, crcHandleLen;：整型变量，分别用于记录数据数量、地址起始位置、地址长度、指令起始位置、CRC 处理起始位置和长度。
