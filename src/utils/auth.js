import Cookies from 'js-cookie'

const TokenKey = 'AuthToken'
const sidkey = 'sid'
export function getToken () {
  return Cookies.get(TokenKey)
}

export function getSidkey () {
  let sidwordkey = sessionStorage.getItem(sidkey)
  if (sidwordkey === undefined || sidwordkey === null || sidwordkey === '') {
    return Cookies.get('jeesite.session.id')
  }
  return sidwordkey
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}
export function setSidkey (value) {
  return sessionStorage.setItem(sidkey, value)
}
export function removeSidkey () {
  return Cookies.remove(sidkey)
}
export function removeToken () {
  return Cookies.remove(TokenKey)
}
