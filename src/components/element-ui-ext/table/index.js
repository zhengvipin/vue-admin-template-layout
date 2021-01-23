import ExtTable from './table'

/* istanbul ignore next */
ExtTable.install = function(Vue) {
  Vue.component(ExtTable.name, ExtTable)
}

export default ExtTable
