export default [
  {
    path: '/applications',
    name: 'applications',
    meta: {
      title: '应用中心',
      activeMenu: ['WORK_BRANCH'] // 一级菜单,二级菜单
    },
    component: () => import('@/views/applications/index')
  }
]