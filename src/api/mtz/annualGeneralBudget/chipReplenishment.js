/*
 * @Author: youyuan
 * @Date: 2021-09-09 14:02:54
 * @LastEditTime: 2023-02-15 15:04:44
 * @LastEditors: YoHo && 917955345@qq.com
 * @Description: 年度预算编辑
 * @FilePath: \front-portal\src\api\mtz\annualGeneralBudget\chipReplenishment.js
 */
import axios from '@/utils/axios'
import axiosDownLoad from '@/utils/axios.download'
const request = axios(process.env.VUE_APP_MTZ + '/web/chip')
const requestChip = axios(process.env.VUE_APP_MTZ + '/web/balance')
const downloadChip = axiosDownLoad(process.env.VUE_APP_MTZ + '/web/balance')
// 获取供应商下拉选择(当前用户权限)
export function getSupplierByUser(params) {
  return request({
    url: '/common/getSupplierByUser',
    method: 'POST',
    data: params
  })
}
// 获取芯片一次件供应商
export function getTaskPrimarySupplierList() {
  return request({
    url: '/common/getTaskPrimarySupplierList',
    method: 'POST',
  })
}
// 获取芯片二次件供应商
export function getTaskSecondSupplierList() {
  return request({
    url: '/common/getTaskSecondSupplierList',
    method: 'POST',
  })
}
// 任务:采购员列表
export function getTaskBuyerList() {
  return request({
    url: '/common/getTaskBuyerList',
    method: 'POST',
  })
}
// 任务:科室列表
export function getTaskDepartmentList() {
  return request({
    url: '/common/getTaskDepartmentList',
    method: 'POST',
  })
}

// 计算补差
export function calculate(params) {
  return requestChip({
    url: '/calculate',
    method: 'POST',
    params
  })
}

// 芯片一次性补差定时任务-调试
export function chipBalanceJob(params) {
  return requestChip({
    url: '/chipBalanceJob',
    method: 'POST',
    data: params
  })
}

// 获取单个补差单-明细
export function findBalanceById(data) {
  return requestChip({
    url: '/findBalanceById',
    method: 'POST',
    data
  })
}

// 初始化补差单
export function initbalance(params) {
  return requestChip({
    url: '/initbalance',
    method: 'POST',
    data: params
  })
}

// 保存补差单
export function saveBalance(params) {
  return requestChip({
    url: '/saveBalance',
    method: 'POST',
    data: params
  })
}

// 更新补差单
export function updateBalance(params) {
  return requestChip({
    url: '/updateBalance',
    method: 'POST',
    data: params
  })
}

// 创建补差单号
export function createBalance(params) {
  return requestChip({
    url: '/createBalance',
    method: 'POST',
    params
  })
}

// 补差总览分页查询
export function findBalanceSummaryByPage(params) {
  return requestChip({
    url: '/findBalanceSummaryByPage',
    method: 'POST',
    data: params
  })
}

// 补差任务分页查询
export function findCalculateTaskByPage(params) {
  return requestChip({
    url: '/findCalculateTaskByPage',
    method: 'POST',
    data: params
  })
}

// 补差单列表分页查询
export function findBalanceByPage(params) {
  return requestChip({
    url: '/findBalanceByPage',
    method: 'POST',
    data: params
  })
}
// 发送供应商确认
export function sendSupplierConfirm(params) {
  return requestChip({
    url: '/sendSupplierConfirm',
    method: 'POST',
    data: params
  })
}
// 供应商确认接口
export function supplierConfirm(params, data) {
  return requestChip({
    url: '/supplierConfirm',
    method: 'POST',
    params,
    data,
  })
}
// 获取EPMS审批状态
export function getEpmsApprovalStatus( params) {
  return requestChip({
    url: '/getEpmsApprovalStatus',
    method: 'POST',
    params,
  })
}
// 补差单列表撤回
export function recallBalance( data) {
  return requestChip({
    url: '/recallBalance',
    method: 'POST',
    data,
  })
}
// 补差单列表删除
export function deleteBalance( data) {
  return requestChip({
    url: '/deleteBalance',
    method: 'POST',
    data,
  })
}
// 补差单列表提交
export function submitBalance( data ) {
  return requestChip({
    url: '/submitBalance',
    method: 'POST',
    data,
  })
}
// 补差单行项目删除==弹窗-冲销
export function deleteBalanceItem( data ) {
  return requestChip({
    url: '/deleteBalanceItem',
    method: 'POST',
    data,
  })
}
// 获取任务状态下拉列表
export function getBalanceTaskStatusList(params) {
  return request({
    url: '/common/getBalanceTaskStatusList',
    method: 'POST',
  })
}

// 获取芯片补差单状态下拉列表
export function getBalanceStatusList() {
  return request({
    url: '/common/getBalanceStatusList',
    method: 'POST',
  })
}

// 计算中补差规则导出
export function exportBalanceRuleList(data) {
  return downloadChip({
    url: '/exportBalanceRuleList',
    method: 'POST',
    data,
    responseType: 'blob'
  })
}

// 补差任务列表导出
export function exportBalanceTaskList(data) {
  return downloadChip({
    url: '/exportBalanceTaskList',
    method: 'POST',
    data,
    responseType: 'blob'
  })
}


// 补差单列表导出
export function exportBalanceList(data) {
  return downloadChip({
    url: '/exportBalanceList',
    method: 'POST',
    data,
    responseType: 'blob'
  })
}
// 凭证列表导出
export function exportBalanceItemList(data) {
  return downloadChip({
    url: '/exportBalanceItemList',
    method: 'POST',
    data,
    responseType: 'blob'
  })
}

// 凭证PDF导出
export function balanceDetailPdfExport(params) {
  return requestChip({
    url: '/balanceDetailPdfExport',
    method: 'POST',
    params,
    responseType: 'blob'
  })
}

// 单个补差单明细凭证Excel导出
export function balanceDetailExport(params) {
  return downloadChip({
    url: '/balanceDetailExport',
    method: 'POST',
    params,
    responseType: 'blob'
  })
}

// 补差汇总列表分页查询-一次零件,二次零件,二次供应商维度-导出 汇总EXCEL
export function exportSupplierBalanceSummary(data) {
  return downloadChip({
    url: '/exportSupplierBalanceSummary',
    method: 'POST',
    data,
    responseType: 'blob'
  })
}

// 补差汇总列表明细查询-一次零件,二次零件,二次供应商维度-导出 明细EXCEL
export function exportSupplierBalanceSummaryDetail(data) {
  return downloadChip({
    url: '/exportSupplierBalanceSummaryDetail',
    method: 'POST',
    data,
    responseType: 'blob'
  })
}

// 单个补差单汇总列表分页查询-一次零件,二次零件,二次供应商维度
export function findSupplierBalanceSummaryByPage( data ) {
  return requestChip({
    url: '/findSupplierBalanceSummaryByPage',
    method: 'POST',
    data,
  })
}
// 补差汇总列表明细查询-一次零件,二次零件,二次供应商维度
export function findSupplierBalanceSummaryDetailList( data ) {
  return requestChip({
    url: '/findSupplierBalanceSummaryDetailList',
    method: 'POST',
    data,
  })
}

// 获取EPMS审批记录
export function getEpmsApprovalRecord( params ) {
  return requestChip({
    url: '/getEpmsApprovalRecord',
    method: 'POST',
    params,
  })
}