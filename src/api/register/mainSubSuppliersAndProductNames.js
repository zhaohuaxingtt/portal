/*
 * @Author: moxuan
 * @Date: 2021-04-20 17:50:00
 * @Description: 主要分供方及产品名称
 */
import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_SUPPLIER + '/web')
import store from '@/store'

//分供方
//分页查询分供方信息
export function getSupplierProduct(parmars) {
  return requst({
    url: `/subSupplier/page`,
    method: 'POST',
    data: {
      ...parmars,
      supplierToken: store.state.home.valiCode
    }
  })
}

//保存分供方信息
export function saveSubSupplierInfos(parmars) {
  return requst({
    url: `/subSupplier/infos`,
    method: 'POST',
    data: {
      ...parmars,
      supplierToken: store.state.home.valiCode
    }
  })
}

//删除分供方信息
export function deleteSubSupplierInfos(parmars) {
  return requst({
    url: `/subSupplier/infos`,
    method: 'DELETE',
    data: {
      ...parmars,
      supplierToken: store.state.home.valiCode
    }
  })
}

//付款信息
//分页查询主要分供方付款信息列表
export function getSupplierPay(parmars) {
  return requst({
    url: `/supplierPay/page`,
    method: 'POST',
    data: {
      ...parmars,
      supplierToken: store.state.home.valiCode
    }
  })
}

//保存主要分供方付款信息
export function saveSupplierPay(parmars) {
  return requst({
    url: `/supplierPay/infos`,
    method: 'POST',
    data: {
      ...parmars,
      supplierToken: store.state.home.valiCode
    }
  })
}

//删除主要分供方付款信息
export function deleteSupplierPay(parmars) {
  return requst({
    url: `/supplierPay/infos`,
    method: 'DELETE',
    data: {
      ...parmars,
      supplierToken: store.state.home.valiCode
    }
  })
}
