import Vue from 'vue'
import ElementExt from '@/components/element-ui-ext'
import store from '@/store'
import '@/styles/demo-styles/index.scss'
import DemoBlock from '@/components/DemoBlock'
Vue.component('demo-block', DemoBlock)

Vue.use(ElementExt, {
  getEnumList: keys => store.dispatch('enum/getEnumList', keys),
  getRoleList: () => store.getters.roles
})
