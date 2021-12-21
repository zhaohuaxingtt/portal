export default [
  {
    path: '/applications',
    name: 'applications',
    meta: {
      title: '应用中心',
      activeMenu: ['RISE_COMMON_FUNCTION','CF/APPLICATIONS'] // 一级菜单,二级菜单
    },
    component: () => import('@/views/applications/index')
  }
]
