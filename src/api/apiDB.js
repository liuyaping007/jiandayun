import request from '@/utils/service.js'
export function apiDBSave(param) {
  return request({
    url: '/apiDB/Save',
    method: 'post',
    data: param,
  })
}

export function apiDBDelete(apiId) {
  return request({
    url: '/apiDB/delete/' + apiId,
    method: 'post',
    data: {},
  })
}

export function apiDBList(param) {
  return request({
    url: '/apiDB/list',
    method: 'post',
    data: param,
  })
}

export function ajaxInterface(param) {
  return request({
    url: '/apiDB/ajaxInterface',
    method: 'post',
    data: param,
  })
}
