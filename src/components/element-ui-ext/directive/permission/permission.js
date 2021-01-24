async function checkPermission(el, binding, vNode) {
  const { value } = binding

  let roles = []

  if (vNode.context.$getRoleList) roles = await (vNode.context.$elementExt || {}).getRoleList()

  if (!roles.length) return

  if (value && value instanceof Array) {
    if (value.length > 0) {
      const permissionRoles = value

      const hasPermission = roles.some(role => {
        return permissionRoles.includes(role)
      })

      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    }
  } else {
    throw new Error(`need roles! Like v-permission="['admin','editor']"`)
  }
}

export default {
  inserted(el, binding, vNode) {
    checkPermission(el, binding, vNode).then(() => {
    })
  },
  update(el, binding, vNode) {
    checkPermission(el, binding, vNode).then(() => {
    })
  }
}
