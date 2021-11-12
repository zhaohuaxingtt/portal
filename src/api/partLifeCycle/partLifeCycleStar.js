/*
 * @Author: YZ
 * @Date: 2021-10-08
 */
import axios from '@/utils/axios'

const VUE_APP_PARTSFOLDER = axios(process.env.VUE_APP_RISEDASHBOARD + '/web/partsFolder')
const VUE_APP_PARTSCOLLECT = axios(process.env.VUE_APP_RISEDASHBOARD + '/web/partsCollect')
const VUE_APP_RELATIONPARTS = axios(process.env.VUE_APP_RISEDASHBOARD + '/web/relationParts')
const VUE_APP_PARTSCARD = axios(process.env.VUE_APP_RISEDASHBOARD + '/web/partsCard')


// 收藏夹及收藏零件查询
export function getFolderPartsList(params) {
  return VUE_APP_PARTSFOLDER({
    url: '/getFolderPartsList',
    method: 'GET',
    params
  })
}

// 新建标签
export function insert(params) {
  return VUE_APP_PARTSFOLDER({
    url: '/insert',
    method: 'GET',
    params
  })
}

// 已有标签
export function getFolderCombo(params) {
  return VUE_APP_PARTSFOLDER({
    url: '/getFolderCombo',
    method: 'GET',
    params
  })
}

// 获取默认零件卡片
export function defaultParts(params) {
  return VUE_APP_PARTSCOLLECT({
    url: '/defaultParts',
    method: 'GET',
    params
  })
}

// 收藏、取消收藏（默认文件夹）
export function cancelOrCollect(params) {
  return VUE_APP_PARTSCOLLECT({
    url: '/cancelOrCollect',
    method: 'GET',
    params
  })
}

// 移除收藏零件
export function removeCollect(params) {
  return VUE_APP_PARTSCOLLECT({
    url: '/removeCollect',
    method: 'GET',
    params
  })
}

// 获取相关零件列表
export function getRelationParts(params) {
  return VUE_APP_RELATIONPARTS({
    url: '/getRelationParts',
    method: 'GET',
    params
  })
}

// 获取科室下拉信息
export function getDepartmentsCombo(params) {
  return VUE_APP_RELATIONPARTS({
    url: '/getDepartmentsCombo',
    method: 'GET',
    params
  })
}

// 认领零件默认给自己
export function assignOneself(params) {
  return VUE_APP_RELATIONPARTS({
    url: '/assignOneself',
    method: 'GET',
    params
  })
}

// 获取岗位信息
export function getRoleName(params) {
  return VUE_APP_RELATIONPARTS({
    url: '/getRoleName',
    method: 'GET',
    params
  })
}

// 获取LINIE下拉信息；如deptId不为空，则为条件查询
export function liniePullDownByDept(params) {
  return VUE_APP_RELATIONPARTS({
    url: '/liniePullDownByDept',
    method: 'GET',
    params
  })
}

// 获取LINIE下拉信息；如deptId不为空，则为条件查询
export function confirmParts(data) {
  return VUE_APP_RELATIONPARTS({
    url: '/confirmParts',
    method: 'POST',
    data
  })
}

// 保存
export function save(data) {
  return VUE_APP_PARTSFOLDER({
    url: '/save',
    method: 'POST',
    data
  })
}

// 多选标签&新增标签&收藏零件
export function multipleAndCollect(data) {
  return VUE_APP_PARTSFOLDER({
    url: '/multipleAndCollect',
    method: 'POST',
    data
  })
}

// Aeko号下拉列表
export function getAekoPullDown(params) {
  return VUE_APP_PARTSCARD({
    url: '/getAekoPullDown',
    method: 'GET',
    params
  })
}

// 科室下拉列表
export function getDepartmentPullDown(params) {
  return VUE_APP_PARTSCARD({
    url: '/getDepartmentPullDown',
    method: 'GET',
    params
  })
}

// 采购工厂下拉列表
export function getFactoryPullDown(params) {
  return VUE_APP_PARTSCARD({
    url: '/getFactoryPullDown',
    method: 'GET',
    params
  })
}

// Eop状态下拉
export function getEopPullDown(params) {
  return VUE_APP_PARTSCARD({
    url: '/getEopPullDown',
    method: 'GET',
    params
  })
}

// 定点状态下拉
export function getFixedPointPullDown(params) {
  return VUE_APP_PARTSCARD({
    url: '/getFixedPointPullDown',
    method: 'GET',
    params
  })
}

// 品牌下拉
export function getBrandPullDown(params) {
  return VUE_APP_PARTSCARD({
    url: '/getBrandPullDown',
    method: 'GET',
    params
  })
}

// 车型下拉
export function getCarTypeDown(data) {
  return VUE_APP_PARTSCARD({
    url: '/getCarTypeDown',
    method: 'POST',
    data
  })
}

// 车型项目下拉
export function getCarTypePullDown(params) {
  return VUE_APP_PARTSCARD({
    url: '/getCarTypePullDown',
    method: 'GET',
    params
  })
}

// 当年在供下拉
export function getIsSupplyPullDown(params) {
  return VUE_APP_PARTSCARD({
    url: '/getIsSupplyPullDown',
    method: 'GET',
    params
  })
}

// 采购员下拉
export function getPurchaserPullDown(params) {
  return VUE_APP_PARTSCARD({
    url: '/getPurchaserPullDown',
    method: 'GET',
    params
  })
}


// 材料组列表
export function getCategoryPullDown(data) {
  return VUE_APP_PARTSCARD({
    url: '/getCategoryPullDown',
    method: 'POST',
    data
  })
}

// 默认卡片零件筛选查询
export function getPartsCollect(data) {
  return VUE_APP_PARTSCARD({
    url: '/getPartsCollect',
    method: 'POST',
    data
  })
}

