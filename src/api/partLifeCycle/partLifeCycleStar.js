/*
 * @Author: YZ
 * @Date: 2021-10-08
 */
import axios from '@/utils/axios'

const VUE_APP_PARTSFOLDER = axios(
  process.env.VUE_APP_RISEDASHBOARD + '/web/partsFolder'
)
const VUE_APP_PARTSCOLLECT = axios(
  process.env.VUE_APP_RISEDASHBOARD + '/web/partsCollect'
)
const VUE_APP_RELATIONPARTS = axios(
  process.env.VUE_APP_RISEDASHBOARD + '/web/relationParts'
)

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
