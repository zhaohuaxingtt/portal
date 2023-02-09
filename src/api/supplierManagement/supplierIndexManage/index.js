// 获取指标信息数据
import axios from '@/utils/axios'
import axiosDownload from '@/utils/axios.download'

const requst = axios(process.env.VUE_APP_SUPPLIER + '/web')
const requestDownload = axiosDownload(process.env.VUE_APP_SUPPLIER+ '/web')

export function getIndicator(id) {
  return requst({
    url: '/indicatorLibrary/getIndicator/?indicatorId=' + id,
    method: 'GET',
  })
}
// 获取指标集合
export function getIndicatorList() {
  return requst({
    url: '/indicatorLibrary/getIndicatorList',
    method: 'GET',
  })
}
// 添加手工指标
export function addIndicator(parmars) {
  return requst({
    url: '/indicatorLibrary/addIndicator',
    method: 'POST',
    data: parmars
  })
}
// 删除手工指标
export function delIndicator(parmars) {
  return requst({
    url: '/indicatorLibrary/delIndicator',
    method: 'POST',
    data: parmars
  })
}
// 修改手工指标
export function updateIndicator(parmars) {
  return requst({
    url: '/indicatorLibrary/updateIndicator',
    method: 'POST',
    data: parmars
  })
}
// 根据模板id获取指标树
export function getModelTree(id) {
  return requst({
    url: '/performanceModel/getModelTree?modelId=' + id,
    method: 'GET',
  })
}
// 添加模型指标
export function addModelTree(parmars) {
  return requst({
    url: '/performanceModel/addModelTree',
    method: 'POST',
    data: parmars
  })
}
// 查询模型列表下拉
export function modelList(status) {
  return requst({
    url: '/performanceModel/modelList?status=' + status,
    method: 'GET',
  })
}
// 绩效版本列表
export function getSupplierPerforManceModelPage(parmars) {
  return requst({
    url: '/supplierPerformanceTask/getSupplierPerforManceModelPage',
    method: 'POST',
    data: parmars
  })
}
// 上传绩效打分指南
export function uploadPerformanceModelFile(parmars) {
  return requst({
    url: '/supplierPerformanceTask/uploadPerformanceModelFile',
    method: 'POST',
    data: parmars
  })
}
// 创建绩效版本模型
export function addSupplierPerforManceModel(parmars) {
  return requst({
    url: '/supplierPerformanceTask/addSupplierPerforManceModel',
    method: 'POST',
    data: parmars
  })
}
// 创建供应商和模型关系
export function addSupplierPerforManceModelRelation(parmars) {
  return requst({
    url: '/supplierPerformanceTask/addSupplierPerforManceModelRelation',
    method: 'POST',
    data: parmars
  })
} 
// 绩效版本供应商模板下载
export function getTemplate(parmars) {
  return requestDownload({
    url: '/supplierPerformanceTask/getTemplate',
    method: 'GET',
  })
} 
// 创建供应商和模型关系
export function supplierImport(parmars) {
  return requst({
    url: '/supplierPerformanceTask/import',
    method: 'POST',
    data: parmars
  })
} // 删除绩效版本
export function delEditionTask(id) {
  return requst({
    url: '/supplierPerformanceTask/delEditionTask?id='+id,
    method: 'GET',
  })
}
// 获取供应商绩效版本信息
export function getPerformanceEdition(parmars) {
  return requst({
    url: '/supplierPerformanceTask/getPerformanceEdition',
    method: 'POST',
    data: parmars
  })
}