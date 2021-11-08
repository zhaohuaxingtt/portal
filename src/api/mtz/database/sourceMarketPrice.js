/*
 * @Author: youyuan
 * @Date: 2021-10-26 11:02:33
 * @LastEditTime: 2021-10-27 15:23:24
 * @LastEditors: Please set LastEditors
 * @Description: 市场价来源
 * @FilePath: \front-portal\src\api\mtz\database\sourceMarketPrice.js
 */
import axios from '@/utils/axios'
import axiosDownload from '@/utils/axios.download'

const request = axios(process.env.VUE_APP_MTZ + '/web/mtz')
const requestDownload = axiosDownload(process.env.VUE_APP_MTZ + '/web/mtz')

// 获取市场价来源数据
export function fetchTableData(params) {
  return request({
    url: '/marketPriceSource/page',
    method: 'POST',
    data: params
  })
}
// 获取下拉框数据
export function fetchDropDownData(params) {
  return request({
    url: '/marketPriceSource/filter',
    method: 'POST',
    data: params
  })
}
// 手工同步数据
export function fetchManualSync(params) {
  return request({
    url: '/marketPriceSource/manualSync',
    method: 'POST',
    data: params
  })
}
// 上传
export function fetchUpload(params) {
  return request({
    url: '/marketPriceSource/uploadMtzPriceSource',
    method: 'POST',
    data: params
  })
}
// 导出
export function fetchExport(params) {
  return requestDownload({
    url: '/marketPriceSource/export',
    method: 'POST',
    data: params
  })
}
// 保存编辑
export function fetchEdit(params) {
  return request({
    url: '/marketPriceSource/updateBatch',
    method: 'POST',
    data: params
  })
}
// 获取取价规则数据
export function fetchPriceRule(params) {
  return request({
    url: '/marketPriceSource/getPriceRule',
    method: 'POST',
    data: params
  })
}
