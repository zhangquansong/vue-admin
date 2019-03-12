/**
 * vue 程序加载入口，下面导入的模块在整个项目中都可以全局引用
 */

import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import Cookies from 'js-cookie'
import 'element-ui/lib/theme-chalk/index.css';

import router from '@/router/router'
import store from '@/store/index'//vuex
import '@/views/icons/index' // 失量图
import i18n from '@/lang/index' // 中英文切换配制
import './permission' //导航全局钩子配制

//全局样式导入
import '@/styles/index.scss' // global css
import 'normalize.css/normalize.css' // A modern alternative to CSS resets

Vue.use(ElementUI, {
    size: Cookies.get('size') || 'medium',
    i18n: (key, value) => i18n.t(key, value)
})

new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app') //这里挂载到index.html id=app的层

