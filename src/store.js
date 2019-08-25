import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    username: 'HuYK',
    password: 'hyk123',
    email: '958337834@qq.com',
    phone: '15901092037',
    usermode: 1,
    snackbar: false,
    text: 'Default text?',
    houseList: []
  },
  mutations: {
    updateMode(state, value) {
      state.usermode = value.mode
      state.username = value.username
      state.email = value.email
      state.phone = value.phoneNumber
    },
    updateSnackbar(state, value) {
      state.snackbar = value
    },
    updateSnackbarContent(state, value) {
      store.commit('updateSnackbar', true)
      state.text = value
    },
    updateHouseList(state, value) {
      state.houseList = value
    }
  }
})

export default store
