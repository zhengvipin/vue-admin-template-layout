import ExtButton from './button'

/* istanbul ignore next */
ExtButton.install = function(Vue) {
  Vue.component(ExtButton.name, ExtButton)
}

export default ExtButton
