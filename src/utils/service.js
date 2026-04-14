import { getToken, setToken, getSidkey, setSidkey } from './auth.js'
import axios from 'axios'
import { Message } from 'element-ui';
import Configs from '@/configs'
const service = axios.create({
  baseURL: Configs.apiUrl,   // process.env.VUE_APP_BASE_API
  timeout: 60000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    config.headers.Authorization = 'Bearer ' + getToken()
    const sid = getSidkey()
    if (sid !== '' && sid !== undefined && sid !== 'undefined') {
      config.headers.__sid = sid
      config.headers.__ajax = 'json'
    }
    return config
  },
  error => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    if (response.request.responseType === 'blob') {
      return response
    }
    if (res.isValidCodeLogin === false) {
      setSidkey('')
      setToken('')
      if (response.config.baseURL !== "/jd") {
        window.location.href = '../a/login'
      }
      //Message.error(res.message)
      return false
    }
    if (res.result === false || res.result === "false") {
      Message.error(res.message)
      return false
    }
    return res
  },
  error => {
    Message.error(error.response.data || error)
    return { code: 404, msg: error.response.data }
  }
)

export default service
