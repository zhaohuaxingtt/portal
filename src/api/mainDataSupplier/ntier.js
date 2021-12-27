import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_NTIER + '/web/ntier')
//ntier供应商注册
export function saveNtierSupplier(parmars) {
  return requst({
    url: '/ntierSupplier/register',
    method: 'POST',
    data: {
      ...parmars
    }
  })
}
//获取供应商基本信息
export function getNtierSupplier(parmas) {
  return requst({
    url: '/ntierSupplier/get',
    method: 'get',
    parmas
  })
}
//更新供应商基本信息
export function updateBatch(parmars) {
  return requst({
    url: '/ntierSupplier/updateBatch',
    method: 'POST',
    data: parmars
  })
}
