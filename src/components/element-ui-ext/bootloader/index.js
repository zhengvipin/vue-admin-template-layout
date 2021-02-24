import { transEnumName } from '../utils'

export default function(Vue, opts = {}) {
  Vue.prototype.$elementExt = {
    transEnumName,
    size: opts.size,
    pageSize: opts.pageSize,
    pageSizes: opts.pageSizes,
    layout: opts.layout,
    defaultValue: opts.defaultValue,
    headerBgColor: opts.headerBgColor,
    getEnumList: opts.getEnumList, // 注册枚举请求方法
    getRoleList: opts.getRoleList// 注册用户角色请求方法
  }
}
