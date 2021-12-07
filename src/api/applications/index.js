import axios from '@/utils/axios'
import axiosDownload from '@/utils/axios.download'
// 供应商管理网络请求模块
const requst = axios(process.env.VUE_APP_USER_CENTER)
const requestDownload = axiosDownload(process.env.VUE_APP_USER_CENTER)
// 应用中心列表，按照拼音排序
export function userApplicationList(data) {
  return requst({
    url: `/web/sapUser/application/getSapApplicationList`,
    method: 'post',
    data
  })
}

// 应用分页列表
export function queryApplicationByPages(data) {
  return requst({
    url: `/web/sapUser/application/pageList`,
    method: 'post',
    data
  })
}

//
export function queryApplicationDetail(params) {
  return requst({
    url: `/web/sapUser/application/detail`,
    params
  })
}

export function saveApplication(data) {
  return requst({
    url: `/web/sapUser/application/create`,
    method: 'post',
    data
  })
}

export function updateApplication(data) {
  return requst({
    url: `/web/sapUser/application/update`,
    method: 'post',
    data
  })
}

export function deleteApplicationDetail(data) {
  return requst({
    url: `/web/sapUser/application/deleteBatch`,
    method: 'post',
    data
  })
}

export function exportApplications(data) {
  return requestDownload({
    url: `/web/sapUser/application/exportExcel`,
    method: 'post',
    data
  })
}
