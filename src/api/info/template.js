import axios from '@/utils/axios'
const request = axios()

export function getTempList(data) {
  return request({
    url: '/template/list',
    method: 'POST',
    data: data
  })
}
