const menuRoutes = [
    {
        path: '/',
        redirect: '/Resource'
    },
    {
        path: '/Resource',
        name: 'Resource',
        component: () => import('../views/Resource/index.vue'),
        meta: {
            name: "resource"
        },
        redirect: '/Resource/user-manage',
        children: [
            {
                path: 'user-manage',
                component: () => import('../views/Resource/UserManage/index.vue'),
                meta: {
                    name: "user"
                }
            }, {
                path: 'que-manage',
                component: () => import('../views/Resource/QueManage/index.vue'),
                meta: {
                    name: "que"
                }
            },
            {
                path: '/details',
                name: 'Details',
                component: () => import('../views/Resource/UserManage/Details.vue'),
                meta: {
                    name: "user"
                }
            },
            {
                path: '/user-message',
                name: 'UserMessage',
                component: () => import('../views/Resource/UserManage/UserMessage.vue'),
                meta: {
                    name: "user"
                }
            }
        ]
    },
    {
        path: '/train',
        name: 'Train',
        component: () => import('../views/Train/Train.vue'),
        meta: {
            name: "train"
        }
    },
    {
        path: '/plan',
        name: 'Plan',
        component: () => import('../views/Plan/Plan.vue'),
        meta: {
            name: "plan"
        }
    },
    {
        path: '/synthesis',
        name: 'Synthesis',
        component: () => import('../views/Synthesis/Synthesis.vue'),
        meta: {
            name: "synthesis"
        }
    }
]

export default menuRoutes