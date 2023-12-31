// 获取指标信息数据
import axios from '@/utils/axios'
import axiosDownload from '@/utils/axios.download'

const requst = axios(process.env.VUE_APP_SUPPLIER + '/web')
const requestDownload = axiosDownload(process.env.VUE_APP_SUPPLIER+ '/web')
// 获取历史评分
export function getHistoryPbi(parmars) {
  return requst({
    url: '/supplierPerformanceKpi/getHistoryPbi',
    method: 'POST',
    data: parmars
  })
}
// 获取供应商kpi概念
export function getPerformanceKpiOverViewPbi(parmars) {
  return requst({
    url: '/supplierPerformanceKpi/getPerformanceKpiOverViewPbi',
    method: 'POST',
    data: parmars
  })
}
// 获取供应商kpi任务
export function getPerformanceKpiPbi(parmars) {
  return requst({
    url: '/supplierPerformanceKpi/getPerformanceKpiPbi',
    method: 'POST',
    data: parmars
  })
}
// 获取历史部门综合评分
export function getHistoryDeptSynthesisPbi(parmars) {
  return requst({
    url: '/supplierPerformanceKpi/getHistoryDeptSynthesisPbi',
    method: 'POST',
    data: parmars
  })
}
export function getIndicator(id) {
  return requst({
    url: '/indicatorLibrary/getIndicator/?indicatorId=' + id,
    method: 'GET',
  })
}
// 获取全部指标集合
export function getIndicatorAllList() {
  return requst({
    url: '/indicatorLibrary/getIndicatorAllList',
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
// 是否展示所有的节点
export function getAllModelTree(id) {
  return requst({
    url: '/performanceModel/getAllModelTree?modelId=' + id,
    method: 'GET',
  })
}
// 根据模板id获取指标树所有节点
export function getAllModelTreeData(id) {
  return requst({
    url: '/performanceModel/getAllModelTreeData?modelId=' + id,
    method: 'GET',
  })
}
// 是否展示所有的节点
export function getAllSupplierPerforManceScorePage(parmars) {
  return requst({
    url: '/supplierPerformanceScore/getAllSupplierPerforManceScorePage',
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
// 根据模板id获取指标树
export function getModelTreeTitle(id) {
  return requst({
    url: '/performanceModel/getModelTreeTitle?modelId=' + id,
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
// 延期绩效版本
export function delayEdition(parmars) {
  return requst({
    url: '/supplierPerformanceTask/delayEdition',
    method: 'POST',
    data: parmars
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
// 获取版本供应商
export function getSupplierPerforManceModelRelationPage(parmars) {
  return requst({
    url: '/supplierPerformanceTask/getSupplierPerforManceModelRelationPage',
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
    url: '/supplierPerformanceTask/getPerformanceEdition?id='+parmars,
    method: 'GET',
  })
}
// 获取供应商绩效版本信息
export function sendPerformanceTask(id) {
  return requst({
    url: '/supplierPerformanceTask/sendPerformanceTask?id='+id,
    method: 'GET',
  })
}
// 供应商评分列表
export function getSupplierPerforManceScorePage(parmars) {
  return requst({
    url: '/supplierPerformanceScore/getSupplierPerforManceScorePage',
    method: 'POST',
    data: parmars

  })
}
// 供应商评分列表
export function getSupplierPerforManceTaskList(parmars) {
  return requst({
    url: '/supplierPerformanceTask/getSupplierPerforManceTaskList',
    method: 'POST',
    data: parmars

  })
}
//  修改绩效版本模型
export function updateSupplierPerforManceModel(parmars) {
  return requst({
    url: '/supplierPerformanceTask/updateSupplierPerforManceModel',
    method: 'POST',
    data: parmars

  }) 
}
//  提交打分任务
export function submitPerformanceTask(parmars) {
  return requst({
    url: '/supplierPerformanceScore/submitPerformanceTask',
    method: 'POST',
    data: parmars

  }) 
}
//  导出明细excel
export function exportSupplierPerforManceScoreExcel(parmars) {
  return requestDownload({
    url: '/supplierPerformanceScore/exportSupplierPerforManceScoreExcel',
    method: 'POST',
    data: parmars

  })
}
//  导出手工指标excel
export function exportManualSupplierPerforManceScoreExcel(parmars) {
  return requestDownload({
    url: '/supplierPerformanceScore/exportManualSupplierPerforManceScoreExcel',
    method: 'POST',
    data: parmars

  })
}
//  导出手工指标excel2
export function exportL2SupplierPerforManceScoreExcel(parmars) {
  return requestDownload({
    url: '/supplierPerformanceScore/exportL2SupplierPerforManceScoreExcel',
    method: 'POST',
    data: parmars

  })
}
//  导入手工指标excel2
export function saveSystemPerformance(parmars) {
  return requst({
    url: '/supplierPerformanceScore/saveSystemPerformance',
    method: 'POST',
    data: parmars

  })
}
//  导入手工指标excel
export function saveManualPerformance(parmars) {
  return requst({
    url: '/supplierPerformanceScore/saveManualPerformance',
    method: 'POST',
    data: parmars

  })
}
//  导chu绩效打分excel
export function exportSupplierPerforManceAllScoreExcel(parmars) {
  return requestDownload({
    url: '/supplierPerformanceScore/exportSupplierPerforManceAllScoreExcel',
    method: 'POST',
    data: parmars
  })
}
//  查看进度
export function getSupplierPerforManceProcess(parmars) {
  return requst({
    url: '/supplierPerformanceTask/getSupplierPerforManceProcess',
    method: 'POST',
    data: parmars

  })
}
//  R2科室
export function getIndicatorR2Dept(parmars) {
  return requst({
    url: '/indicatorLibrary/getIndicatorR2AndR1Dept',
    method: 'GET',
  })
}