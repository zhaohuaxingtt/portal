/*
 * @Author: moxuan
 * @Date: 2021-04-29 17:50:00
 * @Description: 系统修改历史
 */
import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_SUPPLIER + '/web')
import store from '@/store'

//供应商信息变动临时信息分页查询
export function getSupplierEditList(parmars) {
  return requst({
    url: `/supplierEdit/list`,
    method: 'POST',
    data: {
      ...parmars,
      supplierToken: store.state.home.valiCode
    }
  })
}

//获取变更字段信息
export function getSupplierEditFieldList(parmars) {
  return requst({
    url: `/supplierEdit/field`,
    method: 'POST',
    data: {
      ...parmars,
      supplierToken: store.state.home.valiCode
    }
  })
}
