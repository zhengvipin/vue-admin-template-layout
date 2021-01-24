export default function(Vue, opts = {}) {
  Vue.prototype.$elementExt = {
    size: opts.size,
    pageSize: opts.pageSize,
    pageSizes: opts.pageSizes,
    layout: opts.layout,
    defaultValue: opts.defaultValue,
    getEnumList: opts.getEnumList, // 注册枚举请求方法
    getRoleList: opts.getRoleList// 注册用户角色请求方法
  }
}
