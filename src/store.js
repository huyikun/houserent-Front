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
    order: {
      houseName: '宝宝房',
      address: '北京市海淀区北京航空航天大学三公寓',
      ownerName: 'Huu',
      //
      type: 'short'
    },
    pickedHouse: {
      name: 'room888',
      address: 'address888',
      price: 70.0,
      introduce: 'iam7',
      ownerName: 'Huu',
      ownerPhone: '77777',
      photos: ['/static/img/pic2.jpg']
    },
    admheader: [{
        text: '租客名称',
        value: 'userName',
        align: 'left'
      },
      {
        text: '房主名称',
        value: 'ownerName',
        align: 'center'
      },
      {
        text: '房屋名称',
        value: 'houseName',
        align: 'center'
      },
      {
        text: '房屋地址',
        value: 'address',
        align: 'center'
      },
      {
        text: '入住日期',
        value: 'checkinDate',
        align: 'center'
      },
      {
        text: '退房日期',
        value: 'checkoutDate',
        align: 'center'
      },
      {
        text: '订单金额',
        value: 'totalRent',
        align: 'center'
      },
      {
        text: '生成时间',
        value: 'applyTime',
        align: 'center'
      },
      {
        text: '订单状态',
        value: 'state',
        align: 'center'
      }
    ],
    usrheader: [{
        text: '房屋名称',
        value: 'houseName',
        align: 'left'
      },
      {
        text: '房屋地址',
        value: 'address',
        align: 'center'
      },
      {
        text: '入住日期',
        value: 'checkinDate',
        align: 'center'
      },
      {
        text: '退房日期',
        value: 'checkoutDate',
        align: 'center'
      },
      {
        text: '订单金额',
        value: 'totalRent',
        align: 'center'
      },
      {
        text: '生成时间',
        value: 'applyTime',
        align: 'center'
      },
      {
        text: '订单状态',
        value: 'state',
        align: 'center'
      },
      {
        text: 'Actions',
        value: 'action',
        align: 'center'
      }
    ],
    limitDateList: [],
    houseList: [{
        name: 'room1',
        address: 'Morenaddress1',
        price: 10.0,
        introduce: 'iam1',
        ownerName: 'Huu',
        ownerPhone: '111111',
        photos: ['/static/img/pic2.jpg']
      },
    ]
  },
  mutations: {
    updateMode(state, value) {
      state.usermode = value.mode
      state.username = value.username
      state.email = value.email
      state.phone = value.phone
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
    },
    updatePickedHouse(state, value) {
      state.pickedHouse = value
    },
    updateOrder(state, value) {
      state.order = value
    },
    updateLimitDateList(state, value) {
      state.limitDateList = value
    }
  }
})

export default store
