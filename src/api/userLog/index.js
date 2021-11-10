import axios from '@/utils/axios'
const request = axios()

export function getUserLogList(params) {
  return request({
    url: '/userLogApi/userLogList',
    method: 'post',
    data: params
  })
}

export function getUserLogBaseInfo(params) {
  return request({
    url: '/userLogApi/userLogBaseInfo',
    method: 'post',
    data: params
  })
}
