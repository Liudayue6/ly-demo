import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Layout/index.vue'
import Resource from '../views/Resource/index.vue'
import Login from '../views/Login/index.vue'
//异步
const Train = () => import('../views/Train/Train.vue')
const Plan = () => import('../views/Plan/Plan.vue')
const Synthesis = () => import('../views/Synthesis/Synthesis.vue')
const UserManage = () => import('../views/Resource/UserManage/index.vue')
const QueManage = () => import('../views/Resource/QueManage/index.vue')
const Details = () => import('../views/Resource/UserManage/Details.vue')
const UserMessage = () => import('../views/Resource/UserManage/UserMessage.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    component: Layout,
    meta: {
      isLogin: true
    },
    children: [
      {
        path: '/',
        redirect: '/Resource'
      },
      {
        path: '/Resource',
        name: 'Resource',
        component: Resource,
        meta: {
          name: "resource"
        },
        redirect: '/Resource/user-manage',
        children: [
          {
            path: 'user-manage',
            component: UserManage,
            meta: {
              name: "user"
            }
          }, {
            path: 'que-manage',
            component: QueManage,
            meta: {
              name: "que"
            }
          },
          {
            path: '/details',
            name: 'Details',
            component: Details,
            meta: {
              name: "user"
            }
          },
          {
            path: '/user-message',
            name: 'UserMessage',
            component: UserMessage,
            meta: {
              name: "user"
            }
          }
        ]
      },
      {
        path: '/train',
        name: 'Train',
        component: Train,
        meta: {
          name: "train"
        }
      },
      {
        path: '/plan',
        name: 'Plan',
        component: Plan,
        meta: {
          name: "plan"
        }
      },
      {
        path: '/synthesis',
        name: 'Synthesis',
        component: Synthesis,
        meta: {
          name: "synthesis"
        }
      }
    ]
  },
  {
    path: '/login',
    name:'Login',
    component: Login
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
