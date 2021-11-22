export default [
  {
    path: '/role/index',
    name: 'Role',
    meta: {
      title: '角色管理',
      activeMenu: ['RISE_ADMIN', 'ADMIN_PRO_CS']
    },
    component: () => import('@/views/role/index')
  },
  {
    path: '/role/view/:id?',
    name: 'RoleView',
    meta: {
      title: '查看角色',
      activePath: '/role/index',
      activeMenu: ['RISE_ADMIN', 'ADMIN_PRO_CS']
    },
    component: () => import('@/views/role/view')
  },
  {
    path: '/role/edit/:id?',
    name: 'RoleEdit',
    meta: {
      title: '角色授权',
      activePath: '/role/index',
      activeMenu: ['RISE_ADMIN', 'ADMIN_PRO_CS']
    },
    component: () => import('@/views/role/edit')
  }
]
