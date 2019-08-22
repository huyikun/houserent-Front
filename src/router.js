import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Signin',
      component: () => import('./components/Signin.vue')
    },
    {
      path: '/signup',
      name: 'Signup',
      component: () => import('./components/Signup.vue')
    },
    {
      path: '/main',
      name: 'Main',
      component: () => import('./components/Main.vue'),
      children: [
        {
          path: '',
          name: 'WorkingPanel',
          component: () => import('./views/WorkingPanel.vue')
        },
        {
          path: 'Page1',
          name: 'Page1',
          component: () => import('./views/Page1.vue')
        },
        {
          path: 'Page2',
          name: 'Page2',
          component: () => import('./views/Page2.vue')
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
