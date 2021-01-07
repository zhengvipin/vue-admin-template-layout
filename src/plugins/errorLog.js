import Vue from 'vue'
import { isString, isArray } from '@/utils/validate'
import settings from '@/config/global'
import { handleComponentLog } from '@/utils/handleErrorLog'

// you can set in settings.js
// errorLog:'production' | ['production', 'development']
const { errorLog: needErrorLog } = settings

function checkNeed() {
  const env = process.env.NODE_ENV
  if (isString(needErrorLog)) {
    return env === needErrorLog
  }
  if (isArray(needErrorLog)) {
    return needErrorLog.includes(env)
  }
  return false
}

if (checkNeed()) {
  /**
   * 只在 2.2.0+ 可用
   * @param err 错误对象
   * @param vm Vue实例
   * @param info Vue 特定的错误信息，比如错误所在的生命周期钩子
   */
  Vue.config.errorHandler = function(err, vm, info) {
    // Don't ask me why I use Vue.nextTick, it just a hack.
    // detail see https://forum.vuejs.org/t/dispatch-in-vue-config-errorhandler-has-some-problem/23500
    Vue.nextTick(() => {
      handleComponentLog(err, vm, info)
      // console.error(err, info)
    })
  }
}
