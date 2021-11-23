import OrgList from '../views/org/list/index'
import OrgCreate from '../views/org/create/index'
import OrgTagCreate from '../views/org/create/organizationTag/index'

export const CfOrgChart = [
  {
    path: '/cf-org/chart',
    name: 'orgChart',
    meta: {
      title: '组织架构图',
      activeMenu: ['RISE_COMMON_FUNCTION', 'CF_PRO_CS'] // 一级菜单,二级菜单
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
    component: OrgList,
    activeMenu: ['RISE_ADMIN', 'ADMIN_PRO_CS'] // 一级菜单,二级菜单
  },
  {
    path: '/org/create/:id?/:type?/:upLevelID?/:upLevelName?',
    name: 'orgCreate',
    meta: {
      title: '创建组织机构',
      activePath: '/org/create',
      activeMenu: ['RISE_ADMIN', 'ADMIN_PRO_CS'] // 一级菜单,二级菜单
    },
    component: OrgCreate
  },
  {
    path: '/org/create/organizationTag',
    name: 'orgTagCreate',
    meta: {
      title: '创建组织标签',
      activeMenu: ['RISE_ADMIN', 'ADMIN_PRO_CS'] // 一级菜单,二级菜单
    },
    component: OrgTagCreate
  }
]
