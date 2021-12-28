import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_NTIER + '/web/ntier')
//ntier供应商注册
export function saveNtierSupplier(data) {
  return requst({
    url: '/ntierSupplier/register',
    method: 'POST',
    data
  })
}
//获取供应商基本信息
export function getNtierSupplier(params) {
  return requst({
    url: '/ntierSupplier/get',
    method: 'get',
    params
  })
}
//更新供应商基本信息
export function updateBatch(data) {
  return requst({
    url: '/ntierSupplier/updateBatch',
    method: 'POST',
    data
  })
}
