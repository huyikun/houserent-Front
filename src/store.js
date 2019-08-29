import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    username: 'HuYK',
    password: 'hyk123',
    email: '958337834@qq.com',
    phone: '15901092037',
    usermode: 0,
    snackbar: false,
    text: 'Default text?',
    limitDateList: [{
        startDate: new Date("2019-08-28"),
        endDate: new Date("2019-8-30")
      },
      {
        startDate: new Date("2019-08-14"),
        endDate: new Date("2019-8-17")
      }
    ],
    houseList: [{
        name: 'room1',
        address: 'Morenaddress1',
        price: 10.0,
        introduce: 'iam1',
        ownerphone: '111111',
        photos: ['/static/img/pic2.jpg'],
        timeLine: []
      },
      {
        name: 'room2',
        address: 'address2',
        price: 20.0,
        introduce: 'iam2',
        ownerphone: '222222',
        photos: ['/static/img/pic2.jpg'],
        timeLine: []
      },
      {
        name: 'room3',
        address: 'address3',
        price: 30.0,
        introduce: 'iam3',
        ownerphone: '33333',
        photos: ['/static/img/pic2.jpg'],
        timeLine: []
      },
      {
        name: 'room4',
        address: 'address4',
        price: 40.0,
        introduce: 'iam4',
        ownerphone: '44444',
        photos: ['/static/img/pic2.jpg'],
        timeLine: []
      },
      {
        name: 'room5',
        address: 'address5',
        price: 50.0,
        introduce: 'iam5',
        ownerphone: '55555',
        photos: ['/static/img/pic2.jpg'],
        timeLine: []
      },
      {
        name: 'room6',
        address: 'address6',
        price: 60.0,
        introduce: 'iam6',
        ownerphone: '66666',
        photos: ['/static/img/pic2.jpg'],
        timeLine: []
      },
      {
        name: 'room7',
        address: 'address7',
        price: 70.0,
        introduce: 'iam7',
        ownerphone: '77777',
        photos: ['/static/img/pic2.jpg'],
        timeLine: []
      },
      {
        name: 'room7',
        address: 'address7',
        price: 70.0,
        introduce: 'iam7',
        ownerphone: '77777',
        photos: ['/static/img/pic2.jpg'],
        timeLine: []
      },
      {
        name: 'room888',
        address: 'address888',
        price: 70.0,
        introduce: 'iam7',
        ownerphone: '77777',
        photos: ['/static/img/pic2.jpg'],
        timeLine: []
      }
    ],
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
