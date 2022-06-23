import request from '@/utils/service'

export function selectOne(id) {
  return request({
    url: '/Role/selectOne/' + id,
    method: 'post',
    data: {}
  })
}

export function QueryList(param) {
  return request({
    url: '/Role/Query',
    method: 'post',
    data: param
  })
}

export function SaveDataInfo(param) {
  return request({
    url: '/Role/SaveData',
    method: 'post',
    data: param
  })
}

export function LoadRolePower(roleid) {
  return request({
    url: '/Role/LoadRolePower/' + roleid,
    method: 'post',
    data: {}
  })
}

export function LoadRoleMenuPower(roleid) {
  return request({
    url: '/Role/LoadRoleMenuPower/' + roleid,
    method: 'post',
    data: {}
  })
}

export function getRoleUser(param) {
  return request({
    url: '/Role/getRoleUser',
    method: 'post',
    data: param
  })
}

export function SearchRole(Search) {
  return request({
    url: '/Role/SearchRole/' + Search,
    method: 'post',
    data: {}
  })
}

export function SelectRole(Search) {
  return request({
    url: '/Role/SearchRole/' + Search,
    method: 'post',
    data: {}
  })
}

export function StopOrStart(param) {
  return request({
    url: '/Role/StopOrStart/' + param.id + '/' + param.status,
    method: 'post',
    data: {}
  })
}

export function SaveRoleUser(param) {
  return request({
    url: '/PowerRole/SaveRoleUser',
    method: 'post',
    data: param
  })
}
export function delRoleMember(id) {
  return request({
    url: '/PowerRole/del/' + id,
    method: 'post',
    data: {}
  })
}

export function SavePower(param) {
  return request({
    url: '/tappPowermenu/SavePower',
    method: 'post',
    data: param
  })
}
