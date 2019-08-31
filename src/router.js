import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Signin',
      component: () => import('@/views/Signin.vue')
    },
    {
      path: '/signup',
      name: 'Signup',
      component: () => import('@/views/Signup.vue')
    },
    {
      path: '/main',
      name: 'Main',
      meta: {
        requireAuth: true
      },
      component: () => import('./views/Main.vue'),
      children: [
        {
          path: '',
          name: 'WorkingPanel',
          meta: {
            requireAuth: true
          },
          component: () => import('./views/WorkingPanel.vue')
        },
        {
          path: 'usercard',
          name: 'UserCard',
          meta: {
            requireAuth: true
          },
          component: () => import('./components/UserCard.vue')
        },
        {
          path: 'usercontrol',
          name: 'UserControl',
          meta: {
            requireAuth: true,
            role: 0
          },
          component: () => import('./views/UserControl.vue')
        },
        {
          path: 'order',
          name: 'Order',
          meta: {
            requireAuth: true,
            role: 1
          },
          component: () => import('./views/Order.vue')
        },
        {
          path: 'complaint',
          name: 'Complaint',
          meta: {
            requireAuth: true,
            role: 1
          },
          component: () => import('./views/Complaint.vue')
        },
        {
          path: 'addhouse',
          name: 'AddHouse',
          meta: {
            requireAuth: true,
            role: 0
          },
          component: () => import('./views/AddHouse.vue')
        },
        {
          path: 'orderconfirm',
          name: 'OrderConfirm',
          meta: {
            requireAuth: true,
            role: 1
          },
          component: () => import('./views/OrderConfirm.vue')
        },
        {
          path: 'orderPage',
          name: 'OrderPage',
          meta: {
            requireAuth: true,
            role: 1
          },
          component: () => import('./views/OrderPage.vue')
        }
      ]
    }
  ]
})
