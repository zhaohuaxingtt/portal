/*
 * @Author: your name
 * @Date: 2021-10-18 11:25:00
 * @LastEditTime: 2021-11-09 17:35:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\api\mtz\annualGeneralBudget\supplementaryList.js
 */
import axios from '@/utils/axios'
import axiosDownLoad from '@/utils/axios.download'
const request = axios(process.env.VUE_APP_MTZ + '/web/mtz')
const requestDownLoad = axiosDownLoad(process.env.VUE_APP_MTZ + '/web/mtz')

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
// 补差单列表提交
export function exportFile(params) {
  return requestDownLoad({
    url: '/mtzBalance/export',
    method: 'POST',
    data: params
  })
}
// // sap凭证号下拉
// export function getSapPayBalanceNos(params) {
//   return request({
//     url: '/common/getSapPayBalanceNos',
//     method: 'POST',
//     data: params
//   })
// }
