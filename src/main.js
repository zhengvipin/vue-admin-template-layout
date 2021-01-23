import Vue from 'vue'
import './plugins'
import App from './App'
import store from './store'
import router from './router'

/**
 * 生产环境默认都使用mock，如果正式用于生产环境时，记得去掉
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.config.productionTip = false

new Vue({
  el: '#agree-element-admin',
  router,
  store,
  render: h => h(App)
})
