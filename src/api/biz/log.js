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

export function fetchBizLogCategories(data) {
  return request({
    url: '/operationLog/listOperationType',
    method: 'post',
    data
  })
}
