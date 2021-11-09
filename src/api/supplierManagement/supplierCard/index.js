//供应商卡片  caopeng
import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_SUPPLIER+ '/web')
 const requstEkl = axios(process.env.VUE_APP_EKL)
// ekl卡片
export function getSupplierCard(parmars) {
    return requstEkl({
        url: '/spEklreportEntity/getSupplierCard',
        method: 'POST',
        data: parmars
    })
}
//财务预警卡片
export function supplierRatingCard(params) {
    return requst({
      url: `/supplierRatingRecord/supplierRatingCard/`+params,
      method: 'GET',
  
    })
  }
  //财务预警供应商清单
export function currentList(parmars) {
    return requst({
      url: `/supplierRatingRecord/currentList`,
      method: 'POST',
      data: parmars
    })
  }