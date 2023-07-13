import axios from '@/utils/axios'
import axiosDownload from '@/utils/axios.download'

const requst = axios(process.env.VUE_APP_MATERIEL)
const requestDownload = axiosDownload(process.env.VUE_APP_MATERIEL)

//获取table页数据
export function marerielTableList(data) {
  return requst({
    url: '/web/partInfoPaged',
    method: 'POST',
    data: data
  })
}

//通过ID获取信息
export function getMaterielById(params) {
  return requst({
    url: `/web/part/${params}`,
    method: 'GET',
    params: params
  })
}

//新建零件信息保存--草稿draft
export function saveMateriel(params) {
  return requst({
    url: `/web/part/draft`,
    method: 'POST',
    data: params
  })
}

//新建零件信息保存--激活active
export function saveActive(params) {
  return requst({
    url: `/web/part/active`,
    method: 'POST',
    data: params
  })
}

//根据查询条件导出
export function exprtExcel(params) {
  return requestDownload({
    url: '/web/part/export',
    method: 'POST',
    data: params
  })
}

//专业组下拉数据
export function getProGroupOptions(params) {
  return requst({
    url: '/web/part/fgGroupSelect',
    method: 'GET',
    params: params
  })
}

//零件信息更新
export function upDateMateriel(params) {
  return requst({
    url: `/web/part/update`,
    method: 'POST',
    data: params
  })
}

//查询条件下拉数据
export function searchOptions(params) {
  return requst({
    url: '/web/part/selectData',
    method: 'POST',
    data: params
  })
}

//失效接口
export function invalidPort(params) {
  return requst({
    url: `/web/part/invalid/${params}`,
    method: 'POST',
    data: params
  })
}

//生效接口
export function activePort(params) {
  return requst({
    url: `/web/part/active/${params}`,
    method: 'POST',
    data: params
  })
}

//零件材料组数据下拉框
export function materielGroup(params) {
  return requst({
    url: '/web/materialGroupSelectDict',
    method: 'GET',
    params: params
  })
}

//基础单位下拉
export function materielUnit(params) {
  return requst({
    url: '/web/part/getUnits',
    method: 'GET',
    params: params
  })
}

//根据零件6位号获取材料组id
export function getMaterielGroup(params) {
  return requst({
    url: '/web/part/queryCategoryByPartNum',
    method: 'GET',
    params: params
  })
}

//获取计量单位tableList
export function getUnitList(params) {
  return requst({
    url: `/web/part/unitBindings/${params}`,
    method: 'GET',
    data: params
  })
}

//保存计量单位tableList
export function saveUnitList(params) {
  return requst({
    url: '/web/part/unitBinding',
    method: 'POST',
    data: params
  })
}

// 查询采购员
export function queryPurchasers(id) {
  return requst({
    url: `/web/part/${id}`
  })
}

// 间接物料列表分页查询
export function indirectMaterialPage(data) {
  return requst({
    url: `/web/indirectMaterial/paged`,
    method: 'POST',
    data
  })
}

// 间接物料数据导出
export function indirectMaterialPageExport(data) {
  return requestDownload({
    url: `/web/indirectMaterial/export`,
    method: 'POST',
    data
  })
}

// 间接物料信息详情
export function indirectMaterialDetail(id) {
  return requst({
    url: `/web/indirectMaterial/detail/${id}`
  })
}

// 间接物料单位换算关系列表
export function unitBindList(bizId) {
  return requst({
    url: `/web/indirectMaterial/unitBindList/${bizId}`
  })
}

// 间接物料单位换算关系绑定(新增以及修改)
export function unitBinding(data) {
  return requst({
    url: `/web/indirectMaterial/unitBinding`,
    method: 'POST',
    data
  })
}

// 间接物料单位换算关系绑定删除
export function unitBindRemove(data) {
  return requst({
    url: `/web/indirectMaterial/unitBindRemove`,
    method: 'POST',
    data
  })
}