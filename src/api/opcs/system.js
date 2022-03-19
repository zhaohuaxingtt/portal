/*
 * @Date: 2021-12-16 17:27:41
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-01-27 00:28:13
 * @FilePath: \front-portal-new\src\api\opcs\system.js
 */
import axios from '@/utils/axios'
const requst = axios(process.env.VUE_APP_SUPPLIER + '/web')

//联系人与用户管理--详情列表--操作新增
export function operationAdd(parmars) {
  return requst({
    url: '/opcsUser/operationAdd',
    method: 'POST',
    data: parmars
  })
}
//应用管理--授权列表--可添加应用权限查询
export function unBindingOperationQuery(parmars) {
  return requst({
    url: '/opcsUser/unBindingOperationQuery',
    method: 'POST',
    data: parmars
  })
}
//应用管理--授权列表--已有应用权限
export function operationQuery(parmars) {
  return requst({
    url: '/opcsUser/operationQuery',
    method: 'POST',
    data: parmars
  })
}


//应用管理--授权列表--移除
export function operationRemove(parmars) {
  return requst({
    url: '/opcsUser/operationRemove',
    method: 'POST',
    data: parmars
  })
}
//应用管理--授权列表--关联应用
export function relateQuery(parmars) {
  return requst({
    url: '/opcsSupplierApps/unbindingQuery/' + parmars.opcsSupplierId,
    method: 'POST',
    data: parmars
  })
}
//应用管理--授权列表--关联应用
export function relateQueryBinding(parmars) {
  return requst({
    url: `/opcsSupplierApps/binding/${parmars.opcsSupplierId}`,
    method: 'POST',
    data: parmars
  })
}
