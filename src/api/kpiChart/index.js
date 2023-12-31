/*
 * @Author: your name
 * @Date: 2021-08-07 10:24:35
 * @LastEditTime: 2022-01-17 14:39:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\api\kpiChart\index.js
 */
import axios from '@/utils/axios'
import axiosDownLoad from '@/utils/axios.download'
const requst = axios(process.env.VUE_APP_SUPPLIER + '/web')
const requstDownLoad = axiosDownLoad(process.env.VUE_APP_SUPPLIER + '/web')
const chrequst = axios(process.env.VUE_APP_AON)
const requestSpi = axios(process.env.VUE_APP_SUPPLIER + '/web')
const requstDIC = axios(process.env.VUE_APP_BASE_INFO)

export function kpiDetail(params) {
  return requst({
    url: '/kpi/totalScore/template/detail',
    method: 'GET',
    params: params
  })
}

export function slelectkpiList(params) {
  return requst({
    url: '/kpi/template/list',
    method: 'GET',
    params: params
  })
}

// kpi 下载
export function dowbloadAPI(data) {
  return requstDownLoad({
    url: '/kpi/template/download',
    method: 'POST',
    responseType: 'blob',
    data: data
  })
}

// 概览api
export function getPowerBiKpi() {
  return chrequst({
    url: '/web/aon/batchOverview/getSpiPbi',
    method: 'GET'
  })
}

// 查询供应商api
export function getPowerBiSupplier(data) {
  return requst({
    url: '/supplierInfo/queryByParam',
    method: 'POST',
    data: data
  })
}

// 查询材料组
export function getMaterialGroupByUserIds(data) {
  return chrequst({
    url: '/web/aon/costStructure/getMaterialGroupByUserIds',
    method: 'POST',
    data: data
  })
}

// 获取折线图

export function getLine(data) {
  return requst({
    url: '/spi/spiTotalScore/getSpiIndexDistribute',
    method: 'POST',
    data: data
  })
}
// 获取供应商列表
export function spiTotalScore(data) {
  return requst({
    url: '/spi/spiTotalScore/info',
    method: 'POST',
    data: data
  })
}

// 科股
export function getRelationship(data) {
  return requst({
    url: '/shareRelationship/getRelationship',
    method: 'POST',
    data: data
  })
}
// 工艺组
export function getStuffByCategory(data) {
  return requst({
    url: '/spi/spiTotalScore/getStuffByCategory',
    method: 'POST',
    data: data
  })
}

// 折叠表头页面
export function getTableData(data) {
  return requst({
    url: '/kpi/totalScore/list',
    method: 'GET',
    params: data
  })
}
// 折叠列表——获取材料组
export function getCategoryData(data) {
  return requst({
    url: '/kpi/totalScore/template/category',
    method: 'GET',
    params: data
  })
}
// 折叠列表——获取部门
export function getDeptData(data) {
  return requst({
    url: '/kpi/totalScore/template/dept',
    method: 'GET',
    params: data
  })
}

// 查询模板kpi
export function templateDetail(params) {
  return requst({
    url: '/kpi/template/detail',
    method: 'GET',
    params: params
  })
}
// 保存模板
export function saveTemplateDetail(data) {
  return requst({
    url: '/kpi/template',
    method: 'POST',
    data: data
  })
}

// 删除模板
export function deleteTemplate(data) {
  return requst({
    url: '/kpi/template/remove',
    method: 'POST',
    data: data
  })
}

// 下载模板
export function downloadTemplate(data) {
  return requst({
    url: '/kpi/template/download',
    method: 'POST',
    responseType: 'blob',
    data: data
  })
}

// 上传模板
export function uploadTemplate(data) {
  return requst({
    url: '/kpi/template/upload',
    method: 'POST',
    data: data
  })
}

// 获取TO量级
export function getTO(data) {
  return requst({
    url: '/supplierToData/yearByAmount',
    method: 'POST',
    data: data
  })
}

export function getFocusSupplierList(params) {
  return requestSpi({
    url: '/spiReport/getFocusSupplierList',
    method: 'post',
    data: params
  })
}

export function getReason(params) {
  return requestSpi({
    url: '/spiReport/getReason',
    method: 'get',
    params: params
  })
}

export function getReportDetail(params) {
  return requestSpi({
    url: '/spiReport/getReportDetail',
    method: 'POST',
    data: params
  })
}

export function getInfo(params) {
  return requestSpi({
    url: '/spiReport/info',
    method: 'get',
    params: params
  })
}

//城市信息查询
export function getCityInfo(params) {
  return requstDIC({
    url: `/web/cityInfo`,
    method: 'GET',
    params
  })
}
