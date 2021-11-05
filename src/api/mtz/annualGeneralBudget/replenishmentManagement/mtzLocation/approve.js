/*
 * @Author: your name
 * @Date: 2021-11-02 17:13:17
 * @LastEditTime: 2021-11-03 17:37:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\api\mtz\annualGeneralBudget\replenishmentManagement\mtzLocation\approve.js
 */
import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_MTZ + '/web/mtz')

export function pageApprove(parmars) {
  //审批⼈&审批记录-分页查询
  return requst({
    url: '/mtzAppNomiApprove/pageApprove',
    method: 'POST',
    data: parmars
  })
}

export function listApproveStream(parmars) {
  //审批⼈&审批记录-审批流
  return requst({
    url: '/mtzAppNomiApprove/listApproveStream',
    method: 'POST',
    data: parmars
  })
}
export function deleteApprove(parmars) {
  //审批⼈&审批记录-删除
  return requst({
    url: '/mtzAppNomiApprove/deleteApprove',
    method: 'POST',
    data: parmars
  })
}
export function modifyApprove(parmars) {
  //审批⼈&审批记录-编辑
  return requst({
    url: '/mtzAppNomiApprove/modifyApprove',
    method: 'POST',
    data: parmars
  })
}
