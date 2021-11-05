/*
 * @Author: moxuan
 * @Date: 2021-04-27 17:50:00
 * @Description: 理念
 */
import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_SUPPLIER + '/web')
import store from '@/store'

// 历年合作记录信息分页查询
export function getSupplierTtoList(parmars) {
  return requst({
    url: `/supplierTto/list`,
    method: 'POST',
    data: {
      ...parmars,
      supplierToken: store.state.home.valiCode
    }
  })
}
