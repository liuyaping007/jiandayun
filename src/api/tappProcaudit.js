import request from '@/utils/service'
export function ApiGetProcAudit(param) {
  return request({
    url: '/tappProcaudit/GetProcAudit',
    method: 'post',
    data: param
  })
}
