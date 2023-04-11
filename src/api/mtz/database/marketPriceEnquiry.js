/*
 * @Author: your name
 * @Date: 2021-09-17 13:56:41
 * @LastEditTime: 2023-03-14 15:11:50
 * @LastEditors: YoHo && 917955345@qq.com
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\api\mtz\database\marketPriceEnquiry.js
 */

import axios from '@/utils/axios'
import axiosDownload from '@/utils/axios.download'

const request = axios(process.env.VUE_APP_MTZ + '/web/mtz')
const requestDownload = axiosDownload(process.env.VUE_APP_MTZ + '/web/mtz')

//获取MTZ市场价类别下拉框
export function getMtzMarketTypeList() {
  return request({
    url: '/common/getMtzMarketTypeList',
    method: 'GET'
  })
}

//MTZ市场价格查询-市场价图 不含原材料牌号
export function mtzPriceQuery(data) {
  return request({
    url: '/mtzMarketPrice/mtzPriceQuery',
    method: 'POST',
    data: data
  })
}

//MTZ市场价格查询-市场价图 含原材料牌号
export function marketPriceChart(data) {
  return request({
    url: '/mtzMarketPrice/marketPriceChart',
    method: 'POST',
    data: data
  })
}

// 获取MTZ中类下拉框
export function getMtzCategory(data) {
  return request({
    url: '/common/getMtzCategory',
    method: 'GET',
    params: data
  })
}

// 分页查询MTZ市场价
export function getMtzPage(data) {
  return request({
    url: '/mtzMarketPrice/page',
    method: 'POST',
    data: data
  })
}

// 市场价来源下拉
export function getMtzMarketSourceList() {
  return request({
    url: '/common/getMtzMarketSourceList',
    method: 'GET'
  })
}

// MTZ市场价表下载模板
export function downloadTemplate(data) {
  return requestDownload({
    url: '/mtzMarketPrice/downloadTemplate',
    method: 'POST',
    data: data
  })
}
// 上传MTZ市场价
export function uploadMtzPrice(data) {
  return request({
    url: '/mtzMarketPrice/uploadMtzPrice',
    method: 'POST',
    data: data
  })
}
// MTZ市场价导出
export function exportapi(data) {
  return requestDownload({
    url: '/mtzMarketPrice/export',
    method: 'POST',
    data: data
  })
}

// 原材料牌号
export function rawMaterialList(data) {
  return request({
    url: '/common/rawMaterialList',
    method: 'POST',
    data: data
  })
}

// 批量更新mtz市场价数据
export function updateBatch(data) {
  return request({
    url: '/mtzMarketPrice/updateBatch',
    method: 'POST',
    data: data
  })
}
