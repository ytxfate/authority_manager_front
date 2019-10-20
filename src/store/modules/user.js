import { login, logout, getInfo, getRouters, refreshToken } from '@/api/user'
import { resetRouter, componentMap } from '@/router'
import { getToken, setToken, removeToken, getRefreshToken, setRefreshToken, removeRefreshToken } from '@/utils/auth'

const state = {
  token: getToken(),
  refresh_token: getRefreshToken(),
  name: '',
  avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
  role_ids: []
}

// 遍历后台传来的路由字符串，转换为组件对象
const filterAsyncRouter = (asyncRouterMap) => {
  const accessedRouters = asyncRouterMap.map(route => {
    if (route.component) {
      route.component = componentMap[route.component]
    }
    if (route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children)
    }
    return route
  })
  return accessedRouters
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_REFRESH_TOKEN: (state, refresh_token) => {
    state.refresh_token = refresh_token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_ROLE_IDS: (state, role_ids) => {
    state.role_ids = role_ids
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(res => {
        const { response } = res
        commit('SET_TOKEN', response.jwt)
        commit('SET_REFRESH_TOKEN', response.refresh_jwt)
        setToken(response.jwt)
        setRefreshToken(response.refresh_jwt)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  refreshToken({ commit, state }) {
    const refresh_jwt = state.refresh_token
    return new Promise((resolve, reject) => {
      refreshToken({ refresh_jwt: refresh_jwt }).then(res => {
        const { response } = res
        commit('SET_TOKEN', response.jwt)
        commit('SET_REFRESH_TOKEN', response.refresh_jwt)
        setToken(response.jwt)
        setRefreshToken(response.refresh_jwt)
        resolve(response)
      }).catch(error => {
        console.log('refreshToken', error)
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(res => {
        const { response } = res

        if (!response) {
          reject('Verification failed, please Login again.')
        }
        const { user_info, role_ids } = response
        commit('SET_NAME', user_info.username)
        commit('SET_ROLE_IDS', role_ids)
        resolve(response)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get routers
  getRouters({ state }) {
    return new Promise((resolve, reject) => {
      getRouters({ role_ids: state.role_ids }).then(res => {
        const { response } = res
        const routes = filterAsyncRouter(response)
        resolve(routes)
      }).catch(error => {
        reject(error)
      })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve) => {
      logout().then((res) => {
        commit('SET_TOKEN', '')
        commit('SET_NAME', '')
        commit('SET_REFRESH_TOKEN', '')
        commit('SET_ROLE_IDS', '')
        removeToken()
        removeRefreshToken()
        resetRouter()
        resolve(res)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_NAME', '')
      commit('SET_REFRESH_TOKEN', '')
      commit('SET_ROLE_IDS', '')
      removeToken()
      removeRefreshToken()
      resetRouter()
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

