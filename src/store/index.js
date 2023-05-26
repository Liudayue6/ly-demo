import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userinfo: {
      user: ''
    },
    menuData:[]
  },
  mutations: {
    setUser(state, payload) {
      state.userinfo = payload;
    },
    setMenu(state,payload){
      state.menuData = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
