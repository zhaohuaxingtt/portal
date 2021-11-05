import axios from '@/utils/axios'

const request = axios(process.env.VUE_APP_SUPPLIER + '/web')

// 更新通讯录
export function updateFactory(params, data) {
  return request({
    url: `/supplier/update/${params.supplierId}/plant/${params.plantId}`,
    method: 'POST',
    data
  })
}

// 批量失效
export function deleteFactory(params) {
  return request({
    url: `supplier/plant/del/${params.supplierId}/${params.plantIds}`,
    method: 'POST'
  })
}
