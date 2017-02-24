import Vue from 'vue'
import Router from 'vue-router'
import Requests from 'components/Requests'
import RequestDetail from 'components/RequestDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'RequestDetail',
      component: RequestDetail
    },
    {
      path: '/requests',
      name: 'Requests',
      component: Requests
    }
  ]
})
