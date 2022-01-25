export default [
  {
    path: '/adminProCS',
    name: 'adminProCS',
    // redirect: '/adminProCS/glossary/index',
    meta: {
      title: 'adminProCS',
      activeMenu: ['RISE_ADMIN', 'ADMIN_PRO_CS']
    },
    component: () => import('@/views/adminProCS/list'),
    children: [{
      path: 'glossary/index',
      name: 'glossary',
      meta: {
        title: '词条管理',
        activeMenu: ['RISE_ADMIN', 'ADMIN_PRO_CS']
      },
      component: () => import('@/views/adminProCS/glossary/index')
    }, {
      path: 'adminKnowledge/index',
      name: 'adminKnowledge',
      meta: {
        title: '知识管理',
        activeMenu: ['RISE_ADMIN', 'ADMIN_PRO_CS']
      },
      component: () => import('@/views/adminProCS/adminKnowledge/index')
    }, {
      path: 'process/index',
      name: 'process',
      meta: {
        title: '流程管理',
        activeMenu: ['RISE_ADMIN', 'ADMIN_PRO_CS']
      },
      component: () => import('@/views/adminProCS/process/index')
    }, {
      path: 'process/mainProcess',
      name: 'mainProcess',
      meta: {
        title: '主流程',
        activeMenu: ['RISE_ADMIN', 'ADMIN_PRO_CS']
      },
      component: () => import('@/views/adminProCS/process/mainProcess')
    }, {
      path: 'process/edit',
      name: 'edit',
      meta: {
        title: '流程修改',
        activeMenu: ['RISE_ADMIN', 'ADMIN_PRO_CS']
      },
      component: () => import('@/views/adminProCS/process/edit')
    }]
  }
]