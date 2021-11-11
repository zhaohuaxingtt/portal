export default [
  {
    path: '/role/index',
    name: 'Role',
    meta: {
      title: '角色管理',
      top: 'admin' // 一级菜单 选中与否 flag
    },
    component: () => import('@/views/role/index')
  },
  {
    path: '/role/view/:id?',
    name: 'RoleView',
    meta: {
      title: '查看角色',
      activePath: '/role/index',
      top: 'admin' // 一级菜单 选中与否 flag
    },
    component: () => import('@/views/role/view')
  },
  {
    path: '/role/edit/:id?',
    name: 'RoleEdit',
    meta: {
      title: '角色授权',
      activePath: '/role/index',
      top: 'admin' // 一级菜单 选中与否 flag
    },
    component: () => import('@/views/role/edit')
  }
]
