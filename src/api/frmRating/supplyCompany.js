/*
 * @Author: moxuan
 * @Date: 2021-04-26 20:50:00
 * @Description: 初步评级-供应商初评情况
 */
import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_SUPPLIER + '/web')
//查询供货公司信息
export function getSupplierProcureFactory(params) {
    return requst({
      url: `/supplierProcureFactory/query`,
      method: 'POST',
      data: params
    });
  }
  //保存供货公司信息
  export function saveSupplierProcureFactory(params) {
    return requst({
      url: `/supplierProcureFactory/save`,
      method: 'POST',
      data: params
    });
  }

