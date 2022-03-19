export default [
  {
    path: '/adminProCS',
    name: 'adminProCS',
    meta: {
      title: 'procs',
    },
    component: () => import('@/layout/empty'),
    redirect: '/adminProCS/process/mainProcess',
    children: [
      {
        path: '/adminProCS/process/mainProcess',
        name: 'process',
        meta: {
          title: '流程管理',
          // activeMenu: ['RISE_COMMON_FUNCTION', 'CF_PRO_CS']
          activeMenu: ['RISE_ADMIN', 'ADMIN_PRO_CS']
        },
        component: () => import('@/views/adminProCS/process/index')
      },
      {
        path: '/adminProCS/glossary/index',
        name: 'glossary',
        meta: {
          title: '词条管理',
          // activeMenu: ['RISE_COMMON_FUNCTION', 'CF_PRO_CS']
          activeMenu: ['RISE_ADMIN', 'ADMIN_PRO_CS']
        },
        component: () => import('@/views/adminProCS/glossary/index')
      },
      {
        path: '/adminProCS/adminKnowledge/index',
        name: 'adminKnowledge',
        meta: {
          title: '知识管理',
          // activeMenu: ['RISE_COMMON_FUNCTION', 'CF_PRO_CS']
          activeMenu: ['RISE_ADMIN', 'ADMIN_PRO_CS']
        },
        component: () => import('@/views/adminProCS/adminKnowledge/index')
      }
    ]
  }
  // {
  //   path: '/adminProCS',
  //   name: 'adminProCS',
  //   // redirect: '/adminProCS/glossary/index',
  //   meta: {
  //     title: 'adminProCS',
  //     activeMenu: ['RISE_ADMIN', 'ADMIN_PRO_CS']
  //   },
  //   component: () => import('@/views/adminProCS/list'),
  //   children: [{
  //     path: 'glossary/index',
  //     name: 'glossary',
  //     meta: {
  //       title: '词条管理',
  //       activeMenu: ['RISE_ADMIN', 'ADMIN_PRO_CS']
  //     },
  //     component: () => import('@/views/adminProCS/glossary/index')
  //   }, {
  //     path: 'adminKnowledge/index',
  //     name: 'adminKnowledge',
  //     meta: {
  //       title: '知识管理',
  //       activeMenu: ['RISE_ADMIN', 'ADMIN_PRO_CS']
  //     },
  //     component: () => import('@/views/adminProCS/adminKnowledge/index')
  //   }, {
  //     path: 'process/index',
  //     name: 'process',
  //     meta: {
  //       title: '流程管理',
  //       activeMenu: ['RISE_ADMIN', 'ADMIN_PRO_CS']
  //     },
  //     component: () => import('@/views/adminProCS/process/index')
  //   }, {
  //     path: 'process/mainProcess',
  //     name: 'mainProcess',
  //     meta: {
  //       title: '主流程',
  //       activeMenu: ['RISE_ADMIN', 'ADMIN_PRO_CS']
  //     },
  //     component: () => import('@/views/adminProCS/process/mainProcess')
  //   }, {
  //     path: 'process/edit',
  //     name: 'edit',
  //     meta: {
  //       title: '流程修改',
  //       activeMenu: ['RISE_ADMIN', 'ADMIN_PRO_CS']
  //     },
  //     component: () => import('@/views/adminProCS/process/edit')
  //   }]
  // }
]

export const AdminProCSDetail = [
  {
        path: '/adminProCS/process/mainProcessFlow',
        name: 'mainProcess',
        meta: {
          title: '主流程',
          activeMenu: ['RISE_ADMIN', 'ADMIN_PRO_CS']
        },
        component: () => import('@/views/adminProCS/process/mainProcessFlow')
      }, {
        path: '/adminProCS/process/edit',
        name: 'edit',
        meta: {
          title: '流程修改',
          activeMenu: ['RISE_ADMIN', 'ADMIN_PRO_CS']
        },
        component: () => import('@/views/adminProCS/process/edit')
      }
]