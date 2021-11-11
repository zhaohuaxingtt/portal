/**
 * @author: shujie
 * @createTime: 2021-5-31 19:13:47
 * @Description:FRM评级审批
 */
import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_SUPPLIER + '/web')

// 深入评级-终止-审批列表查询(审批详情页，通过审批流Id查询)
export function approvalListQuery(params) {
  return requst({
    url: `/depSupplier/approvalListQuery`,
    method: 'POST',
    data: params
  })
}
