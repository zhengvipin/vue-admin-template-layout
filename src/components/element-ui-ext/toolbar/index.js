import ExtToolbar from './toolbar'

/* istanbul ignore next */
ExtToolbar.install = function(Vue) {
  Vue.component(ExtToolbar.name, ExtToolbar)
}

export default ExtToolbar
