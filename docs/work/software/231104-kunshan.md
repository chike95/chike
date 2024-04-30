# 昆山调试程序

## 振弦采集

代码：/js/dcvw.js

### 发送指令

```js
function sendCmd(cltNo, dev, cmd, addr, len, data) {
  if (!cltNo) {
    console.log("连接号cltNo有误！");
    return;
  }
  if (typeof dev != "number" || dev < 0) {
    console.log("设备485地址dev有误！");
    return;
  }
  if (typeof cmd != "number" || (cmd != 2 && cmd != 4)) {
    console.log("设备指令cmd有误！");
    return;
  }
  if (typeof addr != "number" || addr < 4) {
    console.log("存储地址addr有误！");
    return;
  }
  if (typeof len != "number" || len < 0) {
    console.log("数据长度len有误！");
    return;
  }
  if ((typeof data != "number" || data < 0) && data != null) {
    console.log("写入数据data有误！");
    return;
  }
  var cmdStr = "0000D7EF0200100000000400F8D3"; // 读取采样率 固定4字节长 万能验证码F8D3
  if (cmd == 4) cmdStr += new Buffer(len).toString("hex") + "F8D3"; // 写入数据
  var buf = new Buffer(cmdStr, "hex");
  buf[0] = dev % 256;
  buf[1] = dev >> 8 % 256; // 设置设备485地址
  buf[4] = cmd; // 设置读写指令
  buf[6] = addr % 256;
  buf[7] = addr >> 8 % 256;
  buf[8] = addr >> 16 % 256;
  buf[9] = addr >> 24 % 256; // 设置设备存储地址
  buf[10] = len % 256;
  if (cmd == 4) {
    buf[14] = data % 256;
    buf[15] = data >> 8 % 256;
    buf[16] = data >> 16 % 256;
    buf[17] = data >> 24 % 256; // 设置写数据(仅四字节)
  }
  netObj1.writeClient(buf, cltNo);
  console.log("向设备[" + dev + "]发送指令cmd:" + buf.toString("hex"));
}
```

### 数据处理

```js
function handleData(buf, cltNo) {
  if (buf && buf.length > 0) {
    var chnl = 0,
      hexStr = buf.toString("hex");
    if (hexStr.length == 286) hexStr = "00" + hexStr;
    var dev = parseInt(hexStr.substring(2, 4) + hexStr.substring(0, 2), 16),
      len = parseInt(hexStr.substring(22, 24) + hexStr.substring(20, 22), 16),
      addr = parseInt(
        hexStr.substring(18, 20) +
          hexStr.substring(16, 18) +
          hexStr.substring(14, 16) +
          hexStr.substring(12, 14),
        16
      );
    if ((chnl < 0 || chnl > 15) && addr == 768)
      alert("通道号不在有效范围，请重新配置!");
    else if (buf[4] == 3) {
      console.log("485地址:" + hexStr.substring(28, 28 + 2 * 4));
      if (addr == 20) {
        // 客户端连接上后就发的指令
        sendCmd(cltNo, parseInt(dev), 2, 12, 4, null);
      } else if (addr == 12) {
        // 读取设置的指令
        console.log("工作模式:" + hexStr.substring(28, 28 + 2 * 4));
        sendCmd(cltNo, dev, 2, 16, 4, null);
      } else if (addr == 16) {
        console.log("采样率:" + hexStr.substring(28, 28 + 2 * 4));
        sendCmd(cltNo, dev, 2, 44, 4, null);
      } else if (addr == 44) {
        console.log("启动/停止:" + hexStr.substring(28, 28 + 2 * 4));
        sendCmd(cltNo, dev, 2, 28, 4, null);
      } else if (addr == 28) {
        console.log("Fram存储器页码:" + hexStr.substring(28, 28 + 2 * 4));
        sendCmd(cltNo, dev, 2, 32, 4, null);
      } else if (addr == 32) {
        console.log("Fram存储器组号:" + hexStr.substring(28, 28 + 2 * 4));
        //sendCmd(dev,2,596,4,null);
        sendCmd(cltNo, dev, 2, 20, 4, null);
      } else if (addr == 596) {
        fram = parseInt(
          hexStr.substring(34, 36) +
            hexStr.substring(32, 34) +
            hexStr.substring(30, 32) +
            hexStr.substring(28, 30),
          16
        );
        console.log(
          "Fram存储器最后一次写入的地址: " +
            hexStr.substring(28, 28 + 2 * 4) +
            " " +
            fram
        );
        if (cmdFlg == "addr44->1" && fram > 0) {
          sendCmd(dev, 2, fram, 128, null);
          cmdFlg = null;
        }
      } else if (addr == fram) {
        //======================================================//
        //					 通道数据解析						//
        //======================================================//
        var start = 0;
        var end = 0;
        var data = hexStr.substring(28, 28 + 2 * 128); //返回数据的数据段
        end = 4 * 2;
        var magic_world1 = data.substring(start, end); //标志位
        start = end;
        end = start + 2 * 2;
        var data_format_type = data.substring(start, end); //格式类型
        start = end;
        end = start + 2 * 2;
        var header_length = data.substring(start, end); //头长度
        start = end;
        end = start + 8 * 2;
        var time = data.substring(start, end); //时间
        start = end;
        end = start + 2 * 2;
        var channel_mask = data.substring(start, end); //通道有值
        start = end;
        end = start + 2 * 2;
        var sample_rate = data.substring(start, end); //采样率
        start = end;
        end = start + 2 * 2;
        var header_crc = data.substring(start, end); //头的crc
        start = end;
        end = start + 2 * 32 * 2;
        var freq_res_data = data.substring(start, end); //频率和电阻值
        start = end;
        end = start + 2 * 2;
        var data_crc = data.substring(start, end); //数据的crc
        console.log(
          "通道有值: [" +
            channel_mask +
            "] " +
            parseInt(
              channel_mask.substring(2, 4) + channel_mask.substring(0, 2),
              16
            )
        );
        console.log(
          "采样率: [" +
            sample_rate +
            "] " +
            parseInt(
              sample_rate.substring(2, 4) + sample_rate.substring(0, 2),
              16
            )
        );
        console.log(
          "时间: [" +
            time +
            "] " +
            parseInt(time.substring(12, 14), 16) +
            "年_" +
            parseInt(time.substring(10, 12), 16) +
            "星期_" +
            parseInt(time.substring(8, 10), 16) +
            "月_" +
            parseInt(time.substring(6, 8), 16) +
            "日_" +
            parseInt(time.substring(4, 6), 16) +
            "时_" +
            parseInt(time.substring(2, 4), 16) +
            "分_" +
            parseInt(time.substring(0, 2), 16) +
            "秒_"
        );
      } else if (addr == 768) {
        // 读取数据
        var data = hexStr.substring(28, 28 + 2 * 4 * 2 * 16);
        data = data.substring(chnl * 2 * 4 * 2, chnl * 2 * 4 * 2 + 2 * 4 * 2); // 取出频率/电阻并且高低互换
        var hz_int = parseInt(
          data.substring(6, 8) +
            data.substring(4, 6) +
            data.substring(2, 4) +
            data.substring(0, 2),
          16
        );
        var r_int = parseInt(
          data.substring(14, 16) +
            data.substring(12, 14) +
            data.substring(10, 12) +
            data.substring(8, 10),
          16
        );
        var hz = parseFloat(hz_int / 10);
        var temp =
          1.0 / (Math.log(r_int / 3000.0) / 3950.0 + 1.0 / 298.45) - 273.15;
        temp = Math.round(temp * 100.0) / 100.0;
        console.log(chnl + "通道频率和温度: " + hz + " " + temp);
        dataStr +=
          new Date().getTime() +
          "\t" +
          "频率：" +
          hz +
          "\t" +
          "温度：" +
          temp +
          "\r\n";
        // chgDraw(gauge,hz,temp);
      } else console.log("未识别3addr:" + addr);
    } else if (buf[4] == 7) {
      if (cmdFlg == "addr12") {
        // 初始化设置
        sendCmd(cltNo, dev, 4, 16, 4, 5);
        cmdFlg = "addr16";
        console.log("设置采样率5秒一次");
      } else if (cmdFlg == "addr16") {
        sendCmd(cltNo, dev, 4, 44, 4, 0);
        cmdFlg = "addr44->0";
        console.log("停止测量开关");
      } else if (cmdFlg.substring(0, 6) == "addr44") {
        console.log("cmdFlg:" + cmdFlg);
        if (cmdFlg == "addr44->1") {
          cmdFlg = null;
          // document.getElementById("cmd14").value = "停止采集";
          // setTimeout(function(){sendCmd(dev,2,596,4,null);},45000);
        } else {
          cmdFlg = null;
          //document.getElementById("cmd14").value = "开始采集";
        }
      } else console.log("未识别7addr:" + addr);
    } else console.log("未识别读写指令:" + buf[4]);
  } else console.log("handleData gauge或buf为空！");
}
```

### 主程序

```js
var dataStr,
  netObj1,
  cltNo1,
  result = new Set(),
  DevicesIdx = {}; // DevicesIdx：{addr485:[19,0]}
var DevicesInfo = {
  "192.168.30.161": [1543, 1615],
  "192.168.30.151": [1746, 1740],
  "192.168.30.141": [1482, 1779],
  "192.168.30.132": [1650, 1443],
  "192.168.30.121": [1513, 1782],
  "192.168.30.111": [1781, 1742],
};
for (var k1 in DevicesInfo)
  for (var k2 in DevicesInfo[k1]) DevicesIdx[DevicesInfo[k1][k2]] = [k1, k2];
console.log(DevicesIdx);
if (netObj1) netObj1.closeSocketServer();
netObj1 = net();
netObj1.openSocketServer(
  function (cltNo, buf) {
    function sendOrder(iport, rs485, n) {
      setTimeout(function () {
        console.log("Send order to " + iport + " " + rs485);
        sendCmd(cltNo, rs485, 2, 20, 4, null);
      }, 2000 * n);
    }
    if (cltNo) {
      if (buf) {
        // 数据发来回调
        if (buf.length) {
          var addr485 = buf[1] * 256 + buf[0]; //设备地址
          if (buf.length < 50) {
            console.log(
              cltNo + "[" + addr485 + "]发来数据：" + buf.toString("hex")
            );
            result.add(addr485);
          } else {
            console.log(
              cltNo +
                "[" +
                addr485 +
                "]发来数据：" +
                buf.slice(0, 50).toString("hex") +
                "..."
            );
            result.add(addr485);
          }
          //	handleData(buf,cltNo);
        }
      } // 客户端连接上回调
      else {
        var rs485ip = cltNo.split(":")[0],
          i = 0;
        for (k = 0; k < DevicesInfo[rs485ip].length; k++)
          sendOrder(cltNo, DevicesInfo[rs485ip][k], i++);
        //	for (var j in DevicesInfo)
        //		for (k=0; k<DevicesInfo[j].length; k++) sendOrder (cltNo,DevicesInfo[j][k],i++);
      }
    } else console.log("listening 11000...."); // 打开监听回调
  },
  "0.0.0.0",
  11000
);

setTimeout(function () {
  console.log("These devices is connected!", result);
  if (netObj1) {
    netObj1.closeSocketServer();
    console.log("listening 11000 stop!");
  }
}, 5000);
```

## 485 倾角

代码：/js/hori.js

### 数据转换

8Hex 字符串转浮点数

```js
function FillString(t, c, n, b) {
  // 填充字符串
  if (t == "" || c.length != 1 || n <= t.length) return t;
  var l = t.length;
  for (var i = 0; i < n - l; i++) {
    if (b == true) t = c + t;
    else t += c;
  }
  return t;
}

function HexToSingle(t) {
  // 8Hex字符串转浮点数
  t = t.replace(/\s+/g, "");
  if (t == "") return "";
  if (t == "00000000") return "0";
  if (t.length > 8 || isNaN(parseInt(t, 16))) return "Error";
  if (t.length < 8) t = FillString(t, "0", 8, true);
  t = parseInt(t, 16).toString(2);
  t = FillString(t, "0", 32, true);
  var s = t.substring(0, 1);
  var e = t.substring(1, 9);
  var m = t.substring(9);
  e = parseInt(e, 2) - 127;
  m = "1" + m;
  if (e >= 0) m = m.substr(0, e + 1) + "." + m.substring(e + 1);
  else m = "0." + FillString(m, "0", m.length - e - 1, true);
  if (m.indexOf(".") == -1) m = m + ".0";
  var a = m.split(".");
  var mi = parseInt(a[0], 2);
  var mf = 0;
  for (var i = 0; i < a[1].length; i++)
    mf += parseFloat(a[1].charAt(i)) * Math.pow(2, -(i + 1));
  m = parseInt(mi) + parseFloat(mf);
  if (s == 1) m = 0 - m;
  return m;
}
```

### 发送指令

```js
function readData(cltNo, dev) {
  var buf = new Buffer(14);
  buf[0] = +dev % 256;
  buf[1] = +dev >> 8 % 256;
  buf[2] = 0xd7;
  buf[3] = 0xef;
  buf[4] = 0x02;
  buf[5] = 0x00;
  buf[6] = 0x00;
  buf[7] = 0x11;
  buf[8] = 0x00;
  buf[9] = 0x00;
  buf[10] = 0x08;
  buf[11] = 0x00;
  buf[12] = 0xf8;
  buf[13] = 0xd3;
  netObj1.writeClient(buf, cltNo); // 连续写入指令
  console.log("向设备发送指令:" + buf.toString("hex"));
}
```

### 数据处理

```js
function handleData(buf) {
  function bytes2Float(hStr) {
    if (!hStr || hStr.length != 8) return null;
    hStr =
      hStr.substring(6) +
      hStr.substring(4, 6) +
      hStr.substring(2, 4) +
      hStr.substring(0, 2); // 高低互换
    return HexToSingle(hStr); // 十六进制转成浮点数 console.log('hStr:',hStr);
  }

  if (!buf || !buf.length) return;
  var buftohex = buf.toString("hex"); // console.log('buftohex: ' + buftohex);
  if (buftohex.length == 38) {
    buftohex = "00" + buftohex;
    buf = new Buffer(buftohex, "hex");
  } else if (buftohex.length == 46) {
    buftohex = "00" + buftohex;
    buf = new Buffer(buftohex, "hex");
  }
  if (buf[4] === 3) {
    if (buf[6] + buf[7] * 256 == 4352) {
      var alpha1 = bytes2Float(buftohex.substring(28, 36)); // 转浮点数 console.log('alpha1: ',alpha1);
      var alpha2 = bytes2Float(buftohex.substring(36, 44)); // 转浮点数 console.log('alpha2: ',alpha2);
      console.log("读取数据返回：" + buftohex + " : " + alpha1 + "," + alpha2);
    } else if (buf[6] + buf[7] * 256 == 24)
      console.log(
        "读取K系数返回：" +
          buftohex +
          " : " +
          bytes2Float(buftohex.substring(28, 36))
      );
    else if (buf[6] + buf[7] * 256 == 28)
      console.log(
        "读取B系数返回：" +
          buftohex +
          " : " +
          bytes2Float(buftohex.substring(28, 36))
      );
    else console.log("读取其它返回：" + buftohex);
  } else if (buf[4] === 7) {
    var hStr = buftohex.substring(28, 36);
    console.log("写入命令返回：" + buftohex);
  }
}
```

### 主程序

```js
var dataStr,
  netObj1,
  result = new Set(),
  DevicesIdx = {};
var DevicesInfo = {
  "192.168.30.112": [5361],
  "192.168.30.122": [5316],
  "192.168.30.133": [5299],
  "192.168.30.142": [5286],
  "192.168.30.152": [5287],
  "192.168.30.162": [5183],
};
for (var k1 in DevicesInfo)
  for (var k2 in DevicesInfo[k1]) DevicesIdx[DevicesInfo[k1][k2]] = [k1, k2]; // DevicesIdx：{addr485:[19,0]}
console.log(DevicesIdx);
if (netObj1) netObj1.closeSocketServer();
netObj1 = net();
netObj1.openSocketServer(
  function (cltNo, buf) {
    function sendOrder(iport, rs485, n) {
      setTimeout(function () {
        console.log("Send order to " + iport + " " + rs485);
        readData(iport, rs485);
      }, 2000 * n);
    }
    if (cltNo) {
      if (buf) {
        // 数据发来回调
        if (buf.length) {
          var addr485 = buf[1] * 256 + buf[0]; //设备地址
          if (buf.length < 50) {
            console.log(
              cltNo + "[" + addr485 + "]发来数据：" + buf.toString("hex")
            );
            result.add(addr485);
          } else {
            console.log(
              cltNo +
                "[" +
                addr485 +
                "]发来数据：" +
                buf.slice(0, 50).toString("hex") +
                "..."
            );
            result.add(addr485);
          }
          handleData(buf);
        }
      } // 客户端连接上回调
      else {
        var rs485ip = cltNo.split(":")[0];
        i = 0;
        if (DevicesInfo[rs485ip])
          for (k = 0; k < DevicesInfo[rs485ip].length; k++)
            sendOrder(cltNo, DevicesInfo[rs485ip][k], i++);
        //	for (var j in DevicesInfo)
        //		for (k=0; k<DevicesInfo[j].length; k++) sendOrder(cltNo,DevicesInfo[j][k],i++);
      }
    } else console.log("listening 12000...."); // 打开监听回调
  },
  "0.0.0.0",
  12000
);

setTimeout(function () {
  console.log("These devices is connected!", result);
  if (netObj1) {
    netObj1.closeSocketServer();
    console.log("listening 12000 stop!");
  }
}, 15000);
```
