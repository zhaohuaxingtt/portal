export default [
  {
    path: '/info/infoTemplate',
    name: 'infoTemplate',
    meta: {
      title: '模板管理',
      top: 'admin'
    },
    component: () => import('@/views/info/template')
  }
]
