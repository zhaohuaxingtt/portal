export default [
  {
    path: '/cf-position/agent/view/:id',
    name: 'CFPositionAgentView',
    meta: {
      title: '岗位代理查看',
      activePath: '/cf-position/agent',
      activeMenu: ['RISE_COMMON_FUNCTION', 'CF_PRO_CS']
    },
    component: () => import('@/views/position/agent/view')
  },
  {
    path: '/cf-position/transfer/view/:id',
    name: 'CFPositionTransferView',
    meta: {
      title: '轮岗查看',
      top: 'RISE_COMMON_FUNCTION', // 一级菜单 选中与否 flag
      activePath: '/cf-position/transfer',
      activeMenu: ['RISE_COMMON_FUNCTION', 'CF_PRO_CS']
    },
    component: () => import('@/views/position/transfer/view')
  }
]
