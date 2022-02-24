/*
 * @Author: youyuan
 * @Date: 2021-09-01 17:46:15
 * @LastEditTime: 2021-10-27 15:08:05
 * @LastEditors: Please set LastEditors
 * @Description: 年度预算（采购员/科室预算调节人）
 * @FilePath: \重庆软维科技\front-portal\src\api\mtz\database\annualGeneralBudget\annualBudget.js
 */
import axios from '@/utils/axios'
import axiosDownload from '@/utils/axios.download'

const request = axios(process.env.VUE_APP_MTZ + '/web/mtz')
const requestLog = axios(process.env.VUE_APP_BIZLOG)
const requestDownload = axiosDownload(process.env.VUE_APP_MTZ + '/web/mtz')

// 年度预算分页数据-采购员/科室协调人
export function fetchTableDataOfBuyer(params) {
  return request({
    url: '/mtzForecast/pageOfUser',
    method: 'POST',
    data: params
  })
}
// 年度预算分页数据-MTZ科室预算负责人
export function pageOfCoordinator(params) {
  return request({
    url: '/mtzForecast/pageOfCoordinator',
    method: 'POST',
    data: params
  })
}
// 用量版本
export function fetchDemand(params) {
  return request({
    url: '/forecastData/getDemand',
    method: 'POST',
    data: params
  })
}
// 获取状态下拉框
export function fetchStatusList() {
  return request({
    url: '/mtzForecast/getStatusList',
    method: 'GET'
  })
}

// review or 确认
export function fetchReviewOrSubmit(params) {
  return request({
    url: '/mtzForecast/updateStatus',
    method: 'POST',
    data: params
  })
}

// 导出
export function fetchExport(params) {
  return requestDownload({
    url: '/mtzForecast/export',
    method: 'POST',
    data: params
  })
}

// 获取采购员数据
export function fetchUserInfos(params) {
  return request({
    url: '/forecastData/getUserInfos',
    method: 'POST',
    data: params
  })
}

// 材料组纬度分页查询
export function fetchMaterialData(params) {
  return request({
    url: '/forecastData/pageByMaterial',
    method: 'POST',
    data: params
  })
}

// 材料组纬度导出全部
export function fetchMaterialExport(params) {
  return requestDownload({
    url: '/forecastData/exportByMaterial',
    method: 'POST',
    data: params
  })
}

// 零件号纬度分页查询
export function fetchPartData(params) {
  return request({
    url: '/forecastData/pageByPart',
    method: 'POST',
    data: params
  })
}

// 零件号纬度导出全部
export function fetchPartExport(params) {
  return requestDownload({
    url: '/forecastData/exportByPart',
    method: 'POST',
    data: params
  })
}

// 年度预算总览-科室协调人
export function fetchPurchaseBudget(params) {
  return request({
    url: '/forecastData/buyerForecast',
    method: 'POST',
    data: params
  })
}

// 年度预算总览-负责人
export function fetchTableDataOfLeader(params) {
  return request({
    url: '/mtzForecast/page',
    method: 'POST',
    data: params
  })
}

// 年度预算总览-负责人-删除
export function fetchDel(params) {
  return request({
    url: '/mtzForecast/delete',
    method: 'POST',
    data: params
  })
}

// 年度预算总览-负责人-新增校验重复
export function fetchCheckAdd(params) {
  return request({
    url: '/mtzForecast/checkHave',
    method: 'POST',
    data: params
  })
}

// 年度预算总览-负责人-新增
export function fetchAddBudgetLeader(params) {
  return request({
    url: '/mtzForecast/demandInfo',
    method: 'POST',
    data: params
  })
}

// 年度预算总览-负责人-changeLog 数据查询
export function fetchChangeLogPage(params) {
  return requestLog({
    url: '/operationLog/listOperationLogs',
    method: 'POST',
    data: params
  })
}

// 年度预算总览-负责人-导出财务审批
export function fetchExportFinance(params) {
  return requestDownload({
    url: '/forecastData/export',
    method: 'POST',
    data: params
  })
}

// 年度预算总览-负责人-修改用量版本
export function fetchEditDemand(params) {
  return request({
    url: '/mtzForecast/demandEdtInfo',
    method: 'POST',
    data: params
  })
}

// 年度预算总览-负责人-重新计算
export function fetchRecount(params) {
  return request({
    url: '/mtzForecast/demandAgainInfo',
    method: 'POST',
    data: params
  })
}

// 年度预算总览-负责人-发布
export function fetchPublish(params) {
  return request({
    url: '/mtzForecast/publish',
    method: 'POST',
    data: params
  })
}

// 年度预算总览-负责人-发布
export function fetchCheckPublish(params) {
  return request({
    url: '/mtzForecast/publishCheck',
    method: 'POST',
    data: params
  })
}
