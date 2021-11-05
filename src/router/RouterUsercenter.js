import OrgList from '../views/org/list/index'
import OrgCreate from '../views/org/create/index'
import OrgTagCreate from '../views/org/create/organizationTag/index'

export const CfOrgChart = [
  {
    path: '/cf-org/chart',
    name: 'orgChart',
    meta: {
      title: '组织架构图',
      top: 'RISE_COMMON_FUNCTION' // 一级菜单 选中与否 flag
    },
    component: () => import('@/views/org/chart')
  }
]

export default [
  {
    path: '/org/list',
    name: 'orgList',
    meta: {
      title: '组织管理',
      top: 'admin' // 一级菜单 选中与否 flag
    },
    component: OrgList
  },
  {
    path: '/org/create/:id?/:type?/:upLevelID?/:upLevelName?',
    name: 'orgCreate',
    meta: {
      title: '创建组织机构',
      activePath: '/org/create',
      top: 'admin' // 一级菜单 选中与否 flag
    },
    component: OrgCreate
  },
  {
    path: '/org/create/organizationTag',
    name: 'orgTagCreate',
    meta: {
      title: '创建组织标签',
      top: 'admin' // 一级菜单 选中与否 flag
    },
    component: OrgTagCreate
  }
]
