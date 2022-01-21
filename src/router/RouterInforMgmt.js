import layoutDefault from '@/layout/default.vue'
export default [
  {
    path: '/infoMgmt',
    name: 'infoMgmt',
    meta: {
      title: '消息管理',
      top: 'admin'
    },
    component: () => import('@/layout/inner'),
    redirect: '/infoTemplate/template',
    children: [
      {
        path: '/errorMgmt',
        name: 'infoMgmterrorMgmt',
        meta: {
          title: '错误管理',
          activeMenu: ['RISE_ADMIN', 'ADMIN_MESSAGE']
        },
        component: layoutDefault
      },
      {
        path: '/tipsMgmt',
        name: 'infoMgmttipsMgmt',
        meta: {
          title: '提示管理',
          top: 'admin',
          activeMenu: ['RISE_ADMIN', 'ADMIN_MESSAGE']
        },
        component: layoutDefault
      },
      {
        path: '/dialogMgmt',
        name: 'infoMgmtDialogMgmt',
        meta: {
          title: '弹窗管理',
          activeMenu: ['RISE_ADMIN', 'ADMIN_MESSAGE']
        },
        component: () => import('@/layout/empty.vue'),
        redirect: '/dialogMgmt/popup-window-management',
        children: [
          {
            path: 'popup-window-management',
            name: 'popup-window-management',
            meta: {
              title: 'popup-window-management',
              activeMenu: ['RISE_ADMIN', 'ADMIN_MESSAGE']
            },
            component: () => import('@/views/popupWindowManagement')
          }
        ]
      },
      {
        path: '/infoTemplate',
        name: 'infoMgmtinfoTemplate',
        meta: {
          title: '站内信/邮件模板管理',
          activeMenu: ['RISE_ADMIN', 'ADMIN_MESSAGE']
        },
        component: () => import('@/layout/empty.vue'),
        redirect: '/infoTemplate/template',
        children: [
          {
            path: 'template',
            name: 'infoMgmtmsgTemplate',
            meta: {
              title: '模板管理',
              activeMenu: ['RISE_ADMIN', 'ADMIN_MESSAGE']
            },
            component: () => import('@/views/InformationMgmt/template/index')
          },
          {
            path: 'template/create',
            name: 'infoMgmtmsgTemplateAdd',
            meta: {
              title: 'createInfo',
              activePath: '/infoTemplate/template',
              activeMenu: ['RISE_ADMIN', 'ADMIN_MESSAGE']
            },
            component: () => import('@/views/InformationMgmt/template/detail')
          },
          {
            path: 'publish',
            name: 'infoMgmtmsgPublish',
            meta: {
              title: '发送消息',
              activePath: '/infoTemplate/publish/history',
              activeMenu: ['RISE_ADMIN', 'ADMIN_MESSAGE']
            },
            component: () => import('@/views/InformationMgmt/publish')
          },
          {
            path: 'publish/history',
            name: 'infoMgmtmsgPublishHistory',
            meta: {
              title: '发布历史',
              activePath: '/infoTemplate/publish',
              activeMenu: ['RISE_ADMIN', 'ADMIN_MESSAGE']
            },
            component: () => import('@/views/InformationMgmt/publish/history')
          }
        ]
      }
    ]
  },
  {
    path: '/infoTemplate/publish/send',
    name: 'infoMgmtmsgPublishSend',
    meta: {
      title: '发布消息',
      activeMenu: ['RISE_ADMIN', 'ADMIN_MESSAGE']
    },
    component: () => import('@/views/InformationMgmt/publish/send')
  },
  {
    path: '/infoTemplate/publish/view/history',
    name: 'infoMgmtmsgPublishViewHistory',
    meta: {
      title: '发布历史详情',
      activeMenu: ['RISE_ADMIN', 'ADMIN_MESSAGE']
    },
    component: () => import('@/views/InformationMgmt/publish/viewHistory')
  },
  {
    path: '/infoTemplate/publish/view/template',
    name: 'infoMgmtmsgPublishViewTemplate',
    meta: {
      title: '发布消息-查看模板',
      activeMenu: ['RISE_ADMIN', 'ADMIN_MESSAGE']
    },
    component: () => import('@/views/InformationMgmt/publish/viewTemplate')
  },
  {
    path: '/dialogMgmt/popup-window-management/create',
    name: 'create-new-dialog',
    meta: {
      title: 'create-new-dialog',
      activePath: '/dialogMgmt/popup-window-management',
      activeMenu: ['RISE_ADMIN', 'ADMIN_MESSAGE']
    },
    component: () => import('@/views/popupWindowManagement/createNew')
  }
]
