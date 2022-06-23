import request from '@/utils/service'
export function saveFromInfo(param) {
  return request({
    url: '/From/saveData',
    method: 'post',
    data: param
  })
}
export function getFromInfo(fromId) {
  return request({
    url: '/From/getFromInfo?fromId=' + fromId,
    method: 'post',
    data: {}
  })
}
export function getFromDesignJson(fromId) {
  return request({
    url: '/From/getFromDesignJson?fromId=' + fromId,
    method: 'post',
    data: {}
  })
}
export function getFromTempContext(fromId) {
  return request({
    url: '/From/getFromTempContext?fromId=' + fromId,
    method: 'post',
    data: {}
  })
}
export function queryPageList(param) {
  return request({
    url: '/From/queryPageList',
    method: 'post',
    data: param
  })
}
