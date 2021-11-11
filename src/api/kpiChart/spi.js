/*
 * @Author: youyuan
 * @Date: 2021-08-07 15:38:08
 * @LastEditTime: 2021-08-07 15:38:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\api\partsrfq\spi\index.js
 */
import axios from '@/utils/axios'
import axiosDownload from '@/utils/axios.download'
const requestUser = axios(process.env.VUE_APP_USER_CENTER)
const request = axios(process.env.VUE_APP_SUPPLIER + '/web')
const requestDownload = axiosDownload(process.env.VUE_APP_SUPPLIER)
//半年报回顾接口
export function getFocusSupplierList(params) {
  return request({
    url: '/spiReport/getFocusSupplierList',
    method: 'post',
    data: params
  })
}

export function getReason(params) {
  return request({
    url: '/spiReport/getReason',
    method: 'get',
    params: params
  })
}

export function getReportDetail(params) {
  return request({
    url: '/spiReport/getReportDetail',
    method: 'POST',
    data: params
  })
}

//编辑保存半年报详情
export function spiDetailSave(params) {
  return request({
    url: '/spiReport/detail/save',
    method: 'POST',
    data: params
  })
}
//半年报列表接口
export function focusSupplierPage(params) {
  return request({
    url: '/spiReport/focusSupplierPage',
    method: 'POST',
    data: params
  })
}
// 弹窗半年报详情记录
export function spiDetailList(params) {
  console.log(params)
  return request({
    url: '/spiReport/spiDetailList',
    method: 'get',
    params: params
  })
}
//页面半年报详情记录
export function spiDetailQuery(params) {
  return request({
    url: '/spiReport/detail/query',
    method: 'POST',
    data: params
  })
}

//跟进人接口
export function KeyTrackFollowUserList(params) {
  return request({
    url: '/keyTrackSupplier/keyTrackFollowUserList',
    method: 'get',
    params: params
  })
}
//加入原因
export function categoryList(params) {
  return request({
    url: '/keyTrackSupplier/categoryList',
    method: 'get',
    params: params
  })
}
//年度重点追踪列表
export function keyTrackPage(params) {
  return request({
    url: '/keyTrackSupplier/keyTrackPage',
    method: 'POST',
    data: params
  })
}
//重点追踪全部导出
export function keyTrackExport(params) {
  return requestDownload({
    url: '/keyTrackSupplier/keyTrackExport',
    method: 'POST',
    data: params
  })
}
//重点追踪记录分页接口
export function keyTrackSupplierList(params) {
  return request({
    url: '/keyTrackSupplier/keyTrackSupplierList',
    method: 'POST',
    data: params
  })
}
//重点追踪记录分页接口
export function keyTrackRecordPage(params) {
  return request({
    url: '/keyTrackSupplier/keyTrackRecordPage',
    method: 'POST',
    data: params
  })
}
//重点追踪记录详情跟进人接口
export function listSupplierKeyTrackFollowUser(params) {
  return request({
    url: '/keyTrackSupplier/listSupplierKeyTrackFollowUser',
    method: 'get',
    params: params
  })
}
//重点追踪记录全部导出
export function keyTrackRecordExport(params) {
  return requestDownload({
    url: '/keyTrackSupplier/keyTrackRecordExport',
    method: 'POST',
    data: params
  })
}
//提交举措信息
export function keyTrackSupplierSub(params) {
  return request({
    url: '/keyTrackSupplier/rel',
    method: 'POST',
    data: params
  })
}
//获取举措信息
export function getKeyTrackSupplier(params) {
  return request({
    url: '/keyTrackSupplier/rel',
    method: 'get',
    params: params
  })
}
//获取转派人
export function getTransferee(params) {
  return requestUser({
    url: 'web/sapUser/getListByParam',
    method: 'POST',
    data: params
  })
}
//任务转派
export function taskTransfer(params) {
  return request({
    url: '/spiReport/task/transfer',
    method: 'POST',
    data: params
  })
}
//任务列表分页查询
export function taskPage(params) {
  return request({
    url: '/spiReport/task/page',
    method: 'POST',
    data: params
  })
}

//获取供应商
export function getInfo(params) {
  return request({
    url: '/spiReport/info',
    method: 'get',
    params: params
  })
}
