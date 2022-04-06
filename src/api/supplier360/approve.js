/*
 * @Author: moxuan
 * @Date: 2021-04-19 17:50:00
 * @LastEditTime: 2021-11-30 14:52:06
 * @LastEditors: Please set LastEditors
 * @Description: 联系人与用户
 */
import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_SUPPLIER + '/web')
import store from '@/store'

// 材料组分页查询
export function getApprove(applyId) {
  return requst({
    url: `/bdl/stuffMaterials/${applyId}`,
    method: 'GET'
  })
}
// 材料组分页查询
export function priorApprovalDetail(taskId) {
  return requst({
    url: `/bdl/priorApprovalDetail/${taskId}`,
    method: 'GET'
  })
}
// 数据查询
export function gpAdmittanceInfo(data) {
  return requst({
    url: `/gpSupplier/gpAdmittanceInfo/${data.supplierId}/${data.businessType}`,
    method: 'GET'
  })
}
// 材料组分页查询
export function priorApproval(params) {
  return requst({
    url: `/bdl/priorApproval`,
    method: 'POST',
    data: params
  })
}
