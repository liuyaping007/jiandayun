import request from '@/utils/service'

export function apiComm(apicode, param) {
  return request({
    url: '/comm/apiComm/' + apicode,
    method: 'post',
    data: param
  })
}
export function getListHeadCell(apicode) {
  return request({
    url: '/comm/getListHeadCell/' + apicode,
    method: 'post'
  })
}
export function getApiFieldNames(param) {
  return request({
    url: '/comm/getApiFieldNames',
    method: 'post',
    data: param
  })
}

export function getEnumDic(menuType) {
  return request({
    url: '/comm/getDictionaryEnum?menuType=' + menuType,
    method: 'post'
  })
}

export function getBatchDictionaryEnum(param) {
  return request({
    url: '/comm/getBatchDictionaryEnum',
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

export function uploadImg(param) {
  return request({
    url: '/comm/uploadImg',
    method: 'post',
    data: param
  })
}

export function download(url) {
  return request({
    url: '/comm/download?path=' + url,
    method: 'get'
  })
}
