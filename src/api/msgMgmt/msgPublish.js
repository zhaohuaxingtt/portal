import axios from '@/utils/axios'
import axiosDownload from '@/utils/axios.download'

const request = axios(process.env.VUE_APP_MAIL)
const requestDownload = axiosDownload(process.env.VUE_APP_MAIL)

//创建或更新Msg
export function savePublishMsg(data) {
  return request({
    url: '/saveOrUpdate',
    method: 'POST',
    data
  })
}

export function fetchPublishList(data) {
  return request({
    url: '/getPage',
    method: 'POST',
    data
  })
}

export function fetchPublishById(params) {
  return request({
    url: '/getById',
    params
  })
}

export function exportPublishHistory(data) {
  return requestDownload({
    url: '/export',
    method: 'post',
    data
  })
}
