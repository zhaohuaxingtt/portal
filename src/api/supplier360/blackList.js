import axios from '@/utils/axios'
const requst = axios(process.env.VUE_APP_SUPPLIER + '/web')

//一般供应商黑名单列表
export function gpSupplierBlackList(params) {
  return requst({
    url: '/gpSupplerBlack/gpSupplierBlackList',
    method: 'POST',
    data: params
  })
}
//移除黑名单
export function gpSupplierBlackRemove(params) {
  return requst({
    url: '/gpSupplerBlack/gpSupplierBlackRemove',
    method: 'POST',
    data: params
  })
}
//加入黑名单
export function gpSupplierBlackSave(params) {
  return requst({
    url: '/gpSupplerBlack/gpSupplierBlackSave',
    method: 'POST',
    data: params
  })
}
//获取状态
export function measuresTypeList(params) {
  return requst({
    url: '/gpSupplerBlack/measuresTypeList',
    method: 'get',
    params: params
  })
}

//获取状态
export function measuresTypeGPList(params) {
  return requst({
    url: '/gpSupplerBlack/measuresTypeList',
    method: 'POST',
    data: params
  })
}


//一般供应商黑名单历史分页
export function gpSupplerBlackListHistoryPage(params) {
  return requst({
    url: '/gpSupplerBlack/gpSupplerBlackListHistoryPage',
    method: 'POST',
    data: params
  })
}
//一般供应商黑名单状态列表
export function gpSupplerBlackListStatus(params) {
  return requst({
    url: '/gpSupplerBlack/gpSupplerBlackListStatus',
    method: 'POST',
    data: params
  })
}

//加入生产前期采购员接口
export function prePurchaseList(params) {
  return requst({
    url: '/ppSupplerBlack/prePurchaseList',
    method: 'POST',
    data: params
  })
}
//加入生产lineie采购员接口
export function liniePurchaseList(params) {
  return requst({
    url: '/ppSupplerBlack/liniePurchaseList',
    method: 'POST',
    data: params
  })
}
//加入生产材料组接口
export function categoryList(params) {
  return requst({
    url: '/ppSupplerBlack/categoryList',
    method: 'POST',
    data: params
  })
}
//加入生产的工艺组接口
export function listStuffByCategory(params) {
  return requst({
    url: '/ppSupplerBlack/listStuffByCategory',
    method: 'POST',
    data: params
  })
}
//加入生产的科室接口
export function prePurchaseDeptList(params) {
  return requst({
    url: '/ppSupplerBlack/prePurchaseDeptList',
    method: 'POST',
    data: params
  })
}

//加入生产的linie科室接口
export function liniePurchaseDeptList(params) {
  return requst({
    url: '/ppSupplerBlack/liniePurchaseDeptList',
    method: 'POST',
    data: params
  })
}

//移除生产材料组接口
export function categoryListSearch(params) {
  return requst({
    url: '/ppSupplerBlack/categoryListSearch',
    method: 'POST',
    data: params
  })
}
//移除生产采购员接口
export function purchaseListSearch(params) {
  return requst({
    url: '/ppSupplerBlack/purchaseListSearch',
    method: 'POST',
    data: params
  })
}
//移除生产工艺组接口
export function stuffListSearch(params) {
  return requst({
    url: '/ppSupplerBlack/stuffListSearch',
    method: 'POST',
    data: params
  })
}

//保存生产黑名单
export function ppSupplerBlackSave(params) {
  return requst({
    url: '/ppSupplerBlack/ppSupplerBlackSave',
    method: 'POST',
    data: params
  })
}
//判断linie和普通
export function getBuyerType(params) {
  return requst({
    url: '/ppSupplerBlack/getBuyerType',
    method: 'POST',
    data: params
  })
}
//移除生产黑名单
export function ppSupplierBlackRemove(params) {
  return requst({
    url: '/ppSupplerBlack/ppSupplierBlackRemove',
    method: 'POST',
    data: params
  })
}
//移除生产黑名单查询列表
export function ppSupplerBlackListPage(params) {
  return requst({
    url: '/ppSupplerBlack/ppSupplerBlackListPage',
    method: 'POST',
    data: params
  })
}
//生产黑名单历史记录查询
export function ppSupplerBlackListHistoryPage(params) {
  return requst({
    url: '/ppSupplerBlackHistory/ppSupplerBlackListHistoryPage',
    method: 'POST',
    data: params
  })
}
//生产黑名单历史记录查询
export function ppSupplerBlackListStatusPage(params) {
  return requst({
    url: '/ppSupplerBlack/ppSupplerBlackListStatusPage',
    method: 'POST',
    data: params
  })
}
//生产黑名单历史记录科室查询
export function deptListSearch(params) {
  return requst({
    url: '/ppSupplerBlack/deptListSearch',
    method: 'POST',
    data: params
  })
}
//加入黑名单申请信息
export function supplierBlackListAudit(params) {
  return requst({
    url: '/ppSupplerBlack/supplierBlackListAudit',
    method: 'POST',
    data: params
  })
}
//加入黑名单申请列表
export function supplierBlackListAuditPage(params) {
  return requst({
    url: '/ppSupplerBlack/supplierBlackListAuditPage',
    method: 'POST',
    data: params
  })
}
//加入黑名单申审批
export function blackApprove(params) {
  return requst({
    url: '/ppSupplerBlack/blackApprove',
    method: 'POST',
    data: params
  })
}
//查询供应商信息
export function getSupplerInfo(params) {
  return requst({
    url: '/ppSupplerBlack/getSupplerInfo',
    method: 'get',
    params: params
  })
}
//校验加入黑名单是否已经全部加入
export function checkAddBlackIsFull(params) {
    return requst({
      url: '/ppSupplerBlack/checkAddBlackIsFull',
      method: 'post',
      data: params
    })
  }
