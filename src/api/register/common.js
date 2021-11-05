/*
 * @Author: Moxuan
 * @Date: 2021-04-19 17:50:00
 * @Description: 公共
 */
import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_SUPPLIER + '/web')
import store from '@/store'

//注册提交
export function submitInvitationMessage(parmars) {
  return requst({
    url: '/invitation/message',
    method: 'POST',
    data: {
      ...parmars,
      supplierToken: store.state.home.valiCode
    }
  })
}

//获取注册流程进度
export function getInvitationProgress(parmars) {
  return requst({
    url: '/invitation/progress',
    method: 'POST',
    data: {
      ...parmars,
      supplierToken: store.state.home.valiCode
    }
  })
}
