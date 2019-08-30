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
    admheader: [
      { text: '租客名称', value: 'userName', align: 'left' },
      { text: '房主名称', value: 'ownerName', },
      { text: '房屋名称', value: 'houseName', },
      { text: '房屋地址', value: 'address', sortable: false },
      { text: '入住日期', value: 'checkinDate' },
      { text: '退房日期', value: 'checkoutDate' },
      { text: '订单金额', value: 'totalRent' },
      { text: '生成时间', value: 'applyTime' },
      { text: '订单状态', value: 'state' },
    ],
    usrheader: [
      { text: '房屋名称', value: 'housename', align: 'left' },
      { text: '房屋地址', value: 'address', sortable: false },
      { text: '入住日期', value: 'indate' },
      { text: '退房日期', value: 'outdate' },
      { text: '订单金额', value: 'price' },
      { text: '订单状态', value: 'state' }
    ],
    limitDateList: [
      {
        startDate: new Date('2019-09-04'),
        endDate: new Date('2019-09-15')
      },
      {
        startDate: new Date('2019-09-17'),
        endDate: new Date('2019-09-19')
      }
    ],
    houseList: [
      {
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
    ]
  },
  mutations: {
    updateMode (state, value) {
      state.usermode = value.mode
      state.username = value.username
      state.email = value.email
      state.phone = value.phoneNumber
    },
    updateSnackbar (state, value) {
      state.snackbar = value
    },
    updateSnackbarContent (state, value) {
      store.commit('updateSnackbar', true)
      state.text = value
    },
    updateHouseList (state, value) {
      state.houseList = value
    }
  }
})

export default store
