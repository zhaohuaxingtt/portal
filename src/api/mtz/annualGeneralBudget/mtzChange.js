/*
 * @Author: your name
 * @Date: 2021-10-26 10:13:30
 * @LastEditTime: 2021-11-09 11:04:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\api\mtz\annualGeneralBudget\MTZchange.js
 */
import axios from '@/utils/axios'
import download from '@/utils/axios.download'
import store from '@/store'
const request = axios(process.env.VUE_APP_MTZ + '/web/mtz')
const requestDown = download(process.env.VUE_APP_MTZ + '/web/mtz')

// mtz变更(分页查询)
export function pageList(params) {
  return request({
    url: '/mtzBasePriceChange/pageList',
    method: 'POST',
    data: params
  })
}
//申请状态下拉
export function getLocationApplyStatus(params) {
  return request({
    url: '/mtzNomiList/getLocationApplyStatus',
    method: 'POST',
    data: params
  })
}
//新建mtz变更列表查询
export function mtzBasePricePageList(params) {
  return request({
    url: '/mtzBasePriceChange/mtzBasePricePageList',
    method: 'POST',
    data: params
  })
}
// MTZ变更申请-原材料基价-下拉筛选-科室
export function mtzBasePricePageFilterDept(params) {
  return request({
    url: '/mtzBasePriceChange/mtzBasePricePageFilterDept',
    method: 'POST',
    data: params
  })
}
// MTZ变更申请-原材料基价-下拉筛选-原材料牌号
export function mtzBasePricePageFilterMaterial(params) {
  return request({
    url: '/mtzBasePriceChange/mtzBasePricePageFilterMaterial',
    method: 'POST',
    data: params
  })
}
// MTZ变更申请-原材料基价-下拉筛选-零件名
export function mtzBasePricePageFilterPartName(params) {
  return request({
    url: '/mtzBasePriceChange/mtzBasePricePageFilterPartName',
    method: 'POST',
    data: params
  })
}
//  MTZ变更申请-原材料基价-下拉筛选-补差周期
export function mtzBasePricePageFilterPeriod(params) {
  return request({
    url: '/mtzBasePriceChange/mtzBasePricePageFilterPeriod',
    method: 'POST',
    data: params
  })
}
//  MTZ变更申请-原材料基价-下拉筛选-规则编号
export function mtzBasePricePageFilterRule(params) {
  return request({
    url: '/mtzBasePriceChange/mtzBasePricePageFilterRule',
    method: 'POST',
    data: params
  })
}
//  MTZ变更申请-原材料基价-下拉筛选-市场价来源
export function mtzBasePricePageFilterSource(params) {
  return request({
    url: '/mtzBasePriceChange/mtzBasePricePageFilterSource',
    method: 'POST',
    data: params
  })
}
//  MTZ变更申请-原材料基价-下拉筛选-供应商名称
export function mtzBasePricePageFilterSupplierName(params) {
  return request({
    url: '/mtzBasePriceChange/mtzBasePricePageFilterSupplierName',
    method: 'POST',
    data: params
  })
}
//   MTZ变更申请-原材料基价-下拉筛选-供应商sap
export function mtzBasePricePageFilterSupplierSap(params) {
  return request({
    url: '/mtzBasePriceChange/mtzBasePricePageFilterSupplierSap',
    method: 'POST',
    data: params
  })
}
//  MTZ变更申请-原材料基价-下拉筛选-采购员
export function mtzBasePricePageFilterUser(params) {
  return request({
    url: '/mtzBasePriceChange/mtzBasePricePageFilterUser',
    method: 'POST',
    data: params
  })
}
//  MTZ变更申请-保存
export function saveGenericAppChange(params) {
  return request({
    url: '/mtzBasePriceChange/saveGenericAppChange',
    method: 'POST',
    data: params
  })
}
//  审批附件列表
export function attachList(params) {
  return request({
    url: '/mtzBasePriceChange/attachList',
    method: 'POST',
    data: params
  })
}
//  维护零件原材料⽤量 (分页查询)
export function basePriceChangePageList(params) {
  return request({
    url: '/mtzBasePriceChange/basePriceChangePageList',
    method: 'POST',
    data: params
  })
}
//   MTZ变更申请-新增
export function addGenericAppChange(params) {
  return request({
    url: '/mtzBasePriceChange/addGenericAppChange',
    method: 'POST',
    data: params
  })
}
//   上传附件
// export function uploadAttach(params) {
//   return request({
//     url: '/mtzBasePriceChange/uploadAttach',
//     method: 'POST',
//     data: params
//   })
// }
export function uploadAttach(params) {
  const formData = new FormData()
  formData.append('mtzAppId', params.mtzAppId || 'rise') // 桶名，默认固定rise
  formData.append('userId', store.state.permission.userInfo.id) // 业务id，默认固定8025
  formData.append('userName', store.state.permission.userInfo.userName) // 用户id
  formData.append('file ', params.multifile || []) // 文件
  return request({
    url: `/mtzBasePriceChange/uploadAttach`,
    method: 'POST',
    data: formData
  }).then(res => {
    if (Array.isArray(res) || res.length > 0) {
      return {
        code: 200,
        data: res,
        desEn: 'success',
        desZh: '操作成功'
      }
    } else {
      return {
        code: 400,
        data: null,
        desEn: 'error',
        desZh: '操作失败'
      }
    }
  })
}
//   删除附件(软删除)
export function deleteAttach(params) {
  return request({
    url: '/mtzBasePriceChange/deleteAttach',
    method: 'POST',
    data: params
  })
}
//   维护零件原材料⽤量下载模板
export function priceChangeExport(params) {
  return requestDown({
    url: '/mtzBasePriceChange/priceChangeExport',
    method: 'POST',
    data: params
  })
}
//   维护零件原材料⽤量删除
export function basePriceChangeDelete(params) {
  return request({
    url: '/mtzBasePriceChange/basePriceChangeDelete',
    method: 'POST',
    data: params
  })
}
//   维护零件原材料⽤量-编辑
export function updateBasePriceChange(params) {
  return request({
    url: '/mtzBasePriceChange/updateBasePriceChange',
    method: 'POST',
    data: params
  })
}
//   上传维护零件原材料⽤量
export function uploadBasePriceChange(params) {
  const formData = new FormData()
  formData.append('mtzAppId', params.mtzAppId || 'rise') // 桶名，默认固定rise
  formData.append('userId', store.state.permission.userInfo.id) // 业务id，默认固定8025
  formData.append('file', params.multifile || []) // 文件
  return request({
    url: `/mtzBasePriceChange/uploadBasePriceChange`,
    method: 'POST',
    data: formData
  }).then(res => {
    if (Array.isArray(res) || res.length > 0) {
      return {
        code: 200,
        data: res,
        desEn: 'success',
        desZh: '操作成功'
      }
    } else {
      return {
        code: 400,
        data: null,
        desEn: 'error',
        desZh: '操作失败'
      }
    }
  })
}
//    MTZ变更单详情
export function genericAppChangeDetail(params) {
  return request({
    url: '/mtzBasePriceChange/genericAppChangeDetail',
    method: 'POST',
    data: params
  })
}

//mtz申请单 - 删除(草稿才可以删除)
export function mtzDel(params) {
  return request({
    url: '/mtzBasePriceChange/mtzDel',
    method: 'POST',
    data: params
  })
}
//mtz申请单 - 撤回(已审批才可以撤回
export function mtzRecall(params) {
  return request({
    url: '/mtzBasePriceChange/mtzRecall',
    method: 'POST',
    data: params
  })
}
