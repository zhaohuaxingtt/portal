import axios from '@/utils/axios'
import axiosDownload from '@/utils/axios.download'
const request = axios(process.env.VUE_APP_BIZLOG)
const requestDownload = axiosDownload(process.env.VUE_APP_BIZLOG)
//查询日志
export function fetchBizLog(data) {
  return request({
    url: '/operationLog/findOperaLogs',
    method: 'POST',
    data
  })
}

//导出日志
export function exportBizLog(data) {
  return requestDownload({
    url: '/operationLog/exportData',
    method: 'POST',
    data
  })
}

// 操作日志查询-分页
export function findRecordLogs(data) {
  return request({
    url: '/operationLog/findRecordLogs',
    method: 'post',
    data
  })
}

// 日志类别下拉列表
export function listCategory() {
  return request({
    url: '/operationLog/listCategory',
    method: 'post'
  })
}
// 操作类别下拉列表
export function listOperation() {
  return request({
    url: '/operationLog/listOperation',
    method: 'post'
  })
}
// 对接外部系统下拉列表
export function listInterfaceSystem() {
  return request({
    url: '/operationLog/listInterfaceSystem',
    method: 'post'
  })
}
// 触发类型下拉列表
export function listTriggerType() {
  return request({
    url: '/operationLog/listTriggerType',
    method: 'post'
  })
}
// 模块菜单列表
export function listMenu() {
  return request({
    url: '/operationLog/listMenu',
    method: 'post'
  })
}
