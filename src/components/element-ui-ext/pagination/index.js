import ExtPagination from './pagination'

/* istanbul ignore next */
ExtPagination.install = function(Vue) {
  Vue.component(ExtPagination.name, ExtPagination)
}

export default ExtPagination
