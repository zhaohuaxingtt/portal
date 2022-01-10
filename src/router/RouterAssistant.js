export default [
  {
    path: '/assistant/problemMan',
    name: 'problemMan',
    meta: {
      title: 'problemMan'
    },
    component: () => import('@/views/assistant/problemMan')
  },
  {
    path: '/assistant/helpCenter',
    name: 'helpCenter',
    meta: {
      title: 'helpCenter'
    },
    component: () => import('@/views/assistant/helpCenter')
  },
  {
    path: '/assistant/helpCenterMan',
    name: 'helpCenterMan',
    meta: {
      title: 'helpCenterMan'
    },
    component: () => import('@/views/assistant/helpCenterMan')
  }
]
