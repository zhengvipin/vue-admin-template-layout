import store from '@/store'

export const COMPONENT = 'Component'
export const REQUEST = 'Request'

export function handleComponentLog(err, vm, info) {
  handleLog(COMPONENT, window.location.href, err.message, err.stack, `${vm.$vnode.tag} error in ${info}`)
}

export const handleRequestLog = (url, message, stack, info) => handleLog(REQUEST, url, message, stack, info)

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
