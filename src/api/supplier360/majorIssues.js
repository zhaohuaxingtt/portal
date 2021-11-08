/*
 * @Author: moxuan
 * @Date: 2021-04-26 17:50:00
 * @Description: 人员及公司治理情况
 */
import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_SUPPLIER + '/web')
import store from '@/store'

//司法信息
//查询-重大事项-司法信息
export function getJudiciaryInfoListView(parmars) {
  return requst({
    url: '/judiciaryInfo/list',
    method: 'POST',
    data: {
      ...parmars,
      supplierToken: store.state.home.valiCode
    }
  })
}

//行政处罚
//查询-重大事项-行政处罚
export function getAdministrativePenaltyListView(parmars) {
  return requst({
    url: 'administrativePenalty/list',
    method: 'POST',
    data: {
      ...parmars,
      supplierToken: store.state.home.valiCode
    }
  })
}
