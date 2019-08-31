// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Vuetify from 'vuetify'

import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

var axios = require('axios')
axios.defaults.baseURL = 'http://114.116.151.85:8443/api'
// 全局注册，之后可在其他组件中通过 this.$axios 发送数据
Vue.prototype.$axios = axios
Vue.config.productionTip = false

Vue.use(Vuetify)
router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    // 验证是否需要登陆
    if (JSON.parse(localStorage.getItem('logged')).logged) {
      // 查询本地存储信息是否已经登陆
      if (!to.meta.role) {
        next();
      }
      else if (to.meta.role == JSON.parse(localStorage.getItem('myuser')).usermode) {
        next()
      } else {
        next({
          path: from.fullPath // 无权限则不跳转
        })
      }
    } else {
      next({
        path: '/', // 未登录则跳转至signin页面
      })
    }
  } else {
    next()
  }
})

export default new Vuetify({})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  vuetify: new Vuetify(),
  router,
  store,
  components: { App },
  template: '<App/>'
})
