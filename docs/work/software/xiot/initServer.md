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

::: info 代码解析
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

## 启动 run()

```java
if (!TypRoot.open() || !CfgRoot.open() || !IotData.open(null)) {
    System.out.println("InitService.run DB异常");
    return;
}
```

:::info 代码解析
任何一个数据库部分打开失败，就会输出一条错误消息并返回。否则，继续执行后续的代码。
:::

## StmNode 类

```java
public Socket stmSkt = null;
public String sPortcIp = null; // 服务器port客户端ip尾节
public String[] dev; // dev={设备类,RS485地址,其他}
private boolean runFlg; // 工作属性
private long tmpMs = System.currentTimeMillis(), prior = 0, initMs = 0; // 毫秒初值
```

::: info 代码解析

- public Socket stmSkt = null;：定义了一个公有的 Socket 类型的成员变量 stmSkt，用于表示与该对象相关联的套接字。
- public String sPortcIp = null;：定义了一个公有的字符串类型成员变量 sPortcIp，用于表示服务器端口和客户端 IP 的尾节。
- public String[] dev;：定义了一个公有的字符串数组类型成员变量 dev，用于表示设备的类、RS485 地址和其他信息。
- private boolean runFlg;：定义了一个私有的布尔类型成员变量 runFlg，用于表示工作属性，可能表示对象是否正在工作等状态。
- private long tmpMs = System.currentTimeMillis(), prior = 0, initMs = 0;：定义了三个私有的长整型变量 tmpMs、prior 和 initMs，分别用于存储当前时间的毫秒值、之前的时间毫秒值和初始化的时间毫秒值。
  :::

```java
public StmNode(String[] dev) { this.dev = dev; runFlg = true; }
public void over() { runFlg = false; } // 终止运行
```

::: info 代码解析

- public StmNode(String[] dev) { this.dev = dev; runFlg = true; }：这是一个构造函数，接受一个字符串数组 dev 作为参数。构造函数将参数 dev 赋值给类中的成员变量 dev，并将 runFlg 标记设置为 true，表示对象初始化后处于运行状态。
- public void over() { runFlg = false; }：这是一个公有方法，名为 over，没有参数。该方法用于终止对象的运行，将 runFlg 标记设置为 false，表示对象不再处于运行状态。
  :::

### run()

```java
InputStream is;
String[] strs, datas;
byte[] buf = new byte[BufLen];
int num;
```

::: info 代码解析

- InputStream is;：定义了一个 InputStream 类型的成员变量 is，用于表示输入流。
- String[] strs, datas;：这是两个字符串数组的声明，分别命名为 strs 和 datas。同样地，它们在这里被声明，但尚未初始化。
- byte[] buf = new byte[BufLen];：定义了一个长度为 BufLen 的字节数组类型的成员变量 buf，用于存储从输入流中读取的数
- int num;：这是一个整数变量的声明，命名为 num。它可能会在代码的后续部分用于存储从输入流中读取的字节数量。
  :::

```java
try {
    strs = TypRoot.getTyp(dev[0]);
    if (strs == null || strs.length < 4) continue; // 设错的设备类型
    datas = strs[3].split(SubRgx);
    stmSkt.setSoTimeout(Timeout/10 + 10);
    is = stmSkt.getInputStream();
} catch (Exception e) { // stmSkt为空或关闭抛出异常 超时改110毫秒
    System.out.println("StmNode.run获取流异常: " + e.toString());
    try { Thread.sleep(Sleep/5); } // 休眠200毫秒 网络可能恢复或重置
    catch (InterruptedException ie) { System.out.println("StmNode.run休眠被打断: " + ie.toString()); }
    continue;
}

```

::: info 代码解析

- strs = TypRoot.getTyp(dev[0]);：调用了 TypRoot.getTyp 方法，从 dev[0] 所代表的设备中获取一些数据，并将结果存储在 strs 数组中。

- if (strs == null || strs.length < 4) continue;：检查获取的数据是否为空或长度是否小于 4。如果是，则跳过当前循环，继续下一次迭代。这可能意味着设备类型被设置错误，或者获取的数据不完整。

- datas = strs[3].split(SubRgx);：从 strs 数组中获取第四个元素，并使用 SubRgx 对其进行拆分，将结果存储在 datas 数组中。这可能是将某个字符串按照特定的正则表达式分割成多个子串。

- stmSkt.setSoTimeout(Timeout/10 + 10);：设置了一个超时时间，单位是毫秒。这个超时时间似乎是根据变量 Timeout 动态计算的，并添加了一些额外的时间。

- is = stmSkt.getInputStream();：获取了一个输入流，并将其赋值给之前声明的 is 变量。这个输入流可能是与某个套接字相关联的。

如果以上任何一步发生异常，代码会进入 catch 块中的逻辑：

- 打印异常信息，并提示出现了获取流异常。
- 如果发生异常是因为套接字为空或已关闭，那么会将超时时间调整为 110 毫秒。
- 然后通过休眠一段时间来等待网络可能的恢复或重置，休眠时间是 Sleep/5（可能是某个常量）的 1/5。
- 最后，通过 continue 关键字结束当前循环，继续下一次迭代。

:::

```java
while (runFlg) {
    try {
        num = is.read(buf, 0, BufLen); // 接收数据
        saveData(dev[1], buf, num, datas);
//	System.out.println("StmNode received: " + Hex.bytes2HexStr(buf).substring(0, num * 2));
    } catch (IOException ioe) {
        System.out.println(dev[1] + " StmNode.run i异常: " + ioe.toString());
        continue;
    }
}
```

::: info 代码解析
while (runFlg)：这是一个条件循环，只要 runFlg 变量的值为 true，就会一直执行循环体中的代码。

num = is.read(buf, 0, BufLen);：通过输入流 is 读取数据，并将读取的数据存储到 buf 数组中。read 方法的第二个参数表示将读取的数据存储到 buf 数组的起始位置，第三个参数表示最大读取的字节数。读取的字节数会存储在 num 变量中。

saveData(dev[1], buf, num, datas);：调用 saveData 方法，将接收到的数据进行处理。参数 dev[1] 可能是设备标识符，buf 是接收到的数据数组，num 是接收到的字节数，datas 则可能是一些额外的数据用于处理。

如果在读取数据或处理数据过程中发生了 IOException 异常，会进入 catch 块中的逻辑：

- 打印异常信息，并提示出现了某个设备的异常。
- 继续下一次循环，继续接收数据。
  :::

### saveDate()

## CnnNode 类

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
