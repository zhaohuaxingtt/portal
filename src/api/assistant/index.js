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

// 查询热门常见问题
export function queryHotFaq() {
  return assistantRequest({
    url: `/assistantFaq/queryHotFaq`,
    method: 'GET'
  })
}

// 分页查询常见问题
export function queryFaqByPage(data) {
  return assistantRequest({
    url: `/assistantFaq/findByPage`,
    method: 'POST',
    data: data
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

// 标签管理 - 新增标签
export function newLabel(data) {
  return assistantRequest({
    url: `/assistantLabel/newLabel`,
    method: 'post',
    data
  })
}
// 标签管理 - 删除标签
export function removeLabel(id) {
  return assistantRequest({
    url: `/assistantLabel/removeLabel/${id}`,
    method: 'get'
  })
}

// 关键词管理 - 查询关键词分页
export function getKeywordByPage(data) {
  return assistantRequest({
    url: `/assistantFaqKeyWords/page`,
    method: 'post',
    data
  })
}
// 关键词管理 - 删除关键词
export function delKeywordById(id) {
  return assistantRequest({
    url: `/assistantFaqKeyWords/delete/${id}`,
    method: 'get'
  })
}
// 关键词管理 - 保存关键词
export function saveKeyword(data) {
  return assistantRequest({
    url: `/assistantFaqKeyWords/save`,
    method: 'post',
    data
  })
}
// 根据问题的id 查询问题的详细信息及附件列表
export function getProblemDetail(id) {
  return assistantRequest({
    url: `/assistantFaq/queryFaqDetail/${id}`,
    method: 'GET'
  })
}

//  查询全部模块及其标签
export function getAllModuleLabel() {
  return assistantRequest({
    url: '/assistantModuleEntity/queryMAndL',
    method: 'GET'
  })
}

// 供应商用户和内部用户查询模块列表
export const getModuleListByUserTypeApi = (userType) => {
  return assistantRequest({
    url: '/assistantModuleEntity/queryModuleList',
    method: 'GET',
    params: {
      source: userType
    }
  })
}

// 根据条件查询问题列表
export const queryProblemListApi = (data) => {
  return assistantRequest({
    url: '/assistantQuestion/pageForDeal',
    method: 'POST',
    data
  })
}
