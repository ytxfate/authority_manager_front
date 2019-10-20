import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/user/get_user_info',
    method: 'get'
  })
}

export function getRouters(data) {
  return request({
    url: '/user/get_user_routers',
    method: 'post',
    data
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}

export function refreshToken(data) {
  return request({
    url: '/user/refresh_login_status',
    method: 'post',
    data
  })
}
