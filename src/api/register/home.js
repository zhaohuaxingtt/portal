/*
 * @author:shujie
 * @Date: 2021-4-19 10:49:09
 * @Description: In User Settings Edit
 */
import axios from '@/utils/axios'
import md5 from '@/utils/md5'
const requst = axios(process.env.VUE_APP_SUPPLIER + '/web')
function getSigntoken(purchaserEmail){
  return {
    signtoken:md5(purchaserEmail + '|' + 'rise3edc$RFV')
  }
}

// 校验是否已经注册用户
export function indexNext(parmars, type) {
  return requst({
    url: '/basic/indexNext',
    method: 'POST',
    data: parmars,
    baseURL:
      type < 4
        ? `${process.env.VUE_APP_SUPPLIER}/web/register`
        : `${process.env.VUE_APP_SUPPLIER}/web`
  })
}
// 根据社会信用代码获取供应商信息
export function getInfosByCode(parmars) {
  return requst({
    url: `/register/basic/infosByCode/${parmars.code}/${parmars.type}`,
    method: 'GET'
  })
}

//验证token + 供应商类型
export function verification(parmars, type) {
  return requst({
    url: `/basic/verification`,
    method: 'POST',
    data: parmars,
    baseURL:
      type < 4
        ? `${process.env.VUE_APP_SUPPLIER}/web/register`
        : `${process.env.VUE_APP_SUPPLIER}/web`
  })
}
//通过email ，查询采购员信息
export function getUserInfo(parmars, type) {
  return requst({
    headers:getSigntoken(parmars.purchaserEmail),
    url: `/basic/getUserInfo`,
    method: 'POST',
    data: parmars,
    baseURL:
      type < 4
        ? `${process.env.VUE_APP_SUPPLIER}/web/register`
        : `${process.env.VUE_APP_SUPPLIER}/web`
  })
}


export const getPurchaseInfo = (params) => {
  return requst({
    url: '/register/changeApproval/getPurchaseInfo',
    method: 'POST',
    data: params
  })
}

// 提交前较验是否有流程和任务的接口
// isHaveUnfinishedTaskOrProcess
export const isHaveUnfinishedTaskOrProcess = (supplierId) => {
  return requst({
    url: `supplierInfo/isHaveUnfinishedTaskOrProcess/${supplierId}`,
    method: 'POST',
  })
}
// 保存采购员邮箱接口
// isHaveUnfinishedTaskOrProcess
export const savePurchaserEmail = (params) => {
  return requst({
    url: `/supplierInfo/savePurchaserEmail`,
    method: 'POST',
    data:params
  })
}