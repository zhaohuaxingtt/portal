/*
 * @author:shujie
 * @Date: 2021-4-19 10:49:09
 * @Description: In User Settings Edit
 */
import axios from '@/utils/axios'
const requst = axios(process.env.VUE_APP_SUPPLIER + '/web')
import store from '@/store'
// 保存基本信息
export function saveInfos(parmars, type) {
  return requst({
    url: '/basic/infos',
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
// 根据token查询供应商基本信息详情
export function supplierDetail(type) {
  return requst({
    url: '/basic/supplierDetail',
    method: 'POST',
    data: {
      supplierToken: store.state.home.valiCode
    },
    baseURL:
      type < 4
        ? `${process.env.VUE_APP_SUPPLIER}/web/register`
        : `${process.env.VUE_APP_SUPPLIER}/web`
  })
}
