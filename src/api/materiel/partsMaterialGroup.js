import axios from '@/utils/axios'
import axiosDownload from '@/utils/axios.download'

const request = axios(process.env.VUE_APP_MATERIEL)
const requestDownload = axiosDownload(process.env.VUE_APP_MATERIEL)
const requstDIC = axios(process.env.VUE_APP_BASE_INFO)

//材料组详情通过零件六位号查询
export function getSixnumDetail(data) {
  return request({
    url: 'web/sixNumPartPaged',
    method: 'POST',
    data
  })
}
//根据查询条件查询出材料组信息（分页）
export function partMaterialTableList(data) {
  return request({
    url: 'web/categoryPage',
    method: 'POST',
    data
  })
}

//根据材料组Id查询出材料组信息
export function partMaterialDetail(data) {
  let id = data
  return request({
    url: 'web/categoryById',
    method: 'GET',
    params: { id }
  })
}

//根据材料组信息（Id）查询关联的linie相关信息 如： linieId，linie部门
export function linieInformations(data) {
  let categoryId = data
  return request({
    url: '/web/linieInfoByCategoryId',
    method: 'GET',
    params: { categoryId }
  })
}

//材料组零件六位号列表
export function sixPartNumList(data) {
  return request({
    url: '/web/querySixNumPartByCondition',
    method: 'POST',
    data
  })
}

//工艺组列表
export function stuffPagedList(data) {
  return request({
    url: 'web/stuffPaged',
    method: 'POST',
    data
  })
}

//材料组CBD预设分页
export function CbdPresetList(data) {
  console.log(data, 'c')
  return request({
    url: '/web/categoryCbdPaged',
    method: 'POST',
    data
  })
}

//工艺组新增/保存
export function technologySave(data) {
  return request({
    url: '/web/saveOrUpdStuff',
    method: 'POST',
    data
  })
}

//材料组CBD预设保存
export function CbdSaveList(data) {
  return request({
    url: '/web/categoryCbd',
    method: 'POST',
    data
  })
}

//材料组CBD预设修改
export function CbdChangeList(data) {
  return request({
    url: '/web/categoryCbd',
    method: 'PUT',
    data
  })
}

//材料组CBD预设删除
export function CbdDeleteList(data) {
  return request({
    url: '/web/categoryCbd',
    method: 'DELETE',
    data
  })
}

//材料组信息保存
export function savePartsMaterial(data) {
  return request({
    url: '/web/saveOrUpdCategory',
    method: 'POST',
    data
  })
}

//保存零件六位号
export function saveSixParts(data) {
  return request({
    url: '/saveSixNumPart',
    method: 'POST',
    data
  })
}

//根根据零件六位号查询 第一个绑定改零件六位号的零件
export function getChangeSixParts(data) {
  let sixPartNum = data
  return request({
    url: '/web/queryFirstBindingSixPartNum',
    method: 'GET',
    params: { sixPartNum }
  })
}

//根据工艺组id delete工艺组详情信息
export function deleteTechnology(data) {
  return request({
    url: '/web/stuffBatchDeleteByIds',
    method: 'DELETE',
    data
  })
}

//根据条件查询BDL分页信息信息
export function searchBdlTableList(data) {
  return request({
    url: '/web/bdlPaged',
    method: 'POST',
    data
  })
}

//根据工艺组id查询工艺组详情信息
export function searchTechnologyForm(data) {
  let id = data
  return request({
    url: '/web/stuffById',
    method: 'GET',
    params: { id }
  })
}

//批量删除零件六位号和材料组关联关系
export function deleteSizeParts(data) {
  return request({
    url: '/web/batchDeleteSixPartNumRelation',
    method: 'DELETE',
    data
  })
}

//保存BLD信息
export function seaveBdl(data) {
  return request({
    url: '/web/bdl',
    method: 'POST',
    data
  })
}

//将供应商移除BDL信息
export function deleteBdl(data) {
  return request({
    url: '/web/bdls',
    method: 'DELETE',
    data
  })
}

//bdl供应商信息导入模板下载
export function downloadSupplierModel() {
  return requestDownload({
    url: '/web/bdlExcelTempDownload',
    method: 'POST'
  })
}

//BDL供应商数据导入
export function importBdl(data) {
  return request({
    url: '/web/excelImportBdl',
    method: 'POST',
    data
  })
}

//bdl供应商信息导出
export function exportBdl(data) {
  return requestDownload({
    url: '/web/bdlExcelExport',
    method: 'POST',
    data
  })
}

//材料组删除
export function deleteMaterial(data) {
  return request({
    url: '/web/categoryBatchDeleteByIds',
    method: 'DELETE',
    data
  })
}

//材料组列表导出
export function exportMaterial(data) {
  return requestDownload({
    url: 'web/categoryExcelExport',
    method: 'POST',
    data
  })
}

//数据字典
export function dataDic(keys, parentId) {
  return requstDIC({
    url: '/web/selectDictByKeys',
    method: 'GET',
    params: { keys, parentId }
  })
}

//计量单位下拉选择
export function getunitSelect() {
  return requstDIC({
    url: '/web/unitSelect',
    method: 'GET'
  })
}

export function checkPartsBindOther(data) {
  return request({
    url: '/checkOtherBindingRel',
    method: 'POST',
    data
  })
}
