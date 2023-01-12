/*
 * @Author: your name
 * @Date: 2021-11-09 15:26:19
 * @LastEditTime: 2022-01-11 20:47:40
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \front-portal\src\api\supplierManagement\supplierCard\index.js
 */
//供应商卡片  caopeng
import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_SUPPLIER + '/web')
const requstEkl = axios(process.env.VUE_APP_EKL)
const requstRfq = axios(process.env.VUE_APP_SOURCING)
const requstEklPf = axios(process.env.VUE_APP_CHANGEPRICE)
const requstCondition = axios(process.env.VUE_APP_MATERIEL)
// 定点
export function getSupplierRfqNominatedDis(id) {
  return requstRfq({
    url: '/purchasing-project-parts/getSupplierRfqNominatedDis/'+ id,
    method: 'GET',
  })
}
// 寻源
export function getSupplierRfqLineDeptDis(id) {
  return requstRfq({
    url: '/purchasing-project-parts/getSupplierRfqLineDeptDis/'+ id,
    method: 'GET',
  })
}
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
    url: `/supplierRatingRecord/supplierRatingCard/` + params,
    method: 'GET'
  })
}

//供应商绩效卡片
export function performCard360(parmars) {
  return requst({
    url: `/spi/spiTotalScore/performCard360`,
    method: 'POST',
    data: parmars
  })
}
//配附件供货率
export function getSapSupplierRate(parmars) {
  return requstEklPf({
    url: `/web/edi-web/getSapSupplierRate?sapCode=` + parmars,
    method: 'POST'
  })
}
//合同订单
export function getCatogeryCollect(parmars) {
  return requstEklPf({
    url: `/api/purchaseOrder/getCatogeryCollect?tmSupplierId=` + parmars,
    method: 'POST'
  })
}
//合同订单
export function getCatogeryCollectYear(parmars) {
  return requstEklPf({
    url: `/api/purchaseOrder/getCatogeryCollectYear`,
    method: 'POST',
    data: parmars
  })
}
//合同订单
export function queryMaterialGroupByCondition(parmars) {
  return requstCondition({
    url: `/web/queryMaterialGroupByCondition`,
    method: 'POST',
    data: parmars
  })
}
