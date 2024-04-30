function net() {
	var obj = {};
	//  ---- Socket ------------------------------------------------
	var socketServer = null, clients = {}; // ctrl = "\x1b"
	obj.openSocketServer = function openSocketServer() {
		var hdl = arguments[0] ? arguments[0] : cnnHandle;
		var host = arguments[1] ? arguments[1] : 'localhost';
		var port = arguments[2] ? arguments[2] : 4004;
		socketServer = new require('net').Server();
		socketServer.on('error', function (err) {
			if (err.code == 'EADDRINUSE') console.log('Port ' + port + ' in use!');
			else console.log('srv_err:\n' + err.stack);
			obj.closeSocketServer();
		});
		socketServer.on('connection', function (client) {
			var remoteIpPort = client.remoteAddress + ":" + client.remotePort;
			clients[remoteIpPort] = client;
			console.log(remoteIpPort + " connected");
			client.on('error', function (err) {
				console.log('clt_err:\n' + err.stack);
				obj.closeClient(remoteIpPort);
			});
			client.on('close', function () {
				console.log(remoteIpPort + " closed");
			});
			client.on('end', function () {
				console.log(remoteIpPort + " ended");
			});
			client.on('data', function (data) {
				var buf = new Buffer(data);
				// console.log("receive from " + remoteIpPort + " len: " + buf.length);
				hdl(remoteIpPort, buf);
			});
			hdl(remoteIpPort);
		});
		socketServer.listen(port, host, function () {
			socketServer.curPort = port;
			console.log('Socket ' + port + ' listening...');
			hdl();
		});
		function cnnHandle(cltNo, buf) {
			if (!cltNo) console.log("cnnHandle!");
			else {
				if (!buf || !buf.length) console.log("cnnHandle: " + cltNo);
				else console.log("cnnHandle: " + cltNo + " | receive: " + buf.toString("hex"));
			}
		}
	};
	obj.closeSocketServer = function closeSocketServer() {
		var srv = arguments[0] ? arguments[0] : socketServer;
		try { if (srv) srv.close(function () { console.log(srv.curPort + ' listen stopped!'); }); }
		catch (e) { console.log('closeSocketServer: err:' + e.stack); }
		for (var k in clients) obj.closeClient(k);
	};
	obj.closeClient = function closeClient(cltNo) {
		try { if (cltNo && clients[cltNo]) { clients[cltNo].end(); clients[cltNo].destroy(); } }
		catch (e) { console.log('closeClient: ' + clt.remoteAddress + ":" + clt.remotePort + ' err:' + e.stack); }
	};
	obj.writeClient = function writeClient(buf, cltNo) {
		try {
			if (buf) {
				if (cltNo && clients[cltNo]) clients[cltNo].write(buf);
				else console.log("客户端连接指定无效");
			}
			else console.log("指定传输数据为空");
		}
		catch (e) { console.log('writeClient: ' + cltNo + ' err:' + e.stack); }
	};
	//  ------------------------------------------------------------
	return obj;
};
function sendCmd(cltNo, dev, cmd, addr, len, data) {
	if (!cltNo) { console.log('连接号cltNo有误！'); return; }
	if (typeof (dev) != 'number' || dev < 0) { console.log('设备485地址dev有误！'); return; }
	if (typeof (cmd) != 'number' || cmd != 2 && cmd != 4) { console.log('设备指令cmd有误！'); return; }
	if (typeof (addr) != 'number' || addr < 4) { console.log('存储地址addr有误！'); return; }
	if (typeof (len) != 'number' || len < 0) { console.log('数据长度len有误！'); return; }
	if ((typeof (data) != 'number' || data < 0) && data != null) { console.log('写入数据data有误！'); return; }
	var cmdStr = "0000D7EF0200100000000400F8D3"; // 读取采样率 固定4字节长 万能验证码F8D3
	if (cmd == 4) cmdStr += (new Buffer(len)).toString('hex') + "F8D3"; // 写入数据
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
	console.log('向设备[' + dev + ']发送指令cmd:' + buf.toString('hex'));
}

function handleData(buf, cltNo) {
	if (buf && buf.length > 0) {
		var chnl = 0, hexStr = buf.toString("hex");
		if (hexStr.length == 286) hexStr = "00" + hexStr;
		var dev = parseInt(hexStr.substring(2, 4) + hexStr.substring(0, 2), 16),
			len = parseInt(hexStr.substring(22, 24) + hexStr.substring(20, 22), 16),
			addr = parseInt(hexStr.substring(18, 20) + hexStr.substring(16, 18) + hexStr.substring(14, 16) + hexStr.substring(12, 14), 16);
		if ((chnl < 0 || chnl > 15) && addr == 768) alert("通道号不在有效范围，请重新配置!");
		else if (buf[4] == 3) {
			console.log("485地址:" + hexStr.substring(28, 28 + 2 * 4));
			if (addr == 20) // 客户端连接上后就发的指令
			{
				sendCmd(cltNo, parseInt(dev), 2, 12, 4, null);
			}
			else if (addr == 12) // 读取设置的指令
			{
				console.log("工作模式:" + hexStr.substring(28, 28 + 2 * 4));
				sendCmd(cltNo, dev, 2, 16, 4, null);
			}
			else if (addr == 16) {
				console.log("采样率:" + hexStr.substring(28, 28 + 2 * 4));
				sendCmd(cltNo, dev, 2, 44, 4, null);
			}
			else if (addr == 44) {
				console.log("启动/停止:" + hexStr.substring(28, 28 + 2 * 4));
				sendCmd(cltNo, dev, 2, 28, 4, null);
			}
			else if (addr == 28) {
				console.log("Fram存储器页码:" + hexStr.substring(28, 28 + 2 * 4));
				sendCmd(cltNo, dev, 2, 32, 4, null);
			}
			else if (addr == 32) {
				console.log("Fram存储器组号:" + hexStr.substring(28, 28 + 2 * 4));
				//sendCmd(dev,2,596,4,null);
				sendCmd(cltNo, dev, 2, 20, 4, null);
			}
			else if (addr == 596) {
				fram = parseInt(hexStr.substring(34, 36) + hexStr.substring(32, 34) + hexStr.substring(30, 32) + hexStr.substring(28, 30), 16)
				console.log("Fram存储器最后一次写入的地址: " + hexStr.substring(28, 28 + 2 * 4) + " " + fram);
				if (cmdFlg == "addr44->1" && fram > 0) { sendCmd(dev, 2, fram, 128, null); cmdFlg = null; }
			}
			else if (addr == fram) {
				//======================================================//
				//					 通道数据解析						//
				//======================================================//
				var start = 0;
				var end = 0;
				var data = hexStr.substring(28, 28 + 2 * 128); //返回数据的数据段
				end = 4 * 2;
				var magic_world1 = data.substring(start, end);//标志位
				start = end;
				end = start + 2 * 2;
				var data_format_type = data.substring(start, end);//格式类型
				start = end;
				end = start + 2 * 2;
				var header_length = data.substring(start, end);//头长度
				start = end;
				end = start + 8 * 2;
				var time = data.substring(start, end);//时间
				start = end;
				end = start + 2 * 2;
				var channel_mask = data.substring(start, end);//通道有值
				start = end;
				end = start + 2 * 2;
				var sample_rate = data.substring(start, end);//采样率
				start = end;
				end = start + 2 * 2;
				var header_crc = data.substring(start, end);//头的crc
				start = end;
				end = start + 2 * 32 * 2;
				var freq_res_data = data.substring(start, end);//频率和电阻值
				start = end;
				end = start + 2 * 2;
				var data_crc = data.substring(start, end);//数据的crc
				console.log("通道有值: [" + channel_mask + "] " +
					parseInt(channel_mask.substring(2, 4) + channel_mask.substring(0, 2), 16));
				console.log("采样率: [" + sample_rate + "] " +
					parseInt(sample_rate.substring(2, 4) + sample_rate.substring(0, 2), 16));
				console.log("时间: [" + time + "] " +
					parseInt(time.substring(12, 14), 16) + "年_" +
					parseInt(time.substring(10, 12), 16) + "星期_" +
					parseInt(time.substring(8, 10), 16) + "月_" +
					parseInt(time.substring(6, 8), 16) + "日_" +
					parseInt(time.substring(4, 6), 16) + "时_" +
					parseInt(time.substring(2, 4), 16) + "分_" +
					parseInt(time.substring(0, 2), 16) + "秒_"
				);
			}
			else if (addr == 768) // 读取数据
			{
				var data = hexStr.substring(28, 28 + 2 * 4 * 2 * 16);
				data = data.substring(chnl * 2 * 4 * 2, chnl * 2 * 4 * 2 + 2 * 4 * 2); // 取出频率/电阻并且高低互换
				var hz_int = parseInt(data.substring(6, 8) + data.substring(4, 6) + data.substring(2, 4) + data.substring(0, 2), 16);
				var r_int = parseInt(data.substring(14, 16) + data.substring(12, 14) + data.substring(10, 12) + data.substring(8, 10), 16);
				var hz = parseFloat(hz_int / 10);
				var temp = 1.0 / (Math.log(r_int / 3000.0) / 3950.0 + 1.0 / 298.45) - 273.15;
				temp = Math.round((temp) * 100.0) / 100.0;
				console.log(chnl + "通道频率和温度: " + hz + " " + temp);
				dataStr += new Date().getTime() + '\t' + '频率：' + hz + '\t' + '温度：' + temp + '\r\n';
				// chgDraw(gauge,hz,temp);
			}
			else console.log("未识别3addr:" + addr);
		}
		else if (buf[4] == 7) {
			if (cmdFlg == "addr12") // 初始化设置
			{
				sendCmd(cltNo, dev, 4, 16, 4, 5);
				cmdFlg = "addr16"
				console.log("设置采样率5秒一次");
			}
			else if (cmdFlg == "addr16") {
				sendCmd(cltNo, dev, 4, 44, 4, 0);
				cmdFlg = "addr44->0"
				console.log("停止测量开关");
			}
			else if (cmdFlg.substring(0, 6) == "addr44") {
				console.log("cmdFlg:" + cmdFlg);
				if (cmdFlg == "addr44->1") {
					cmdFlg = null;
					// document.getElementById("cmd14").value = "停止采集";
					// setTimeout(function(){sendCmd(dev,2,596,4,null);},45000);
				}
				else {
					cmdFlg = null;
					//document.getElementById("cmd14").value = "开始采集";
				}
			}
			else console.log("未识别7addr:" + addr);
		}
		else console.log("未识别读写指令:" + buf[4]);
	}
	else console.log('handleData gauge或buf为空！');
}

//  ************************************************************************
var dataStr, netObj1, cltNo1, result = new Set(), DevicesIdx = {}; // DevicesIdx：{addr485:[19,0]}
var DevicesInfo = {
	'192.168.30.161': [1543, 1615],
	'192.168.30.151': [1746, 1740],
	'192.168.30.141': [1482, 1779],
	'192.168.30.132': [1650, 1443],
	'192.168.30.121': [1513, 1782],
	'192.168.30.111': [1781, 1742]
};
for (var k1 in DevicesInfo) for (var k2 in DevicesInfo[k1]) DevicesIdx[DevicesInfo[k1][k2]] = [k1, k2];
console.log(DevicesIdx);
if (netObj1) netObj1.closeSocketServer();
netObj1 = net();
netObj1.openSocketServer(function (cltNo, buf) {
	function sendOrder(iport, rs485, n) {
		setTimeout(function () {
			console.log("Send order to " + iport + " " + rs485);
			sendCmd(cltNo, rs485, 2, 20, 4, null);
		}, 2000 * n);
	}
	if (cltNo) {
		if (buf) // 数据发来回调
		{
			if (buf.length) {
				var addr485 = buf[1] * 256 + buf[0]; //设备地址
				if (buf.length < 50) {
					console.log(cltNo + "[" + addr485 + "]发来数据：" + buf.toString("hex"));
					result.add(addr485);
				} else {
					console.log(cltNo + "[" + addr485 + "]发来数据：" + buf.slice(0, 50).toString("hex") + "...");
					result.add(addr485);
				}
				//	handleData(buf,cltNo);
			}
		}
		else // 客户端连接上回调
		{
			var rs485ip = cltNo.split(":")[0], i = 0;
			for (k = 0; k < DevicesInfo[rs485ip].length; k++) sendOrder(cltNo, DevicesInfo[rs485ip][k], i++);
			//	for (var j in DevicesInfo)
			//		for (k=0; k<DevicesInfo[j].length; k++) sendOrder (cltNo,DevicesInfo[j][k],i++);
		}
	}
	else console.log("listening 11000...."); // 打开监听回调
}, '0.0.0.0', 11000);

setTimeout(function () {
	console.log('These devices is connected!', result);
	if (netObj1) {
		netObj1.closeSocketServer();
		console.log("listening 11000 stop!");
	}
}, 5000);