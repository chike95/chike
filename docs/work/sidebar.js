module.exports = [

    {
        title: '硬件测试',
        path: '/work/hardware/',
        collapsable: true,
        sidebarDepth: 2,
        children: [
            '/work/hardware/02_RS485',
            '/work/hardware/01_strain',
        ]
    },
    {
        title: '系统集成',
        path: '/work/software/',
        collapsable: true,
        sidebarDepth: 2,
        children: [
            '/work/software/485',
            '/work/software/data',
            '/work/software/strain',
            '/work/software/485horizontal',
            '/work/software/explorer',
            '/work/software/function',
            '/work/software/modbus/strain',
        ]
    },
    {
        title: '网络设备',
        path: '/work/devices/',
        collapsable: true,
        sidebarDepth: 3,
        children: [
            '/work/devices/net',
            '/work/devices/dahua',
        ]
    },
    {
        title: '调试系统',
        path: '/work/debug/',
        collapsable: true,
        sidebarDepth: 3,
        children: [
            '/work/debug/1',
        ]
    },
    {
        title: 'Ubuntu 部署',
        path: '/work/deploy/ubuntu/',
        collapsable: true,
        sidebarDepth: 2,
        children: [
            '/work/deploy/ubuntu/01_system',
            '/work/deploy/ubuntu/02_dev',
            '/work/deploy/ubuntu/03_config',
        ]
    },
]
