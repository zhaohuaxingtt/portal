/*
 * @Author: your name
 * @Date: 2021-10-26 10:13:30
 * @LastEditTime: 2021-11-19 10:09:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\api\mtz\annualGeneralBudget\MTZchange.js
 */
import axios from '@/utils/axios'
import download from '@/utils/axios.download'
import store from '@/store'
const request = axios(process.env.VUE_APP_MTZ + '/web/mtz')
const requestDown = download(process.env.VUE_APP_MTZ + '/web/mtz')
const requestChip = axios(process.env.VUE_APP_MTZ + '/web/chip')

//申请状态下拉
export function getLocationApplyStatus(params) {
  return request({
    url: '/mtzBasePriceChange/getLocationApplyStatus',
    method: 'POST',
    data: params
  })
}
//  MTZ变更申请-原材料基价-下拉筛选-供应商名称
export function mtzBasePricePageFilterSupplierName(params) {
  return request({
    url: '/mtzBasePriceChange/mtzBasePricePageFilterSupplierName',
    method: 'POST',
    data: params
  })
}
//   MTZ变更申请-原材料基价-下拉筛选-供应商sap
export function mtzBasePricePageFilterSupplierSap(params) {
  return request({
    url: '/mtzBasePriceChange/mtzBasePricePageFilterSupplierSap',
    method: 'POST',
    data: params
  })
}
//  MTZ变更申请-原材料基价-下拉筛选-采购员
export function mtzBasePricePageFilterUser(params) {
  return request({
    url: '/mtzBasePriceChange/mtzBasePricePageFilterUser',
    method: 'POST',
    data: params
  })
}
//  MTZ变更申请-保存
export function saveGenericAppChange(params) {
  return request({
    url: '/mtzBasePriceChange/saveGenericAppChange',
    method: 'POST',
    data: params
  })
}
//  审批附件列表
export function attachList(params) {
  return request({
    url: '/mtzBasePriceChange/attachList',
    method: 'POST',
    data: params
  })
}
//  维护零件原材料⽤量 (分页查询)
export function basePriceChangePageList(params) {
  return request({
    url: '/mtzBasePriceChange/basePriceChangePageList',
    method: 'POST',
    data: params
  })
}
//   MTZ变更申请-新增
export function addGenericAppChange(params) {
  return request({
    url: '/mtzBasePriceChange/addGenericAppChange',
    method: 'POST',
    data: params
  })
}
export function uploadAttach(params) {
  const formData = new FormData()
  formData.append('mtzAppId', params.mtzAppId || 'rise') // 桶名，默认固定rise
  formData.append('userId', store.state.permission.userInfo.id) // 业务id，默认固定8025
  formData.append('userName', store.state.permission.userInfo.nameZh) // 用户id
  formData.append('file ', params.multifile || []) // 文件
  return request({
    url: `/mtzBasePriceChange/uploadAttach`,
    method: 'POST',
    data: formData
  })
}
//   删除附件(软删除)
export function deleteAttach(params) {
  return request({
    url: '/mtzBasePriceChange/deleteAttach',
    method: 'POST',
    data: params
  })
}
//   维护零件原材料⽤量下载模板
export function priceChangeExport(params) {
  return requestDown({
    url: '/mtzBasePriceChange/priceChangeExport',
    method: 'POST',
    data: params
  })
}
//   维护零件原材料⽤量删除
export function basePriceChangeDelete(params) {
  return request({
    url: '/mtzBasePriceChange/basePriceChangeDelete',
    method: 'POST',
    data: params
  })
}
//   维护零件原材料⽤量-编辑
export function updateBasePriceChange(params) {
  return request({
    url: '/mtzBasePriceChange/updateBasePriceChange',
    method: 'POST',
    data: params
  })
}
//   上传维护零件原材料⽤量
export function uploadBasePriceChange(params) {
  const formData = new FormData()
  formData.append('mtzAppId', params.mtzAppId || 'rise') // 桶名，默认固定rise
  formData.append('userId', store.state.permission.userInfo.id) // 业务id，默认固定8025
  formData.append('file', params.multifile || []) // 文件
  return request({
    url: `/mtzBasePriceChange/uploadBasePriceChange`,
    method: 'POST',
    data: formData
  })
}
//    MTZ变更单详情
export function genericAppChangeDetail(params) {
  return request({
    url: '/mtzBasePriceChange/genericAppChangeDetail',
    method: 'POST',
    data: params
  })
}

//mtz申请单 - 删除(草稿才可以删除)
export function mtzDel(params) {
  return request({
    url: '/mtzBasePriceChange/mtzDel',
    method: 'POST',
    data: params
  })
}
//mtz申请单 - 撤回(已审批才可以撤回
export function mtzRecall(params) {
  return request({
    url: '/mtzBasePriceChange/mtzRecall',
    method: 'POST',
    data: params
  })
}
// 审批记录
export function approvalRecordList(params) {
  return request({
    url: '/mtzBasePriceChange/approvalRecordList',
    method: 'POST',
    data: params
  })
}
// 解释
export function approvalExplain(params) {
  return request({
    url: '/mtzBasePriceChange/approvalExplain',
    method: 'POST',
    data: params
  })
}
// MTZ变更申请-分页-下拉筛选-申请单
export function getLocationApplyFilter(params) {
  return request({
    url: '/mtzBasePriceChange/getLocationApplyFilter',
    method: 'POST',
    data: params
  })
}

// ============================ chip ================================
// ============================ chip ================================
// ============================ chip ================================
// ============================ chip ================================

// 删除审批附件
export function deleteFile(data) {
  return requestChip({
    url: '/change/approval/deleteFile',
    method: 'POST',
    data
  })
}

// 查询审批附件
export function getApprovalByChangeId(changeId) {
  return requestChip({
    url: `/change/approval/list/${changeId}`,
    method: 'POST',
  })
}

// 上传审批附件
export function uploadApproval(changeId, fileId) {
  return requestChip({
    url: `/change/approval/upload/${changeId}/${fileId}`,
    method: 'POST',
  })
}

// 删除变更单
export function deleteApproval(data) {
  return requestChip({
    url: `/change/delete`,
    method: 'POST',
    data
  })
}

// 获取单个定点申请单
export function getDetailById(id) {
  return requestChip({
    url: `/change/detail/${id}`,
    method: 'POST',
  })
}

// 新增变更规则
export function addRule(data) {
  return requestChip({
    url: '/change/detail/add',
    method: 'POST',
    data
  })
}
// 删除变更规则
export function deleteDetail(data) {
  return requestChip({
    url: `/change/detail/delete`,
    method: 'POST',
    data
  })
}

// 导出变更规则附件
export function exportDetail(changeId) {
  return requestChip({
    url: `/change/detail/export/${changeId}`,
    method: 'POST',
    responseType: 'blob'
  })
}
// 上传变更单附件
export function uploadDetail(changeId, data) {
  return requestChip({
    url: `/change/detail/upload/${changeId}`,
    method: 'POST',
    data
  })
}
// 新增变更申请单初始化
export function initData(data) {
  return requestChip({
    url: '/change/init',
    method: 'POST',
    data
  })
}

// 查询变更单
export function getPageList(data) {
  return requestChip({
    url: '/change/page',
    method: 'POST',
    data: data
  })
}

// 撤回
export function recall(data, params) {
  return requestChip({
    url: '/change/recall',
    method: 'POST',
    data,
    params,
  })
}
// 保存变更单
export function save(data) {
  return requestChip({
    url: '/change/save',
    method: 'POST',
    data
  })
}
// 提价变更单
export function submit(params) {
  return requestChip({
    url: '/change/submit',
    method: 'POST',
    params
  })
}