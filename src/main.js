import Vue from 'vue'
import App from './App'
import router from './router'
import 'lib-flexible/flexible.js'
import Axios from 'axios'

Vue.config.productionTip = false

Vue.prototype.$axios = Axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
