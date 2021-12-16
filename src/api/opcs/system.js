/*
 * @Date: 2021-12-16 17:27:41
 * @LastEditors: caopeng
 * @LastEditTime: 2021-12-16 18:03:45
 * @FilePath: \front-portal-new\src\api\opcs\system.js
 */
import axios from '@/utils/axios'
import axiosDownload from '@/utils/axios.download'
const requst = axios(process.env.VUE_APP_SUPPLIER + '/web')
const requestDownload = axiosDownload(process.env.VUE_APP_SUPPLIER + '/web')

//联系人与用户管理--详情列表--操作新增
export function operationAdd(parmars) {
    return requst({
        url: '/opcsUser/operationAdd',
        method: 'POST',
        data: parmars
    })
}
//应用管理--授权列表--查询
export function operationQuery(parmars) {
    return requst({
        url: '/opcsUser/operationQuery',
        method: 'POST',
        data: parmars
    })
}