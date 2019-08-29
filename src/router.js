import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [{
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
      component: () => import('./views/Main.vue'),
      children: [{
          path: '',
          name: 'WorkingPanel',
          component: () => import('./views/WorkingPanel.vue')
        },
        {
          path: 'usercard',
          name: 'UserCard',
          component: () => import('./components/UserCard.vue')
        },
        {
          path: 'usercontrol',
          name: 'UserControl',
          component: () => import('./views/UserControl.vue')
        },
        {
          path: 'order',
          name: 'Order',
          component: () => import('./views/Order.vue')
        },
        {
          path: 'complaint',
          name: 'Complaint',
          component: () => import('./views/Complaint.vue')
        },
        {
          path: 'addhouse',
          name: 'AddHouse',
          component: () => import('./views/AddHouse.vue')
        },
        {
          path: 'orderconfirm',
          name: 'OrderConfirm',
          component: () => import('./views/OrderConfirm.vue')
        },
        {
          path: 'usercontrol',
          name: 'UserControl',
          component: () => import('./views/UserControl.vue')
        }
        // ,
        // {
        //   path: 'test',
        //   name: 'Test',
        //   component: () => import('./views/Test.vue')
        // }
      ]
    }
  ]
})
