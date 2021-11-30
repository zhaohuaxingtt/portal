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
// 查询管理员用户列表(用于转派)
export function queryProCsUserList() {
  return assistantRequest({
    url: '/assistantQuestion/queryProCsUserList',
    method: 'GET'
  })
}

// 根据用户来源（内部用户/供应商）获取模块列表
export function getModuleList() {
  return assistantRequest({
    url: '/assistantModuleEntity/queryCurrentUserModuleList',
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
    method: 'POST',
    data
  })
}

// 根据模块id 查询标签
export function getCurrLabelList(id) {
  return assistantRequest({
    url: `/assistantLabel/queryLabel/${id}`,
    method: 'GET'
  })
}

// 模块管理 查询模块列表数据
export function queryModuleList(type) {
  return assistantRequest({
    url: `/assistantModuleEntity/queryModuleList?source=${type}`,
    method: 'GET'
  })
}
// 模块管理 保存模块信息
export function saveModules(data) {
  return assistantRequest({
    url: `/assistantModuleEntity/saveModules`,
    method: 'GET',
    data
  })
}

// 标签管理 查询问题模块列表
export function queryModuleBySource(type) {
  return assistantRequest({
    url: `/assistantModuleEntity/queryModuleBySource?source=${type}`,
    method: 'get'
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
// 标签管理 - 查询标签分页
export function queryLabelByPage(data) {
  return assistantRequest({
    url: `/assistantLabel/queryLabelByPage`,
    method: 'post',
    data
  })
}
// 标签管理 - 批量删除标签
export function removeLabel(data) {
  return assistantRequest({
    url: `/assistantLabel/batchRemove`,
    method: 'post',
    data
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
export function delKeywordByIds(data) {
  return assistantRequest({
    url: `/assistantFaqKeyWords/batchDelete`,
    method: 'post',
    data
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

//  常见问题搜索问题
export function getQueryProblemList(data) {
  return assistantRequest({
    url: '/assistantFaq/queryFaqByMLId',
    method: 'POST',
    data: data
  })
}

// 判断该用户是否给该问题点赞
export function judgeFavour(data) {
  return assistantRequest({
    url: `/assistantFaqFavourRecordEntity/judgeLike`,
    method: 'GET',
    params: data
  })
}

// 用户提交问题
export function submitQuestion(data) {
  return assistantRequest({
    url: `/assistantQuestion/newQuestion`,
    method: 'POST',
    data
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

// 根据问题id查询问题详情
export const queryDetailByIdApi = (questionId) => {
  return assistantRequest({
    url: `assistantQuestion/queryQuestionList/${questionId}`,
    method: 'GET'
  })
}

// 回复问题
export const answerQuestionApi = (data) => {
  return assistantRequest({
    url: '/assistantQuestion/answerQuestion',
    method: 'POST',
    data
  })
}

// 指派
export const questionTransferApi = (data) => {
  return assistantRequest({
    url: '/assistantQuestion/transfer',
    method: 'POST',
    data
  })
}

// 获取问答处理未读个数
export const questionUnReplyCountApi = (selfOnly) => {
  return assistantRequest({
    url: '/assistantQuestion/queryUnReplyQuestionCount',
    method: 'GET',
    params: {
      selfOnly
    }
  })
}

// 关闭问题
export const closeQuestionApi = (questionId) => {
  return assistantRequest({
    url: `/assistantQuestion/closeQuestion/${questionId}`,
    method: 'post'
  })
}
