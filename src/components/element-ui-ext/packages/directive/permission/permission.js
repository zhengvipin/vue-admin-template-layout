import Vue from 'vue'

async function checkPermission(el, binding, vNode) {
  const { value } = binding

  const roles = await Vue.prototype.$elementExtOptions()

  if (!roles) return

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

function permission() {
  return {
    inserted(el, binding, vNode) {
      checkPermission(el, binding, vNode).then(r => {})
    },
    update(el, binding, vNode) {
      checkPermission(el, binding, vNode).then(r => {})
    }
  }
}

export default permission
