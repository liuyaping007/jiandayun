import request from '@/utils/service'

export function GetALLOrganOrDept() {
  return request({
    url: '/tappOrgan/GetALLOrganOrDept',
    method: 'post'
  })
}
export function delOrgan(id) {
  return request({
    url: '/tappOrgan/del/' + id,
    method: 'post'
  })
}
export function getOrgan(id) {
  return request({
    url: '/tappOrgan/selectOne/' + id,
    method: 'post'
  })
}

export function SaveOrgan(param) {
  return request({
    url: '/tappOrgan/SaveOrgan',
    method: 'post',
    data: param
  })
}

export function SelectOrgan(wordkey) {
  return request({
    url: '/tappOrgan/SelectOrgan/' + wordkey,
    method: 'post',
    data: {}
  })
}

export function SearchOrgan(wordkey) {
  return request({
    url: '/tappOrgan/SearchOrgan/' + wordkey,
    method: 'post',
    data: {}
  })
}
