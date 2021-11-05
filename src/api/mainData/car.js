import axios from '@/utils/axios'
import axiosDownload from '@/utils/axios.download'
const request = axios(process.env.VUE_APP_MATERIEL)
const requestDownload = axiosDownload(process.env.VUE_APP_MATERIEL)

/***************************************************** 列表 **********************************************/
// 导出车型产量模板
export function exportCarPlanTemplate() {
  return requestDownload({
    url: '/web/downCarTypeOutTemplate',
    method: 'post'
  })
}
// 导出车型列表
export function exportCarList(data) {
  return requestDownload({
    url: '/web/exportCartypeVo',
    method: 'post',
    data
  })
}
// 上传车型产量计划
export function uploadCarPlan(data) {
  return request({
    url: `/web/importCartypeOutPlanByExcel`,
    method: 'POST',
    data
  })
}

//车型列表
export function fetchCarList(params) {
  return request({
    url: '/web/cartypePaged',
    clearEmptyParams: true,
    params
  })
}
// 批量设置失效
export function batchUpdate(data) {
  return request({
    url: '/web/batchUpdateCarTypeValid',
    method: 'post',
    data
  })
}

/************************************************************** 列表END ***************************************************/

/************************************************************* 车型基础详情 ***********************************************/
//车型查详情
export function fetchCarDetail(params) {
  return request({
    url: '/web/findSingleCarTypeByCondition',
    method: 'post',
    params
  })
}

/**
 * 保存车型基本数据
 */
export function saveCartype(data) {
  return request({
    url: '/web/saveCartype',
    method: 'post',
    data
  })
}

/**
 * 更新车型基本数据
 */
export function updateCarType(data) {
  return request({
    url: '/web/updateCarType',
    method: 'post',
    data
  })
}

/**
 * 所属品牌
 */
export function fetchBrandSelect(params) {
  return request({
    url: '/web/brandSelect',
    params
  })
}

/**
 * 计算车型
 */
export function fetchCalCarTypeConfig(params) {
  return request({
    url: '/web/calCarTypeConfig',
    params
  })
}

/**
 * 发动机类型
 */
export function fetchEngineSelectData(params) {
  return request({
    url: '/web/engineSelectData',
    params
  })
}

/**
 * 变速箱下拉查询数据接口
 */
export function fetchBoxSelectData(params) {
  return request({
    url: '/web/gearBoxSelectData',
    params
  })
}

/**
 * 电池下拉查询数据接口
 */
export function fetchBatterySelectData(params) {
  return request({
    url: '/web/batterySelectData',
    params
  })
}

/**
 * PID 下拉
 */
export function fetchProductfamilySelectData(params) {
  return request({
    url: '/web/productfamilySelect',
    params
  })
}

/**
 * 查询车型配置详情
 */
export function fetchCartypeConfigList(data) {
  return request({
    url: '/web/cartypeConfigList',
    method: 'post',
    data
  })
}

/**
 * 查询车型配置版本列表
 */
export function fetchCartypeConfigVersionList(params) {
  return request({
    url: '/web/cartypeConfigVersionList',
    params
  })
}

/**
 * 车型配置保存
 */

export function saveOrUpdCartypeConfig(data) {
  return request({
    url: '/web/saveOrUpdCartypeConfig',
    method: 'post',
    data
  })
}

/**
 * 车型配置应用年份
 */
export function updateCartypeCfgUseYear(data) {
  return request({
    url: 'web/updateCartypeCfgUseYear',
    method: 'post',
    data
  })
}

export function updateCartypeCfgValid(data) {
  return request({
    url: 'web/updateCartypeCfgValid',
    method: 'post',
    data
  })
}

export function fetchConfigUserYear(params) {
  return request({
    url: 'web/queryConfigUserYear',
    params
  })
}

/****************************************************** 车型产量计划 *******************************************************/

/**
 * 获取产量计划列表
 * */
export function fetchCartypeOutputPlanVersion(params) {
  return request({
    url: '/web/getCartypeOutputPlanVersion',
    params
  })
}

/**
 * 获取产量计划详情
 * */
export function fetchCartypeOutPutPlan(data) {
  return request({
    url: '/web/queryCartypeOutPutPlan',
    method: 'post',
    data
  })
}
/**
 * 保存车型产量计划版本
 */
export function saveCartypeOutputPlanVersion(data) {
  return request({
    url: '/web/saveOrUpdCartypeOutPlanVersion',
    method: 'post',
    data
  })
}

/**
 * 根据生产工厂，车型项目 查询出对应的版本列表信息
 */
export function fetchRiseVersionList(params) {
  return request({
    url: '/web/queryRiseVersionList',
    params
  })
}
/**
 * 批量更新产量计划有效、备注
 */
export function updCartypeOutputPlanVersion(data) {
  return request({
    url: '/web/updCartypeOutputPlanVersion',
    method: 'post',
    data
  })
}
