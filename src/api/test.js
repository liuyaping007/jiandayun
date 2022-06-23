import request from '@/utils/testservice'

export function apiComm(apicode, param) {
  return request({
    url: '/comm/apiComm/' + apicode,
    method: 'post',
    data: param
  })
}

export function TestExecuteApi(param) {
  return request({
    url: '/comm/testExecuteApi',
    method: 'post',
    data: param
  })
}

export function ExportExlce(apicode, param) {
  return request({
    url: '/comm/ExportExlce/' + apicode,
    method: 'post',
    data: param,
    responseType: 'blob'
  })
}
export function getApiFieldNames(param) {
  return request({
    url: '/comm/getApiFieldNames',
    method: 'post',
    data: param
  })
}
