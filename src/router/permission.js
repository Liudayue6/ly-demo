import router from './index'
import store from '../store/index'
import menuRoutes from '../mock/routes'

router.beforeEach((to, from, next) => {
    // 判断是否需要登录
    // console.log(to);
    if (to.matched.some(ele => ele.meta.isLogin)) {
        let user = store.state.userinfo.user
        if (user) {
            router.reloadRouter()
            menuRoutes.forEach(item => {
                router.addRoute('layout', item)
            })
            next()
        } else {
            next('/login')
        }
    } else {// 不需要登录
        next();
    }
})