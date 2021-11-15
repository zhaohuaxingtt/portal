export default [
  {
    path: '/demo',
    name: 'calendar',
    meta: {
      title: 'calendar'
    },
    component: () => import('@/layout/empty'),
    children: [
      {
        path: 'calendar',
        name: 'calendar',
        meta: {
          title: 'calendar'
        },
        component: () => import('@/views/demo/calendar')
      },
      {
        path: 'customSelect',
        name: 'selectCustom',
        meta: {
          title: '自定义下拉选择框'
        },
        component: () => import('@/views/demo/customSelect')
      },
      {
        path: 'log',
        meta: {
          title: '日志组件demo'
        },
        component: () => import('@/views/demo/logDemo')
      },
      {
        path: 'upDown',
        name: 'upDown',
        meta: {
          title: '上传下载组件demo'
        },
        component: () => import('@/views/demo/upDown')
      },
      {
        path: 'headerSort',
        name: 'headerSort',
        meta: {
          title: '表头排序demo'
        },
        component: () => import('@/views/demo/tableHeader')
      },
      {
        path: 'iSelectorDemo',
        name: 'selector',
        meta: {
          title: 'selector'
        },
        component: () => import('@/views/demo/customSelector')
      },
      {
        path: 'tableFilterDemo',
        name: 'tableFilterDemo',
        meta: {
          title: 'tableFilterDemo'
        },
        component: () => import('@/views/demo/tableFilterDemo')
      },
      {
        path: 'node',
        name: 'ApprovalNode',
        meta: {
          title: 'ApprovalNode'
        },
        component: () => import('@/views/demo/approvalNode')
      },
      {
        path: 'editor',
        name: 'Editor',
        meta: {
          title: 'Editor'
        },
        component: () => import('@/views/demo/editor')
      }
    ]
  }
]
