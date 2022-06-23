import request from '@/utils/service'

export function QueryUser(param) {
  return request({
    url: '/tappUser/QueryUser',
    method: 'post',
    data: param
  })
}

export function StopOrStart(param) {
  return request({
    url: '/tappUser/StopOrStart/' + param.id + '/' + param.status,
    method: 'post',
    data: {}
  })
}

export function selectOne(id) {
  return request({
    url: '/tappUser/selectOne/' + id,
    method: 'post',
    data: {}
  })
}

export function SaveData(param) {
  return request({
    url: '/tappUser/SaveData',
    method: 'post',
    data: param
  })
}

export function ResetPassword(id) {
  return request({
    url: '/tappUser/ResetPassword/' + id,
    method: 'post',
    data: {}
  })
}

export function SelectUser(wordkey) {
  return request({
    url: '/tappUser/SelectUser/' + wordkey,
    method: 'post',
    data: {}
  })
}

export function SearchUser(wordkey) {
  return request({
    url: '/tappUser/SearchUser/' + wordkey,
    method: 'post',
    data: {}
  })
}
