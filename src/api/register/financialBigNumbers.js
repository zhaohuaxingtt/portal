/*
 * @Author: moxuan
 * @Date: 2021-04-19 17:50:00
 * @LastEditTime: 2021-04-15 17:50:00
 * @LastEditors: moxuan
 * @Description: 联系人与用户
 */
import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_SUPPLIER + '/web')
import store from '@/store'

export function selectFinancialBig(parmars, type) {
  return requst({
    url: `/financialBig/list`,
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

export function deleteFinancialBig(parmars, type) {
  return requst({
    url: `/financialBig`,
    method: 'DELETE',
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

export function saveFinancialBig(parmars, type) {
  return requst({
    url: `/financialBig`,
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
