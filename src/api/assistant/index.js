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
    url: '/assistantModuleEntity/queryModuleBySor',
    method: 'GET'
  })
}

// 根据模块id 获取用户手册
export function getUserDes(data) {
  return assistantRequest({
    url: '/assistantManual/getManualById',
    method: 'GET',
    params: data
  })
}

// 根据模块id 查询热门的前五个话题
export function getHotFiveQues(id) {
  return assistantRequest({
    url: `/assistantFaq/queryTopFiveHotQuestion/${id}`,
    method: 'GET'
  })
}

// 点赞的常见问题点赞量+1
export function updateFavour(data) {
  console.log(data, '1111111')
  return assistantRequest({
    url: '/assistantFaq/updateFavour',
    method: 'GET',
    params: data
  })
}

// 根据模块id 查询标签
export function getCurrLabelList(id) {
  return assistantRequest({
    url: `/assistantLabel/queryLabel/${id}`,
    method: 'GET'
  })
}

// 根据问题的id 查询问题的详细信息及附件列表
export function getProblemDetail(id) {
  return assistantRequest({
    url: `/assistantFaq/queryFaqDetail/${id}`,
    method: 'GET'
  })
}