//供应商卡片  caopeng
import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_SUPPLIER + '/web')
const requstEkl = axios(process.env.VUE_APP_EKL)
const requstEklPf = axios(process.env.VUE_APP_CHANGEPRICE)
const requstCondition = axios(process.env.VUE_APP_MATERIEL)
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
        method: 'GET',

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
        url: `/web/edi-web/getSapSupplierRate?sapCode=`+parmars,
        method: 'POST',
    })
}
//合同订单
export function getCatogeryCollect(parmars) {
    return requstEklPf({
        url: `/api/purchaseOrder/getCatogeryCollect?tmSupplierId=`+parmars,
        method: 'POST',
    })
}
//合同订单
export function getCatogeryCollectYear(parmars) {
    return requstEklPf({
        url: `/api/purchaseOrder/executionoperation/api/purchaseOrder/getCatogeryCollectYear`,
        method: 'POST',
        data:parmars
    })
}
//合同订单
export function queryMaterialGroupByCondition(parmars) {
    return requstCondition({
        url: `/web/queryMaterialGroupByCondition`,
        method: 'POST',
        data:parmars
    })
}