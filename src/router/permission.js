import router from './index'
import store from '../store/index'

router.beforeEach((to, from, next) => {
    // 判断是否需要登录
    // console.log(to);
    if (to.matched.some(ele => ele.meta.isLogin)) {
        let user = store.state.userinfo.user
        if (user) {
            next()
        } else {
            next('/login')
        }
    } else {// 不需要登录
        next();
    }
})