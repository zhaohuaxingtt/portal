/*
 * @author:shujie
 * @Date: 2021-4-22 16:14:04
 * @Description: 银行信息
 */
import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_SUPPLIER + '/web')

//供应商列表
export function getBasicList(parmars) {
  return requst({
    url: '/supplier360View/page/querySupplierInfo',
    method: 'POST',
    data: {
      ...parmars
    }
  })
}
//供应商列表
export function getProfile(parmars) {
  return requst({
    url: `/supplier360View/profile/${parmars.subSupplierId}/${parmars.supplierType}`,
    method: 'GET'
  })
}
//邀请注册
export function getInvitation(parmars) {
  return requst({
    url: '/invitation/info',
    method: 'POST',
    data: {
      ...parmars
    }
  })
}
//标签
export function getTags(parmars) {
  return requst({
    url: '/tags/list',
    method: 'POST',
    data: {
      ...parmars
    }
  })
}
