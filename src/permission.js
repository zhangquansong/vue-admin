/**
 * 全局进度条 导航注册等配制
 */

import router from '@/router/router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import {getToken} from '@/utils/auth' // getToken from cookie

NProgress.configure({showSpinner: false})// NProgress Configuration


const whiteList = ['/login', '/auth-redirect']// no redirect whitelist

/**
 * 全局前置守卫 当跳转时先执行以下方法
 * to: Route: 即将要进入的目标 路由对象
 * from: Route: 当前导航正要离开的路由
 * next 指跳到下一下导航
 */
router.beforeEach((to, from, next) => {
    NProgress.start() //进度条开始

    if (getToken()) { //如果用户已登录
        if (to.path === '/login') {
            next({path: '/'})
            NProgress.done()
        }
    } else { //用户未登录
        if (whiteList.indexOf(to.path) !== -1) {
            next()
        } else {
            next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
            NProgress.done()
        }
    }


    next()
});


/**
 * 全局后置钩子
 * 当跳转完成后执行
 */
router.afterEach(() => {
    NProgress.done()
})
