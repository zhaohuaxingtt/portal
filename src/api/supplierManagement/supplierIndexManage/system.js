import axios from '@/utils/axios'
import axiosDownload from '@/utils/axios.download'

const requst = axios(process.env.VUE_APP_SUPPLIER + '/web')
const requestDownload = axiosDownload(process.env.VUE_APP_SUPPLIER + '/web')
//获取科室协调人列表
export function getModelAlignmentByDeptCode(id) {
    return requst({
        url: '/performanceModelPermissions/getModelAlignmentByDeptCode?deptCode=' + id,
        method: 'GET',
    })
}
// 获取绩效模型维护人列表
export function getModelPermissionsAdmin() {
    return requst({
        url: '/performanceModelPermissions/getModelPermissionsAdmin',
        method: 'GET',
    })
}
// 添加模型评分权限
export function updateModelScorePermission(parmars) {
    return requst({
        url: '/performanceModelPermissions/updateModelScorePermission',
        method: 'POST',
        data: parmars
    })
}
// 修改模型评分权限
export function addModelScorePermission(parmars) {
    return requst({
        url: '/performanceModelPermissions/addModelScorePermission',
        method: 'POST',
        data: parmars
    })
}
// 获取模型需要定义的层级数据
export function getModelPermissionsLevel(parmars) {
    return requst({
        url: '/performanceModelPermissions/getModelPermissionsLevel?modelId=' + parmars,
        method: 'GET',
    })
}
// 添加绩效模型编辑权限
export function updateModelEditPermission(parmars) {
    return requst({
        url: '/performanceModelPermissions/updateModelEditPermission',
        method: 'POST',
        data: parmars
    })
}
// 添加绩效模型编辑权限
export function addModelEditPermission(parmars) {
    return requst({
        url: '/performanceModelPermissions/addModelEditPermission',
        method: 'POST',
        data: parmars
    })
}
// 获取绩效模型编辑权限
export function getModelEditPermission(parmars) {
    return requst({
        url: '/performanceModelPermissions/getModelEditPermission',
        method: 'POST',
        data: parmars
    })
}
// 获取模型评分权限
export function getModelScorePermission(parmars) {
    return requst({
        url: '/performanceModelPermissions/getModelScorePermission',
        method: 'POST',
        data: parmars
    })
}
// 
// 删除模型编辑权限
export function delModelEditPermission(parmars) {
    return requst({
        url: '/performanceModelPermissions/delModelEditPermission',
        method: 'POST',
        data: parmars
    })
}
// 删除模型评分权限
export function delModelScorePermission(parmars) {
    return requst({
        url: '/performanceModelPermissions/delModelScorePermission',
        method: 'POST',
        data: parmars
    })
}
// 添加手工指标
export function getIndicatorR2AndR1Dept(parmars) {
    return requst({
      url: '/indicatorLibrary/getIndicatorR2AndR1Dept',
      method: 'POST',
      data: parmars
    })
  }