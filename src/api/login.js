import request from '@/utils/service'

export function login(username, password) {
  return request({
    url: '/tappUser/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo() {
  return request({
    url: '/tappUser/GetCurrentUserInfo',
    method: 'post'
  })
}

export function logout() {
  return request({
    url: '/tappUser/logout',
    method: 'post'
  })
}
