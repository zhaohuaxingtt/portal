import axios from '@/utils/axios'
import axiosDownload from '@/utils/axios.download'

const request = axios(process.env.VUE_APP_MTZ + '/web/mtz')
const keshi = axios(process.env.VUE_APP_SUPPLIER + '/web')
const requetDownload = axiosDownload(process.env.VUE_APP_SUPPLIER + '/web')
const requestDownload = axiosDownload(process.env.VUE_APP_MTZ + '/web/mtz')

//获取MTZ市场价类别下拉框
export function mtzBasePricePage(data) {
  return request({
    url: '/mtzBasePrice/page',
    method: 'POST',
    data: data
  })
}

// 科室字典项
export function getDeptData(data) {
  return keshi({
    url: '/web/kpi/totalScore/template/dept',
    method: 'GET',
    params: data
  })
}
// 新科室字典项
export function queryDeptSectionForRule(data) {
  return request({
    url: '/forecastOther/queryDeptSectionForRule',
    method: 'POST',
    data: data
  })
}
// 新科室字典项
export function queryDeptSectionForPart(data) {
  return request({
    url: 'forecastOther/queryDeptSectionForPart',
    method: 'POST',
    data: data
  })
}

// 零件导入模板下载
export function partTemplateUrl(data) {
  return request({
    url: '/bomInfo/partTemplateUrl',
    method: 'GET',
    params: data
  })
}

// 零件导入模板下载
export function feignDownload(data) {
  return requetDownload({
    url: '/supplier/localFile/webDownload?fileId=' + data,
    method: 'GET'
    // params: data
  })
}

// 导出基础数据
export function exportBaseData(data) {
  return requestDownload({
    url: '/mtzBasePrice/export',
    method: 'POST',
    data: data
  })
}
// 一二次零件号导出
export function historyExport(data) {
  return requestDownload({
    url: '/mtzBasePrice/historyExport',
    method: 'POST',
    data: data
  })
}
// 市场价来源
export function getMtzMarketSourceList(data) {
  return request({
    url: '/common/getMtzMarketSourceList',
    method: 'GET',
    params: data
  })
}

// 是否生效
export function mtzBasePriceEdit(data) {
  return request({
    url: '/mtzBasePrice/edit',
    method: 'POST',
    data: data
  })
}

// 分页查询一二次零件号
export function historyPage(data) {
  return request({
    url: '/mtzBasePrice/historyPage',
    method: 'POST',
    data: data
  })
}

// 一二次零件关系分页
export function bomRelPage(data) {
  return request({
    url: '/bomInfo/bomRelPage',
    method: 'POST',
    data: data
  })
}
//一二次零件关系生效
export function partDisable(data) {
  return request({
    url: '/bomInfo/partDisable',
    method: 'POST',
    data: data
  })
}

//一二次零件关系失效
export function partEnable(data) {
  return request({
    url: '/bomInfo/partEnable',
    method: 'POST',
    data: data
  })
}

// 规则查询
export function rulePage(data) {
  return request({
    url: '/ruleEntity/page',
    method: 'POST',
    data: data
  })
}
// 导出规则查询
export function exportRuleData(data) {
  return requestDownload({
    url: '/ruleEntity/export',
    method: 'POST',
    data: data
  })
}
//是否生效
export function ruleEntityEdit(data) {
  return request({
    url: '/ruleEntity/edit',
    method: 'POST',
    data: data
  })
}
//查看一二次零件关系
export function infoPage(data) {
  return request({
    url: '/bomInfo/infoPage',
    method: 'POST',
    data: data
  })
}
//查看一二次零件关系下载
export function infoExport(data) {
  return requestDownload({
    url: '/bomInfo/infoExport',
    method: 'POST',
    data: data
  })
}
//二次零件分页查询-根据一次件id查询
export function partPageByBomInfoId(data) {
  return request({
    url: '/bomPart/partPageByBomInfoId',
    method: 'POST',
    data: data
  })
}

//二次零件导出
export function partExportByBomInfoId(data) {
  return requestDownload({
    url: '/bomPart/partExportByBomInfoId',
    method: 'POST',
    data: data
  })
}

// 一二次上传
export function uploadPartExcel(data) {
  return request({
    url: '/bomInfo/uploadPartExcel',
    method: 'POST',
    data: data
  })
}
