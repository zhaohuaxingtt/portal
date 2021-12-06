/*
 * @Date: 2021-12-06 09:54:08
 * @LastEditors: caopeng
 * @LastEditTime: 2021-12-06 10:51:12
 * @FilePath: \front-portal-new\src\api\opcs\solPermission.js
 */
import axios from '@/utils/axios'
const requst = axios(process.env.VUE_APP_SUPPLIER + '/web')

//应用管理--授权列表--查询
export function queryList(parmars) {
    return requst({
        url: '/opcsSupplier/query',
        method: 'POST',
        data: parmars
    })
}
//应用管理--授权列表--删除
export function deleteList(parmars) {
    return requst({
        url: '/opcsSupplier/delete',
        method: 'POST',
        data: parmars
    })
}
//应用管理--授权列表--导出
export function exportFile(parmars) {
    return requst({
        url: '/opcsSupplier/export',
        method: 'POST',
        data: parmars
    })
}
//应用管理--基础信息编辑
export function baseEdit(parmars) {
    return requst({
        url: '/opcsSupplier/baseEdit',
        method: 'POST',
        data: parmars
    })
}
//应用管理--基础信息查询
export function queryBase(parmars) {
    return requst({
        url: '/opcsSupplier/queryBase',
        method: 'POST',
        data: parmars
    })
}
//应用管理--详情列表--查询
export function pageQueryDetails(parmars) {
    return requst({
        url: '/opcsSupplier/pageQueryDetails',
        method: 'POST',
        data: parmars
    })
}
//应用管理--详情列表--删除
export function deleteDetails(parmars) {
    return requst({
        url: '/opcsSupplier/deleteDetails',
        method: 'POST',
        data: parmars
    })
}
//应用管理--详情列表--新增
export function addDetails(parmars) {
    return requst({
        url: '/opcsSupplier/addDetails',
        method: 'POST',
        data: parmars
    })
}
