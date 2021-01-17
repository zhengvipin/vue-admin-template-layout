import Vue from 'vue'
import './plugins'
import App from './App'
import store from './store'
import router from './router'

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// show element-ui-ext demo
import 'element-ui-ext/examples/demo-styles/index.scss'
import 'highlight.js/styles/color-brewer.css'
import DemoBlock from 'element-ui-ext/examples/components/DemoBlock'
Vue.component('demo-block', DemoBlock)

Vue.config.productionTip = false

new Vue({
  el: '#agree-element-admin',
  router,
  store,
  render: h => h(App)
})
