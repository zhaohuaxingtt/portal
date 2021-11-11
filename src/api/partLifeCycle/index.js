/*
 * @Author: YZ
 * @Date: 2021-10-08
 */
import axios from '@/utils/axios'
import axiosFile from '@/utils/axios.download'

const VUE_APP_PARTSRECORD = axios(process.env.VUE_APP_PARTLIFECYCLEAPI + '/web/parts/record')
const VUE_APP_PARTSPROCESS = axios(process.env.VUE_APP_PARTLIFECYCLEAPI + '/web/partsProcess')
const requst = axios(process.env.VUE_APP_RISEDASHBOARD)
const VUE_APP_PARTSRECORDFile = axiosFile(process.env.VUE_APP_PARTLIFECYCLEAPI + '/web/parts/record')
const VUE_APP_PARTSPROCESSFile = axiosFile(process.env.VUE_APP_PARTLIFECYCLEAPI + '/web/partsProcess')
const VUE_APP_BASE_WS2_CHANGEPRICE_API = axiosFile(process.env.VUE_APP_PARTLIFECYCLEAPI)

// 更具合同号获取订单id
export function getLatestOrderId(params) {
  return VUE_APP_BASE_WS2_CHANGEPRICE_API({
    url: `/scheduleAgreement/getLatestOrderOrAgreementId?contractCode=${params.contractCode}&contractSapCode=${params.contractSapCode || ''}`,
    method: 'POST',
    params
  })
}

// 获取工厂下拉数据
export function getDeptComBoxByPartsNum(params) {
  return VUE_APP_PARTSRECORD({
    url: '/getDeptComBoxByPartsNum',
    method: 'GET',
    params
  })
}

// 根据零件号获取展示节点
export function getPartsRecordNodes(params) {
  return VUE_APP_PARTSRECORD({
    url: '/getPartsRecordNodes',
    method: 'GET',
    params
  })
}

// 根据ID和类型查询零件履历
export function getRecordDetail(params) {
  return VUE_APP_PARTSRECORD({
    url: '/getRecordDetail',
    method: 'GET',
    params
  })
}

// 零件进程主轴
export function partsAxle(data) {
  return VUE_APP_PARTSPROCESS({
    url: '/partsAxle',
    method: 'POST',
    data
  })
}

// 获取价格轴
export function getAmountAxle(data) {
  return VUE_APP_PARTSPROCESS({
    url: '/getAmountAxle',
    method: 'POST',
    data
  })
}

// 一对多详情页
export function getOneToMany({ nodePartsNum, caseType, data }) {
  return VUE_APP_PARTSPROCESS({
    url: `/getOneToMany/${nodePartsNum}/${caseType}`,
    method: 'POST',
    data
  })
}

// 多对多详情页
export function getMany({ nodePartsNum, caseType, data }) {
  return VUE_APP_PARTSPROCESS({
    url: `/getMany/${nodePartsNum}/${caseType}`,
    method: 'POST',
    data
  })
}

//  饼状图
export function findPartsFactory(params) {
  return requst({
    url: '/web/partsFactory/findPartsFactory',
    method: 'GET',
    params: params
  })
}

//  获取年份列表
export function getYearPullDown(params) {
  return requst({
    url: '/web/partsFactory/getYearPullDown',
    method: 'GET',
    params: params
  })
}

//  供应商份额柱状图
export function findSupplyList(params) {
  return requst({
    url: '/web/partsSupply/findSupplyList',
    method: 'GET',
    params: params
  })
}

//  获取零件基本信息
export function findPartsInfo(params) {
  return requst({
    url: '/web/partsInfo/findPartsInfo',
    method: 'GET',
    params: params
  })
}


//  导出零件履历
export function exportFile(params) {
  return VUE_APP_PARTSRECORDFile({
    url: '/export',
    method: 'GET',
    params: params
  })
}

//  导出演变进程
export function exportFile2(data) {
  return VUE_APP_PARTSPROCESSFile({
    url: '/export',
    method: 'POST',
    data: data
  })
}

