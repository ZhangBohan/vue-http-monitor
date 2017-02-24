var Vue = require('vue')
var VueResource = require('vue-resource')

Vue.use(VueResource)

Vue.http.options.root = 'https://devsmall.speedx.com/http_monitor/requests'
Vue.http.headers.common['Accept'] = 'application/json'
Vue.http.options.credentials = true

export const getRequest = uuid => { return Vue.http.get(uuid + '/') }
