import axios from '@/utils/axios'
import axiosDownload from '@/utils/axios.download'

const request = axios(process.env.VUE_APP_MATERIEL)
const requestDownload = axiosDownload(process.env.VUE_APP_MATERIEL)

//获取table页数据
export function queryMouldGruops(data) {
  return request({
    url: '/web/moldGroupPaged',
    method: 'POST',
    data
  })
}

export function deleteMouldGruops(data) {
  return request({
    url: '/web/mtzMoldGroupBatchDelete',
    method: 'delete',
    data
  })
}

export function queryMouldGroup(params) {
  return request({
    url: '/web/queryMoldGroupById',
    params
  })
}

export function saveMould(data) {
  return request({
    url: '/web/saveOrUpdMoldGroup',
    method: 'POST',
    data
  })
}

export function queryMouldRelationsByGroupByCode(data) {
  return request({
    url: '/web/queryRealtionByMoldGroupCode',
    method: 'POST',
    data
  })
}

export function saveMouldRelationByGroupId(data) {
  return request({
    url: '/web/saveMoldGroupCategoryRelation',
    method: 'POST',
    data
  })
}

export function exportMouldGroups(data) {
  return requestDownload({
    url: '/web/moldGroupExport4Excel',
    method: 'POST',
    data
  })
}

/// 查询出材料组信息 并且标注其是否被模具材料组使用
export function queryCategoryVo4MoldGroup(data) {
  return request({
    url: '/web/queryCategoryVo4MoldGroup',
    method: 'POST',
    data
  })
}
