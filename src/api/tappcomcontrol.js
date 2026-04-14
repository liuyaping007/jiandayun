import request from '@/utils/service'

export function addComControl(param) {
  return request({
    url: '/tappcomcontrol/addcomcontrol',
    method: 'post',
    data: param
  })
}

export function queryComControllist(param) {
  return request({
    url: '/tappcomcontrol/querycomcontrollist',
    method: 'post',
    data: param
  })
}
