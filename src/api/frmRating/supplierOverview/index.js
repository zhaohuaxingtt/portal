/*
 * @Author: moxuan
 * @Date: 2021-04-19 17:50:00
 * @Description: FRM管理
 */
import axios from '@/utils/axios'
const requst = axios(process.env.VUE_APP_SUPPLIER + '/web')

//卡片
export function supplierRatingCard() {
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
//下拉集合
export function sapDropDown(parmars) {
    return requst({
        url: `/supplierRatingRecord/dropDown`,
        method: 'POST',
        data: parmars
    })
}
//历史信息
export function historyList(parmars) {
    return requst({
        url: `/supplierRatingRecord/historyList`,
        method: 'POST',
        data: parmars
    })
}
//移除

export function cancel(parmars) {
    return requst({
        url: `/supplierRatingRecord/cancel`,
        method: 'POST',
        data: parmars
    })
}
//
export function deepCard(parmars) {
    return requst({
        url: `/depSupplier/deepCard`,
        method: 'POST',
        data: parmars
    })
}
//
export function riskSignalCard(parmars) {
    return requst({
        url: `/riskSignal/riskSignalCard`,
        method: 'POST',
        data: parmars
    })
}
//
export function initRatingCard(parmars) {
    return requst({
        url: `/initComment/initRatingCard`,
        method: 'POST',
        data: parmars
    })
}
//crting科室
export function deptDropDown(parmars) {
    return requst({
        url: `/supplierRatingRecord/dropDown`,
        method: 'POST',
        data: parmars
    })
}
//crting采购员
export function userDropDown(parmars) {
    return requst({
        url: `/supplierRatingRecord/userDropDown`,
        method: 'POST',
        data: parmars
    })
}