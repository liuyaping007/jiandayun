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
    if (res.code !== 0) {
      // 获取物流单号接口。。
      if (res.success) {
        return res
      }
      message.error(res.errmsg || res.msg || 'Error')
      // this.$message({
      //   message: res.errmsg || 'Error',
      //   type: 'error',
      //   duration: 5 * 1000
      // })
      if (res.code === 401 || res.code === 402 || res.code === 403) {
        // to re-login
        message.error('请重新登录')
      }
      return Promise.reject(new Error(res.message || 'Error'))
    }
    return res
  },
  error => {
    message.error(error.response.data.errmsg || error)
    return Promise.reject(error)
  }
)

export default service
