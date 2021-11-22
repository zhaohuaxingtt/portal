import axios from '@/utils/axios'
// const request = axios(process.env.VUE_APP_APPROVAL)
const userRequest = axios(process.env.VUE_APP_USER_CENTER)
const assistantRequest = axios(process.env.VUE_APP_USER_ASSISTANT)

// 查询常见问题列表
export function getSystemMeun() {
  return userRequest({
    url: '/api/userPermission',
    method: 'GET'
  })
}

// 根据用户来源（内部用户/供应商）获取模块列表
export function getModuleList() {
  return assistantRequest({
    url: '/assistantModuleService/queryModules',
    method: 'GET'
  })
}