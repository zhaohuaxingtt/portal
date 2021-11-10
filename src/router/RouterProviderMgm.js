//供应商用户管理
export default [
  {
    path: '/provider',
    name: 'provider',
    redirect: '/provider/userMgm/list',
    meta: {
      title: 'provider',
      top: 'admin' // 一级菜单 选中与否 flag
    },
    component: () => import('@/layout/empty.vue'),
    children: [
      {
        path: 'userMgm/list',
        name: 'userMgm',
        meta: {
          title: '供应商用户管理',
          top: 'admin' // 一级菜单 选中与否 flag
        },
        component: () => import('@/views/provider/userMgm/index')
      },
      {
        path: 'authMgm/list',
        name: 'authMgm',
        meta: {
          title: '供应商授权管理',
          top: 'admin' // 一级菜单 选中与否 flag
        },
        component: () => import('@/views/provider/authMgm/index')
      },
      {
        path: 'sysMgm/list',
        name: 'sysMgm',
        meta: {
          title: '供应商系统管理',
          top: 'admin' // 一级菜单 选中与否 flag
        },
        component: () => import('@/views/provider/sysMgm/index')
      }
    ]
  },
  {
    path: '/provider/authMgm/edit/:id?',
    name: 'authEdit',
    meta: {
      title: '供应商授权管理编辑',
      top: 'admin' // 一级菜单 选中与否 flag
    },
    component: () => import('@/views/provider/authMgm/edit/index')
  }
]
