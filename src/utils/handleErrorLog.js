import store from '@/store'

export const COMPONENT = 'component'
export const REQUEST = 'request'
export const RESPONSE = 'response'

export function handleComponentLog(err, vm, info) {
  handleLog(COMPONENT, window.location.href, err.message, err.stack, `${vm.$vnode.tag} error in ${info}`)
}

export function handleRequestLog(error) {
  if (!error) return
  handleLog(RESPONSE, error.request.responseURL, error.message, JSON.stringify(error.response, null, 4), `status ${error.response.status}`)
}

export function handleResponseLog(object) {
  if (!object) return
  if (object instanceof Error) {
    handleLog(RESPONSE, object.request.responseURL, object.message, JSON.stringify(object.response, null, 4), `status ${object.response.status}`)
  } else {
    handleLog(RESPONSE, object.request.responseURL, object.data.message || 'Error', JSON.stringify(object, null, 4), `code ${object.data.code}`)
  }
}

/**
 * 错误日志处理
 *
 * @param type 错误类型
 * @param url 报错路由
 * @param message 错误消息
 * @param stack 错误详情
 * @param info 错误提示
 */
export function handleLog(type, url, message, stack, info) {
  store.dispatch('errorLog/addErrorLog', {
    type,
    url,
    message,
    stack,
    info
  })
}
