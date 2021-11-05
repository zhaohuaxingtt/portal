/*
 * @author:shujie
 * @Date: 2021-4-22 16:14:04
 * @Description: 银行信息
 */
import axios from '@/utils/axios'
import store from '@/store'
const requst = axios(process.env.VUE_APP_SUPPLIER + '/web')

//保存银行信息
export function saveSupplierBank(parmars, type) {
  return requst({
    url: '/bank/creditBanks',
    method: 'POST',
    data: {
      ...parmars,
      supplierToken: store.state.home.valiCode
    },
    baseURL:
      type < 4
        ? `${process.env.VUE_APP_SUPPLIER}/web/register`
        : `${process.env.VUE_APP_SUPPLIER}/web`
  })
}
//删除银行信息
export function deleteSupplierBank(parmars, type) {
  return requst({
    url: `/bank/creditBanks`,
    method: 'DELETE',
    data: parmars,
    baseURL:
      type < 4
        ? `${process.env.VUE_APP_SUPPLIER}/web/register`
        : `${process.env.VUE_APP_SUPPLIER}/web`
  })
}

//获取银行表格数据
export function getSupplierBank(parmars, type) {
  return requst({
    url: '/bank/creditBanks/page',
    method: 'POST',
    data: {
      ...parmars,
      supplierToken: store.state.home.valiCode
    },
    baseURL:
      type < 4
        ? `${process.env.VUE_APP_SUPPLIER}/web/register`
        : `${process.env.VUE_APP_SUPPLIER}/web`
  })
}
