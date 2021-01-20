// 启动必须项
import bootloader from './bootloader'
// 指令
import resize from 'vue-resize-directive'
import permission from './directive/permission'
import elDragDialog from './directive/el-drag-dialog'
// 组件
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

const install = function(Vue, opts = {}) {
  // 初始化必要实例与方法
  bootloader(Vue, opts)

  // 注册自定义组件
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
  resize,
  permission,
  elDragDialog,
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
  resize,
  permission,
  elDragDialog,
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
