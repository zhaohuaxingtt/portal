import axios from '@/utils/axios'
import axiosDownload from '@/utils/axios.download'
const request = axios(process.env.VUE_APP_APPROVAL)
const requestDownload = axiosDownload(process.env.VUE_APP_APPROVAL)

export function fetchMonitors(data) {
  return request({
    url: `/monitor/list`,
    method: 'POST',
    data
  })
}

export function exportMonitors(data) {
  return requestDownload({
    url: `/monitor/export`,
    method: 'POST',
    data
  })
}

export function exportProcessHistorics(data) {
  return requestDownload({
    url: `/monitor/exportProcessHistorics`,
    method: 'POST',
    data
  })
}

export function retryAssign(data) {
  return request({
    url: `/retryAssign`,
    method: 'POST',
    data
  })
}

// 获取审批流编辑列表
export function listTaskTransfer(data) {
  return request({
    url: `/web/taskInfo/listTaskTransfer`,
    method: 'POST',
    data
  })
}


// 任务转派
export function transfer({ targetUserId, taskId }) {
  return request({
    url: `/web/taskInfo/transferTask?targetUserId=${targetUserId}&taskId=${taskId}`,
    method: 'PUT',
  })
}

// 是否允许转派
export function isAllowedToTransfer(data) {
  return request({
    url: `/web/taskInfo/isAllowedToTransfer`,
    method: 'POST',
    data
  })
}

// Skip 跳过节点
export function skipTask(taskId) {
  return request({
    url: `/web/taskInfo/skipTask/${taskId}`,
    method: 'POST',
  })
}