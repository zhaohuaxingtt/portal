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
