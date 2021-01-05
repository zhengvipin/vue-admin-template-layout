import { asyncRoutes, constantRoutes } from '@/router'
import { getRouterList } from '@/api/router'
import { convertRouter, filterAsyncRoutes } from '@/utils/handleRoutes'

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  async generateRoutes({ commit }, roles) {
    const accessedRoutes = await filterAsyncRoutes(asyncRoutes, roles)
    commit('SET_ROUTES', accessedRoutes)
    return accessedRoutes
  },
  async generateAllRoutes({ commit }, roles) {
    const { data } = await getRouterList(roles)
    data.push({ path: '*', redirect: '/404', hidden: true })
    const accessRoutes = convertRouter(data)
    commit('SET_ROUTES', accessRoutes)
    return accessRoutes
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
