import axios from '@/utils/axios'
const request = axios(process.env.VUE_APP_SUPPLIER + '/web')
// 获取供应商通讯录
export function updateSupplierBank(params, data) {
  return request({
    url: `/supplier/update/${params.supplierId}/bank`,
    method: 'POST',
    data
  })
}
