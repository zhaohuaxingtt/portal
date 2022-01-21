/*
 * @Author: YoHo
 * @Date: 2021-12-24 17:45:34
 * @LastEditTime: 2021-12-27 11:28:31
 * @LastEditors: YoHo
 * @Description: \front-portal\src\api\mtz\annualGeneralBudget\reportShow.js
 */
import axios from '@/utils/axios'
const request = axios(process.env.VUE_APP_AEKO + '/web/')
const requestMTZ = axios(process.env.VUE_APP_MTZ + '/web/mtz')

// 补差单号下拉框
export function getMtzDocNos(params) {
  return request({
    url: '/common/getMtzDocNos',
    method: 'POST',
    data: params
  })
}
// sap补差单号下拉选择
export function getSapPayBalanceNos(params) {
  return request({
    url: '/common/getSapPayBalanceNos',
    method: 'POST',
    data: params
  })
}
// 申请人下拉选择
export function getApplicants(params) {
  return request({
    url: '/common/getApplicants',
    method: 'POST',
    data: params
  })
}
// 单据状态下拉选择
export function getApprovalStatus(params) {
  return request({
    url: '/common/getApprovalStatus',
    method: 'POST',
    data: params
  })
}
// 补差列表
export function makeUpPageList(params) {
  return request({
    url: '/mtzBalance/makeUpPageList',
    method: 'POST',
    data: params
  })
}
// 补差单列表发送供应商
export function sendSupplier(params) {
  return request({
    url: '/mtzBalance/sendSupplier',
    method: 'POST',
    data: params
  })
}
// 获取审批状态
export function approvalStatus(params) {
  return request({
    url: '/mtzBalance/getApprovalStatus',
    method: 'POST',
    data: params
  })
}

// 补差单列表撤回
export function recall(params) {
  return request({
    url: '/mtzBalance/recall',
    method: 'POST',
    data: params
  })
}
// 补差单列表提交
export function payBalanceSubmit(params) {
  return request({
    url: '/mtzBalance/payBalanceSubmit',
    method: 'POST',
    data: params
  })
}

// 获取报表
export function statement(data) {
  return request({
    url: `/aeko/overdue/statement`,
    method: "POST",
    data
  })
}

// 获取报表
export function yearBrandExport(params) {
  return requestMTZ({
    url: `/forecastReport/yearBrandExport`,
    method: "POST",
    responseType: 'blob',
    data: params
  })
}


