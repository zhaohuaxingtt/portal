/*
 * @Author: moxuan
 * @Date: 2021-04-26 17:50:00
 * @Description: 人员及公司治理情况
 */
import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_SUPPLIER + '/web')
import store from '@/store'

//分页查询公司治理情况信息
export function getGovernConditionListView(parmars) {
  return requst({
    url: '/governCondition/list',
    method: 'POST',
    data: {
      ...parmars,
      supplierToken: store.state.home.valiCode
    }
  })
}

//分页查询主要管理人员信息列表
export function getMainManagerListView(parmars) {
  return requst({
    url: '/mainManager/list',
    method: 'POST',
    data: {
      ...parmars,
      supplierToken: store.state.home.valiCode
    }
  })
}
