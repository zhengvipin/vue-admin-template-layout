import ExtDialog from './dialog'

/* istanbul ignore next */
ExtDialog.install = function(Vue) {
  Vue.component(ExtDialog.name, ExtDialog)
}

export default ExtDialog
