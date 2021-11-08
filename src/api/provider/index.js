import axios from '@/utils/axios'
import axiosDownload from '@/utils/axios.download'

// 供应商管理网络请求模块
const requst = axios(process.env.VUE_APP_USER_CENTER)
const requestDownload = axiosDownload(process.env.VUE_APP_USER_CENTER)

/*
供应商用户管理
*/

//供应商列表
export function providerList(data) {
  return requst({
    url: `/web/supplierUser/pageList`,
    method: 'POST',
    data: data
  })
}

//解冻账号
export function delockAccount(data) {
  return requst({
    url: `/api/supplierUser/unfreezeBatch`,
    method: 'POST',
    data: data
  })
}

//冻结账号
export function lockAccount(data) {
  return requst({
    url: `/api/supplierUser/freezeBatch`,
    method: 'POST',
    data: data
  })
}

//供应商详情
export function providerDetail(data) {
  return requst({
    url: `/web/supplierUser/getDetailByParams`,
    method: 'POST',
    data: data
  })
}

//更新供应商信息
export function updateProvider(data) {
  return requst({
    url: `/api/supplierUser/updateBatch`,
    method: 'POST',
    data: data
  })
}

//获取供应商系统信息
export function providerExport(data) {
  return requestDownload({
    url: `/web/supplierUser/exportExcel`,
    method: 'POST',
    data: data
  })
}

/*
供应商系统管理
*/

//获取供应商系统列表
export function sysList(data) {
  return requst({
    url: `/web/supplierUser/application/getPageList`,
    method: 'POST',
    data: data
  })
}

//删除供应商系统
export function deleteSys(data) {
  return requst({
    url: `/web/supplierUser/application/batchDeleteApplication`,
    method: 'POST',
    data: data
  })
}

//创建供应商系统
export function createSys(data) {
  return requst({
    url: `/web/supplierUser/application/createApplication`,
    method: 'POST',
    data: data
  })
}

//编辑供应商系统
export function editSys(data) {
  return requst({
    url: `/web/supplierUser/application/updateApplication`,
    method: 'POST',
    data: data
  })
}

//通过ID获取供应商系统信息
export function sysDetail(data) {
  return requst({
    url: `/web/supplierUser/application/getDetailByParam`,
    method: 'POST',
    data: data
  })
}

//获取供应商系统信息
export function sysExport(data) {
  return requestDownload({
    url: `/web/supplierUser/application/exportExcel`,
    method: 'POST',
    data: data
  })
}

/*
供应商授权
*/

//授权列表
// export function authList(data) {
//     return requst({
//         url: `/web/supplierUser/application/authorize`,
//         method: 'POST',
//         data: data,
//     })
// }

//授权
export function auth(data) {
  return requst({
    url: `/web/supplierUser/application/authorize`,
    method: 'POST',
    data: data
  })
}

//取消授权
export function cancelAuth(data) {
  return requst({
    url: `/web/supplierUser/application/cancelAuthorize`,
    method: 'POST',
    data: data
  })
}

//详情页已授权列表
export function authList(data) {
  return requst({
    url: `/web/supplierUser/application/getAuthorizePageList`,
    method: 'POST',
    data: data
  })
}

//获取供应商用户列表
export function sysUserList(data) {
  return requst({
    url: `/web/supplierUser/list`,
    method: 'POST',
    data: data
  })
}

//获取供应商授权导出
export function authExport(data) {
  return requestDownload({
    url: `/web/supplierUser/exportExcel`,
    method: 'POST',
    data: data
  })
}
// 根据参数获取资源
export function fetchSupplierRootMenu() {
  return requst({
    url: `/web/resource/getSupplierRootMenu`
  })
}
