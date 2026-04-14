import request from '@/utils/service'
import swaggerservice from '@/utils/swaggerservice'
import { getStore } from '@/utils/store.js'
import qs from 'qs'
export function apiComm(apicode, param) {
  return request({
    url: '/comm/apiComm/' + apicode + window.location.search,
    method: 'post',
    data: param
  })
}
export function getNewId() {
  return request({
    url: '/comm/getNewId',
    method: 'post',
    data: {}
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
export function uploadfile(param) {
  return request({
    url: '/comm/uploadfile',
    method: 'post',
    data: param
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

export function getSwagggerInfo(param) {
  return request({
    url: '/comm/getSwagggerInfo',
    method: 'post',
    data: param
  })
}

export function ajaxComm(apicode, param) {
  let ajaxurl = '/comm/apiComm/' + apicode
  if (param.$query !== undefined) {
    ajaxurl = ajaxurl + qs.stringify(param.$query)
  }
  return request({
    url: ajaxurl,
    method: 'post',
    data: param.body
  })
}
export function then() {
  console.log(1)
}
export function ajaxswagger(url, param, method) {
  const swaggerconfig = getStore({ name: 'swaggerconfig' })
  if (swaggerconfig === null) {
    const returnobj = {}
    returnobj.then = then
    return returnobj
  }
  let ajaxurl = swaggerconfig.Apidoc + url
  if (param.$query !== undefined) {
    ajaxurl = ajaxurl + qs.stringify(param.$query)
  }
  return swaggerservice({
    url: ajaxurl,
    method: method === undefined ? 'post' : method,
    data: param.body
  })
}
