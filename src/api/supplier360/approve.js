/*
 * @Author: moxuan
 * @Date: 2021-04-19 17:50:00
 * @LastEditTime: 2021-11-29 16:06:24
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
