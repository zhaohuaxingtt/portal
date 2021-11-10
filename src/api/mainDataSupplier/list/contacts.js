import axios from '@/utils/axios'

const request = axios(process.env.VUE_APP_SUPPLIER + '/web')

// 更新通讯录
export function updateSupplierContact(params, data) {
  return request({
    url: `/supplier/update/${params.supplierId}/contact/${params.contactId}`,
    method: 'POST',
    data
  })
}

// 批量失效
export function deleteSupplierContact(params) {
  return request({
    url: `/supplier/contact/del/${params.supplierId}/${params.contactIds}`,
    method: 'POST'
  })
}

// 更新通讯录
export function updateBantchSupplierContact(params, data) {
  return request({
    url: `/supplier/update/${params.supplierId}/contact/saveOrUpdate`,
    method: 'POST',
    data
  })
}
