import _ from 'lodash'
import resize from 'vue-resize-directive'
import permission from './directive/permission'
import elDragDialog from './directive/el-drag-dialog'

import ExtSelect from './select'
import ExtRadio from './radio'
import ExtCheckbox from './checkbox'
import ExtTimePicker from './time-picker'
import ExtFormItem from './form-item'
import ExtForm from './form'
import ExtSearchForm from './search-form'
import ExtButton from './button'
import ExtToolbar from './toolbar'
import ExtColumnPicker from './column-picker'
import ExtPagination from './pagination'
import ExtTable from './table'
import ExtDialog from './dialog'

const components = [
  ExtSelect,
  ExtRadio,
  ExtCheckbox,
  ExtTimePicker,
  ExtFormItem,
  ExtForm,
  ExtSearchForm,
  ExtButton,
  ExtToolbar,
  ExtColumnPicker,
  ExtPagination,
  ExtTable,
  ExtDialog
]

const install = function (Vue, opts = {}) {
  const {getEnumList, getRoleList} = opts

  /**
   * 注册实例方法
   */
  // 注册 element-ext 实例对象
  Vue.prototype.$elementExtOptions = {}

  // 注册枚举请求方法
  if (getEnumList) {
    Vue.prototype.$elementExtOptions.getEnumList = getEnumList
  }

  // 注册用户角色请求方法
  if (getRoleList) {
    Vue.prototype.$elementExtOptions.getRoleList = getRoleList
  }

  Vue.prototype.$lodash = _

  /**
   * 注册全局指令
   */
  Vue.directive('resize', resize)
  Vue.directive('permission', permission)
  Vue.directive('elDragDialog', elDragDialog)

  /**
   * 注册自定义组件
   */
  components.forEach(component => {
    component.install(Vue, opts)
  })
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install,
  ExtSelect,
  ExtRadio,
  ExtCheckbox,
  ExtTimePicker,
  ExtFormItem,
  ExtForm,
  ExtSearchForm,
  ExtButton,
  ExtToolbar,
  ExtColumnPicker,
  ExtPagination,
  ExtTable,
  ExtDialog
}

export {
  ExtSelect,
  ExtRadio,
  ExtCheckbox,
  ExtTimePicker,
  ExtFormItem,
  ExtForm,
  ExtSearchForm,
  ExtButton,
  ExtToolbar,
  ExtColumnPicker,
  ExtPagination,
  ExtTable,
  ExtDialog
}
