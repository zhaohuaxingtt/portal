export default [
  {
    path: '/bpm/template',
    name: 'template',
    meta: {
      title: '流程模板',
      top: 'admin'
    },
    component: () => import('@/views/bpm/template')
  },
  {
    path: '/bpm/template/detail/:id?',
    name: 'templateDetail',
    meta: {
      title: '流程模板详情',
      top: 'admin'
    },
    component: () => import('@/views/bpm/template/detail')
  },
  {
    path: '/bpm/monitoring',
    name: 'bpmMnonitoring',
    meta: {
      title: '流程监控',
      top: 'admin'
    },
    component: () => import('@/views/bpm/monitoring')
  },
  {
    path: '/bpm/report',
    name: 'bpmReport',
    meta: {
      title: '流程报表',
      top: 'admin'
    },
    component: () => import('@/views/bpm/report')
  }
]
