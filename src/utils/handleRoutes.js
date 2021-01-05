/**
 * 加载菜单组件
 * @param component
 * @returns {any}
 */
export function loadView(component) {
  if (component === '#') {
    return (resolve) => require(['@/layout'], resolve)
  } else {
    const VIEWS_PATH = 'views/'
    const index = component.indexOf(VIEWS_PATH)
    if (index > 0) component = component.slice(index + VIEWS_PATH.length)
    if (component.startsWith('\/')) component = component.slice(1)
    return (resolve) => require([`@/views/${component}`], resolve)
  }
}

/**
 * @description all模式渲染后端返回路由
 * @param asyncRoutes
 * @returns {*}
 */
export function convertRouter(asyncRoutes) {
  return asyncRoutes.map((route) => {
    if (route.component) route.component = loadView(route.component)
    if (route.children && route.children.length) {
      route.children = convertRouter(route.children)
    }
    if (route.children && route.children.length === 0) delete route.children
    return route
  })
}

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  // admin默认拥有全部权限
  if (roles.includes('admin')) return routes || []

  const res = []
  routes.forEach(route => {
    const tmp = {...route}
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}
