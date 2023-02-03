/*
 * @Author: youyuan
 * @Date: 2021-09-09 14:02:54
 * @LastEditTime: 2023-02-04 00:02:58
 * @LastEditors: YoHo && 917955345@qq.com
 * @Description: 年度预算编辑
 * @FilePath: \front-portal\src\api\mtz\annualGeneralBudget\chipReplenishment.js
 */
import axios from '@/utils/axios'
import axiosDownLoad from '@/utils/axios.download'
const request = axios(process.env.VUE_APP_MTZ + '/web/chip')
const requestChip = axios(process.env.VUE_APP_MTZ + '/web/balance')
const downloadChip = axiosDownLoad(process.env.VUE_APP_MTZ + '/web/balance')
// 获取一次件供应商
export function getSupplierByuser(params) {
  return request({
    url: '/common/getSupplierByUser',
    method: 'POST',
    data: params
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
export function getBalanceStatusList(params) {
  return request({
    url: '/common/getBalanceStatusList',
    method: 'POST',
  })
}

// 计算中补差规则导出
export function exportBalanceRuleList(params) {
  return downloadChip({
    url: '/exportBalanceRuleList',
    method: 'POST',
    params,
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

// 补差汇总列表分页查询-一次零件,二次零件,二次供应商维度-导出
export function exportSupplierBalanceSummary(data) {
  return downloadChip({
    url: '/exportSupplierBalanceSummary',
    method: 'POST',
    data,
    responseType: 'blob'
  })
}

// 补差汇总列表明细查询-一次零件,二次零件,二次供应商维度-导出
export function exportSupplierBalanceSummaryDetail(data) {
  return downloadChip({
    url: '/exportSupplierBalanceSummaryDetail',
    method: 'POST',
    data,
    responseType: 'blob'
  })
}