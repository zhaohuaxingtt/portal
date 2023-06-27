// 供应商360:审批记录
import axios from '@/utils/axios'
const requst = axios(process.env.VUE_APP_SUPPLIER + '/web')
const requstApprove = axios(process.env.VUE_APP_APPROVAL)
import store from '@/store'

// 查询供应商审批记录
export function approvalRecordPage(data) {
  return requst({
    url: '/supplierInfo/approvalRecordPage',
    method: 'POST',
    data
  })
}

// 查询供应商流程类型
export function listSupplierType(data) {
  return requst({
    url: '/web/dic/dictionary/listSupplierType',
    method: 'POST',
    data
  })
}