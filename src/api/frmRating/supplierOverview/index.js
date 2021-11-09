/*
 * @Author: moxuan
 * @Date: 2021-04-19 17:50:00
 * @Description: FRM管理
 */
import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_SUPPLIER + '/web')

//卡片
export function supplierRatingCard(params) {
  return requst({
    url: `/supplierRatingRecord/supplierRatingCard`,
    method: 'GET',
  
  })
}
  //frm供应商清单
  export function currentList(parmars) {
    return requst({
      url: `/supplierRatingRecord/currentList`,
      method: 'POST',
      data: parmars
    })
  }
