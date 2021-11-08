/*
 * @author:shujie
 * @Date: 2021-4-19 10:49:09
 * @Description: In User Settings Edit
 */
import axios from '@/utils/axios'
const requst = axios(process.env.VUE_APP_SUPPLIER + '/web')
import store from '@/store'

// 提交
export function baseInfoSubmit(parmars) {
  return requst({
    url: '/changeApproval/submit',
    method: 'POST',
    data: {
      ...parmars,
      supplierToken: store.state.home.valiCode
    }
  })
}
