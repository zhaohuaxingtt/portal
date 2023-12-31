/*
 * @author:shujie
 * @Date: 2021-4-22 16:14:04
 * @Description: 银行信息
 */
import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_SUPPLIER + '/web')
const useCenter = axios(process.env.VUE_APP_USER_CENTER + '/web')

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
// 报表 供应商列表
export function getSuppliers(parmars) {
  return useCenter({
    url: '/supplierUser/pageList',
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
//标签
export function synchronizationSap(parmars) {
  return requst({
    url: '/changeApproval/synchronizationSap',
    method: 'POST',
    data: {
      ...parmars
    }
  })
}
//标签
export function queryByParam(parmars) {
  return requst({
    url: '/supplierInfo/bkm/queryByParam/' + parmars,
    method: 'GET'
    // data: {
    //   ...parmars
    // }
  })
}
