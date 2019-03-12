import Vue from 'vue'
import Vuex from 'vuex'
import tagsView from './modules/tagsView'
import app from './modules/app'
import permission from './modules/permission'
import getters from './getter'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    tagsView,
    permission
  },
  getters
})

export default store
