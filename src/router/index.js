import Vue from 'vue'
import Router from 'vue-router'
import Requests from 'components/Requests'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/:uuid',
      name: 'Requests',
      component: Requests
    },
    {
      path: '/',
      name: 'Requests',
      component: Requests
    }
  ]
})
