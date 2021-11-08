export default [
  {
    path: '/params/tree',
    name: 'tree',
    meta: {
      title: '数据字典管理',
      top: 'admin'
    },
    component: () => import('@/views/params/table')
  },
  {
    path: '/params/list',
    name: 'params',
    meta: {
      title: '参数管理',
      top: 'admin'
    },
    component: () => import('@/views/params/list')
  },
  {
    path: '/params/contract',
    name: 'contract',
    meta: {
      title: '合同管理',
      top: 'admin'
    },
    component: () => import('@/views/params/contract')
  }
]
