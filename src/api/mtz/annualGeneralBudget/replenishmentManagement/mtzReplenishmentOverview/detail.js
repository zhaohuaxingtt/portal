/*
 * @Author: youyuan
 * @Date: 2021-10-18 16:48:38
 * @LastEditTime: 2021-11-04 10:47:44
 * @LastEditors: Please set LastEditors
 * @Description: 补差总览明细
 * @FilePath: \重庆软维科技\front-portal\src\api\mtz\annualGeneralBudget\replenishmentManagement\mtzReplenishmentOverview\detail.js
 */
import axios from '@/utils/axios'

const request = axios(process.env.VUE_APP_MTZ + '/web/mtz')

// 补差总览明细-分页查询列表数据
export function fetchTableData(params) {
  return request({
    url: '/mtzBalanceDetails/pageMtzDetail',
    method: 'POST',
    data: params
  })
}
// 补差总览明细-转派-获取采购员数据
export function fetchBuyerData(params) {
  return request({
    url: '/mtzBalanceDetails/dropDownLinie',
    method: 'POST',
    data: params
  })
}
// 补差总览明细-转派-提交转派数据
export function fetchAssign(params) {
  return request({
    url: '/mtzBalanceDetails/assign',
    method: 'POST',
    data: params
  })
}
// 补差总览明细-检索条件-一次零件号下拉选择
export function fetchOnePartNo(params) {
  return request({
    url: '/common/getOnePartNo',
    method: 'POST',
    data: params
  })
}
// 补差总览明细-检索条件-二次零件号下拉选择
export function fetchSecondPartNo(params) {
  return request({
    url: '/common/getSecondPartNo',
    method: 'POST',
    data: params
  })
}
// 补差总览明细-检索条件-二次零件号编号-名称
export function fetchSecondSupplier(params) {
  return request({
    url: '/common/getSecondSupplier',
    method: 'POST',
    data: params
  })
}
// 补差总览明细-检索条件-原材料牌号
export function fetchRawMaterialCode(params) {
  return request({
    url: '/commonDropDown/getRawMaterial',
    method: 'POST',
    data: params
  })
}
// 补差总览明细-检索条件-采购员
export function fetchCurrentUser(params) {
  return request({
    url: '/common/getCurrentUser',
    method: 'POST',
    data: params
  })
}
// MTZ补差总览页-明细-导出当前
export function pageMtzDetailExport(params) {
  return request({
    url: '/mtzBalanceDetails/pageMtzDetailExport',
    method: 'POST',
    responseType: 'blob',
    data: params
  })
}
