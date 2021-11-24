/* export default [
  {
    path: '/authorityMgmt',
    name: 'authorityMgmt',
    meta: {
      title: '员工管理'
    },
    component: () => import('@/layout/empty.vue'),
    redirect: '/authorityMgmt/index',
    children: [
      {
        path: '/authorityMgmt/index',
        name: 'authorityMgmtIndex',
        meta: {
          title: '员工管理',
          activeMenu: ['RISE_ADMIN', 'ADMIN_PRO_CS']
        },
        component: () => import('@/views/authorityMgmt/index')
      },
      {
        path: '/authorityMgmt/detail',
        name: 'authorityMgmt',
        meta: {
          title: '员工详情',
          activeMenu: ['RISE_ADMIN', 'ADMIN_PRO_CS']
        },
        component: () => import('@/views/authorityMgmt/staffMnagement')
      },
      {
        path: '/authorityMgmt/add',
        name: 'authorityMgmt/add',
        meta: {
          title: '员工新建',
          activeMenu: ['RISE_ADMIN', 'ADMIN_PRO_CS']
        },
        component: () => import('@/views/authorityMgmt/add')
      },
      {
        path: '/addLabel',
        name: 'addLabel',
        meta: {
          title: '标签',
          activeMenu: ['RISE_ADMIN', 'ADMIN_PRO_CS']
        },
        component: () => import('@/views/authorityMgmt/components/addLabel')
      },
      {
        path: '/authorityMgmt/applications',
        name: 'StaffSystem',
        meta: {
          title: '员工应用中心',
          activeMenu: ['RISE_ADMIN', 'ADMIN_PRO_CS']
        },
        component: () => import('@/views/authorityMgmt/applications/index.vue')
      }
    ]
  }
]
 */

export default [
  {
    path: '/authorityMgmt/index',
    name: 'authorityMgmtIndex',
    meta: {
      title: '员工管理',
      activeMenu: ['RISE_ADMIN', 'ADMIN_PRO_CS']
    },
    component: () => import('@/views/authorityMgmt/index')
  },
  {
    path: '/authorityMgmt/detail',
    name: 'authorityMgmt',
    meta: {
      title: '员工详情',
      activeMenu: ['RISE_ADMIN', 'ADMIN_PRO_CS']
    },
    component: () => import('@/views/authorityMgmt/staffMnagement')
  },
  {
    path: '/authorityMgmt/add',
    name: 'authorityMgmt/add',
    meta: {
      title: '员工新建',
      activeMenu: ['RISE_ADMIN', 'ADMIN_PRO_CS']
    },
    component: () => import('@/views/authorityMgmt/add')
  },
  {
    path: '/addLabel',
    name: 'addLabel',
    meta: {
      title: '标签',
      activeMenu: ['RISE_ADMIN', 'ADMIN_PRO_CS']
    },
    component: () => import('@/views/authorityMgmt/components/addLabel')
  },
  {
    path: '/authorityMgmt/applications',
    name: 'StaffSystem',
    meta: {
      title: '员工应用中心',
      activeMenu: ['RISE_ADMIN', 'ADMIN_PRO_CS']
    },
    component: () => import('@/views/authorityMgmt/applications/index.vue')
  }
]
