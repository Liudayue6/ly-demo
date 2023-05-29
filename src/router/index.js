import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Layout/index.vue'
// import Resource from '../views/Resource/index.vue'
import Login from '../views/Login/index.vue'
//异步
// const Train = () => import('../views/Train/Train.vue')
// const Plan = () => import('../views/Plan/Plan.vue')
// const Synthesis = () => import('../views/Synthesis/Synthesis.vue')
// const UserManage = () => import('../views/Resource/UserManage/index.vue')
// const QueManage = () => import('../views/Resource/QueManage/index.vue')
// const Details = () => import('../views/Resource/UserManage/Details.vue')
// const UserMessage = () => import('../views/Resource/UserManage/UserMessage.vue')

Vue.use(VueRouter)

export const routes = [
  {
    path: '',
    name:'layout',
    component: Layout,
    meta: {
      isLogin: true
    },
    // children: [
    //   {
    //       path: '/',
    //       redirect: '/Resource'
    //   },
    //   {
    //     path: '/Resource',
    //     name: 'Resource',
    //     component: () => import('../views/Resource/index.vue'),
    //     meta: {
    //       name: "resource"
    //     },
    //     redirect: '/Resource/user-manage',
    //     children: [
    //       {
    //         path: 'user-manage',
    //         component: () => import('../views/Resource/UserManage/index.vue'),
    //         meta: {
    //           name: "user"
    //         }
    //       }, {
    //         path: 'que-manage',
    //         component: () => import('../views/Resource/QueManage/index.vue'),
    //         meta: {
    //           name: "que"
    //         }
    //       },
    //       {
    //         path: '/details',
    //         name: 'Details',
    //         component: () => import('../views/Resource/UserManage/Details.vue'),
    //         meta: {
    //           name: "user"
    //         }
    //       },
    //       {
    //         path: '/user-message',
    //         name: 'UserMessage',
    //         component: () => import('../views/Resource/UserManage/UserMessage.vue'),
    //         meta: {
    //           name: "user"
    //         }
    //       }
    //     ]
    //   },
    //   {
    //     path: '/train',
    //     name: 'Train',
    //     component: () => import('../views/Train/Train.vue'),
    //     meta: {
    //       name: "train"
    //     }
    //   },
    //   {
    //     path: '/plan',
    //     name: 'Plan',
    //     component: () => import('../views/Plan/Plan.vue'),
    //     meta: {
    //       name: "plan"
    //     }
    //   },
    //   {
    //     path: '/synthesis',
    //     name: 'Synthesis',
    //     component: () => import('../views/Synthesis/Synthesis.vue'),
    //     meta: {
    //       name: "synthesis"
    //     }
    //   }
    // ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

router.reloadRouter = function () {
  router.matcher = new VueRouter({
    mode: "history",
    routes
  }).matcher
}

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
export default router
