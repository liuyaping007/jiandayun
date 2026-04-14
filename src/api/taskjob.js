import request from '@/utils/service'

export function querylist(param) {
  return request({
    url: '/ui/jobtaskentity/querylist',
    method: 'post',
    data: param
  })
}

export function selectById(param) {
  return request({
    url: '/ui/jobtaskentity/selectById?id=' + param,
    method: 'post',
    data: {}
  })
}

export function deleteById(param) {
  return request({
    url: '/ui/jobtaskentity/deleteById?id=' + param,
    method: 'post',
    data: {}
  })
}
export function closeJobTask(param) {
  return request({
    url: '/ui/jobtaskentity/closeJobTask?id=' + param,
    method: 'post',
    data: {}
  })
}

export function startJobTask(param) {
  return request({
    url: '/ui/jobtaskentity/startJobTask?id=' + param,
    method: 'post',
    data: {}
  })
}
export function runJobTask(param) {
  return request({
    url: '/ui/jobtaskentity/runJobTask?id=' + param,
    method: 'post',
    data: {}
  })
}

export function getnextCron(param) {
  return request({
    url: '/ui/jobtaskentity/getnextCron?cron=' + param,
    method: 'post',
    data: {}
  })
}

export function jobsave(param) {
  return request({
    url: '/ui/jobtaskentity/save',
    method: 'post',
    data: param
  })
}

export function queryJobloglist(param) {
  return request({
    url: '/ui/joberrorlogentity/querylist',
    method: 'post',
    data: param
  })
}

export function getJoblogInfo(param) {
  return request({
    url: '/ui/joberrorlogentity/selectById',
    method: 'post',
    data: param
  })
}
