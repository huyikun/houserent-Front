import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Signin',
<<<<<<< HEAD
      component: () => import('@/views/Signin.vue')
=======
      component: () => import('./views/Signin.vue')
>>>>>>> ae99de777764e1d8534184c47bc9931bd446b756
    },
    {
      path: '/signup',
      name: 'Signup',
<<<<<<< HEAD
      component: () => import('@/views/Signup.vue')
=======
      component: () => import('./views/Signup.vue')
>>>>>>> ae99de777764e1d8534184c47bc9931bd446b756
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
