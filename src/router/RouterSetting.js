export default [
  {
    path: '/setting',
    name: 'Setting',
    meta: {
      title: '设置',
      activeMenu: ['RISE_ADMIN', 'ADMIN_SETTING']
    },
    component: () => import('@/views/setting/index')
  }
]
