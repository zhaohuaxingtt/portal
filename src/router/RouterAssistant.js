export default [
  {
    path: '/assistant/problemMan',
    name: 'problemMan',
    meta: {
      title: 'problemMan',
      activePath: '/assistant/problemMan'
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
      title: 'helpCenterMan',
      activePath: '/assistant/helpCenterMan'
    },
    component: () => import('@/views/assistant/helpCenterMan')
  }
]
