import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_MTZ + '/web/mtz')

export function getDetailed(parmars) {
  //补差单明细分页查询
  return requst({
    url: '/mtzBalanceDetails/compdocDetailPage',
    method: 'POST',
    data: parmars
  })
}

export function compdocMetalDetailPage(parmars) {
  //补差单明细分页查询（贵金属）
  return requst({
    url: '/mtzBalanceDetails/compdocMetalDetailPage',
    method: 'POST',
    data: parmars
  })
}

export function getOnePartNo(parmars) {
  //一次性零件号
  return requst({
    url: '/common/getOnePartNo',
    method: 'POST',
    data: parmars
  })
}

export function getSecondPartNo(parmars) {
  //二次性零件号
  return requst({
    url: '/common/getSecondPartNo',
    method: 'POST',
    data: parmars
  })
}

export function getSecondSupplier(parmars) {
  //二次件供应商编号-名称
  return requst({
    url: '/common/getSecondSupplier',
    method: 'POST',
    data: parmars
  })
}

export function getRawMaterialNos(parmars) {
  //原材料编号-名称下拉选择
  return requst({
    url: '/common/getRawMaterialNos',
    method: 'POST',
    data: parmars
  })
}

export function getDifferenceInfor(parmars) {
  //根据ID获取补差明细基本信息
  return requst({
    url: '/mtzBalance/get/' + parmars,
    method: 'GET'
  })
}

export function mtzCompDetailOverviewExport(parmars) {
  //MTZ补差单号详情-导出-补差单汇总
  return requst({
    url: '/mtzBalanceDetails/mtzCompDetailOverviewExport',
    method: 'POST',
    responseType: 'blob',
    data: parmars
  })
}

export function mtzBalanceDetailsExport(parmars) {
  //MTZ补差单号详情-凭证导出
  return requst({
    url: '/mtzBalanceDetails/export',
    method: 'POST',
    responseType: 'blob',
    data: parmars
  })
}

export function compdocDetailExport(parmars) {
  //补差单明细凭证导出
  return requst({
    url: '/mtzBalanceDetails/compdocDetailExport',
    method: 'POST',
    responseType: 'blob',
    data: parmars
  })
}

export function compdocMetalDetailExport(parmars) {
  //补差单明细（贵金属）凭证导出
  return requst({
    url: '/mtzBalanceDetails/compdocMetalDetailExport',
    method: 'POST',
    responseType: 'blob',
    data: parmars
  })
}

export function getGroups(parmars) {
  //获取MTZ中类下拉框
  return requst({
    url: '/common/getMtzGroups',
    method: 'POST',
    data: parmars
  })
}

export function compdocMetalDetailSum(parmars) {
  //MTZ补差单号详情-补差单汇总
  return requst({
    url: '/mtzBalance/compdocMetalDetailSum',
    method: 'POST',
    data: parmars
  })
}

export function compdocMetalDetailSumItem(parmars) {
  //MTZ补差单号详情-补差单汇总
  return requst({
    url: '/mtzBalance/compdocMetalDetailSumItem',
    method: 'POST',
    data: parmars
  })
}

export function saveRemark(parmars) {
  //MTZ补差单号详情-保存备注
  return requst({
    url: '/mtzBalance/saveRemark',
    method: 'POST',
    data: parmars
  })
}

export function getSaNo(parmars) {
  //采购框架（采购凭证号）
  return requst({
    url: '/common/getSaNo',
    method: 'POST',
    data: parmars
  })
}

export function supplierConfirmation(parmars) {
  //代供应商确认
  return requst({
    url: '/mtzBalance/supplierConfirmation',
    method: 'POST',
    data: parmars
  })
}

export function getRejectReasonAndFile(parmars) {
  //根据ID获取拒绝理由和附件列表
  return requst({
    url: '/mtzBalance/getRejectReasonAndFile/' + parmars,
    method: 'GET'
  })
}

export function deleteRejectReasonAttach(parmars) {
  //删除附件(软删除)
  return requst({
    url: '/mtzBalance/deleteRejectReasonAttach',
    method: 'POST',
    data: parmars
  })
}

export function saveRejectReason(parmars) {
  //保存拒绝理由
  return requst({
    url: '/mtzBalance/saveRejectReason',
    method: 'POST',
    data: parmars
  })
}
