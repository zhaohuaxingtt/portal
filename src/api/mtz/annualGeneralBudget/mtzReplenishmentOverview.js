/*
 * @Author: youyuan
 * @Date: 2021-09-09 14:02:54
 * @LastEditTime: 2021-11-03 11:17:25
 * @LastEditors: Please set LastEditors
 * @Description: 年度预算编辑
 * @FilePath: \重庆软维科技\front-portal\src\api\mtz\annualGeneralBudget\annualBudgetEdit.js
 */
import axios from '@/utils/axios'
const request = axios(process.env.VUE_APP_MTZ + '/web/mtz')

// 采购员-分页查询
export function pageMTZCompOverview(params) {
  return request({
    url: '/mtzBalanceDetails/pageMTZCompOverview',
    method: 'POST',
    data: params
  })
}

export function getMtzSupplierList(params) {
  return request({
    url: '/commonDropDown/getSupplierByUser',
    method: 'POST',
    data: params
  })
}
//MTZ发起补差查询 - 分页
export function pageMTZCompByComputer(params) {
  return request({
    url: '/mtzBalanceDetails/pageMTZCompByComputer',
    method: 'POST',
    data: params
  })
}
//中类编号
export function getMtzGroups(params) {
  return request({
    url: '/common/getMtzGroups',
    method: 'POST',
    data: params
  })
}
//原材料编号
export function getRawMaterialNos(params) {
  return request({
    url: '/commonDropDown/getRawMaterial',
    method: 'POST',
    data: params
  })
}
//采购组下拉
export function getUserSubPurchaseGroup(params) {
  return request({
    url: '/common/getUserSubPurchaseGroup',
    method: 'POST',
    data: params
  })
}
//MTZ发起补差冲销
export function chargeAgainstMTZComp(params) {
  return request({
    url: '/mtzBalanceDetails/chargeAgainstMTZComp',
    method: 'POST',
    data: params
  })
}
//MTZ发起补差 - 提交
export function submitMTZComp(params) {
  return request({
    url: '/mtzBalanceDetails/submitMTZComp',
    method: 'POST',
    data: params
  })
}

// mtz发起补差-编辑-查询
export function fetchQueryComp(params) {
  return request({
    url: '/mtzBalanceDetails/pageMTZCompByHeadId',
    method: 'POST',
    data: params
  })
}

// mtz发起补差-编辑-保存
export function fetchSaveComp(params) {
  return request({
    url: '/mtzBalanceDetails/saveMTZComp',
    method: 'POST',
    data: params
  })
}
// MTZ补差计算
export function balanceCalcuLate(params) {
  return request({
    url: '/calculation/balanceCalcuLate',
    method: 'POST',
    data: params
  })
}

// mtz发起补差-编辑-获取信息
export function getDataList(params) {
  return request({
    url: '/mtzBalance/get/' + params,
    method: 'GET'
  })
}

// 补差总览明细-检索条件-采购员
export function getBizNo(params) {
  return request({
    url: '/mtzBalance/getBizNo',
    method: 'POST',
    data: params
  })
}
