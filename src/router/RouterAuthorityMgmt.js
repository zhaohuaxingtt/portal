export default [
  {
    path: '/authorityMgmt/index',
    name: 'authorityMgmt/index',
    meta: {
      title: '员工管理',
      top: 'admin' // 一级菜单 选中与否 flag
    },
    component: () => import('@/views/authorityMgmt/index')
  },
  {
    path: '/authorityMgmt',
    name: 'authorityMgmt',
    meta: {
      title: '员工详情',
      top: 'admin' // 一级菜单 选中与否 flag
    },
    component: () => import('@/views/authorityMgmt/staffMnagement')
  },
  {
    path: '/authorityMgmt/add',
    name: 'authorityMgmt/add',
    meta: {
      title: '员工新建',
      top: 'admin' // 一级菜单 选中与否 flag
    },
    component: () => import('@/views/authorityMgmt/add')
  },
  {
    path: '/addLabel',
    name: 'addLabel',
    meta: {
      title: '标签',
      top: 'admin' // 一级菜单 选中与否 flag
    },
    component: () => import('@/views/authorityMgmt/components/addLabel')
  }
]
