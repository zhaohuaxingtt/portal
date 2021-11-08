/*
 * @Author: moxuan
 * @Date: 2021-04-20 17:50:00
 * @Description: 主要业务及产品
 */
import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_SUPPLIER + '/web')
import store from '@/store'

//保存主要业务及产品信息
export function saveSupplierProduct(parmars) {
  return requst({
    url: '/supplierProduct',
    method: 'POST',
    data: {
      ...parmars,
      supplierToken: store.state.home.valiCode
    }
  })
}

//删除主要业务及产品信息
export function deleteSupplierProduct(parmars) {
  return requst({
    url: '/supplierProduct',
    method: 'DELETE',
    data: {
      ...parmars,
      supplierToken: store.state.home.valiCode
    }
  })
}

//分页查询主要业务及产品信息列表
export function getSupplierProduct(parmars) {
  return requst({
    url: `/supplierProduct/list`,
    method: 'POST',
    data: {
      ...parmars,
      supplierToken: store.state.home.valiCode
    }
  })
}
