import axios from '@/utils/axios'
import axiosDownload from '@/utils/axios.download'
// 供应商管理网络请求模块
const requst = axios(process.env.VUE_APP_USER_CENTER)
const requstcg = axios(process.env.VUE_APP_BASE_INFO)
const requestFile = axios(process.env.VUE_APP_FILEAPI + '/fileud')
const requestDownload = axiosDownload(process.env.VUE_APP_USER_CENTER)
/*
供应商用户管理
*/

// 删除员工
export function deleteUsers(data) {
  return requst({
    url: `/web/sapUser/deleteBatch`,
    method: 'post',
    data: data
  })
}
// 查询员工
export function detail(data) {
  return requst({
    url: `/web/sapUser/detail?id=${data.id}`,
    method: 'get'
  })
}
// 编辑员工
export function update(data) {
  console.log(data)
  return requst({
    url: `/web/sapUser/update`,
    method: 'post',
    data: data
  })
}
// 员工列表
export function getPageListByParams(data) {
  return requst({
    url: '/web/sapUser/pageList',
    method: 'post',
    data: data
  })
}

export function getSapUserDropdownList(data) {
  return requst({
    url: '/web/sapUser/dropDownList',
    method: 'post',
    data: data
  })
}
//
export function getUserSelectPageList(data) {
  return requst({
    url: '/web/account/pageList',
    method: 'post',
    data
  })
}

export function getSpUserList(data) {
  return requst({
    url: '/web/sapUser/pageList',
    method: 'post',
    data
  })
}
// 导出用户
export function exportExcel(data) {
  return requestDownload({
    url: `/web/sapUser/exportExcel`,
    method: 'post',
    data
  })
}

export function getUserListByIDs(data) {
  return requst({
    url: '/web/sapUser/getListByParam',
    method: 'POST',
    data: data
  })
}

//   部门下拉
export function getDeptDropDownList(data) {
  return requst({
    url: '/web/dept/dropDownList',
    method: 'post',
    data: data
  })
}
//  新增
export function addUser(data) {
  return requst({
    url: '/web/sapUser/save',
    method: 'post',
    data: data
  })
}
//  岗位下拉
export function positionList(data) {
  return requst({
    url: '/web/position/dropDownList',
    method: 'post',
    data: data
  })
}
//  标签
export function organizationTagList(data) {
  return requst({
    url: `/web/tag/list`,
    method: 'POST',
    data: data
  })
}

//  采购组
export function getPosition(data) {
  return requst({
    url: `/web/position/detail?id=${data}`,
    method: 'get'
  })
}

//采购组徐睿接口
export function purchasegroup(data) {
  return requstcg({
    url: `/web/purchaseGroup`,
    method: 'get',
    params: { purchaseGroupCode: data }
  })
}

export function uploadSignImage(data) {
  return requestFile({
    url: `/udSignaturephoto`,
    method: 'post',
    data
  })
}

//采购分类列表
export function page(data) {
  return requstcg({
    url: `/web/material/page`,
    method: 'post',
    data
  })
}
