import axios from '@/utils/axios'
const request = axios(process.env.VUE_APP_SUPPLIER + '/web')
// 获取
export function updateSupplierBank(params, data) {
  return request({
    url: `/supplier/update/${params.supplierId}/bank`,
    method: 'POST',
    data
  })
}

// 删除子账号
export function gpSubBankDelete(data) {
  return request({
    url: `/supplier/gpSubBank/delete`,
    method: 'POST',
    data
  })
}

// 删除子账号
export function batchSaveOrUpd(data) {
  return request({
    url: `/supplier/gpSupplierDetail/batchSaveOrUpd`,
    method: 'POST',
    data
  })
}