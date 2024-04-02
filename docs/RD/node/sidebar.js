module.exports = [
    {
        title: '安装配置',
        path: '/RD/node/01_config',
        collapsable: true,
        sidebarDepth: 2,
        // children: [
        //     '/FE/VUE/base'
        // ]
    },
    {
        title: '模块管理',
        path: '/RD/node/02_module',
        collapsable: true,
        sidebarDepth: 2,
    },
    {
        title: '异步处理',
        path: '/RD/node/',
        collapsable: true,
        sidebarDepth: 2,
    },
    {
        title: 'FS模块',
        path: '/RD/node/04_fs',
        collapsable: true,
        sidebarDepth: 2,
    },
    {
        title: 'HTTP',
        path: '/RD/node/http',
        collapsable: true,
        sidebarDepth: 2,
    }, {

        title: 'TCP',
        path: '/RD/node/tcp',
        collapsable: true,
        sidebarDepth: 2,
    }, {

        title: 'Sequelize',
        path: '/RD/node/sequelize',
        collapsable: true,
        sidebarDepth: 2,
        children: [
            '/RD/node/sequelize/01',
        ]
    },
    {
        title: 'Express',
        path: '/RD/node/express',
        collapsable: true,
        sidebarDepth: 2,
    },
    {
        title: 'KOA',
        path: '/RD/node/koa/',
        collapsable: true,
        sidebarDepth: 2,
    },
    {
        title: 'KOA2实战：模拟新浪微博',
        path: '/RD/node/koa/',
        collapsable: true,
        sidebarDepth: 1,
        children: [
            '/RD/node/koa/koa2-sina-01',
            '/RD/node/koa/koa2-sina-02',
            '/RD/node/koa/koa2-sina-03',
            '/RD/node/koa/koa2-sina-04',
            '/RD/node/koa/koa2-sina-05',
            '/RD/node/koa/koa2-sina-06',
            '/RD/node/koa/koa2-sina-07',
        ]
    },
    {
        title: 'KOA2全栈：开发当当书城',
        path: '/RD/node/quanzhan/',
        collapsable: true,
        sidebarDepth: 2,
        children: [
            '/RD/node/quanzhan/webapp-01',
            '/RD/node/quanzhan/webapp-02',
        ]
    }, {
        title: 'NestJS：全栈后台管理系统',
        path: '/RD/node/nest/book-admin/',
        collapsable: true,
        sidebarDepth: 2,
        children: [
            '/RD/node/nest/book-admin/01',
            '/RD/node/nest/book-admin/02',
            '/RD/node/nest/book-admin/03',
            '/RD/node/nest/book-admin/04',
            '/RD/node/nest/book-admin/05',
        ]
    },
    {
        title: 'Git',
        path: '/RD/node/git',
        collapsable: true,
        sidebarDepth: 2,
    },
    {
        title: '功能代码',
        path: '/RD/node/code',
        collapsable: true,
        sidebarDepth: 2,
    },
    {
        title: '功能库',
        path: '/RD/node/library/',
        collapsable: true,
        sidebarDepth: 2,
        children: [
            '/RD/node/library/modbus-serial/modbus-serial',
            '/RD/node/nodemailer',
        ]
    },
]
