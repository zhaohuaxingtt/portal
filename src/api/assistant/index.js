import axios from '@/utils/axios'
// const request = axios(process.env.VUE_APP_APPROVAL)
const requst = axios(process.env.VUE_APP_USER_CENTER)

// 查询常见问题列表
export function getSystemMeun() {
  return requst({
    url: '/api/userPermission',
    method: 'GET'
  })
}