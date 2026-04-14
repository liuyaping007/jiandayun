import request from '@/utils/service'
export function excelDBSave(param) {
  return request({
    url: '/excelDB/Save',
    method: 'post',
    data: param
  })
}

export function excelDBDelete(apiId) {
  return request({
    url: '/excelDB/delete/' + apiId,
    method: 'post',
    data: {}
  })
}

export function excelDBList(param) {
  return request({
    url: '/excelDB/list',
    method: 'post',
    data: param
  })
}

export function uploadExlceTemplate(param) {
  return request({
    url: '/excelDB/uploadExlceTemplate',
    method: 'post',
    data: param
  })
}

export function importExlce(param) {
  return request({
    url: '/excelDB/importExlce',
    method: 'post',
    data: param
  })
}
export function selectById(param) {
  return request({
    url: '/excelDB/selectById?id=' + param,
    method: 'post',
    data: {}
  })
}
