import request from '@/utils/service'

export function addUserControl(param) {
  return request({
    url: '/tappusercontrol/addusercontrol',
    method: 'post',
    data: param
  })
}

export function queryUserControllist(param) {
  return request({
    url: '/tappusercontrol/queryusercontrollist',
    method: 'post',
    data: param
  })
}
