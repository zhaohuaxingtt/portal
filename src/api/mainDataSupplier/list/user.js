import axios from '@/utils/axios'
import axiosDownload from '@/utils/axios.download'
const request = axios(process.env.VUE_APP_USER_CENTER)
const requestDownload = axiosDownload(process.env.VUE_APP_USER_CENTER)
export function fetchSupplierUsers(data) {
  return request({
    url: '/web/supplierUser/list',
    method: 'post',
    data
  })
}

export function fetchSupplierUserByPage(data) {
  return request({
    url: '/web/supplierUser/pageList',
    method: 'post',
    data
  })
}

// 批量冻结
export function supplierUserFreeBatch(data) {
  return request({
    url: '/web/supplierUser/freezeBatch',
    method: 'post',
    data
  })
}

// 批量解冻
export function supplierUserUnFreeBatch(data) {
  return request({
    url: '/web/supplierUser/unfreezeBatch',
    method: 'post',
    data
  })
}

// 删除用户
export function deleteSupplierUser(data) {
  return request({
    url: '/web/supplierUser/deleteBatch',
    method: 'post',
    data
  })
}

// 批量新建用户
export function saveSupplierUser(data) {
  return request({
    url: '/web/supplierUser/saveBatch',
    method: 'post',
    data
  })
}

// 批量更新
export function updateSupplierUser(data) {
  return request({
    url: '/web/supplierUser/updateBatch',
    method: 'post',
    data
  })
}

// 导出用户
export function exportSupplierUser(data) {
  return requestDownload({
    url: '/web/supplierUser/exportExcel',
    method: 'post',
    data
  })
}
