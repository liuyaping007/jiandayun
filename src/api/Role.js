import request from '@/utils/service'

export function getRoleList(param) {
  return request({
    url: '/Role/Query',
    method: 'post',
    data: param
  })
}

export function selectOne(id) {
  return request({
    url: '/Role/selectOne/' + id,
    method: 'post',
    data: {}
  })
}

export function saveRole(param) {
  return request({
    url: '/Role/SaveData',
    method: 'post',
    data: param
  })
}

export function saveRole(param) {
  return request({
    url: '/Role/SaveData',
    method: 'post',
    data: param
  })
}


export function setStopOrStart(param) {
  return request({
    url: '/Role/StopOrStart/' + param.id + '/' + param.status,
    method: 'post',
    data: param
  })
}

export function LoadRolePower(id) {
  return request({
    url: '/Role/LoadRolePower/' + id,
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

export function SaveRoleUser(param) {
  return request({
    url: '/PowerRole/SaveRoleUser',
    method: 'post',
    data: param
  })
}


export function delPowerRole(id) {
  return request({
    url: '/PowerRole/del/' + id,
    method: 'post',
    data: {}
  })
}
