export default [
  {
    path: '/bpm/template',
    name: 'template',
    meta: {
      title: '流程模板',
      activeMenu: ['RISE_ADMIN', 'ADMIN_APPROVAL'] // 一级菜单,二级菜单
    },
    component: () => import('@/views/bpm/template')
  },
  {
    path: '/bpm/template/detail/:id?',
    name: 'templateDetail',
    meta: {
      title: '流程模板详情',
      activeMenu: ['RISE_ADMIN', 'ADMIN_APPROVAL'] // 一级菜单,二级菜单
    },
    component: () => import('@/views/bpm/template/detail')
  },
  {
    path: '/bpm/monitoring',
    name: 'bpmMnonitoring',
    meta: {
      title: '流程监控',
      activeMenu: ['RISE_ADMIN', 'ADMIN_APPROVAL'] // 一级菜单,二级菜单
    },
    component: () => import('@/views/bpm/monitoring')
  },
  {
    path: '/bpm/report',
    name: 'bpmReport',
    meta: {
      title: '流程报表',
      activeMenu: ['RISE_ADMIN', 'ADMIN_APPROVAL'] // 一级菜单,二级菜单
    },
    component: () => import('@/views/bpm/report')
  },
  {
    path: '/approval/agent',
    name: 'approvalAgent',
    meta: {
      title: '审批代理',
      activeMenu: ['RISE_ADMIN', 'ADMIN_APPROVAL'] // 一级菜单,二级菜单
    },
    component: () => import('@/views/bpm/approvalAgent')
  },
  {
    path: '/approval/agent/add',
    name: 'ApprovalAgentAdd',
    meta: {
      title: '新建审批代理',
      activeMenu: ['RISE_ADMIN', 'ADMIN_APPROVAL'] // 一级菜单,二级菜单
    },
    component: () => import('@/views/bpm/approvalAgent/add')
  },
  {
    path: '/approval/agent/edit/:id',
    name: 'ApprovalAgentEdit',
    meta: {
      title: '编辑审批代理',
      activeMenu: ['RISE_ADMIN', 'ADMIN_APPROVAL'] // 一级菜单,二级菜单
    },
    component: () => import('@/views/bpm/approvalAgent/edit')
  }
]
