export default [
  {
    path: '/info/infoTemplate',
    name: 'infoTemplate',
    meta: {
      title: '模板管理',
      top: 'admin',
      activeMenu: ['RISE_ADMIN', 'ADMIN_LOG_MANAGEMENT'] // 一级菜单,二级菜单
    },
    component: () => import('@/views/info/template')
  }
]
