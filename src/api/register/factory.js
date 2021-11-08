/*
 * @author:shujie
 * @Date: 2021-4-23 10:45:55
 * @Description: 工厂信息
 */
import axios from '@/utils/axios'
import store from '@/store'
const requst = axios(process.env.VUE_APP_SUPPLIER + '/web')

//查询工厂信息
export function getFactory(parmars, type) {
  return requst({
    url: `/supplierPlant/plants/page`,
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

//保存工厂信息
export function saveFactory(parmars, type) {
  return requst({
    url: `/supplierPlant/plants`,
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

//删除分供方信息
export function deleteFactory(parmars, type) {
  return requst({
    url: `supplierPlant/plants`,
    method: 'DELETE',
    data: parmars,
    baseURL:
      type < 4
        ? `${process.env.VUE_APP_SUPPLIER}/web/register`
        : `${process.env.VUE_APP_SUPPLIER}/web`
  })
}
