import axios from '@/utils/axios'
import axiosDownload from '@/utils/axios.download'

const request = axios(process.env.VUE_APP_MATERIEL)
const searchRequest = axios(process.env.VUE_APP_USER_CENTER)
const requestDownload = axiosDownload(process.env.VUE_APP_MATERIEL)
//获取table页数据
export function fetchGroupList(data) {
  return request({
    url: '/web/mtzMaterialGroupPaged',
    method: 'post',
    data
  })
}
// 导出
export function exportGroup(data) {
  return requestDownload({
    url: '/web/exportMtzMaterialGroup',
    method: 'post',
    data
  })
}

// 保存基本信息
export function saveBaseGroup(data) {
  return request({
    url: '/web/saveOrUpdMtzMaterialGroup',
    method: 'post',
    data
  })
}

// 获取基本信息
export function fetchBaseGroup(params) {
  return request({
    url: '/web/queryMtzMaterialGroupVo',
    params
  })
}

// 原材料中类下拉查询
export function fetchRawMaterial4SelectDict(params) {
  return request({
    url: '/web/queryRawMaterial4SelectDictVo',
    params
  })
}

export function batchUpdateStatus(data) {
  return request({
    url: '/web/batchSetStatus',
    method: 'post',
    data
  })
}

/******************* 材料组关联 ************************ */

// 查询关联材料组
export function fetchMaterialGroupRelation(params) {
  return request({
    url: '/web/queryCategoryByMtzMaterialGroupCode',
    params
  })
}

// 保存关联材料组
export function saveMaterialGroupRelation(data) {
  return request({
    url: '/web/saveOrUpdMtzGroupCategoryRelation',
    method: 'post',
    data
  })
}

/********************** 六位号关联 ************************* */
// 根据mtz材料组编号查询关联零件六位号信息
export function fetchSixNumPartsRelation(params) {
  return request({
    url: '/web/querySixNumPartsByMtzMaterialGroupCode',
    params
  })
}
// 保存六位号关联
export function saveSixNumPartsRelation(data) {
  return request({
    url: '/web/saveMtzGroupSixpartNumRelation',
    method: 'post',
    data
  })
}

/***************** 关联关系查看 **********************/
export function fetchRelations(data) {
  return request({
    url: '/web/mtzMaterialGroupRelationPaged',
    method: 'post',
    data
  })
}
export function exportRelationGroup(data) {
  return requestDownload({
    url: '/web/exportExcelMtzGroupRelation4Category',
    method: 'post',
    data
  })
}
export function exportRelationSixNum(data) {
  return requestDownload({
    url: '/web/exportExcelMtzGroupRelation4SixNumPart',
    method: 'post',
    data
  })
}

//部门列表条件查询
export function searchDepartmentList(data) {
  return searchRequest({
    url: `/api/dept/getDeptListByIdList?&deptIdList=${data.join(
      '&deptIdList='
    )}`,
    method: 'GET'
  })
}

// 根据关键词查询出材料组 并且将已被使用的材料组标注出来
export function queryCategoryVo4MtzMaterialGroup(data) {
  return request({
    url: '/web/queryCategoryVo4MtzMaterialGroup',
    method: 'post',
    data
  })
}

//  根据查询条件查询出零件六位号信息，并且将其已关联的零件六位号打上已使用标记
export function querySixNumPart4MtzMaterialGroup(data) {
  return request({
    url: '/web/querySixNumPart4MtzMaterialGroup',
    method: 'post',
    data
  })
}
