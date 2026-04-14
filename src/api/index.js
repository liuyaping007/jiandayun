import request from '@/utils/service'

export function apiComm() {
  return request({
    url: 'smartAnalysis/getStationData',
    method: 'post',
    data: {},
  })
}
