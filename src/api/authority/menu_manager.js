import request from '@/utils/request'

export function getMenus(params, data) {
  return request({
    url: '/authority/get_menus_info',
    method: 'post',
    params,
    data
  })
}

export function addMenu(data) {
  return request({
    url: '/authority/add_menu',
    method: 'post',
    data
  })
}

export function getDepthMenus(params) {
  return request({
    url: '/authority/get_depth_menus',
    method: 'get',
    params
  })
}

export function deleteMenu(params) {
  return request({
    url: '/authority/delete_menu',
    method: 'get',
    params
  })
}

export function editMenu(data) {
  return request({
    url: '/authority/edit_menu',
    method: 'post',
    data
  })
}
