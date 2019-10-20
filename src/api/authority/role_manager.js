import request from '@/utils/request'

export function getRoles(params, data) {
  return request({
    url: '/authority/get_roles_info',
    method: 'post',
    params,
    data
  })
}

export function addRole(data) {
  return request({
    url: '/authority/add_role',
    method: 'post',
    data
  })
}

export function deleteRole(params) {
  return request({
    url: '/authority/delete_role',
    method: 'get',
    params
  })
}

export function editRole(data) {
  return request({
    url: '/authority/edit_role',
    method: 'post',
    data
  })
}

export function getMenuListTree() {
  return request({
    url: '/authority/get_menu_list_tree',
    method: 'get'
  })
}

export function roleRelateMenus(data) {
  return request({
    url: '/authority/role_relate_menus',
    method: 'post',
    data
  })
}

export function getRelatedMenuIds(params) {
  return request({
    url: '/authority/get_related_menu_ids',
    method: 'get',
    params
  })
}
