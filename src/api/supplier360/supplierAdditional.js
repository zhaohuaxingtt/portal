/*
 * @Author: moxuan
 * @Date: 2021-04-27 17:50:00
 * @Description: 供应商附加信息-内容备注接口
 */
import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_SUPPLIER + '/web')
import store from '@/store'

// 保存供应商附加信息-内容和备注
export function saveAdditionalInfo(parmars) {
  return requst({
    url: `/additionalInfo/save`,
    method: 'POST',
    data: {
      ...parmars,
      supplierToken: store.state.home.valiCode
    }
  })
}

//查询供应商附加信息-内容和备注
export function getAdditionalInfo(parmars) {
  return requst({
    url: `/additionalInfo/info`,
    method: 'POST',
    data: {
      ...parmars,
      supplierToken: store.state.home.valiCode
    }
  })
}
