// * @Author: caopeng
// * @Description: 供应商360卡片
// */
import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_SUPPLIER + '/web')
//卡片
export function supplierRatingCard(params) {
    return requst({
      url: `/supplierRatingRecord/supplierRatingCard/`+params,
      method: 'GET',
  
    })
  }