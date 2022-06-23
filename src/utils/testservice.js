import { getToken } from '@/utils/auth.js'
import axios from 'axios'
import Configs from '@/configs'
import { message } from 'ant-design-vue'

const service = axios.create({
  baseURL: Configs.apiUrl, // process.env.VUE_APP_BASE_API
  timeout: 60000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    config.headers.Authorization = 'Bearer ' + getToken()
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
    return res
  },
  error => {
    message.error(error.response.data.errmsg || error)
    return Promise.reject(error)
  }
)

export default service
