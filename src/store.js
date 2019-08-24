import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    username: 'HuYK',
    password: 'hyk123',
    email: '958337834@qq.com',
    phone: '15901092037',
    mode: 1
  },
  mutations: {
    updateMode (state, value) {
      state.mode = value.mode
      state.username = value.username
      state.password = value.password
      state.email = value.email
      state.phone = value.phone
    }
  }
})

export default store
