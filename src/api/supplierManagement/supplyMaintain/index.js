/*
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-10-09 10:18:42
 * @LastEditors: Please set LastEditors
 * @Descripttion: your project
 */
import axios from '@/utils/axios'

const requst = axios(process.env.VUE_APP_NTIER + '/web/ntier')
const request = axios(process.env.VUE_APP_NTIER + '/api/ntier')

// 查询-供应链路维护(card)批量查询
export function cardChain(parmars) {
  return requst({
    url: '/ntierChain/cardChain',
    method: 'POST',
    data: parmars
  })
}
// 查询--供应商名称
export function queryByParamsDropDownWithAuth(parmars) {
  return requst({
    url: '/ntierSupplier/queryByParamsDropDownWithAuth',
    method: 'POST',
    data: parmars
  })
}
// 查询--总成零件
export function queryPart(parmars) {
  return requst({
    url: '/ntierSupply/queryPart',
    method: 'POST',
    data: parmars
  })
}
// 查询--总成零件
export function queryPagePart(parmars) {
  return requst({
    url: '/ntierSupply/queryPagePart',
    method: 'POST',
    data: parmars
  })
}
// 查询--n-tier供应商信息综合查询
export function querycardChainId(parmars) {
  return requst({
    url: `/ntierSupplier/mainQuery/${parmars}`,
    method: 'GET',
    data: parmars
  })
}
// 查询--保存
export function mainSave(parmars) {
  return requst({
    url: `/ntierSupplier/mainSave`,
    method: 'POST',
    data: parmars
  })
}
// 查询--n-tier供应商链路节点查询供应商上下游供应商信息
export function queryUpDown(parmars) {
  return requst({
    url: `/ntierSupplier/queryUpDown`,
    method: 'POST',
    data: parmars
  })
}
// 查询--添加上游供应商
export function add(parmars) {
  return requst({
    url: `/ntierChain/add`,
    method: 'POST',
    data: parmars
  })
}
// 查询--删除链路节点
export function deleteNode(parmars) {
  return requst({
    url: `/ntierChain/delete`,
    method: 'POST',
    data: parmars
  })
}
// 查询--供应链复制节点
export function copyNode(parmars) {
  return requst({
    url: `/ntierChain/copy`,
    method: 'POST',
    data: parmars
  })
}
// 查询--零件号
export function queryPartNumber(parmars) {
  return requst({
    url: `/ntierChainPart/queryByParams`,
    method: 'POST',
    data: parmars
  })
}
// 查询--零件号(分页)
export function pageQueryByParams(parmars) {
  return requst({
    url: `/ntierChainPart/pageQueryByParams`,
    method: 'POST',
    data: parmars
  })
}
// 查询--供应链路线拖动
export function change(parmars) {
  return requst({
    url: `/ntierChain/change`,
    method: 'POST',
    data: parmars
  })
}
// 查询--供应链路线拖动
export function deletePart(parmars) {
  return requst({
    url: `/ntierChainPart/delete`,
    method: 'POST',
    data: parmars
  })
}
// --供应商注册邀请
export function invitation(parmars) {
  return requst({
    url: `/ntierSupplier/invitation`,
    method: 'POST',
    data: parmars
  })
}

// // --供应商注册邀请
// export function chain(parmars) {
//   console.log(`bkm/chain/` + parmars.supplierId + '/' + parmars.tlk)
//   return request({
//     url: `bkm/chain/` + parmars.supplierId + '/' + parmars.tlk,
//     method: 'GET'
//   })
// }

export function chain(params) {
  return requst({
    url: `bkm/chain`,
    method: 'POST',
    data: params
  })
}
