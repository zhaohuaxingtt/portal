/*
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-05-27 15:58:15
 * @LastEditors: zbin
 * @LastEditTime: 2021-06-02 20:10:31
 * @Descripttion: 概览
 */
import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_SUPPLIER + '/web')

//查询
export function getInitOverView(parmars) {
  return requst({
    url: `/supplier360View/frm/profile/${parmars.subSupplierId}/${parmars.supplierType}`,
    method: 'GET'
  })
}
//发起初步评级按钮
export function addInitial(parmars) {
  return requst({
    url: `/supplier360View/add/addInitial`,
    method: 'POST',
    data: {
      ...parmars
    }
  })
}
