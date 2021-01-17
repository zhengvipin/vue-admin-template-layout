import ExtSearchForm from './search-form'

ExtSearchForm.install = function(Vue) {
  if (Vue.component(ExtSearchForm.name)) {
    return
  }
  Vue.component(ExtSearchForm.name, ExtSearchForm)
}
export default ExtSearchForm
