import request from '@/utils/service'

export function queryCurrentMenu(MenuCode) {
  return request({
    url: '/tappMenu/queryCurrentMenu',
    method: 'post',
    data: {
      MenuCode
    }
  })
}
export function GetAllMenu() {
  return request({
    url: '/tappMenu/GetAllMenu',
    method: 'post'
  })
}

export function delMenu(menuid) {
  return request({
    url: '/tappMenu/delete',
    method: 'post',
    data: {
      FID: menuid
    }
  })
}

export function SaveMenu(param) {
  return request({
    url: '/tappMenu/SaveMenu',
    method: 'post',
    data: param
  })
}

export function selectOne(menuid) {
  return request({
    url: '/tappMenu/selectOne?id=' + menuid,
    method: 'get'
  })
}
