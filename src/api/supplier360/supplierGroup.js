import axios from '@/utils/axios'
import axiosDownload from '@/utils/axios.download';

const requst = axios(process.env.VUE_APP_SUPPLIER + '/web')
const dowload = axiosDownload(process.env.VUE_APP_SUPPLIER + '/web');

// 供应商组标签设置
export function saveGroupLabel(data) {
  return requst({
    url: '/supplierGroup/saveGroupLabel',
    method: 'POST',
    data
  })
}

// 供应商组标签下拉
export function queryGroupLabelDown(data) {
  return requst({
    url: '/supplierGroup/queryGroupLabelDown',
    method: 'POST',
    data
  })
}

// 供应商组标签列表
export function queryGroupTagList() {
  return requst({
    url: '/supplierGroup/tagList',
    method: 'POST',
  })
}

// 供应商英文列表查询
export function querySupplierEnList(data) {
  return requst({
    url: '/supplierGroup/querySupplierEnList',
    method: 'POST',
    data
  })
}

// 供应商中文列表查询
export function querySupplierZhList(data) {
  return requst({
    url: '/supplierGroup/querySupplierZhList',
    method: 'POST',
    data
  })
}

// 供应商组查询接口
export function findGroupByPage(data) {
  return requst({
    url: '/supplierGroup/findGroupByPage',
    method: 'POST',
    data
  })
}

// 供应商组删除接口
export function deleteGroup(data) {
  return requst({
    url: '/supplierGroup/deleteGroup',
    method: 'POST',
    data
  })
}

// 供应商组删除供应商接口
export function deleteSupplier(data) {
  return requst({
    url: '/supplierGroup/deleteSupplier',
    method: 'POST',
    data
  })
}

// 供应商组保存接口
export function saveGroup(data) {
  return requst({
    url: '/supplierGroup/saveGroup',
    method: 'POST',
    data
  })
}

// 供应商Check接口:Check供应商是否出现在其他供应商组中
export function checkGroup(data) {
  return requst({
    url: '/supplierGroup/checkGroup',
    method: 'POST',
    data
  })
}

// 供应商组中文列表查询
export function queryGroupZhList(data) {
  return requst({
    url: '/supplierGroup/queryGroupZhList',
    method: 'POST',
    data
  })
}

// 供应商组英文列表查询
export function queryGroupEnList(data) {
  return requst({
    url: '/supplierGroup/queryGroupEnList',
    method: 'POST',
    data
  })
}

// 供应商导出接口
export function groupExport(params) {
  return dowload({
    url: '/supplierGroup/groupExport',
    method: 'POST',
    data: params
  })
}

// 科室下拉
export function queryDeptList(params) {
  return requst({
    url: '/supplierGroup/queryDeptList',
    method: 'POST',
    data: params
  })
}

//添加供应商-供应商分页列表
export function supplierPage(data) {
  return requst({
    url: `/supplierGroup/supplierPage`,
    method: 'POST',
    data
  })
}

// 供应商组详情
export function groupDetail(data) {
  return requst({
    url: `/supplierGroup/groupDetail`,
    method: 'POST',
    data
  })
}
