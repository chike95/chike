export default {
  /******************************* 物联网 ************************************/
  "/iot/": [
    {
      text: "物联网导论",
      //   collapsed: true,
      items: [
        { text: "概述", link: "/iot/" },
        { text: "感知识别", link: "/iot/perception" },
      ],
    },
  ],
  "/iot/computer/": [
    {
      text: "计算机科学",
      //   collapsed: true,
      items: [
        { text: "概述", link: "/iot/computer/philosophy/" },
        { text: "组成篇", link: "/iot/perception" },
        { text: "计算篇", link: "/iot/perception" },
        { text: "实战篇", link: "/iot/perception" },
      ],
    },
    {
      text: "组成原理",
      //   collapsed: true,
      items: [
        { text: "概述", link: "/iot/computer/composition/" },
        { text: "组成篇", link: "/iot/computer/composition/01" },
        { text: "计算篇", link: "/iot/computer/composition/02" },
        { text: "实战篇", link: "/iot/computer/composition/03" },
      ],
    },
    {
      text: "操作系统",
      //   collapsed: true,
      items: [
        { text: "概述", link: "/iot/computer/os/" },
        { text: "基本功能", link: "/iot/computer/os/01" },
        { text: "Linux系统", link: "/iot/computer/os/02" },
        { text: "进阶知识", link: "/iot/computer/os/03" },
        { text: "项目实战", link: "/iot/computer/os/04" },
      ],
    },
    {
      text: "网络",
      //   collapsed: true,
      items: [
        { text: "概述", link: "/iot/computer/net/" },
        { text: "网络层", link: "/iot/computer/net/01" },
        { text: "传输层", link: "/iot/computer/net/02" },
        { text: "应用层", link: "/iot/computer/net/03" },
        { text: "项目实战", link: "/iot/computer/net/04" },
      ],
    },
  ],
  /******************************* 电子工程师 ************************************/

  "/EE/comm/": [
    {
      text: "通信",
      // collapsed: true,
      items: [
        { text: "modbus", link: "/EE/comm/modbus/" },
        { text: "RS485", link: "/EE/comm/rs485/" },
      ],
    },
    {
      text: "原理",
      // collapsed: true,
      items: [
        { text: "TypeScript", link: "/FE/typescript/" },
        { text: "基础类型", link: "/FE/typescript/" },
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

  /******************************* 前端开发 ************************************/

  "/FE/HTML/": [
    {
      // text: "TypeScript",
      // collapsed: true,
      items: [
        { text: "HTML", link: "/FE/HTML/01_base" },
        { text: "页面结构", link: "/FE/HTML/02_page" },
        { text: "文本相关", link: "/FE/HTML/03_text" },
        { text: "图片相关", link: "/FE/HTML/04_image" },
      ],
    },
  ],

  "/FE/CSS/": [
    {
      text: "核心内容",
      // collapsed: true,
      items: [
        { text: "CSS", link: "/FE/CSS/" },
        { text: "页面结构", link: "/FE/CSS/02_page" },
        { text: "文本相关", link: "/FE/CSS/03_text" },
        { text: "图片相关", link: "/FE/CSS/04_image" },
      ],
    },
    {
      text: "Element Plus",
      collapsed: false,
      items: [
        { text: "快速开始", link: "/FE/CSS/ele/" },
        { text: "页面结构", link: "/FE/CSS/02_page" },
      ],
    },
    {
      text: "Ant Design Vue",
      collapsed: false,
      items: [
        { text: "快速入门", link: "/FE/CSS/antdv/" },
        { text: "页面结构", link: "/FE/CSS/02_page" },
      ],
    },
    {
      text: "Tailwind",
      collapsed: false,
      items: [
        { text: "CSS", link: "/FE/CSS/" },
        { text: "页面结构", link: "/FE/CSS/02_page" },
      ],
    },
  ],

  "/FE/JS/": [
    {
      // text: "TypeScript",
      // collapsed: true,
      items: [
        { text: "JavaScript", link: "/FE/JS/" },
        { text: "对象", link: "/FE/JS/grammar" },
        { text: "函数", link: "/FE/JS/functions" },
        { text: "数组", link: "/FE/JS/arrays" },
        { text: "类", link: "/FE/JS/class" },
        { text: "正则表达式", link: "/FE/JS/regular" },
        { text: "ES6-13", link: "/FE/JS/ES6" },
      ],
    },
  ],

  "/FE/typescript/": [
    {
      // text: "TypeScript",
      // collapsed: true,
      items: [
        { text: "TypeScript", link: "/FE/typescript/" },
        { text: "类型", link: "/FE/typescript/core/type" },
        { text: "函数", link: "/FE/typescript/core/functions" },
        { text: "类", link: "/FE/typescript/core/class" },
        { text: "装饰器", link: "/FE/typescript/core/decorator" },
      ],
    },
  ],

  "/FE/VUE/": [
    {
      text: "核心知识",
      // collapsed: true,
      items: [
        { text: "VUE 简介", link: "/FE/VUE/" },
        { text: "混沌领域", link: "/FE/VUE/core/chaos" },
      ],
    },
    {
      text: "工具链",
      // collapsed: true,
      items: [
        { text: "vue-router", link: "/FE/VUE/vue-router" },
        { text: "基础知识", link: "/FE/VUE/vite/" },
      ],
    },
    {
      text: "vite 工具",
      // collapsed: true,
      items: [
        { text: "快速开始", link: "/FE/VUE/vite/quickstart" },
        { text: "基础知识", link: "/FE/VUE/vite/" },
      ],
    },
    {
      text: "Vben Admin",
      // collapsed: true,
      items: [
        { text: "核心知识", link: "/FE/VUE/vben/" },
        { text: "基础知识", link: "" },
      ],
    },
  ],

  "/FE/WEB_3D/": [
    {
      text: "Canvas",
      collapsed: false,
      items: [
        { text: "Canvas", link: "/FE/WEB_3D/" },
        { text: "Echarts", link: "/FE/WEB_3D/" },
        { text: "Canvas", link: "/FE/WEB_3D/" },
      ],
    },
    {
      text: "Echarts",
      collapsed: false,
      items: [
        { text: "快速开始", link: "/FE/WEB_3D/echarts/01_quickStart" },
        { text: "Echarts", link: "/FE/WEB_3D/" },
        { text: "Canvas", link: "/FE/WEB_3D/" },
      ],
    },
    {
      text: "WebGL",
      collapsed: false,
      items: [
        { text: "Canvas", link: "/FE/WEB_3D/" },
        { text: "Echarts", link: "/FE/WEB_3D/" },
        { text: "Canvas", link: "/FE/WEB_3D/" },
      ],
    },
    {
      text: "WebGPU",
      collapsed: false,
      items: [
        { text: "Canvas", link: "/FE/WEB_3D/" },
        { text: "Echarts", link: "/FE/WEB_3D/" },
        { text: "Canvas", link: "/FE/WEB_3D/" },
      ],
    },
  ],

  "/FE/others/": [
    {
      text: "常用库",
      // collapsed: true,
      items: [
        { text: "Ajax", link: "/FE/others/ajax/" },
        { text: "Axios", link: "/FE/others/Axios/" },
      ],
    },
    {
      text: "vite 工具",
      // collapsed: true,
      items: [
        { text: "快速开始", link: "/FE/VUE/vite/quickstart" },
        { text: "基础知识", link: "/FE/VUE/vite/" },
      ],
    },
    {
      text: "Vben Admin",
      // collapsed: true,
      items: [
        { text: "核心知识", link: "/FE/VUE/vben/" },
        { text: "基础知识", link: "" },
      ],
    },
  ],

  /******************************* 后端开发 ************************************/
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
      text: "框架",
      collapsed: false,
      items: [
        { text: "Express", link: "/RD/node/express/" },
        { text: "Koa", link: "/RD/node/koa/" },
        { text: "NestJS", link: "/RD/node/nest/" },
      ],
    },

    {
      text: "测试代码",
      collapsed: false,
      items: [
        {
          text: "获取 JSON 格式中的字幕内容",
          link: "/RD/node/test/getSubtitle/",
        },
        { text: "二、项目搭建", link: "/RD/node/nest/book-admin/02" },
      ],
    },
  ],

  "/RD/node/express/": [
    {
      text: "设计思想",
      collapsed: false,
      items: [
        { text: "概述", link: "/RD/node/express/philosophy/" },
        { text: "架构设计", link: "/RD/node/express/" },
      ],
    },
    {
      text: "核心概念",
      collapsed: false,
      items: [{ text: "koa", link: "/RD/node/express/" }],
    },
    {
      text: "实战: koa2打造新浪微博",
      collapsed: false,
      items: [
        { text: "一、项目分析", link: "/RD/node/koa/koa2-sina-01" },
        { text: "二、技术选型和知识点介绍", link: "/RD/node/koa/koa2-sina-02" },
        { text: "三、用户管理", link: "/RD/node/koa/koa2-sina-03" },
        { text: "四、用户设置", link: "/RD/node/koa/koa2-sina-04" },
        { text: "五、创建微博", link: "/RD/node/koa/koa2-sina-05" },
        { text: "六、个人主页", link: "/RD/node/koa/koa2-sina-06" },
        { text: "七、广场页面", link: "/RD/node/koa/koa2-sina-07" },
      ],
    },
  ],
  "/RD/node/koa/": [
    {
      text: "核心概念",
      collapsed: false,
      items: [{ text: "koa", link: "/RD/node/koa/" }],
    },
    {
      text: "实战: koa2打造新浪微博",
      collapsed: false,
      items: [
        { text: "一、项目分析", link: "/RD/node/koa/koa2-sina-01" },
        { text: "二、技术选型和知识点介绍", link: "/RD/node/koa/koa2-sina-02" },
        { text: "三、用户管理", link: "/RD/node/koa/koa2-sina-03" },
        { text: "四、用户设置", link: "/RD/node/koa/koa2-sina-04" },
        { text: "五、创建微博", link: "/RD/node/koa/koa2-sina-05" },
        { text: "六、个人主页", link: "/RD/node/koa/koa2-sina-06" },
        { text: "七、广场页面", link: "/RD/node/koa/koa2-sina-07" },
      ],
    },
  ],

  "/RD/node/nest/": [
    {
      text: "开发哲学",
      collapsed: false,
      items: [
        { text: "核心概念", link: "/RD/node/nest/" },
        { text: "项目规范", link: "/RD/node/nest/specification" },
        { text: "高效开发", link: "/RD/node/nest/efficient" },
        { text: "通用框架", link: "/RD/node/nest/common" },
      ],
    },
    {
      text: "核心概念",
      collapsed: false,
      items: [
        { text: "快速开始", link: "/RD/node/nest/quickstart" },
        { text: "CLI", link: "/RD/node/nest/cli" },
        { text: "控制器", link: "/RD/node/nest/controllers" },
        { text: "提供者", link: "/RD/node/nest/providers" },
        { text: "技术", link: "/RD/node/nest/techniques" },
      ],
    },
    {
      text: "实战: nestJS 小慕图书",
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

  "/RD/java": [
    { text: "知识体系", link: "/RD/java/knowledge" },
    { text: "基础语法", link: "/RD/java/grammar/" },
    { text: "面向对象", link: "/RD/java/grammar/OO" },
    { text: "进阶技术", link: "/RD/java/grammar/advance" },
    { text: "开发提效", link: "/RD/java/development/" },
    { text: "项目实践", link: "/RD/java/grammar/practice" },

    { text: "MyBatis", link: "/RD/java/OO/" },
    { text: "IDEA", link: "/RD/java/idea/" },
    {
      text: "框架",
      collapsed: false,
      items: [
        { text: "Express", link: "/RD/node/express/" },
        { text: "SSM", link: "/RD/node/koa/" },
        { text: "Spring", link: "/RD/java/spring/" },
      ],
    },
  ],

  "/RD/javagrammar/": [
    { text: "基础语法", link: "/RD/java/grammar/" },
    { text: "IDEA", link: "/RD/java/idea/" },
    {
      text: "框架",
      collapsed: false,
      items: [
        { text: "Express", link: "/RD/node/express/" },
        { text: "Koa", link: "/RD/node/koa/" },
        { text: "Spring", link: "/RD/java/spring/" },
      ],
    },
  ],

  "/RD/java/spring/": [
    {
      text: "核心概念",
      collapsed: false,
      items: [
        { text: "项目搭建", link: "/RD/java/spring/construction" },
        { text: "项目部署", link: "/RD/java/spring/deploy" },
      ],
    },
    { text: "常用库", link: "" },
    {
      text: "实战: wiki知识库系统",
      collapsed: false,
      items: [
        { text: "零：项目介绍", link: "/RD/java/spring/wiki/" },
        { text: "一：电子书管理", link: "/RD/java/spring/wiki/01-book" },
        {
          text: "二：分类管理",
          link: "/RD/java/spring/wiki/02-classification",
        },
        { text: "三：文档管理", link: "/RD/java/spring/wiki/03-document" },
        { text: "四：用户管理", link: "/RD/java/spring/wiki/04-user" },
        {
          text: "五：阅读量&点赞量",
          link: "/RD/java/spring/wiki/05-statistics",
        },
        {
          text: "六：知识库功能开发",
          link: "/RD/java/spring/wiki/06-libraries",
        },
      ],
    },
  ],

  "/RD/tool": [
    { text: "Mysql", link: "/RD/tools/mysql/" },
    { text: "Docker", link: "/RD/tools/docker/" },
    { text: "宝塔面板", link: "/RD/tools/baota/" },
    {
      text: "核心概念",
      collapsed: false,
      items: [
        { text: "快速入门", link: "/RD/node/nest/" },
        { text: "CLI", link: "/RD/node/nest/cli" },
        { text: "控制器", link: "/RD/node/nest/controllers" },
        { text: "提供者", link: "/RD/node/nest/providers" },
        { text: "技术", link: "/RD/node/nest/techniques" },
      ],
    },
    {
      text: "实战: nestJS 小慕图书",
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

  "/RD/linux/": [
    {
      text: "基础知识",
      // collapsed: true,
      items: [{ text: "ssh", link: "/RD/linux/ssh" }],
    },

    {
      text: "软件",
      collapsed: false,
      items: [
        { text: "宝塔面板", link: "/RD/linux/baota/" },
        { text: "onboard", link: "/RD/linux/software/onboard/" },
      ],
    },
  ],

  /******************************* 工作记录 ************************************/
  "/work/ysb/": [
    {
      text: "分类：振弦式",
      collapsed: false,
      items: [
        { text: "传感器", link: "/work/ysb/vibratingWire/01-sensor" },
        { text: "采集仪", link: "/work/ysb/vibratingWire/02-instrument" },
        { text: "程序开发", link: "/work/ysb/vibratingWire/03-software" },
      ],
    },
    {
      text: "分类：电式",
      collapsed: false,
      items: [
        { text: "电压采集仪", link: "/work/ysb/explorer/" },
        { text: "地震仪", link: "/work/ysb/seismometer/" },
        { text: "485 倾角仪", link: "/work/ysb/485inclinometer/" },
        { text: "485 水准仪", link: "/work/ysb/level/" },
        { text: "电流型水准仪", link: "/work/ysb/level/level-i" },
      ],
    },
  ],

  "/work/youren/": [
    { text: "LG206", link: "/work/youren/LG206/" },
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
    { text: "软方平板电脑", link: "/work/devices/cosofteck/" },
    { text: "MERCURY无线网桥", link: "/work/devices/mercury/" },
    {
      text: "TP-LINK",
      collapsed: false,
      items: [
        { text: "无线 AP TL-AP302P", link: "/work/devices/TP-LINK/TL-AP302P" },
        { text: "485 倾角仪", link: "/work/ysb/485inclinometer/" },
      ],
    },
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
        { text: "shmcom系统概述", link: "/work/software/shmcom/" },
        { text: "系统采集", link: "/work/software/231104-kunshan" },
      ],
    },
    {
      text: "xiot",
      collapsed: false,
      items: [
        { text: "xiot系统概述", link: "/work/software/xiot/" },
        {
          text: "initServer",
          link: "/work/software/xiot/initServer",
          items: [
            { text: "CfgRoot", link: "/work/software/xiot/CfgRoot" },
            { text: "TypRoot", link: "/work/software/xiot/TypRoot" },
            { text: "SysCtxt", link: "/work/software/xiot/SysCtxt" },
            { text: "IotData", link: "/work/software/xiot/IotData" },
          ],
        },
      ],
    },
    {
      text: "# Nest 健康监测系统开发",
      collapsed: false,
      items: [
        { text: "项目分析", link: "/work/software/xiot-nest/" },
        {
          text: "vite-projet 前端",
          link: "/work/software/xiot-nest/vite-project/",
        },
      ],
    },
  ],

  "/work/deploy/": [
    { text: "双系统配置", link: "/work/deploy/dual-system" },
    { text: "windows", link: "/work/deploy/windows_env" },
    {
      text: "ubuntu",
      items: [
        { text: "系统安装", link: "/work/deploy/ubuntu/01_system" },
        { text: "环境搭建", link: "/work/deploy/ubuntu/02_dev" },
        { text: "程序部署", link: "/work/deploy/ubuntu/03_config" },
      ],
    },
  ],
  "/work/logs/": [
    { text: "端口分配", link: "/work/logs/port" },
    { text: "武汉阿里", link: "/work/logs/whal/" },
    { text: "上海金鼎", link: "/work/logs/jinding/" },
    { text: "新天地", link: "/work/logs/xintiandi/" },
    { text: "泰康", link: "/work/logs/taikang/240325" },
    { text: "昆山足球场", link: "/work/logs/ks/" },
    { text: "滨州体育中心", link: "/work/logs/binzhou/240402" },
    { text: "宝武裂缝监测", link: "/work/logs/baowu/240325" },
    { text: "vivo 全球 AI 研发中心", link: "/work/logs/vivo/240325" },
  ],

  /******************************* 哲思 ************************************/
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
        { text: "创意和概念", link: "/practice/zhenpath/ideas.md" },
        { text: "调研和分析", link: "/practice/zhenpath/survey.md" },
        { text: "规划和设计", link: "/practice/zhenpath/design.md" },
        { text: "运营和推广", link: "/practice/zhenpath/operate.md" },
        { text: "更新和改进", link: "/practice/zhenpath/optimize.md" },
        { text: "社区管理", link: "/practice/zhenpath/manage.md" },
      ],
    },
    {
      text: "项目开发",
      collapsed: false,
      items: [
        { text: "架构设计", link: "/practice/zhenpath/project/framework" },
        { text: "环境准备", link: "/practice/zhenpath/project/setup" },
        { text: "项目部署", link: "/practice/zhenpath/project/deploy" },
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

  "/practice/BookManage/": [
    {
      text: "实践·图书管理",
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
  /******************************* 经济 ************************************/
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
    {
      text: "经济形势",
      collapsed: false,
      items: [
        { text: "当前形势", link: "/economy/macro/situation/" },
        { text: "混沌领域", link: "/economy/macro/chaos.md" },
      ],
    },
    {
      text: "主题研究",
      collapsed: false,
      items: [
        { text: "经济危机", link: "/economy/macro/crisis/" },
        { text: "日本加息", link: "/economy/macro/situation/Japan/240319" },
      ],
    },
    {
      text: "主要经济体",
      collapsed: false,
      items: [
        { text: "美国", link: "/economy/macro/situation/Japan/240319" },
        { text: "中国", link: "/economy/macro/situation/China/" },
        { text: "日本", link: "/economy/macro/situation/Japan/" },
        { text: "德国", link: "/economy/macro/chaos.md" },
        { text: "印度", link: "/economy/macro/chaos.md" },
      ],
    },
  ],

  "/economy/macro/situation/China/": [
    {
      text: "《中国宏观经济学二十五讲》",
      items: [
        { text: "中国经济", link: "/economy/macro/situation/China/index" },
        { text: "供给面分析", link: "/economy/macro/situation/China/supply" },
        { text: "CPI", link: "/economy/macro/situation/China/CPI" },
        { text: "PPI", link: "/economy/macro/situation/China/PPI" },
        { text: "PMI", link: "/economy/macro/situation/China/PMI" },
        { text: "就业率", link: "/economy/macro/situation/China/employment" },
      ],
    },
  ],
  "/economy/macro/crisis/": [
    {
      text: "《关于经济危机的研究》",
      items: [
        {
          text: "基础知识",
          link: "/economy/macro/crisis/2022/",
        },
        { text: "趋势投资的概念", link: "/economy/stock/trend/concept" },
      ],
    },
    {
      text: "本轮经济危机",
      items: [
        {
          text: "2022",
          link: "/economy/macro/crisis/2022/",
        },
        { text: "趋势投资的概念", link: "/economy/stock/trend/concept" },
      ],
    },
  ],

  "/economy/macro/situation/Japan/": [
    {
      text: "《日本宏观经济研究》",
      link: "/economy/macro/situation/Japan/",
    },
    {
      text: "240319：日元加息",
      link: "/economy/macro/situation/Japan/240319",
    },
  ],

  "/economy/stock/": [
    {
      text: "趋势投资",
      collapsed: false,
      items: [
        { text: "理论基础", link: "/economy/stock/trend/theory" },
        { text: "概念定义", link: "/economy/stock/trend/concept" },
        { text: "技术指标", link: "/economy/stock/trend/indicator" },
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
    {
      text: "年度记录",
      collapsed: false,
      items: [
        { text: "2024", link: "/economy/stock/year/2024" },
        { text: "2023", link: "/economy/stock/market/average" },
      ],
    },
  ],
};
