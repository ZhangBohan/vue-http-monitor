// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'

Vue.use(VueResource)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  http: {
    root: 'https://devsmall.speedx.com/http_monitor/requests',
    credentials: true,
    headers: {
      Accept: 'application/json'
    }
  },
  template: '<App/>',
  components: { App }
})
