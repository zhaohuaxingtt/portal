/*
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-09-07 11:00:53
 * @LastEditors: Please set LastEditors
 * @Descripttion: your project
 */

import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_NTIER + '/web/ntier')
const requstPart = axios(process.env.VUE_APP_MATERIEL)
import download from '@/utils/axios.download'
const requstDownload = download(process.env.VUE_APP_NTIER + '/web/ntier')
// 查询-通过突发事件分页查询直接影响的供应商详情
export function supplierListByEvent(parmars) {
  return requst({
    url: '/eventInformation/supplierListByEvent',
    method: 'POST',
    data: parmars
  })
}
// 查询-查询最近的一个突发事件详情
export function getCurrentEvent(parmars) {
  return requst({
    url: '/eventInformation/getCurrentEvent',
    method: 'POST',
    data: parmars
  })
}
// 查询-查询最近的一个突发事件详情
export function eventInformation(parmars) {
  return requst({
    url: '/eventInformation',
    method: 'POST',
    data: parmars
  })
}
// 查询-根据事件id查询事件详情
export function queryEventDetail(parmars) {
  return requst({
    url: `/eventInformation/queryEventDetail/${parmars}`,
    method: 'GET',
    data: parmars
  })
}
// 查询-任务
export function taskInfoEntity(parmars) {
  return requst({
    url: `/taskInfoEntity/page`,
    method: 'POST',
    data: parmars
  })
}
// 查询-新增或編輯突发事件
export function saveOrEdit(parmars) {
  return requst({
    url: `/eventInformation/saveOrEdit`,
    method: 'POST',
    data: parmars
  })
}
// 查询-获取任务状态
export function getProcessStatusEnum(parmars) {
  return requst({
    url: `/taskInfoEntity/getProcessStatusEnum`,
    method: 'GET',
    data: parmars
  })
}
// 查询-反馈表
export function saveFeedbackInfo(parmars) {
  return requst({
    url: `/eventInformation/saveFeedbackInfo`,
    method: 'POST',
    data: parmars
  })
}
export function queryWarningLetter(parmars) {
  return requst({
    url: `/eventInformation/queryWarningLetter/${parmars}`,
    method: 'GET'
  })
}
export function getFeedBackInfoById(data) {
  return requst({
    url: `/eventInformation/getFeedBackInfoById/${data}`,
    method: 'GET'
  })
}
// 导出当页
export function exportCurrent(parmars) {
  return requstDownload({
    url: `/eventInformation/exportCurrent`,
    method: 'POST',
    data: parmars
  })
}
// 检验导出反馈表数据
export function checkExportFeedback(parmars) {
  return requst({
    url: `/eventInformation/checkExportFeedback`,
    method: 'POST',
    data: parmars
  })
}
// 导出反馈表
export function exportFeedback(parmars) {
  return requstDownload({
    url: `/eventInformation/exportFeedback`,
    method: 'POST',
    data: parmars
  })
}
// 发送反馈表
export function sendFeedback(parmars) {
  return requst({
    url: `/eventInformation/sendFeedback`,
    method: 'POST',
    data: parmars
  })
}
// 上传预警信
export function uploadAnnex(parmars) {
  return requst({
    url: `/eventInformation/uploadAnnex`,
    method: 'POST',
    data: parmars
  })
}
// 检验导出报警信数据
export function checkExportWarningLetter(parmars) {
  return requst({
    url: `/eventInformation/checkExportWarningLetter`,
    method: 'POST',
    data: parmars
  })
}
// 导出报警信
export function exportWarningLetter(parmars) {
  return requstDownload({
    url: `/eventInformation/exportWarningLetter`,
    method: 'POST',
    data: parmars
  })
}
// 暂存
export function doCache(parmars) {
  return requst({
    url: `/eventInformation/doCache`,
    method: 'POST',
    data: parmars
  })
}
// 获取暂存
export function getCache(parmars) {
  return requst({
    url: `/eventInformation/getCache`,
    method: 'POST',
    data: parmars
  })
}

//根据查询条件查询车型数据列表
export function cartypeDict(parmars) {
  return requstPart({
    url: `/api/cartypeDict`,
    method: 'GET',
    data: parmars
  })
}
//根据查询条件查询车型数据列表
export function queryUpOrDownStream(parmars) {
  return requst({
    url: `/ntierChain/queryUpOrDownStream`,
    method: 'POST',
    data: parmars
  })
}
//根据查询条件查询车型数据列表
export function selectProcureFactory(parmars) {
  return requst({
    url: `/ntierEventImpactFeedback/selectProcureFactory`,
    method: 'GET',
    data: parmars
  })
}
// 查询-根据id获取反馈表预警信的初始信息
export function getImpactFeedback(parmars) {
  return requst({
    url: `/eventInformation/getImpactFeedback/${parmars}`,
    method: 'GET',
    data: parmars
  })
}
// PowerBi
export function getLoosePartsPbi(parmars) {
  return requst({
    url: `/pbiReport/getLoosePartsPbi`,
    method: 'GET',
    data: parmars
  })
}
// PowerBi
export function getSupplierPartInfo(parmars) {
  return requst({
    url: `/eventInformation/getSupplierPartInfo/${parmars.eventId}/${parmars.id}`,
    method: 'POST'
  })
}
