import request from '@/utils/service'

export function selectById(param) {
  return request({
    url: '/Proceui/tappprocesstypeentityss/selectById?id=' + param,
    method: 'post',
    data: {}
  })
}

export function deleteById(param) {
  return request({
    url: '/ui/tappprocesstypeentity/deleteById?id=' + param,
    method: 'post',
    data: {}
  })
}

export function querylist(param) {
  return request({
    url: '/ui/tappprocesstypeentity/querylist',
    method: 'post',
    data: param
  })
}

export function saveInfo(param) {
  return request({
    url: '/ui/tappprocesstypeentity/save',
    method: 'post',
    data: param
  })
}

export function getAllProcesstype(param) {
  return request({
    url: '/ui/tappprocesstypeentity/getAllProcesstype',
    method: 'post',
    data: param
  })
}
