import ExtForm from './form'

/* istanbul ignore next */
ExtForm.install = function(Vue) {
  Vue.component(ExtForm.name, ExtForm)
}

export default ExtForm
