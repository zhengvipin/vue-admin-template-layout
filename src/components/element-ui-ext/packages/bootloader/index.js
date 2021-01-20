export default function(Vue, opts = {}) {
  const { getEnumList, getRoleList } = opts

  // 注册枚举请求方法
  if (getEnumList) {
    Vue.prototype.$getEnumList = getEnumList
  }

  // 注册用户角色请求方法
  if (getRoleList) {
    Vue.prototype.$getRoleList = getRoleList
  }
}
