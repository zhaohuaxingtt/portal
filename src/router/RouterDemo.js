export default [
  {
    path: '/demo/calendar',
    name: 'calendar',
    meta: {
      title: 'calendar'
    },
    component: () => import('@/views/demo/calendar')
  },
  {
    path: '/demo/customSelect',
    name: 'selectCustom',
    meta: {
      title: '自定义下拉选择框'
    },
    component: () => import('@/views/demo/customSelect')
  },
  {
    path: '/demo/log',
    meta: {
      title: '日志组件demo'
    },
    component: () => import('@/views/demo/logDemo')
  },
  {
    path: '/demo/upDown',
    name: 'upDown',
    meta: {
      title: '上传下载组件demo'
    },
    component: () => import('@/views/demo/upDown')
  },
  {
    path: '/demo/headerSort',
    name: 'headerSort',
    meta: {
      title: '表头排序demo'
    },
    component: () => import('@/views/demo/tableHeader')
  },
  {
    path: '/demo/iSelectorDemo',
    name: 'selector',
    meta: {
      title: 'selector'
    },
    component: () => import('@/views/demo/customSelector')
  },
  {
    path: '/demo/tableFilterDemo',
    name: 'tableFilterDemo',
    meta: {
      title: 'tableFilterDemo'
    },
    component: () => import('@/views/demo/tableFilterDemo')
  },
  {
    path: '/demo/node',
    name: 'ApprovalNode',
    meta: {
      title: 'ApprovalNode'
    },
    component: () => import('@/views/demo/approvalNode')
  }
]
