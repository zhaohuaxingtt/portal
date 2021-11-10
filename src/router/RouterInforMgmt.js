import layoutDefault from '@/layout/default.vue'
import RouterPopupWindowMa from './RouterPopupWindowMa'
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
          top: 'admin'
        },
        component: layoutDefault
      },
      {
        path: '/tipsMgmt',
        name: 'infoMgmttipsMgmt',
        meta: {
          title: '提示管理',
          top: 'admin'
        },
        component: layoutDefault
      },
      {
        path: '/dialogMgmt',
        name: 'infoMgmtDialogMgmt',
        meta: {
          title: '弹窗管理',
          top: 'admin'
        },
        component: () => import('@/layout/empty.vue'),
        redirect:'/dialogMgmt/popup-window-management',
        children:[
          {
            path:'popup-window-management',
            name:'popup-window-management',
            meta:{
                title:'popup-window-management',
                top: 'admin'
            },
            component:()=>import('@/views/popupWindowManagement')
          },
          {
              path:'popup-window-management/create',
              name:'create-new',
              meta:{
                  title:'create-new',
                  activePath:'/dialogMgmt/popup-window-management',
                  top: 'admin'
              },
              component:()=> import('@/views/popupWindowManagement/createNew')
          }
        ]
      },
      {
        path: '/infoTemplate',
        name: 'infoMgmtinfoTemplate',
        meta: {
          title: '站内信/邮件模板管理',
          top: 'admin'
        },
        component: () => import('@/layout/empty.vue'),
        redirect: '/infoTemplate/template',
        children: [
          {
            path: 'template',
            name: 'infoMgmtmsgTemplate',
            meta: {
              title: '模板管理',
              top: 'admin'
            },
            component: () => import('@/views/InformationMgmt/template/index')
          },
          {
            path: 'template/create',
            name: 'infoMgmtmsgTemplateAdd',
            meta: {
              title: 'createInfo',
              activePath: '/infoTemplate/template',
              top: 'admin'
            },
            component: () => import('@/views/InformationMgmt/template/detail')
          },
          {
            path: 'publish',
            name: 'infoMgmtmsgPublish',
            meta: {
              title: '发送消息',
              activePath: '/infoTemplate/publish/history',
              top: 'admin'
            },
            component: () => import('@/views/InformationMgmt/publish')
          },
          {
            path: 'publish/history',
            name: 'infoMgmtmsgPublishHistory',
            meta: {
              title: '发布历史',
              activePath: '/infoTemplate/publish',
              top: 'admin'
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
      title: '发布消息'
    },
    component: () => import('@/views/InformationMgmt/publish/send')
  },
  {
    path: '/infoTemplate/publish/view/history',
    name: 'infoMgmtmsgPublishViewHistory',
    meta: {
      title: '发布历史详情',
      top: 'admin'
    },
    component: () => import('@/views/InformationMgmt/publish/viewHistory')
  },
  {
    path: '/infoTemplate/publish/view/template',
    name: 'infoMgmtmsgPublishViewTemplate',
    meta: {
      title: '发布消息-查看模板',
      top: 'admin'
    },
    component: () => import('@/views/InformationMgmt/publish/viewTemplate')
  }
]
