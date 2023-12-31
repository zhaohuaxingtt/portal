import axios from '@/utils/axios'
// const request = axios(process.env.VUE_APP_APPROVAL)
const userRequest = axios(process.env.VUE_APP_USER_CENTER)
const assistantRequest = axios(process.env.VUE_APP_USER_ASSISTANT)
import axiosDownload from '@/utils/axios.download'
const requestDownload = axiosDownload(process.env.VUE_APP_USER_ASSISTANT)

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

// 获取我的提问对应的模块
export function getAskModuleList() {
  return assistantRequest({
    url: '/assistantModuleEntity/queryCurrentUserAllModuleList',
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

// 用户手册管理 新增用户手册
export function insertNewManual(data) {
  return assistantRequest({
    url: '/assistantManual/saveManual',
    method: 'post',
    data
  })
}
// 用户手册管理 删除用户手册
export function delManual(id) {
  return assistantRequest({
    url: `/assistantManual/delete/${id}`,
    method: 'post'
  })
}
// 用户手册管理 删除常见问题
export function delFaq(id) {
  return assistantRequest({
    url: `/assistantFaq/delete/${id}`,
    method: 'post'
  })
}
// 用户手册管理 更新常见问题
export function updateFaq(id, data) {
  return assistantRequest({
    url: `/assistantFaq/updateFaq/${id}`,
    method: 'post',
    data
  })
}
// 用户手册管理 新增常见问题
export function saveFaq(data) {
  return assistantRequest({
    url: `/assistantFaq/saveFaq`,
    method: 'post',
    data
  })
}
// 用户手册管理 常见问题列表查询
export function queryFaqListByPage(data) {
  return assistantRequest({
    url: `/assistantFaq/queryFaqListByPage`,
    method: 'post',
    data
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
    data
  })
}

// 点赞的常见问题点赞量+1
export function updateFavour(id) {
  return assistantRequest({
    url: `/assistantFaq/updateFavour/${id}`,
    method: 'GET'
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
export function saveModules(data, source) {
  return assistantRequest({
    url: `/assistantModuleEntity/saveModules?source=${source}`,
    method: 'post',
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
export function getProblemDetail(data) {
  return assistantRequest({
    url: `/assistantFaq/queryFaqDetail?id=${data.id}`,
    method: 'POST'
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
    url: `/assistantFaq/queryFaqByMLId?labelId=${data.labelId}?moduleId=${data.moduleId}?questionTitle=${data.questionTitle}`,
    method: 'POST'
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

// 我的提问分页查询接口
export function getMineQuesList(data) {
  return assistantRequest({
    url: '/assistantQuestion/pageForMyQuestion',
    method: 'POST',
    data
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
//  新增追问内容
export const submitAwContent = (data) => {
  return assistantRequest({
    url: '/assistantQuestion/additionQuestion',
    method: 'POST',
    data
  })
}

// 常见问题查询
export const queryFaqListByPageApi = (data) => {
  return assistantRequest({
    url: '/assistantFaq/queryFaqListByPage',
    method: 'POST',
    data
  })
}

// 问题处理统计
export const queryQListByPageApi = (data) => {
  return assistantRequest({
    url: '/assistantQuestion/queryQListByPage',
    method: 'POST',
    data
  })
}

// 问题归档
export const assistantFaqSaveFaqApi = (data) => {
  return assistantRequest({
    url: '/assistantFaq/saveFaq',
    method: 'POST',
    data
  })
}

// 修改问题模块和标签
export const modifyModuleAndLabelApi = (data) => {
  return assistantRequest({
    url: '/assistantQuestion/updateModuleId',
    method: 'POST',
    data
  })
}

// 常见问题统计导出
export const exportStatisticsQuestionsApi = (data) => {
  return requestDownload({
    url: '/assistantFaq/exportQuestions',
    method: 'POST',
    data
  })
}

// 问题处理统计导出
export const exportQuestionsApi = (data) => {
  return requestDownload({
    url: '/assistantQuestion/exportQuestions',
    method: 'POST',
    data
  })
}

//  智能问答
export const getSmartContent = (data) => {
  return assistantRequest({
    url: '/assistantFaq/smartAnswer',
    method: 'POST',
    data
  })
}
