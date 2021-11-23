export default [
  {
    path: '/position',
    name: 'Position',
    meta: {
      title: '岗位管理',
      top: 'admin' // 一级菜单 选中与否 flag
    },
    component: () => import('@/layout/empty'),
    redirect: '/position/list',
    children: [
      {
        path: '/position/agent',
        name: 'PositionAgent',
        meta: {
          title: '岗位代理',
          activeMenu: ['RISE_COMMON_FUNCTION', 'CF_PRO_CS']
        },
        component: () => import('@/views/position/agent')
      },
      {
        path: '/position/agent/apply/:id?/:operation?',
        name: 'PositionAgentApply',
        meta: {
          title: '岗位代理申请',
          activePath: '/position/agent',
          activeMenu: ['RISE_COMMON_FUNCTION', 'CF_PRO_CS']
        },
        component: () => import('@/views/position/agent/apply')
      },
      {
        path: '/position/list',
        name: 'positionList',
        meta: {
          title: '岗位列表',
          activeMenu: ['RISE_COMMON_FUNCTION', 'CF_PRO_CS']
        },
        component: () => import('@/views/position/list')
      },
      {
        path: '/position/tag',
        name: 'positionTag',
        meta: {
          title: '岗位标签',
          activeMenu: ['RISE_COMMON_FUNCTION', 'CF_PRO_CS']
        },
        component: () => import('@/views/position/tag')
      },
      {
        path: '/position/sub',
        name: 'subPositionList',
        meta: {
          title: '下属岗位分配',
          activeMenu: ['RISE_COMMON_FUNCTION', 'CF_PRO_CS']
        },
        component: () => import('@/views/position/subPositionList')
      },
      {
        path: '/position/transfer',
        name: 'TransferHome',
        meta: {
          title: '轮岗',
          activeMenu: ['RISE_COMMON_FUNCTION', 'CF_PRO_CS']
        },
        component: () => import('@/views/position/transfer')
      },
      {
        path: '/position/transfer/apply/:id?/:operation?',
        name: 'PositionTransferApply',
        meta: {
          title: '轮岗申请',
          activePath: '/position/transfer',
          activeMenu: ['RISE_COMMON_FUNCTION', 'CF_PRO_CS']
        },
        component: () => import('@/views/position/transfer/apply')
      }
    ]
  },
  {
    path: '/position/operate/:type',
    name: 'positionOperate',
    meta: {
      title: '岗位操作',
      activeMenu: ['RISE_ADMIN', 'ADMIN_PRO_CS']
    },
    component: () => import('@/views/position/operate')
  }
]

export const CFPosition = [
  {
    path: '/cf-position',
    name: 'CFPosition',
    meta: {
      title: '岗位管理',
      top: 'RISE_COMMON_FUNCTION' // 一级菜单 选中与否 flag
    },
    component: () => import('@/layout/empty'),
    redirect: '/cf-position/list',
    children: [
      {
        path: 'agent',
        name: 'CFPositionAgent',
        meta: {
          title: '岗位代理',
          activeMenu: ['RISE_COMMON_FUNCTION', 'CF_PRO_CS']
        },
        component: () => import('@/views/position/agent')
      },
      {
        path: 'agent/apply/:id?/:operation?',
        name: 'CFPositionAgentApply',
        meta: {
          title: '岗位代理申请',
          activePath: '/cf-position/agent',
          activeMenu: ['RISE_COMMON_FUNCTION', 'CF_PRO_CS']
        },
        component: () => import('@/views/position/agent/apply')
      },
      {
        path: 'list',
        name: 'CFpositionList',
        meta: {
          title: '岗位列表',
          activeMenu: ['RISE_COMMON_FUNCTION', 'CF_PRO_CS']
        },
        component: () => import('@/views/position/list')
      },
      {
        path: 'operate/:type',
        name: 'CFpositionOperate',
        meta: {
          title: '岗位操作',
          activeMenu: ['RISE_COMMON_FUNCTION', 'CF_PRO_CS']
        },
        component: () => import('@/views/position/operate')
      },
      {
        path: 'tag',
        name: 'positionTag',
        meta: {
          title: '岗位标签',
          activeMenu: ['RISE_COMMON_FUNCTION', 'CF_PRO_CS']
        },
        component: () => import('@/views/position/tag')
      },
      {
        path: 'sub',
        name: 'CFsubPositionList',
        meta: {
          title: '下属岗位分配',
          activeMenu: ['RISE_COMMON_FUNCTION', 'CF_PRO_CS']
        },
        component: () => import('@/views/position/subPositionList')
      },
      {
        path: 'transfer',
        name: 'CFTransferHome',
        meta: {
          title: '轮岗',
          activeMenu: ['RISE_COMMON_FUNCTION', 'CF_PRO_CS']
        },
        component: () => import('@/views/position/transfer')
      },
      {
        path: 'transfer/apply/:id?/:operation?',
        name: 'CFPositionTransferApply',
        meta: {
          title: '轮岗申请',
          top: 'RISE_COMMON_FUNCTION', // 一级菜单 选中与否 flag
          activePath: '/cf-position/transfer',
          activeMenu: ['RISE_COMMON_FUNCTION', 'CF_PRO_CS']
        },
        component: () => import('@/views/position/transfer/apply')
      }
    ]
  }
]
