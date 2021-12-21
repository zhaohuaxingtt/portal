export default [
  {
    path: '/params/tree',
    name: 'tree',
    meta: {
      title: '数据字典管理',
      activeMenu: ['RISE_ADMIN', 'ADMIN_PARAMS']
    },
    component: () => import('@/views/params/table')
  },
  {
    path: '/params/list',
    name: 'params',
    meta: {
      title: '参数管理',
      activeMenu: ['RISE_ADMIN', 'ADMIN_PARAMS']
    },
    component: () => import('@/views/params/list')
  },
  {
    path: '/params/contract',
    name: 'contract',
    meta: {
      title: '合同管理',
      activeMenu: ['RISE_ADMIN', 'ADMIN_CONTRACT']
    },
    component: () => import('@/views/params/contract')
  }
]
