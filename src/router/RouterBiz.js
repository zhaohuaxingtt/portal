export default [
  {
    path: '/biz/log',
    name: 'bizLog',
    meta: {
      title: '操作日子',
      activeMenu: ['RISE_ADMIN', 'ADMIN_LOG_MANAGEMENT'] // 一级菜单,二级菜单
    },
    component: () => import('@/views/biz/log')
  }
]
