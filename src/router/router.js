import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/Layout'
import TableRouter from '@/router/modules/table'

Vue.use(Router)

export const constantRouterMap = [
    {
        path: '/login',
        component: () => import('@/views/login/index'),
        hidden: true
    },
    {
        path: '/redirect',
        component: Layout,
        hidden: true,
        children: [
            {
                path: '/redirect/:path*',
                component: () => import('@/views/redirect/index')
            }
        ]
    },
    {
        path: '',
        component: Layout,
        redirect: 'dashboard',
        children: [{
            path: 'dashboard',
            component: () => import('@/views/dashboard/index'),
            name: 'Dashboard',
            meta: {title: '首页', icon: 'dashboard', noCache: true}
        }]
    },
    TableRouter
];


export default new Router({
    scrollBehavior: () => ({y: 0}),
    routes: constantRouterMap
})

