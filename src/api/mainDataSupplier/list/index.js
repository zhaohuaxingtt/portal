import axios from '@/utils/axios'
import axiosDownload from '@/utils/axios.download'

const request = axios(process.env.VUE_APP_SUPPLIER + '/web')
const requestDownload = axiosDownload(process.env.VUE_APP_SUPPLIER + '/web')
// 获取分散供应商列表
export function fetchSuppliersGP(data) {
  return request({
    url: '/gpsupplier/list/page',
    method: 'POST',
    data
  })
}

// 获取分散供应商标签下拉
export function dropDownTagName(data) {
  return request({
    url: '/tags/tags/dropDownTagName',
    method: 'POST',
    data
  })
}

// 分散供应商导出（主数据）
export function gpListexport(data) {
  return requestDownload({
    url: '/gpsupplier/gpListexport',
    method: 'POST',
    data
  })
}

// 获取供应商通讯录
export function fetchSuppliers(data) {
  return request({
    url: '/supplier/list/page',
    method: 'POST',
    data
  })
}

// 更新通讯录
export function exportSupplier(data) {
  return requestDownload({
    url: '/supplier/list/export',
    method: 'POST',
    data
  })
}

// 批量失效
export function deleteSupplier(data) {
  return request({
    url: `/supplier/delete/${data.id}`,
    method: 'post',
    data
  })
}

// 获取供应商
export function fetchSupplier(params) {
  return request({
    url: `/supplier/detail/${params.id}`,
    params
  })
}

// 保存供应商
export function saveSupplier(params, data) {
  return request({
    url: `/supplier/update/${params.id}`,
    method: 'post',
    data
  })
}
