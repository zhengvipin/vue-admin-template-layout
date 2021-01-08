import Vue from 'vue'
import * as lodash from 'lodash'
import { Loading, Message, MessageBox, Notification } from 'element-ui'
import { loadingText, messageDuration } from '@/config/global'

const install = (Vue, opts = {}) => {
  /* 全局加载层 */
  Vue.prototype.$baseLoading = (target) => {
    return Loading.service({
      lock: true,
      text: loadingText,
      background: 'hsla(0,0%,100%,.8)',
      target: target || document.body
    })
  }

  /* 全局Message */
  Vue.prototype.$baseMessage = (message, type) => {
    Message({
      offset: 60,
      showClose: true,
      message: message,
      type: type,
      dangerouslyUseHTMLString: true,
      duration: messageDuration
    })
  }

  /* 全局Alert */
  Vue.prototype.$baseAlert = (content, title, callback) => {
    MessageBox.alert(content, title || '温馨提示', {
      confirmButtonText: '确定',
      dangerouslyUseHTMLString: true,
      callback: (action) => {
        if (callback) {
          callback()
        }
      },
      lockScroll: true
    })
  }

  /* 全局Confirm */
  Vue.prototype.$baseConfirm = (content, title, callback1, callback2) => {
    MessageBox.confirm(content, title || '温馨提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      closeOnClickModal: false,
      type: 'warning',
      lockScroll: true
    })
      .then(() => {
        if (callback1) {
          callback1()
        }
      })
      .catch(() => {
        if (callback2) {
          callback2()
        }
      })
  }

  /* 全局Notification */
  Vue.prototype.$baseNotify = (message, title, type, position) => {
    Notification({
      title: title,
      message: message,
      position: position || 'top-right',
      type: type || 'success',
      duration: messageDuration
    })
  }

  /* 全局lodash */
  Vue.prototype.$baseLodash = lodash
}

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

Vue.use(install)

