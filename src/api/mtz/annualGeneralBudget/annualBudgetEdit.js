/*
 * @Author: youyuan
 * @Date: 2021-09-09 14:02:54
 * @LastEditTime: 2021-10-25 17:13:46
 * @LastEditors: Please set LastEditors
 * @Description: 年度预算编辑
 * @FilePath: \重庆软维科技\front-portal\src\api\mtz\annualGeneralBudget\annualBudgetEdit.js
 */
import axios from '@/utils/axios'
const request = axios(process.env.VUE_APP_MTZ + '/web/mtz')

// 采购员-分页查询
export function fetchBuyerDataPage(params) {
  return request({
    url: '/forecastData/budgetOverview',
    method: 'POST',
    data: params
  })
}

// 采购员-查询采购员(检索条件)
export function fetchBuyerList(params) {
  return request({
    url: '/forecastOther/queryUserName',
    method: 'POST',
    data: params
  })
}

// 采购员-通知linie
export function fetchNoticeLinie(params) {
  return request({
    url: '/forecastConfirm/noticeLinie',
    method: 'POST',
    data: params
  })
}

// 采购员-获取材料中类
export function fetchGroups(params) {
  return request({
    url: '/common/getGroups',
    method: 'POST',
    data: params
  })
}

// 采购员-编辑-分页查询
export function fetchEditBuyerDataPage(params) {
  return request({
    url: '/forecastData/budgetEditPage',
    method: 'POST',
    data: params
  })
}

// 采购员-编辑-保存
export function fetchEditBuyerSave(params) {
  return request({
    url: '/forecastData/budgetEdit',
    method: 'POST',
    data: params
  })
}

// 科室-分页查询
export function fetchDeptDataPage(params) {
  return request({
    url: '/forecastData/departPage',
    method: 'POST',
    data: params
  })
}

// 科室-保存
export function fetchDeptSave(params) {
  return request({
    url: 'forecastData/departEdit',
    method: 'POST',
    data: params
  })
}

// 品牌-分页查询
export function fetchBrandDataPage(params) {
  return request({
    url: '/forecastData/brandPage',
    method: 'POST',
    data: params
  })
}

// 品牌-保存
export function fetchBrandSave(params) {
  return request({
    url: '/forecastData/brandEdit',
    method: 'POST',
    data: params
  })
}

// 编辑其他-分页查询
export function fetchOtherDataPage(params) {
  return request({
    url: '/forecastOther/editOtherPage',
    method: 'POST',
    data: params
  })
}

// 编辑其他-保存
export function fetchSaveOther(params) {
  return request({
    url: '/forecastOther/saveOrUpdate',
    method: 'POST',
    data: params
  })
}

// 编辑其他-模糊查询采购员
export function fetchRemoteUser(params) {
  return request({
    url: '/forecastOther/queryUser',
    method: 'POST',
    data: params
  })
}

// 编辑其他-科室
export function getDeptSection(params) {
  return request({
    url: '/forecastOther/getDeptSection?userId='+params,
    method: 'GET',
  })
}

// 编辑其他-模糊查询品牌
export function fetchRemoteBrand(params) {
  return request({
    url: '/forecastOther/queryBrand',
    method: 'GET',
    params: params
  })
}

// 编辑其他-模糊查询材料中类
export function fetchRemoteMaterialMedium(params) {
  return request({
    url: '/forecastOther/queryMaterialMedium',
    method: 'GET',
    params: params
  })
}

// 编辑其他-模糊查询MTZ材料组
export function fetchRemoteMtzMaterial(params) {
  return request({
    url: '/forecastOther/queryMtzMaterial',
    method: 'GET',
    params: params
  })
}

// 编辑其他-删除
export function fetchDelOther(params) {
  return request({
    url: '/forecastOther/delete',
    method: 'POST',
    data: params
  })
}

// 编辑其他-模糊查询科室
export function fetchRemoteDept(params) {
  return request({
    url: '/forecastOther/queryDeptSection',
    method: 'POST',
    data: params
  })
}
