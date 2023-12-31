/*
 * @Date: 2021-11-08 11:47:59
 * @LastEditors: caopeng
 * @LastEditTime: 2021-12-09 17:17:43
 * @FilePath: \front-portal-new\src\router\RouterProviderMgm.js
 */
//供应商用户管理
export default [
  {
    path: '/provider',
    name: 'provider',
    redirect: '/provider/userMgm/list',
    meta: {
      title: 'provider',
      activeMenu: ['RISE_ADMIN', 'ADMIN_PRO_CS']
    },
    component: () => import('@/layout/empty.vue'),
    children: [
      {
        path: 'userMgm/list',
        name: 'userMgm',
        meta: {
          title: '供应商用户管理',
          activeMenu: ['RISE_ADMIN', 'ADMIN_PRO_CS']
        },
        component: () => import('@/views/provider/userMgm/index')
      },
      {
        path: 'authMgm/list',
        name: 'authMgm',
        meta: {
          title: '供应商授权管理',
          activeMenu: ['RISE_ADMIN', 'ADMIN_PRO_CS']
        },
        component: () => import('@/views/provider/authMgm/index')
      },
      {
        path: 'sysMgm/list',
        name: 'sysMgm',
        meta: {
          title: '供应商系统管理',
          activeMenu: ['RISE_ADMIN', 'ADMIN_PRO_CS']
        },
        component: () => import('@/views/provider/sysMgm/index')
      },
      {
        path: 'opcs/list',
        name: 'sysMgm',
        meta: {
          title: '物流供应商管理',
          activeMenu: ['RISE_ADMIN', 'ADMIN_PRO_CS']
        },
        component: () => import('@/views/opcsSupervise/opcsPermission/index')
      }
    ]
  },
  {
    path: '/provider/opcs/list/application',
    name: 'application',

    component: () =>
      import('@/views/opcsSupervise/opcsPermission/application/router'),
    redirect: '/provider/opcs/list/application/manage',
    children: [
      {
        path: 'manage',
        name: 'manage',

        component: () =>
          import(
            '@/views/opcsSupervise/opcsPermission/application/manage/index'
          )
      },
      {
        path: 'userManage',
        name: 'userManage',
        // meta: {
        //     title: '物流供应商管理详情',
        //     activePath: '/provider/opcs/list',
        //     activeMenu: ['RISE_ADMIN', 'ADMIN_PRO_CS']
        // },
        component: () =>
          import(
            '@/views/opcsSupervise/opcsPermission/application/userManage/index'
          )
      }
    ]
  },
  {
    path: '/provider/authMgm/edit/:id?',
    name: 'authEdit',
    meta: {
      title: '供应商授权管理编辑',
      activeMenu: ['RISE_ADMIN', 'ADMIN_PRO_CS']
    },
    component: () => import('@/views/provider/authMgm/edit/index')
  }
]
