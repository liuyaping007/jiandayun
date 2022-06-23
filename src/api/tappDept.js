import request from '@/utils/service'

export function delDept(id) {
  return request({
    url: '/tappDept/del/' + id,
    method: 'post'
  })
}
export function getDept(id) {
  return request({
    url: '/tappDept/selectOne/' + id,
    method: 'post'
  })
}

export function SaveDept(param) {
  return request({
    url: '/tappDept/SaveDept',
    method: 'post',
    data: param
  })
}

export function SelectDept(wordkey) {
  return request({
    url: '/tappDept/SelectDept/' + wordkey,
    method: 'post',
    data: {}
  })
}

export function SearchDept(wordkey) {
  return request({
    url: '/tappDept/SearchDept/' + wordkey,
    method: 'post',
    data: {}
  })
}
