import axios from '@/utils/axios'
import axiosDownload from '@/utils/axios.download'

const requst = axios(process.env.VUE_APP_USER_CENTER)
const requestDownload = axiosDownload(process.env.VUE_APP_USER_CENTER)

export function fetchRoles(data) {
  return requst({
    url: '/web/role/pageList',
    method: 'POST',
    data
  })
}

/**
 * 获取全部资源，type: 3 菜单, 2 控件
 * @param {*} data
 * @returns
 */
export function fetchResource(data) {
  return requst({
    url: '/web/resource/list',
    method: 'POST',
    data
  })
}

/**
 * 获取角色详情
 * @param {*} params
 * @returns
 */
export function fetchRoleDetail(params) {
  return requst({
    url: '/web/role/detail',
    params
  })
}

/**
 * 配置角色功能权限
 * @param {*} params
 * @returns
 */
export function configRoleFunction(data) {
  return requst({
    url: '/web/role/function/config',
    method: 'POST',
    data
  })
}

/**
 * 配置角色数据权限
 * @param {*} params
 * @returns
 */
export function configRoleData(data) {
  return requst({
    url: '/web/role/data/config',
    method: 'POST',
    data
  })
}

/**
 * 获取数据权限菜单
 * @param {*} params
 * @returns
 */
export function fetchRoleDataMenu(params) {
  return requst({
    url: '/web/role/detail',
    params
  })
}

/**
 * 使用该角色的岗位
 * @param {*} params
 * @returns
 */
export function positionListOfRole(params) {
  return requst({
    url: '/web/position/pageList',
    method: 'POST',
    data: params
  })
}

/**
 * 使用该角色的用户
 * @param {*} params
 * @returns
 */
export function usersListOfRole(params) {
  return requst({
    url: '/web/sapUser/pageList',
    method: 'POST',
    data: params
  })
}

/**
 * 导出角色用户
 * @param {*} params
 * @returns
 */
export function downloadRoleUsers(params) {
  return requestDownload({
    url: '/web/sapUser/exportSapRoleList',
    params
  })
}

/**
 * 导出角色
 * @param {*} params
 * @returns
 */
export function downloadRoles(params) {
  return requestDownload({
    url: '/web/role/exportRoleList',
    params
  })
}
