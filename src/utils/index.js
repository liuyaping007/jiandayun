import config from '../configs'

export function isChrome (ver = 70) {
  const UA = window.navigator.userAgent.toLowerCase()
  const noChrome = ['msie/', 'trident/', 'firefox/', 'ubrowser/', 'opera/', 'bidubrowser/', 'metasr/', 'tencenttraveler/', 'qqbrowser/', 'maxthon/', 'edge/', 'micromessenger/']
  const types = Object.keys(window.navigator.mimeTypes).map(key => window.navigator.mimeTypes[key]).some(({ type }) => type.includes('chromium'))
  const version = UA.match(/chrome.*?\./)[0].match(/\d+/) >= ver
  const chrome = UA && /chrome\/\d+/.test(UA) && !noChrome.some(ua => UA.includes(ua)) && !types && version
  return chrome
}

export function isExternal (path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export const fillUrl = url => {
  if (!url) {
    return ''
  }
  return url.indexOf('http') === -1 ? config.apiUrl + url : url
}
