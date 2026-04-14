import request from '@/utils/service'
export function ApiLoadProcessFromInfo(param) {
  return request({
    url: '/Process/loadProcessFromInfo',
    method: 'post',
    data: param
  })
}

export function queryProcess(param) {
  return request({
    url: '/Process/queryProcess',
    method: 'post',
    data: param
  })
}

export function queryStartProcessList(param) {
  return request({
    url: '/Process/queryStartProcessList',
    method: 'post',
    data: param
  })
}

export function optDelProcess(id) {
  return request({
    url: '/Process/del/' + id,
    method: 'post',
    data: {}
  })
}

export function optStartProcess(id) {
  return request({
    url: '/Process/StartFlow/' + id,
    method: 'post',
    data: {}
  })
}

export function optStopProcess(id) {
  return request({
    url: '/Process/StopFlow/' + id,
    method: 'post',
    data: {}
  })
}

export function optSaveAsProcess(param) {
  return request({
    url: '/Process/SaveAsFlow',
    method: 'post',
    data: param
  })
}

export function optSaveFlowData(param) {
  return request({
    url: '/Process/SaveFlowData',
    method: 'post',
    data: param
  })
}

export function optDesignStartFlow(param) {
  return request({
    url: '/Process/DesignStartFlow',
    method: 'post',
    data: param
  })
}

export function optStopFlow(FlowID) {
  return request({
    url: '/Process/StopFlow/' + FlowID,
    method: 'post'
  })
}
export function optSaveAsFlow(param) {
  return request({
    url: '/Process/SaveAsFlow',
    method: 'post',
    data: param
  })
}

export function optCheackProcesscode(param) {
  return request({
    url: '/Process/CheackProcesscode/' + param,
    method: 'post'
  })
}

export function queryActlistByProcId(param) {
  return request({
    url: '/tappAct/queryByProcId?procId=' + param,
    method: 'get'
  })
}
