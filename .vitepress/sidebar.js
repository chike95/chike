export default {

  "/EE/comm/": [
    {
      text: "通信",
      // collapsed: true,
      items: [
        { text: "modbus", link: "/EE/comm/modbus/" },
        { text: "RS485", link: "/EE/comm/rs485/" }],
    },
    {
      text: "原理",
      // collapsed: true,
      items: [
        { text: "TypeScript", link: "/FE/typescript/" },
        { text: "TypeScript", link: "/FE/typescript/" },
      ],
    },
  ],

  "/EE/components/": [
    {
      text: "元件",
      // collapsed: true,
      items: [{ text: "TypeScript", link: "/FE/typescript/" }],
    },
    {
      text: "器件",
      // collapsed: true,
      items: [
        { text: "dht11", link: "/EE/components/dht11/" },
        { text: "oled", link: "/EE/components/oled/" },
      ],
    },
  ],

  "/EE/DB/": [
    {
      text: "ESP8266",
      // collapsed: true,
      items: [{ text: "TypeScript", link: "/FE/typescript/" }],
    },
    {
      text: "STM32F103",
      // collapsed: true,
      items: [{ text: "STM32F103", link: "/EE/dev/" }],
    },
  ],

  "/EE/dev/": [
    {
      text: "Keil",
      // collapsed: true,
      items: [{ text: "基础知识", link: "/EE/dev/keil/" }],
    },
    {
      text: "Arduino",
      // collapsed: true,
      items: [{ text: "基础知识", link: "/EE/dev/arduino/" }],
    },
  ],

  "/FE/typescript/": [
    {
      // text: "TypeScript",
      // collapsed: true,
      items: [{ text: "TypeScript", link: "/FE/typescript/" }],
    },
  ],

  "/RD/linux/": [
    {
      text: "基础知识",
      // collapsed: true,
      items: [{ text: "ssh", link: "/RD/linux/ssh" }],
    },
    {
      text: "软件",
      collapsed: false,
      items: [{ text: "onboard", link: "/RD/linux/software/onboard/" }],
    },
  ],

  "/RD/node/": [
    {
      text: "node 核心",
      collapsed: false,
      items: [
        { text: "安装配置", link: "/RD/node/core/config" },
        { text: "FS", link: "/RD/node/core/fs" },
        { text: "HTTP", link: "/RD/node/core/http" },
        { text: "TCP", link: "/RD/node/core/tcp" },
      ],
    },
    {
      text: "常用库",
      collapsed: false,
      items: [
        {
          text: "sequelize",
          link: "/RD/node/library/sequelize/",
          items: [
            { text: "快速上手", link: "/RD/node/library/sequelize/01" },
            { text: "模型", link: "/RD/node/library/sequelize/02" },
          ],
        },
        { text: "nodemailer", link: "/RD/node/library/nodemailer/" },
        { text: "modbus-serial", link: "/RD/node/library/modbus-serial/" },
      ],
    },
    {
      text: "Express",
      collapsed: true,
      items: [
        { text: "快速入门", link: "/RD/node/express/" },
        { text: "modbus-serial", link: "/RD/node/library/modbus-serial/" },
      ],
    },
    {
      text: "Koa",
      collapsed: true,
      items: [
        { text: "快速入门", link: "/RD/node/koa/" },
        { text: "modbus-serial", link: "/RD/node/library/modbus-serial/" },
      ],
    },
    {
      text: "NestJS",
      collapsed: false,
      items: [
        { text: "快速入门", link: "/RD/node/nest/" },
        { text: "CLI", link: "/RD/node/nest/cli" },
      ],
    },
    {
      text: "实战项目: nestJS 小慕图书",
      collapsed: false,
      items: [
        { text: "一、项目分析", link: "/RD/node/nest/book-admin/01" },
        { text: "二、项目搭建", link: "/RD/node/nest/book-admin/02" },
        { text: "三、登录模块", link: "/RD/node/nest/book-admin/03" },
        { text: "四、前端权限", link: "/RD/node/nest/book-admin/04" },
        { text: "五、图书功能", link: "/RD/node/nest/book-admin/05" },
      ],
    },
  ],

  "/work/ysb/": [
    {
      text: "分类：振弦式",
      collapsed: false,
      items: [
        { text: "振弦", link: "/work/ysb/vibratingWire/" },
        { text: "传感器", link: "/work/ysb/vibratingWire/01-sensor" },
        { text: "采集仪", link: "/work/ysb/vibratingWire/02-instrument" },
        { text: "程序开发", link: "/work/ysb/vibratingWire/03-software" },
      ],
    },
    {
      text: "分类：电式",
      collapsed: false,
      items: [

        { text: "地震仪", link: "/work/ysb/seismometer/" },
        { text: "485 倾角仪", link: "/work/ysb/485inclinometer/" },
        { text: "电压型水准仪", link: "/work/ysb/level/" },
        { text: "电流型水准仪", link: "/work/ysb/level/level-i" },
      ],
    },

  ],

  "/work/youren/": [
    { text: "USR-TCP232-306 产品记录", link: "/work/youren/USR-TCP232-306/" },
    {
      text: "USR-TCP232-306 配置软件",
      link: "/work/youren/USR-TCP232-306/485",
    },
  ],

  "/work/devices/": [
    { text: "大华摄像头", link: "/work/devices/dahua/camera" },
    { text: "ZH-T08R-14N1", link: "/work/devices/ZH-T08R-14N1/strain-8R" },
    { text: "蒲公英R300路由器", link: "/work/devices/oray/R300" },
  ],

  "/work/software/": [
    {
      text: "程序分析",
      collapsed: false,
      items: [
        { text: "通用函数", link: "/work/software/common" },
        { text: "昆山应变倾角", link: "/work/software/231104-kunshan" },
      ],
    },
    {
      text: "shmcom",
      collapsed: false,
      items: [
        { text: "tcp服务", link: "/work/software/common" },
        { text: "系统采集", link: "/work/software/231104-kunshan" },
      ],
    },
    {
      text: "xiot",
      collapsed: false,
      items: [
        { text: "xiot系统", link: "/work/software/xiot/" },
        { text: "initServer", link: "/work/software/xiot/initServer" },
      ],
    },
    {
      text: "项目部署",
      collapsed: false,
      items: [
        { text: "windows", link: "/work/software/windows_env" },
        {
          text: "ubuntu",
          items: [
            { text: "系统安装", link: "/work/software/ubuntu/01_system" },
            { text: "环境搭建", link: "/work/software/ubuntu/02_dev" },
            { text: "程序部署", link: "/work/software/ubuntu/03_config" },
          ],
        },
      ],
    },
  ],

  "/work/logs/": [
    { text: "泰康", link: "/work/logs/taikang/240325" },
    { text: "滨州体育中心", link: "/work/logs/binzhou/240402" },
    { text: "宝武裂缝监测", link: "/work/logs/baowu/240325" },
    { text: "海南三亚游泳馆", link: "/work/logs/hainan/natatorium" },
    { text: "vivo 全球 AI 研发中心", link: "/work/logs/vivo/240325" },
  ],

  "/thought/world/": [
    {
      text: "《道学》",
      //   collapsed: true,
      items: [
        { text: "彼: 吾思之源，吾思之形", link: "/thought/world/" },
        { text: "道", link: "/thought/world/dao.md" },
        { text: "混沌", link: "/thought/world/chaos.md" },
        { text: "周期", link: "/thought/world/cycle.md" },
      ],
    },
  ],
  "/thought/zhuangzi/": [
    {
      text: "《庄子·内七篇》",
      //   collapsed: true,
      items: [
        { text: "逍遥游", link: "/thought/zhuangzi/01-xiaoyaoyou.md" },
        { text: "齐物论", link: "/thought/zhuangzi/02-qiwulun.md" },
        { text: "养生主", link: "/thought/zhuangzi/03-yangshengzhu.md" },
      ],
    },
  ],
  "/practice/zhenpath/": [
    {
      text: "实践·真途",
      collapsed: false,
      items: [
        { text: "混沌领域", link: "/practice/zhenpath/chaos.md" },
        { text: "需求分析", link: "/practice/zhenpath/requirement.md" },
        { text: "社区管理", link: "/practice/zhenpath/manage.md" },
      ],
    },
    {
      text: "后端开发",
      collapsed: false,
      items: [
        { text: "混沌领域", link: "/practice/zhenpath/backend/chaos.md" },
        { text: "开发环境准备", link: "/practice/zhenpath/backend/setup.md" },
      ],
    },
    {
      text: "前端开发",
      collapsed: false,
      items: [
        { text: "混沌领域", link: "/practice/zhenpath/frontend/chaos.md" },
        { text: "开发环境准备", link: "/practice/zhenpath/frontend/setup.md" },
      ],
    },
    {
      text: "互联网分析",
      collapsed: false,
      items: [
        { text: "web发展", link: "/practice/zhenpath/web/" },
        { text: "研究内容", link: "/practice/zhenpath/study.md" },
      ],
    },
  ],
  "/economy/macro/": [
    {
      // text: "宏观经济",
      //   collapsed: true,
      items: [
        { text: "宏观经济", link: "/economy/macro/" },
        { text: "混沌领域", link: "/economy/macro/chaos.md" },
        { text: "宏观经济学之“道”", link: "/economy/macro/dao.md" },
        { text: "宏观经济学的数据指标", link: "/economy/macro/data.md" },
      ],
    },
  ],
  "/economy/stock/": [
    {
      text: "趋势投资",
      collapsed: false,
      items: [
        { text: "理论基础", link: "/economy/stock/trend/theory" },
        { text: "趋势投资的概念", link: "/economy/stock/trend/concept" },
      ],
    },
    {
      text: "探索：币圈趋势交易的研究",
      collapsed: false,
      items: [
        { text: "研究介绍", link: "/economy/stock/bitcion/" },
        { text: "交易系统", link: "/economy/stock/bitcion/system" },
      ],
    },
    {
      text: "实战：构建A股趋势交易系统",
      collapsed: false,
      items: [
        { text: "项目介绍", link: "/economy/stock/market/" },
        { text: "均线系统", link: "/economy/stock/market/average" },
      ],
    },
  ],
  "/economy/news/": [
    {
      text: "《2024年经济要闻》",
      //   collapsed: true,
      items: [
        { text: "1月", link: "/economy/news/2024/01" },
        { text: "3月", link: "/economy/news/2024/03" },
        { text: "4月", link: "/economy/news/2024/04" },
      ],
    },
    {
      text: "《专题要闻》",
      //   collapsed: true,
      items: [{ text: "俄乌战争", link: "/economy/news/2024/01" }],
    },
  ],
};
