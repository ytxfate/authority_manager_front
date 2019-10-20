import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent

    if (store.getters.token) {
      config.headers['Authorization'] = store.getters.token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
let isRefreshing = false
let requests = []

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code === 200) {
      return res
    } else if (res.code === 1200) {
      Message({
        message: res.msg || '请登录',
        type: 'warning',
        duration: 2 * 1000
      })
      store.dispatch('user/resetToken').then(() => {
        setTimeout(() => location.reload(), 2000)
      })
    } else if (res.code === 1102) {
      const config = response.config
      if (!isRefreshing) {
        isRefreshing = true
        store.dispatch('user/refreshToken').then(res => {
          config.headers['Authorization'] = res.jwt
          config.baseURL = ''
          requests.forEach(cd => cd(res.jwt))
          requests = []
          service(response.config)
        }).catch(() => {
          Message({
            message: '刷新认证信息失败，请重新登录',
            type: 'warning',
            duration: 2 * 1000
          })
          store.dispatch('user/resetToken').then(() => {
            setTimeout(() => location.reload(), 2000)
          })
        }).finally(() => {
          isRefreshing = false
        })
      } else {
        // 正在刷新token，将返回一个未执行resolve的promise
        return new Promise((resolve) => {
          // 将resolve放进队列，用一个函数形式来保存，等token刷新后直接执行
          requests.push(() => {
            config.baseURL = ''
            config.headers['Authorization'] = store.getters.token
            resolve(service(config))
          })
        })
      }
    } else {
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(res.message || 'Error'))
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
