const menuData = [
    {
        title: '资源管理',
        name: 'resource',
        path: '/Resource',
        icon: 'el-icon-document',
        children: [{
            title: '用户管理',
            name: 'user',
            path: '/Resource/user-manage',
        },
        {
            title: '试题管理',
            name: 'que',
            path: '/Resource/que-manage',
        }
        ]
    },
    {
        title: '实训管理',
        path: '/train',
        name: "train",
        icon: 'el-icon-monitor',
    },
    {
        title: '训练计划管理',
        path: '/plan',
        name: "plan",
        icon: 'el-icon-s-order',
    },
    {
        title: '综合管理',
        path: '/synthesis',
        name: "synthesis",
        icon: 'el-icon-menu',
    }
]

export default menuData