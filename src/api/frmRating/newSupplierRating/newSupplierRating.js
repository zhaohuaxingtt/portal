/*
 * @Author: zbin
 * @Date: 2021-04-19 17:50:00
 * @Description:  新供应商评级
 */
import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_SUPPLIER + '/web')

//  主页 - 新供应商评级
export function getNewSupplierRating(parmars) {
  return requst({
    url: `/newVendorAccessRating/list`,
    method: 'POST',
    data: {
      ...parmars
    }
  })
}
//  新供应商评级按钮 - 新供应商评级
export function getNewSupplierInfo(parmars) {
  return requst({
    url: `/newVendorAccessRating/supplier`,
    method: 'POST',
    data: {
      ...parmars
    }
  })
}
//  新供应商评级按钮 - 新供应商准入评级查询股东信息
export function getInvestorList(parmars) {
  return requst({
    url: `/newVendorAccessRating/investorList`,
    method: 'POST',
    data: {
      ...parmars
    }
  })
}
//  新供应商评级按钮 - 新供应商准入评级提交计算
export function getCalculate(parmars) {
  return requst({
    url: `/newVendorAccessRating/calculate`,
    method: 'POST',
    data: {
      ...parmars
    }
  })
}
//  新供应商评级按钮 - 新供应商准入评级无法评估
export function unableRatings(parmars) {
  return requst({
    url: `/newVendorAccessRating/unable`,
    method: 'POST',
    data: {
      ...parmars
    }
  })
}
//  新供应商评级按钮 - 新供应商准入评级提交审批
export function submitApprove(parmars) {
  return requst({
    url: `/newVendorAccessRating/submit`,
    method: 'POST',
    data: {
      ...parmars
    }
  })
}
//  新供应商评级按钮 - 保存
export function save(parmars) {
  return requst({
    url: `/newVendorAccessRating`,
    method: 'POST',
    data: {
      ...parmars
    }
  })
}
//  新供应商评级按钮 - 退回前期采购
export function backProcurement(parmars) {
  return requst({
    url: `/newVendorAccessRating/backProcurement`,
    method: 'POST',
    data: {
      ...parmars
    }
  })
}
//  获取外部评级按钮
export function externalRating(parmars) {
  return requst({
    url: `/finance/externalRating`,
    method: 'POST',
    data: {
      ...parmars
    }
  })
}
//  审批界面信息查询
export function getApprove(parmars) {
  return requst({
    url: `/newVendorAccessRating/approve`,
    method: 'POST',
    data: {
      ...parmars
    }
  })
}
//  科室下拉
export function getDept() {
  return requst({
    url: `/newVendorAccessRating/dept`,
    method: 'GET'
  })
}
