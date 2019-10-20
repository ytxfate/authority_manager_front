import request from '@/utils/request'

export function getUsersInfo(params, data) {
  return request({
    url: '/authority/get_users_info',
    method: 'post',
    params,
    data
  })
}

export function deleteUser(params) {
  return request({
    url: '/authority/delete_user',
    method: 'get',
    params
  })
}

export function getAllRoles() {
  return request({
    url: '/authority/get_all_roles',
    method: 'get'
  })
}

export function getUserRoles(params) {
  return request({
    url: '/authority/get_user_roles',
    method: 'get',
    params
  })
}

export function userRelateRoles(data) {
  return request({
    url: '/authority/user_relate_roles',
    method: 'post',
    data
  })
}
