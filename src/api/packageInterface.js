import request from '@/utils/service'

export function getPackageInterfaceInfo() {
  return request({
    url: '/page/getPackageInterfaceInfo',
    method: 'post'
  })
}

export function addPackageInfo(param) {
  return request({
    url: '/page/add',
    method: 'post',
    data: param
  })
}
export function editPackageInfo(param) {
  return request({
    url: '/page/edit',
    method: 'post',
    data: param
  })
}
export function delPackageInfo(id) {
  return request({
    url: '/page/del?id=' + id,
    method: 'post'
  })
}

export function saveApiConfigInfo(param) {
  return request({
    url: '/apiconfig/saveApiConfigInfo',
    method: 'post',
    data: param
  })
}

export function getApiConfigByCallMethodCode(code) {
  return request({
    url: '/apiconfig/getApiConfigByCallMethodCode?code=' + code,
    method: 'post'
  })
}

export function getApiConfigById(id) {
  return request({
    url: '/apiconfig/getApiConfigById?id=' + id,
    method: 'post'
  })
}
export function deleteMappingApiConfig(id) {
  return request({
    url: '/apiconfig/deleteMapping?id=' + id,
    method: 'post'
  })
}
