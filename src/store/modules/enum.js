import { getEnumList } from '@/api/enum'
import { parseTime } from '@/utils'

const state = {
  enums: {}
}

const mutations = {
  SET_ENUMS: (state, enums) => {
    state.enums = enums
  }
}

const actions = {
  getEnumList({ state, commit }, keys) {
    keys = Array.from(new Set(keys)) // 去重
    const vuexEnums = Object.assign({}, state.enums)
    const vuexKeys = Object.keys(vuexEnums)
    const cacheEnums = {}
    const cacheKeys = []
    const asyncKeys = []
    keys.forEach(key => {
      if (vuexKeys.indexOf(key) >= 0) {
        cacheKeys.push(key)
        cacheEnums[key] = vuexEnums[key]
      } else {
        asyncKeys.push(key)
      }
    })
    if (cacheKeys.length) console.log('[' + parseTime(new Date(), '{y}-{m}-{d} {h}:{i}:{s}') + '] 本次直接查询vuex的枚举有：' + cacheKeys.join(','))
    return new Promise((resolve, reject) => {
      if (asyncKeys.length) {
        console.log('[' + parseTime(new Date(), '{y}-{m}-{d} {h}:{i}:{s}') + '] 本次需要查询api的枚举有：' + asyncKeys.join(','))
        getEnumList({ keys: asyncKeys }).then(response => {
          const { data } = response
          const wholeEnums = Object.assign(vuexEnums, data)
          commit('SET_ENUMS', wholeEnums)
          const responseEnums = Object.assign(cacheEnums, data)
          resolve(responseEnums)
        }).catch(error => {
          reject(error)
        })
      } else {
        resolve(cacheEnums)
      }
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

