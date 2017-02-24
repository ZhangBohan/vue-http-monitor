import Vue from 'vue'
import Router from 'vue-router'
import Requests from 'components/Requests'
import RequestDetail from 'components/RequestDetail'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/requests/:uuid',
      name: 'RequestDetail',
      component: RequestDetail
    },
    {
      path: '/',
      name: 'Requests',
      component: Requests
    }
  ]
})
