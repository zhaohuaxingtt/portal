export default [
  {
    path: '/partLifeCycle',
    name: 'partLifeCycle',
    meta: {
      title: '零件生命周期'
    },
    component: () => import('@/views/partLifeCycle')
  },
  {
    path: '/partLifeCycleStar',
    name: 'partLifeCycleStar',
    meta: {
      title: '零件全生命周期'
    },
    component: () => import('@/views/partLifeCycle/partLifeCycleStar')
  },
]