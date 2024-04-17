# CfgRoot

```java
private static boolean writeback = false;
private static String fpath = System.getProperty("user.dir") + "/jdb/config.json";
private static HashMap<String, SrvNode> srvs;
```

::: info 代码解析

- private static boolean writeback = false;：声明了一个名为 writeback 的私有静态布尔型变量，并将其初始化为 false。这个变量可能用于控制某些操作或流程的执行。

- private static String fpath = System.getProperty("user.dir") + "/jdb/config.json";：声明了一个名为 fpath 的私有静态字符串变量，并将其初始化为一个文件路径。这个文件路径由 System.getProperty("user.dir") 获取当前用户的工作目录，并在其后面添加了 /jdb/config.json。这个路径可能是一个 JSON 配置文件的路径。

- private static HashMap<String, SrvNode> srvs;：声明了一个名为 srvs 的私有静态 HashMap 变量，键的类型为字符串，值的类型为 SrvNode。这个 HashMap 可能用于存储一组服务节点信息，其中键可能是服务节点的标识符，值则是与该标识符相关联的服务节点对象。
  :::

### open()

初始化 监听端口 和 服务节点 信息

```java
public static boolean open() {
    if (srvs != null) return true;
    srvs = new HashMap<String, SrvNode>();
    String str;
    JSONObject jObj;
    BufferedReader br = null;
    synchronized (srvs) {
        try {
            File f = new File(fpath);
            if (!f.exists()) f.createNewFile();
            else {
                br = new BufferedReader(new InputStreamReader(new FileInputStream(fpath), StandardCharsets.UTF_8));
                while ((str = br.readLine()) != null) {
                    jObj = JSONObject.parseObject(str);
                    for (String k : jObj.keySet()) PutDev(k, jObj.getString(k), true); // 填充监听端口,服务节点
                }
                br.close();
            }
        } catch (IOException ioe) {
            System.out.println("CfgRoot打开config.json异常: " + ioe.toString());
            if (br != null) try { br.close(); } catch (IOException e) {}
            return false;
        }
    }
    return true;
}
```

::: info 代码解析

- if (srvs != null) return true;：首先检查静态变量 srvs 是否为 null，如果不为 null，表示服务节点已经初始化过了，直接返回 true。
- srvs = new HashMap<String, SrvNode>();：如果服务节点还没有初始化，就创建一个新的 HashMap 对象，并将其赋值给 srvs 变量，用于存储服务节点信息。
- File f = new File(fpath);：创建一个文件对象，其路径由之前声明的 fpath 变量指定。
- if (!f.exists()) f.createNewFile();：检查文件是否存在，如果不存在，则创建新文件。这个文件路径指向的是配置文件，这个操作保证了配置文件存在，以便后续读取。
- br = new BufferedReader(new InputStreamReader(new FileInputStream(fpath), StandardCharsets.UTF_8));：创建一个用于读取文件的 - BufferedReader 对象，以 UTF-8 编码方式读取配置文件。
- while ((str = br.readLine()) != null)：循环读取配置文件的每一行。
- jObj = JSONObject.parseObject(str);：将每一行的字符串解析为一个 JSON 对象。
- for (String k : jObj.keySet()) PutDev(k, jObj.getString(k), true);：遍历 JSON 对象的每一个键值对，并调用 PutDev 方法填充监听端口和服务节点信息。其中，PutDev 方法可能会将解析得到的信息存储到 srvs HashMap 中。
- br.close();：关闭文件读取流。
- catch (IOException ioe)：捕获可能的 IO 异常，通常是文件操作过程中出现的异常。
- 在异常处理块中打印异常信息，并尝试关闭文件读取流，然后返回 false 表示打开配置文件失败。
- 最后，返回 true 表示配置文件打开成功并成功初始化了服务节点信息。
  :::

```json
{"15000_any_100":"AIOT-VW-16","11000_any_5316":"AIOT-HOR-01","12000_any_222":"AIOT-WIND-01"}

srvs: {12000=com.example.xiot.InitService$SrvNode@474c9131, 15000=com.example.xiot.InitService$SrvNode@66213a0d, 11000=com.example.xiot.InitService$SrvNode@aa4d8cc}
```

### save()

将存储在 srvs HashMap 中的服务节点信息以 JSON 格式写入到配置文件中。

```java
public static void save() {
    if (writeback && srvs != null) {
        BufferedWriter bw = null;
        try {
            File f = new File(fpath);
            if (!f.exists()) f.createNewFile();
            bw = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(fpath), StandardCharsets.UTF_8));
            bw.write(new JSONObject(Lst()).toJSONString());
            bw.close();
            writeback = false;
        } catch (IOException ioe) {
            System.out.println("CfgRoot写入config.json异常: " + ioe.toString());
            if (bw != null) try { bw.close(); } catch (IOException e) {}
        }
    }
}
```

::: info 代码解析

- if (writeback && srvs != null)：首先检查条件 writeback && srvs != null 是否为真。writeback 是一个标志位，表示是否需要将服务节点信息写回到配置文件中。srvs 是存储服务节点信息的 HashMap 对象。

- BufferedWriter bw = null;：声明一个 BufferedWriter 对象，用于写入数据到文件。

- File f = new File(fpath);：创建一个文件对象，其路径由之前声明的 fpath 变量指定。

- if (!f.exists()) f.createNewFile();：检查文件是否存在，如果不存在，则创建新文件。这个操作保证了配置文件存在，以便后续写入数据。

- bw = new BufferedWriter(new OutputStreamWriter(new FileOutputStream(fpath), StandardCharsets.UTF_8));：创建一个用于写入文件的 BufferedWriter 对象，以 UTF-8 编码方式写入配置文件。

- bw.write(new JSONObject(Lst()).toJSONString());：将存储服务节点信息的 HashMap 对象转换为 JSON 格式的字符串，并写入到文件中。

- bw.close();：关闭文件写入流。

- writeback = false;：将 writeback 标志位设为 false，表示写入操作已经完成。

- catch (IOException ioe)：捕获可能的 IO 异常，通常是文件操作过程中出现的异常。

- 在异常处理块中打印异常信息，并尝试关闭文件写入流。
  :::

### close()

```java
public static void close() {
    save();
    if (srvs != null) {
        synchronized (srvs) { for (String k0 : srvs.keySet()) srvs.get(k0).close(); }
        srvs = null;
    }
}
```

::: info 代码解析
save();：调用之前定义的 save() 方法，将当前的服务节点信息保存到配置文件中。

if (srvs != null)：检查服务节点是否为 null，即是否已经初始化。

synchronized (srvs) { for (String k0 : srvs.keySet()) srvs.get(k0).close(); }：使用 synchronized 关键字对 srvs 进行同步，以确保多线程环境下的安全访问。然后遍历 srvs 中的每一个键，获取对应的服务节点，并调用其 close() 方法关闭服务节点。

srvs = null;：将 srvs 变量置为 null，表示服务节点已经关闭。
:::

### getSrv()

根据给定的键获取对应的服务节点对象，并将其返回。

```java
public static SrvNode getSrv(String key) {
    return srvs.get(key);
}
```

### srvKeys()

返回存储在 srvs HashMap 中的所有键的集合

```java
public static Set<String> srvKeys() {
    return srvs.keySet();
}
```

### Lst()

从 srvs HashMap 中获取特定格式的键值对，并将其存储在一个新的 HashMap 中返回。

```java
public static HashMap<String, String> Lst() {
    HashMap<String, String> ret = new HashMap<String, String>(); // 工作缓存对象
    if (srvs != null) synchronized (srvs) { // 获取config数据库配置
        for (String k0 : srvs.keySet()) {
            if (srvs.get(k0).clts != null)
                for (String k1 : srvs.get(k0).clts.keySet())
                    if (srvs.get(k0).clts.get(k1).subs != null)
                        for (String k2 : srvs.get(k0).clts.get(k1).subs.keySet())
                            if (srvs.get(k0).clts.get(k1).subs.get(k2).length > 0)
                                ret.put(k0 + SubRgx + k1 + SubRgx + k2,
                                    String.join(SubRgx, srvs.get(k0).clts.get(k1).subs.get(k2)));
            if (srvs.get(k0).stms != null)
                for (String k1 : srvs.get(k0).stms.keySet())
                    if (srvs.get(k0).stms.get(k1).dev != null && srvs.get(k0).stms.get(k1).dev.length > 1)
                        ret.put(k0 + SubRgx + k1 + SubRgx + srvs.get(k0).stms.get(k1).dev[1],
                            String.join(SubRgx, srvs.get(k0).stms.get(k1).dev));
        }
    }
    return ret;
}
```

::: info 代码解析

- 创建一个新的 HashMap 对象 ret，用于存储生成的键值对。

- 如果 srvs HashMap 不为 null，则对其进行同步操作，以确保线程安全。

- 遍历 srvs HashMap 的键集合 srvs.keySet()，对每个键进行处理。

- 对于每个键 k0，如果其对应的服务节点对象的 clts 不为 null，则遍历其客户端对象的键集合。

- 对于每个客户端对象的键 k1，如果其对应的订阅者对象不为 null，则遍历订阅者对象的键集合。

- 对于每个订阅者对象的键 k2，如果其对应的订阅者数组长度大于 0，则将格式化后的键值对加入到 ret 中。

- 接着，如果服务节点对象的 stms 不为 null，则遍历其设备对象的键集合。

- 对于每个设备对象的键 k1，如果其对应的设备数组不为 null 且长度大于 1，则将格式化后的键值对加入到 ret 中。

- 最后，返回生成的 HashMap ret
  :::

### PutDev()

功能：向系统中添加设备

```java
public static void PutDev(String key, String value, boolean isInit) {...}
```

::: info 代码解析
key 是一个字符串，表示设备的唯一标识；value 是一个字符串，包含有关设备的信息；isInit 是一个布尔值，指示是否为初始化操作。

:::

```
config.json: {"15000_any_100":"AIOT-VW-16","11000_any_5316":"AIOT-HOR-01","12000_any_222":"AIOT-WIND-01"}

输出：System.out.println("key + vulue: " + key + value);

key + vulue: 15000_any_100AIOT-VW-16
key + vulue: 11000_any_5316AIOT-HOR-01
key + vulue: 12000_any_222AIOT-WIND-01
```

```java
String[] ks = key.split(SubRgx);
String[] vs = value.split(SubRgx);
```

::: info 代码解析
public static final String SubRgx = "\_";

key.split(SubRgx)：将 key 字符串按照 SubRgx 正则表达式进行分割，得到一个字符串数组 ks，其中包含了分割后的各个部分。

value.split(SubRgx)：同样地，将 value 字符串按照 SubRgx 正则表达式进行分割，得到一个字符串数组 vs，其中包含了分割后的各个部分。
:::

```java
SrvNode srv = srvs.get(ks[0]);
if (srv == null) {
    int port = Integer.parseInt(ks[0]);
    try { // 打开监听 加入服务节点
        if (port > 0) {
            ServerSocket sSkt = new ServerSocket(port);
            sSkt.setSoTimeout(Timeout); // *接受socket连接超时*
            srv = new SrvNode(sSkt);
            srvs.put(ks[0], srv);
        } else {
            System.out.println("CfgRoot.PutDev 监听" + ks[0] + "端口无效");
            return;
        }
    } catch (Exception e) {
        System.out.println("CfgRoot.PutDev 监听" + ks[0] + "异常: " + e.toString());
        return;
    }
}
```

::: info 代码解析
检查全局变量 srvs 中是否存在与键的第一个部分（端口号）相对应的 SrvNode 对象。如果不存在，则尝试创建一个新的 ServerSocket 对象，并将其绑定到指定端口上，然后创建一个新的 SrvNode 对象并将其加入 srvs 中。

让我逐步解释代码的逻辑：

SrvNode srv = srvs.get(ks[0]);：从全局变量 srvs 中获取与键的第一个部分（端口号）相对应的 SrvNode 对象。

if (srv == null) { ... }：如果获取的 SrvNode 对象为空，表示该端口上尚未有服务节点，则执行以下操作：

int port = Integer.parseInt(ks[0]);：将键的第一个部分（端口号）解析为整数。

try { ... } catch (Exception e) { ... }：尝试执行以下操作，如果出现异常则捕获并处理异常。

if (port > 0) { ... } else { ... }：检查端口号是否大于零。如果是有效的端口号，则执行以下操作：

- ServerSocket sSkt = new ServerSocket(port);：创建一个新的 ServerSocket 对象，并将其绑定到指定端口上。
- sSkt.setSoTimeout(Timeout);：设置接受 socket 连接的超时时间。
- srv = new SrvNode(sSkt);：创建一个新的 SrvNode 对象，以 ServerSocket 为参数。
- srvs.put(ks[0], srv);：将新创建的 SrvNode 对象加入到全局变量 srvs 中，以端口号为键。

如果端口号无效（小于等于零），则输出一条错误信息提示端口号无效。

如果在尝试创建 ServerSocket 或创建 SrvNode 对象时出现异常，则输出相应的异常信息。
:::

```java
if (vs[0].equals(DynTyp)) { // 判断是动态采集
    StmNode stm = srv.stms.get(ks[1]);
    if (stm == null) {
        stm = new StmNode(vs); // 创建动态流节点
        stm.sPortcIp = ks[0] + SubRgx + ks[1] + SubRgx;
        srv.stms.put(ks[1], stm);
    }
} else {
    CnnNode cnn = srv.clts.get(ks[1]);
    if (cnn == null) {
        cnn = new CnnNode();
        cnn.scPorts = ks[0] + SubRgx + ks[1] + SubRgx;
        srv.clts.put(ks[1], cnn);
        if (srv.baks.size() > 0) { // 在baks里查找
            String theKey = null;
            Socket skt = srv.baks.get(ks[1]); // 如果客户端端口匹配就移过来
            if (skt != null) {
                cnn.cnnSkt = skt;
                theKey = ks[1];
            }
            if (ks[1].equals(AnyPort)) { // 如果任意端口就把第一个移过来
                theKey = (String) srv.baks.keySet().toArray()[0];
                cnn.cnnSkt = srv.baks.get(theKey);
            }
            if (theKey != null) { // 移过来后把baks的对象引用去掉
                cnn.start();
                srv.baks.remove(theKey);
            }
        }
    }
    cnn.subs.put(ks[2], vs);
}
```

功能：根据条件将动态采集或客户端连接信息加入到服务节点的相应映射中，并在需要时进行备份客户端套接字的处理

::: info 代码解析
（1）if (vs[0].equals(DynTyp)) { ... }：判断 vs 数组的第一个元素是否等于 DynTyp。如果相等，表示这是一个动态采集的操作。

a. StmNode stm = srv.stms.get(ks[1]);：从服务节点 srv 的 stms 映射中获取与键 ks[1] 相关联的 StmNode 对象。

b. if (stm == null) { ... }：如果获取的 StmNode 对象为空，表示尚未存在与键 ks[1] 相关联的动态流节点，则执行以下操作：

- stm = new StmNode(vs);：创建一个新的 StmNode 对象，参数为 vs 数组。
- stm.sPortcIp = ks[0] + SubRgx + ks[1] + SubRgx;：设置动态流节点的端口和 IP 信息。
- srv.stms.put(ks[1], stm);：将新创建的 StmNode 对象放入服务节点 srv 的 stms 映射中，以 ks[1] 作为键。

（2）如果 vs[0] 不等于 DynTyp，表示这不是一个动态采集的操作，则执行另一段逻辑：

a. CnnNode cnn = srv.clts.get(ks[1]);：从服务节点 srv 的 clts 映射中获取与键 ks[1] 相关联的 CnnNode 对象。

b. if (cnn == null) { ... }：如果获取的 CnnNode 对象为空，表示尚未存在与键 ks[1] 相关联的客户端节点，则执行以下操作：

- cnn = new CnnNode();：创建一个新的 CnnNode 对象。
- cnn.scPorts = ks[0] + SubRgx + ks[1] + SubRgx;：设置客户端节点的端口和 IP 信息。
- srv.clts.put(ks[1], cnn);：将新创建的 CnnNode 对象放入服务节点 srv 的 clts 映射中，以 ks[1] 作为键。

c. 在一些特定条件下，会检查 srv 的 baks 中是否有备份的客户端套接字，并进行相应的处理：

- 如果存在备份的客户端套接字，将其移至当前客户端节点，并启动该节点的服务。
- 移除备份的客户端套接字，并在服务节点的 baks 映射中去掉对应的引用。

d. cnn.subs.put(ks[2], vs);：将键值对 (ks[2], vs) 放入客户端节点 cnn 的 subs 映射中，用于记录客户端订阅的信息。
:::

### RmvDev()

```java
public static void RmvDev(String key) {
    String[] ks = key.split(SubRgx);
    if (ks.length == 3) synchronized (srvs) {
        SrvNode srv = srvs.get(ks[0]);
        if (srv != null) {
            CnnNode cnn = srv.clts.get(ks[1]);
            if (cnn != null) {
                if (ks.length > 2 && cnn.subs.get(ks[2]) != null) cnn.subs.remove(ks[2]);
                if (cnn.subs.size() == 0) {
                    if (cnn.cnnSkt != null) srv.baks.put(ks[1], cnn.cnnSkt);
                    cnn.over();
                    srv.clts.remove(ks[1]);
                }
            }
            if (srv.clts.size() == 0) {
                srv.close();
                srvs.remove(ks[0]);
            }
            writeback = true;
        }
    }
    else System.out.println("CfgRoot.RmvDev 无效的键: " + key);
}
```

功能：根据输入的键值 key，移除相应的设备信息，并对相关的节点进行适当的清理操作。

::: info 代码解析
String[] ks = key.split(SubRgx);：将输入的 key 字符串按照分隔符 SubRgx 进行分割，得到一个字符串数组 ks，其中包含了设备信息的不同部分。

if (ks.length == 3) synchronized (srvs) { ... }：检查分割后的数组长度是否为 3，如果是，则执行以下操作：

- a. SrvNode srv = srvs.get(ks[0]);：从 srvs 映射中获取键为 ks[0] 的 SrvNode 对象，表示服务节点。

- b. if (srv != null) { ... }：如果获取的服务节点对象不为空，则执行以下操作：

CnnNode cnn = srv.clts.get(ks[1]);：从服务节点的客户端映射中获取键为 ks[1] 的客户端节点对象。

if (cnn != null) { ... }：如果获取的客户端节点对象不为空，则执行以下操作：

if (ks.length > 2 && cnn.subs.get(ks[2]) != null) cnn.subs.remove(ks[2]);：如果数组长度大于 2 且客户端节点的订阅映射中包含键为 ks[2] 的订阅信息，则移除该订阅信息。

if (cnn.subs.size() == 0) { ... }：如果客户端节点的订阅映射为空，则执行以下操作：

if (cnn.cnnSkt != null) srv.baks.put(ks[1], cnn.cnnSkt);：如果客户端节点的连接套接字不为空，则将其放入服务节点的备份映射中。

cnn.over();：结束客户端节点的运行。

srv.clts.remove(ks[1]);：从服务节点的客户端映射中移除键为 ks[1] 的客户端节点对象。

if (srv.clts.size() == 0) { ... }：如果服务节点的客户端映射为空，则执行以下操作：

srv.close();：关闭服务节点。

srvs.remove(ks[0]);：从服务节点映射中移除键为 ks[0] 的服务节点对象。

writeback = true;：将 writeback 标志设置为 true，表示需要写回操作。

如果输入的 key 字符串不符合要求（长度不为 3），则输出错误信息。
:::
