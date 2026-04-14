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

export function saveConfigShowCelNames(param) {
  return request({
    url: '/From/saveConfigShowCelNames',
    method: 'post',
    data: param
  })
}
export function saveConfigQueryJson(param) {
  return request({
    url: '/From/saveConfigQueryJson',
    method: 'post',
    data: param
  })
}

export function creatform(param) {
  return request({
    url: '/From/creatform',
    method: 'post',
    data: param
  })
}
export function getFromByTableName(fromTableName) {
  return request({
    url: '/From/getFromByTableName?fromTableName=' + fromTableName,
    method: 'post',
    data: {}
  })
}

export function getConfigQueryJson(param) {
  return request({
    url: '/From/getConfigQueryJson',
    method: 'post',
    data: param
  })
}
export function queryAll(param) {
  return request({
    url: '/From/queryall',
    method: 'post',
    data: param
  })
}
export function getFromContent(param) {
  return request({
    url: '/From/getFromContent',
    method: 'post',
    data: param
  })
}
export function queryFromIdByTableName(param) {
  return request({
    url: '/From/queryFromIdByTableName?fromTableName=' + param,
    method: 'post',
    data: {}
  })
}

export function deleteFromById(fromid) {
  return request({
    url: '/From/deleteById?id=' + fromid,
    method: 'post',
    data: {}
  })
}
