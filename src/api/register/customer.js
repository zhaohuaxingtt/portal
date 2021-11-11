/*
 * @Author: moxuan
 * @Date: 2021-04-19 17:50:00
 * @Description: 主要客户
 */
import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_SUPPLIER + '/web')
import store from '@/store'

//保存主要客户信息
export function saveMainCustomer(parmars) {
  return requst({
    url: '/mainCustomer/infos',
    method: 'POST',
    data: {
      ...parmars,
      supplierToken: store.state.home.valiCode
    }
  })
}

//删除主要客户信息
export function deleteMainCustomer(parmars) {
  return requst({
    url: '/mainCustomer/infos',
    method: 'DELETE',
    data: {
      ...parmars,
      supplierToken: store.state.home.valiCode
    }
  })
}

//分页查询主要客户信息列表
export function getMainCustomer(parmars) {
  return requst({
    url: `/mainCustomer/page`,
    method: 'POST',
    data: {
      ...parmars,
      supplierToken: store.state.home.valiCode
    }
  })
}
