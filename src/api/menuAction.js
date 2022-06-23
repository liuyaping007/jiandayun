import request from '@/utils/service'

export function addAction(param) {
  return request({
    url: '/menuAction/addAction',
    method: 'post',
    data: param
  })
}

export function getActionInfo(param) {
  return request({
    url: '/menuAction/getActionInfo?id=' + param,
    method: 'post',
    data: {}
  })
}

export function eidtAction(param) {
  return request({
    url: '/menuAction/eidtAction',
    method: 'post',
    data: param
  })
}

export function getActionByMenuId(param) {
  return request({
    url: '/menuAction/getActionByMenuId?menuId=' + param,
    method: 'post',
    data: {}
  })
}

export function delAction(param) {
  return request({
    url: '/menuAction/delAction?id=' + param,
    method: 'post',
    data: {}
  })
}

export function queryByRoleMenuId(roleId, menuId) {
  return request({
    url: '/actionRole/queryByRoleMenuId?roleId=' + roleId + '&menuId=' + menuId,
    method: 'post',
    data: {}
  })
}
export function saveActionRole(param) {
  return request({
    url: '/actionRole/saveActionRole',
    method: 'post',
    data: param
  })
}

export function delActionRole(param) {
  return request({
    url: '/actionRole/delActionRole',
    method: 'post',
    data: param
  })
}
