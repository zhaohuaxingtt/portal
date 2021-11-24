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
    url: '/riseassistant/assistantModuleEntity/queryModuleBySor',
    method: 'GET'
  })
}

// 根据模块id 获取用户手册
export function getUserDes() {
  return assistantRequest({
    url: '/riseassistant/assistantManual/getManualById',
    method: 'GET'
  })
}

// 根据模块id 查询热门的前五个话题
export function getHotFiveQues(id) {
  console.log(id, '11123456')
  return assistantRequest({
    url: `/assistantFaq/queryTopFiveHotQuestion/${id}`,
    method: 'GET'
  })
}