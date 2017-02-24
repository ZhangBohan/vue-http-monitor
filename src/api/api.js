var Vue = require('vue')
var VueResource = require('vue-resource')

Vue.use(VueResource)

Vue.http.headers.common['Accept'] = 'application/json'
Vue.http.options.credentials = true

export const getRequest = url => { return Vue.http.get(url) }
