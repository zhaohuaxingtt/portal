import axios from '@/utils/axios'

const request = axios(process.env.VUE_APP_SUPPLIER + '/web')

// 更新通讯录
export function updateSupplierState(params, data) {
  return request({
    url: `/supplier/update/${params.supplierId}/state`,
    method: 'POST',
    data
  })
}
