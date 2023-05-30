import router from './index'
import store from '../store/index'
import menuRoutes from '../mock/routes'

let routeFlag = false;

router.beforeEach((to, from, next) => {
    // 判断是否需要登录
    // console.log(to);
    if (to.matched.some(ele => ele.meta.isLogin)) {
        let user = store.state.userinfo.user
        if (user) {
            if (routeFlag) {
                next()
            } else {
                // 动态添加路由
                menuRoutes.forEach(item => {
                    router.addRoute('layout',item)
                })
                routeFlag = true;
                // router.options.routes = menuRoutes
                console.log(router);
                next({ ...to, replace: true })
            }
        } else {
            next('/login')
        }
    } else {// 不需要登录
        next();
    }
})