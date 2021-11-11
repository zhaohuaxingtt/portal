import RouterPosition, { CFPosition } from './RouterPosition'
import RouterUsercenter, { CfOrgChart } from './RouterUsercenter'
import RouterAuthorityMgmt from './RouterAuthorityMgmt'
import RouterProviderMgm from './RouterProviderMgm'
import RouterRole from './RouterRole'
export default [
  {
    path: '/ProCS',
    name: 'ProCS',
    meta: {
      title: 'ProCS'
    },
    component: () => import('@/layout/inner'),
    redirect: '/org/list',
    children: [
      ...RouterPosition,
      ...RouterUsercenter,
      ...RouterAuthorityMgmt,
      ...RouterProviderMgm,
      ...RouterRole
    ]
  }
]

export const cfProCS = [
  {
    path: '/cf-ProCS',
    name: 'CFProCS',
    meta: {
      title: 'ProCS',
      top: 'RISE_COMMON_FUNCTION' // 一级菜单 选中与否 flag
    },
    component: () => import('@/layout/inner'),
    redirect: '/cf-org/chart',
    children: [
      ...CfOrgChart,
      {
        path: 'index',
        name: 'ProCSIndex',
        meta: {
          title: 'ProCS Index',
          top: 'RISE_COMMON_FUNCTION' // 一级菜单 选中与否 flag
        },
        component: () => import('@/views/procs')
      },
      {
        path: '/knowledge/index',
        name: 'knowledge',
        meta: {
          title: 'knowledge',
          top: 'RISE_COMMON_FUNCTION' // 一级菜单 选中与否 flag
        },
        component: () => import('@/views/knowledge')
      },
      ...CFPosition
    ]
  }
]
