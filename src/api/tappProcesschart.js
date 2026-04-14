import request from '@/utils/service'
export function queryByProcessId(processid) {
  return request({
    url: '/tappProcesschart/queryByProcessId/' + processid,
    method: 'post',
    data: {}
  })
}
