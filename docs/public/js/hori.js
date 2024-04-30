function FillString(t, c, n, b) // 填充字符串
{
	if ((t == "") || (c.length != 1) || (n <= t.length)) return t;
	var l = t.length;
	for (var i = 0; i < n - l; i++)
	{
		if (b == true) t = c + t;
		else t += c;
	}
	return t;
}

function HexToSingle(t) // 8Hex字符串转浮点数
{
	t = t.replace(/\s+/g, "");
	if (t == "") return "";
	if (t == "00000000") return "0";
	if ((t.length > 8) || (isNaN(parseInt(t, 16)))) return "Error";
	if (t.length < 8) t = FillString(t, "0", 8, true);
	t = parseInt(t, 16).toString(2);
	t = FillString(t, "0", 32, true);
	var s = t.substring(0, 1);
	var e = t.substring(1, 9);
	var m = t.substring(9);
	e = parseInt(e, 2) - 127;
	m = "1" + m;
	if (e >= 0) m = m.substr(0, e + 1) + "." + m.substring(e + 1)
	else m = "0." + FillString(m, "0", m.length - e - 1, true)
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

function readData (cltNo,dev)
{
	var buf = new Buffer(14);
	buf[0] = (+dev)%256;
	buf[1] = (+dev)>>8%256;
	buf[2] = 0xD7;
	buf[3] = 0xEF;
	buf[4] = 0x02;
	buf[5] = 0x00;
	buf[6] = 0x00;
	buf[7] = 0x11;
	buf[8] = 0x00;
	buf[9] = 0x00;
	buf[10] = 0x08;
	buf[11] = 0x00;
	buf[12] = 0xF8;
	buf[13] = 0xD3;
	netObj1.writeClient(buf,cltNo); // 连续写入指令
	console.log("向设备发送指令:"+buf.toString('hex'));
};

function handleData(buf)
{
	function bytes2Float(hStr)
	{
		if (!hStr || hStr.length != 8) return null;
		hStr = hStr.substring(6) + hStr.substring(4,6) + hStr.substring(2,4) + hStr.substring(0,2); // 高低互换
		return HexToSingle(hStr); // 十六进制转成浮点数 console.log('hStr:',hStr);
	}

	if (!buf || !buf.length) return;
	var buftohex = buf.toString('hex'); // console.log('buftohex: ' + buftohex);
	if (buftohex.length == 38) { buftohex = "00" + buftohex; buf = new Buffer(buftohex,'hex'); }
	else if (buftohex.length == 46) { buftohex = "00" + buftohex; buf = new Buffer(buftohex,'hex'); }
	if (buf[4] === 3)
	{
		if (buf[6] + buf[7]*256 == 4352)
		{
			var alpha1 = bytes2Float(buftohex.substring(28,36)) // 转浮点数 console.log('alpha1: ',alpha1);
			var alpha2 = bytes2Float(buftohex.substring(36,44)) // 转浮点数 console.log('alpha2: ',alpha2);
			console.log("读取数据返回：" + buftohex + " : " + alpha1 + "," + alpha2);
		}
		else if (buf[6] + buf[7]*256 == 24)
			console.log("读取K系数返回：" + buftohex + " : " + bytes2Float(buftohex.substring(28,36)));
		else if (buf[6] + buf[7]*256 == 28)
			console.log("读取B系数返回：" + buftohex + " : " + bytes2Float(buftohex.substring(28,36)));
		else console.log("读取其它返回：" + buftohex);
	}
	else if (buf[4] === 7)
	{
		var hStr = buftohex.substring(28,36);
		console.log("写入命令返回：" + buftohex);
	}
}

//  ************************************************************************
var dataStr, netObj1, result = new Set(), DevicesIdx = {};
var DevicesInfo = {
	'192.168.30.112': [5361],
	'192.168.30.122': [5316],
	'192.168.30.133': [5299],
	'192.168.30.142': [5286],
	'192.168.30.152': [5287],
	'192.168.30.162': [5183]
};
for (var k1 in DevicesInfo) for (var k2 in DevicesInfo[k1])
	DevicesIdx[DevicesInfo[k1][k2]] = [k1, k2]; // DevicesIdx：{addr485:[19,0]}
console.log(DevicesIdx);
if (netObj1) netObj1.closeSocketServer();
netObj1 = net();
netObj1.openSocketServer(function (cltNo, buf) {
	function sendOrder (iport,rs485,n){
		setTimeout(function(){
			console.log("Send order to " + iport + " " + rs485);
			readData(iport, rs485);
		},2000 * n);
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
				handleData(buf);
			}
		}
		else // 客户端连接上回调
		{
			var rs485ip = cltNo.split(":")[0]; i = 0;
			if (DevicesInfo[rs485ip]) for (k=0; k<DevicesInfo[rs485ip].length; k++)
				sendOrder(cltNo,DevicesInfo[rs485ip][k],i++);
		//	for (var j in DevicesInfo)
		//		for (k=0; k<DevicesInfo[j].length; k++) sendOrder(cltNo,DevicesInfo[j][k],i++);
		}
	}
	else console.log("listening 12000...."); // 打开监听回调
}, '0.0.0.0', 12000);

setTimeout(function () {
	console.log('These devices is connected!', result);
	if (netObj1) {
		netObj1.closeSocketServer();
		console.log("listening 12000 stop!");
	}
}, 15000);