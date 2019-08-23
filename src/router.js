import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Signin',
      component: () => import('./views/Signin.vue')
    },
    {
      path: '/signup',
      name: 'Signup',
      component: () => import('./views/Signup.vue')
    },
    {
      path: '/main',
      name: 'Main',
      component: () => import('./views/Main.vue'),
      children: [
        {
          path: '',
          name: 'WorkingPanel',
          component: () => import('./views/WorkingPanel.vue')
        },
        {
          path: 'Order',
          name: 'Order',
          component: () => import('./views/Order.vue')
        },
        {
          path: 'Complaint',
          name: 'Complaint',
          component: () => import('./views/Complaint.vue')
        },
        {
          path: 'Page3',
          name: 'Page3',
          component: () => import('./views/Page3.vue')
        }
      ]
    }
  ]
})
