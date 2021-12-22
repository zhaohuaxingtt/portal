export default [
  {
    path: '/biz/log',
    name: 'bizLog',
    meta: {
      title: '操作日志',
      activeMenu: ['RISE_ADMIN', 'ADMIN_LOG_MANAGEMENT'] // 一级菜单,二级菜单
    },
    component: () => import('@/views/biz/log')
  },
  {
    path: '/biz/userLog',
    name: 'userLog',
    meta: {
      title: '业务用户日志',
      activeMenu: ['RISE_ADMIN', 'ADMIN_LOG_MANAGEMENT'] // 一级菜单,二级菜单
    },
    component: () => import('@/views/biz/userLog')
  },
  {
    path: '/biz/adminLog',
    name: 'adminLog',
    meta: {
      title: '系统管理员日志',
      activeMenu: ['RISE_ADMIN', 'ADMIN_LOG_MANAGEMENT'] // 一级菜单,二级菜单
    },
    component: () => import('@/views/biz/adminLog')
  },
]
