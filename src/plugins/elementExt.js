import Vue from 'vue'
import ElementExt from '@/components/element-ui-ext'
import store from '@/store'

Vue.use(ElementExt, {
  getEnumList: keys => store.dispatch('enum/getEnumList', keys),
  getRoleList: () => store.getters.roles
})
