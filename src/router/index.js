import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Layout/index.vue'
import Resource from '../views/Resource/index.vue'
//异步
const Train = () => import('../views/Train/Train.vue')
const Plan = () => import('../views/Plan/Plan.vue')
const Synthesis = () => import('../views/Synthesis/Synthesis.vue')
const UserManage = () => import('../views/Resource/UserManage/index.vue')
const QueManage = () => import('../views/Resource/QueManage/index.vue')
const AddUser = () => import('../views/Resource/UserManage/AddUser.vue')
const EditUser = () => import('../views/Resource/UserManage/EditUser.vue')
const Details = () => import('../views/Resource/UserManage/Details.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '',
    component: Layout,
    children: [
      {
        path: '/',
        redirect: '/user-manage'
      },
      {
        path: '/Resource',
        name: 'Resource',
        component: Resource,
        redirect: '/user-manage',
        children: [
          {
            path: '/user-manage',
            component: UserManage,
            meta: {
              name: "user"
            }
          }, {
            path: '/que-manage',
            component: QueManage,
            meta: {
              name: "que"
            }
          },
          {
            path: '/add-user',
            name: 'AddUser',
            component: AddUser,
            meta: {
              name: "user"
            }
          },
          {
            path: '/edit-user',
            name: 'EditUser',
            component: EditUser,
            meta: {
              name: "user"
            }
          },
          {
            path: '/details',
            name: 'Details',
            component: Details,
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
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
