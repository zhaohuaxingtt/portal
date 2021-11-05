/*
组织管理网络请求模块
*/

import axios from '@/utils/axios'
import axiosDownload from '@/utils/axios.download'

const requst = axios(process.env.VUE_APP_USER_CENTER)

const requstOrgLevel = axios(process.env.VUE_APP_BASE_INFO)
const requestDownload = axiosDownload(process.env.VUE_APP_USER_CENTER)

//组织查看
export function getOrganizationStructure(params, data) {
  return requst({
    url: `/web/task/findBizTask/${params.pageNum}/${params.pageSize}`,
    method: 'POST',
    data: data,
    params: params
  })
}

// //部门树
export function queryOrganizationStructure(data) {
  return requst({
    url: `/web/dept/treeList`,
    method: 'POST',
    data: data
  })
}

//获取组织数据列表
export function getOrganizationList(params, data) {
  return requst({
    url: `/web/dept/treeList`,
    method: 'POST',
    data: data,
    params: params
  })
}

//通过条件查询组织
export function searchOrganizationByOptions(params, data) {
  return requst({
    url: `/web/task/findBizTask/${params.pageNum}/${params.pageSize}`,
    method: 'POST',
    data: data,
    params: params
  })
}

//创建组织
export function createOrganization(params, data) {
  return requst({
    url: `/web/dept/save`,
    method: 'POST',
    data: data,
    params: params
  })
}

//编辑组织
export function editOrganization(params, data) {
  return requst({
    url: `/web/dept/update`,
    method: 'POST',
    data: data,
    params: params
  })
}

//删除组织
export function deleteOrganization(params, data) {
  return requst({
    url: `/web/dept/deleteBatch`,
    method: 'POST',
    data: data,
    params: params
  })
}

//根据ID查询部门信息
export function searchOrganizationByID(params, data) {
  return requst({
    url: `/web/dept/detail`,
    method: 'GET',
    data: data,
    params: params
  })
}

//导出组织
export function exportOrganization(data) {
  return requestDownload({
    url: `/web/dept/exprotOrgTree`,
    method: 'POST',
    data: data
  })
}

//组织级别数据列表
export function orgLevelListData(params, data) {
  return requstOrgLevel({
    url: `/web/selectDictByKeys`,
    method: 'GET',
    data: data,
    params: params
  })
}

//组织维度列表
export function orgDimensionList(params, data) {
  return requst({
    url: `/web/permission/list`,
    method: 'POST',
    data: data
  })
}

//根据父级组织获取维度列表
export function parentOrgDimensionList(params) {
  return requst({
    url: `/web/permission/deptPermissionList`,
    method: 'GET',
    params
  })
}

//通过key请求维度的子维度列表
export function orgChildrenDimensionList(url, params, data) {
  return requst({
    url: url,
    method: 'GET',
    data: data,
    params: params
  })
}

//部门下拉
export function organizationMenu(params, data) {
  return requst({
    url: `/web/dept/pageList`,
    method: 'POST',
    data: data,
    params: params
  })
}

//组织标签列表
export function organizationTagList(params, data) {
  return requst({
    url: `/web/tag/list`,
    method: 'POST',
    data: data,
    params: params
  })
}

//批量创建组织标签 tagList
export function createOrganizationTag(params, data) {
  return requst({
    url: `/web/tag/saveBatch`,
    method: 'POST',
    data: data,
    params: params
  })
}

//批量删除组织标签 tagList
export function deleteOrganizationTag(params, data) {
  return requst({
    url: `/web/tag/list`,
    method: 'POST',
    data: data,
    params: params
  })
}
