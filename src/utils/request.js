import Vue from 'vue'
import axios from 'axios'
import { getToken } from '@/utils/auth'
import { handleRequestLog } from '@/utils/handleErrorLog'
import { isArray, isObject } from '@/utils/validate'
import store from '@/store'
import router from '@/router'
import qs from 'qs'
import {
  contentType,
  requestTimeout,
  successCode,
  invalidCode,
  noPermissionCode,
  tokenName
} from '@/config'

/* *********************************** loading start *********************************** */
let loadingInstance
let needLoadingRequestCount = 0

export function showLoading() {
  if (needLoadingRequestCount === 0 && !loadingInstance) loadingInstance = Vue.prototype.$baseLoading('.agree-layout-main-container')
  needLoadingRequestCount++
}

function toHideLoading() {
  return Vue.prototype.$baseLodash.debounce(() => {
    if (loadingInstance) {
      loadingInstance.close()
      loadingInstance = null
    }
  }, 300)
}

export function hideLoading() {
  needLoadingRequestCount--
  needLoadingRequestCount = Math.max(needLoadingRequestCount, 0) // 做个保护
  if (needLoadingRequestCount === 0) toHideLoading()()
}

/* *********************************** loading end *********************************** */

function handleCode(code, message, response) {
  message = message || `后端接口${code}异常`
  switch (code) {
    case invalidCode:
      Vue.prototype.$baseMessage(message, 'error')
      store.dispatch('user/resetToken').then(() => location.reload()).catch(() => {
      })
      break
    case noPermissionCode:
      router.push({ path: '/401' }).catch(() => {
      })
      break
    default:
      Vue.prototype.$baseMessage(message, 'error')
      break
  }
  handleRequestLog(response.request.responseURL, message, JSON.stringify(response, null, 4), `code ${code}`)
}

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: requestTimeout,
  headers: {
    'Content-Type': contentType
  }
})

// request interceptor
service.interceptors.request.use(
  config => {
    const { headers, data, loading = false } = config
    // 每次发送请求带上token
    if (store.getters.token) {
      config.headers[tokenName] = getToken()
    }
    // 当表单数据的编码类型为 application/x-www-form-urlencoded;charset=UTF-8 时，将 data 编码为键值对格式
    if (data && headers['Content-Type'] === 'application/x-www-form-urlencoded;charset=UTF-8') {
      config.data = qs.stringify(data)
    }
    // 判断是否需要loading层，防止重复提交
    if (loading) showLoading()
    return config
  },
  error => {
    // 这里极少情况会进来，暂时没有找到主动触发的方法，估计只有浏览器不兼容时才会触发
    // Detail see https://segmentfault.com/q/1010000020659252/a-1020000021083187
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    // 关闭loading
    if (loadingInstance) hideLoading()
    // 判断是否操作正常
    const { data, config } = response
    const { code, message } = data
    const codeVerificationArray = isArray(successCode) ? [...successCode] : [...[successCode]] // 操作正常Code数组
    if (codeVerificationArray.includes(code)) {
      return data
    } else {
      handleCode(code, message, response)
      return Promise.reject('request请求异常拦截:' + JSON.stringify({ url: config.url, code, message }) || 'Error')
    }
  },
  error => {
    // 关闭loading
    if (loadingInstance) hideLoading()
    // 判断错误类型
    const { response, message } = error
    if (response && isObject(response.data)) {
      const { status, data } = response
      handleCode(status, data.message || message, error.response)
    } else {
      let { message } = error
      if (message === 'Network Error') {
        message = '后端接口连接异常'
      }
      if (message.includes('timeout')) {
        message = '后端接口请求超时'
      }
      if (message.includes('Request failed with status code')) {
        const code = message.substr(message.length - 3)
        message = '后端接口' + code + '异常'
      }
      if (!message) message = '后端接口未知异常'
      Vue.prototype.$baseMessage(message, 'error')
      handleRequestLog(error.request.responseURL, message, JSON.stringify(response, null, 4), `status ${response.status}`)
    }
    return Promise.reject(error)
  }
)

export default service
