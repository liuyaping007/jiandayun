import request from '@/utils/service'
export function ApiGetProcinstNumber(param) {
  return request({
    url:
      '/processins/getprocinstnumber?bMoudleEN=' +
      param.BusinessMoudle +
      '&bModuleID=' +
      param.BusinessModuleID,
    method: 'get',
    data: {}
  })
}
export function ApiQueryporcessinsList(param) {
  return request({
    url: '/processins/queryporcessinsList',
    method: 'post',
    data: param
  })
}
export function HandleProcess(param) {
  return request({
    url: '/processins/HandleProcess',
    method: 'post',
    data: param
  })
}
export function HandleErrorProcess(param) {
  return request({
    url: '/processins/HandleErrorProcess',
    method: 'post',
    data: param
  })
}
export function queryProcessInsLogList(param) {
  return request({
    url: '/processins/queryProcessInsLogList',
    method: 'post',
    data: param
  })
}
