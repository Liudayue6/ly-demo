const menuData = [
    {
        id: '1',
        title: '资源管理',
        name: 'resource',
        path: '/Resource',
        icon: 'el-icon-document',
        children: [{
            id: '1-1',
            title: '用户管理',
            name: 'user',
            path: '/Resource/user-manage',
        },
        {
            id: '1-2',
            title: '试题管理',
            name: 'que',
            path: '/Resource/que-manage',
        }
        ]
    },
    {
        id: '2',
        title: '实训管理',
        path: '/train',
        name: "train",
        icon: 'el-icon-monitor',
    },
    {
        id: '3',
        title: '训练计划管理',
        path: '/plan',
        name: "plan",
        icon: 'el-icon-s-order',
    },
    {
        id: '4',
        title: '综合管理',
        path: '/synthesis',
        name: "synthesis",
        icon: 'el-icon-menu',
    }
]

export default menuData