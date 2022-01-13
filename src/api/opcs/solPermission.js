/*
 * @Date: 2021-12-06 09:54:08
 * @LastEditors: caopeng
 * @LastEditTime: 2022-01-13 14:40:12
 * @FilePath: \front-portal-new\src\api\opcs\solPermission.js
 */
import axios from '@/utils/axios'
import axiosDownload from '@/utils/axios.download'
const requst = axios(process.env.VUE_APP_SUPPLIER + '/web')
const requestDownload = axiosDownload(process.env.VUE_APP_SUPPLIER + '/web')

const requstUser = axios(process.env.VUE_APP_USER_CENTER)
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
    return requestDownload({
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
//联系人与用户管理--详情列表--查询
export function queryDetailUser(parmars) {
    return requst({
        url: '/opcsUser/queryDetails',
        method: 'POST',
        data: parmars
    })
}
//联系人与用户管理--详情列表--解冻
export function thawUser(parmars) {
    return requst({
        url: '/opcsUser/thaw',
        method: 'POST',
        data: parmars
    })
}

//联系人与用户管理--详情列表--保存
export function saveUser(parmars) {
    return requst({
        url: '/opcsUser/save',
        method: 'POST',
        data: parmars
    })
}

//联系人与用户管理--详情列表--续期
export function renewalUser(parmars) {
    return requst({
        url: '/opcsUser/renewal',
        method: 'POST',
        data: parmars
    })
}

//联系人与用户管理--详情列表--冻结
export function freezeUser(parmars) {
    return requst({
        url: '/opcsUser/freeze',
        method: 'POST',
        data: parmars
    })
}

//联系人与用户管理--详情列表--导出
export function exportUser(parmars) {
    return requestDownload({
        url: '/opcsUser/export',
        method: 'POST',
        data: parmars
    })
}
//联系人与用户管理--详情列表--导入
export function imports(parmars) {
    return requestDownload({
        url: '/opcsUser/imports',
        method: 'POST',
        data: parmars
    })
}
//联系人与用户管理--详情列表--下载模板
export function downloadUser(parmars) {
    return requestDownload({
        url: '/opcsUser/download',
        method: 'POST',
        data: parmars
    })
}

//联系人与用户管理--详情列表--新增
export function addLineUser(parmars) {
    return requst({
        url: '/opcsUser/addLine',
        method: 'POST',
        data: parmars
    })
}

//联系人与用户管理--详情列表--激活
export function activeUser(parmars) {
    return requst({
        url: '/opcsUser/active',
        method: 'POST',
        data: parmars
    })
}

//用户下拉
export function userUpdown(parmars) {
    return requst({
        url: '/opcsUser/userUpdown',
        method: 'POST',
        data: parmars
    })
}
//用户下拉
export function getListByParam(parmars) {
    return requstUser({
        url: '/web/sapUser/getListByParam',
        method: 'POST',
        data: parmars
    })
}
//新增应用
export function opcsSupplier(parmars) {
    return requst({
        url: '/opcsSupplier',
        method: 'POST',
        data: parmars
    })
}





