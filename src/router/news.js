export default [
  {
    path: '/news',
    name: 'newsIndex',
    meta: {
      title: '新闻管理'
    },
    // component: () => import('@/layout/innerTitleAndMenu.vue'),
    component: () => import('@/views/newsManagement/index.vue'),
    redirect: '/news/content',
    children: [
      {
        path: '/news/content',
        name: 'newsContent',
        meta: {
          title: '新闻内容管理',
          activeMenu: ['RISE_ADMIN', 'ADMIN_NEWS_MANAGEMENT'] // 一级菜单,二级菜单
        },
        component: () =>
          import('@/views/newsManagement/content/manage/index.vue')
      },
      {
        path: '/news/label',
        name: 'newsLabel',
        meta: {
          title: '新闻标签',
          activeMenu: ['RISE_ADMIN', 'ADMIN_NEWS_MANAGEMENT'] // 一级菜单,二级菜单
        },
        component: () => import('@/views/newsManagement/label/index.vue')
      },
      {
        path: '/news/topic',
        name: 'newsTopic',
        meta: {
          title: '专题新闻管理',
          activeMenu: ['RISE_ADMIN', 'ADMIN_NEWS_MANAGEMENT'] // 一级菜单,二级菜单
        },
        component: () => import('@/views/newsManagement/topic/manage/index.vue')
      },
      {
        path: '/news/KVmanagement',
        name: 'KVmanagement',
        meta: {
          title: 'KV图管理',
          activeMenu: ['RISE_ADMIN', 'ADMIN_NEWS_MANAGEMENT'] // 一级菜单,二级菜单
        },
        component: () => import('@/views/newsManagement/KVmanagement/index.vue')
      }
    ]
  },
  {
    path: '/news',
    name: 'newsHall',
    meta: {
      title: '新闻大厅'
    },
    component: () => import('@/views/newsManagement/hall/index.vue'),
    redirect: '/news/news',
    children: [
      {
        path: 'news',
        name: 'newsNews',
        meta: {
          title: '新闻',
          activeMenu: ['RISE_COMMON_FUNCTION', 'CF_NEWS']
        },
        component: () => import('@/views/newsManagement/hall/news/index.vue')
      },
      {
        path: 'notice',
        name: 'noticeList',
        meta: {
          title: '公告',
          // activeMenu: ['CF_NEWS', 'RISE_COMMON_FUNCTION']
          activeMenu: ['RISE_COMMON_FUNCTION', 'CF_NEWS']
        },
        component: () => import('@/views/newsManagement/hall/notice/index.vue')
      },
      {
        path: 'notice/noticeMore',
        name: 'noticeMore',
        meta: {
          title: '公告more',
          // activeMenu: ['CF_NEWS', 'RISE_COMMON_FUNCTION']
          activeMenu: ['RISE_COMMON_FUNCTION', 'CF_NEWS']
        },
        component: () =>
          import('@/views/newsManagement/hall/notice/components/noticeMore.vue')
      }
    ]
  },
  {
    path: '/news/content/add',
    name: 'newsContentAdd',
    meta: {
      title: '新建新闻',
      activeMenu: ['RISE_ADMIN', 'ADMIN_NEWS_MANAGEMENT'] // 一级菜单,二级菜单
    },
    component: () =>
      import('@/views/newsManagement/content/addAndEdit/index.vue')
  },
  {
    path: '/news/content/browse/:id',
    name: 'newsContentBrowse',
    meta: {
      title: '浏览新闻'
    },
    component: () =>
      import('@/views/newsManagement/content/addAndEdit/index.vue')
  },
  {
    path: '/news/topic/add',
    name: 'newsTopicAdd',
    meta: {
      title: '新建专题新闻'
    },
    component: () => import('@/views/newsManagement/topic/addAndEdit/index.vue')
  },
  {
    path: '/news/topic/browse/:id',
    name: 'newsTopicBrowse',
    meta: {
      title: '浏览专题新闻'
    },
    component: () => import('@/views/newsManagement/topic/addAndEdit/index.vue')
  },
  {
    path: '/news/details',
    name: 'newsDetails',
    meta: {
      title: '新闻详情'
    },
    component: () => import('@/views/newsManagement/details/index.vue')
  },
  {
    path: '/news/projectDetails',
    name: 'newsProjectDetails',
    meta: {
      title: '新闻专题详情'
    },
    component: () => import('@/views/newsManagement/projectDetails/index.vue')
  },
  {
    path: '/news/topicDetail',
    name: 'topicDetail',
    meta: {
      title: '供应商新闻详情'
    },
    component: () => import('@/views/newsManagement/topicDetail/index.vue')
  },
  // {
  //   path: "/news",
  //   name: "news",
  //   component: () => import("@/views/newsManagement/index.vue"),
  //   redirect: "/news/KVmanagement",
  //   children: [
  //     {
  //       path: "/news/KVmanagement",
  //       name: "KVmanagement",
  //       meta: {
  //         title: "KV图管理",
  //       },
  //       component: () => import("@/views/newsManagement/KVmanagement/index.vue"),
  //     }
  //   ],
  // },
  {
    path: '/news/addKV',
    name: 'addKV',
    meta: {
      title: '新建KV图'
    },
    component: () =>
      import('@/views/newsManagement/KVmanagement/components/addKV.vue')
  },
  {
    // 模块
    path: '/news/management/index',
    name: 'newsUserManagementIndex',
    meta: {
      title: '管理'
    },
    component: () => import('@/views/newsManagement/management/index.vue'),
    redirect: '/news/management/moduleManagement/index',
    children: [
      {
        // 管理模块
        path: '/news/management/moduleManagement/index',
        name: 'newsModuleManagement',
        meta: {
          title: '模块管理',
          activeMenu: ['RISE_ADMIN', 'ADMIN_NEWS_MANAGEMENT_MODULE']
        },
        component: () =>
          import('@/views/newsManagement/management/moduleManagement/index.vue')
      },
      {
        // 用户模块
        path: '/news/management/userManagement/index',
        name: 'newsUserManagement',
        meta: {
          title: '用户管理',
          activeMenu: ['RISE_ADMIN', 'ADMIN_NEWS_MANAGEMENT_MODULE']
        },
        component: () =>
          import('@/views/newsManagement/management/userManagement/index.vue')
      },
      {
        // 知识类型管理
        path: '/news/management/knowledgeManagement/index',
        name: 'knowledgeManagement',
        meta: {
          title: '知识类型管理',
          activeMenu:['RISE_ADMIN','ADMIN_NEWS_MANAGEMENT_KNOWLEDGE']
        },
        component: () =>
          import('@/views/newsManagement/management/knowledgeManagement/index.vue')
      }
    ]
  },
  {
    // 公告管理
    path: '/news/notice/index',
    name: 'newsNotice',
    meta: {
      title: '公告管理',
      activeMenu: ['RISE_ADMIN', 'ADMIN_NEWS_NOTICE']
    },
    component: () => import('@/views/newsManagement/notice/index.vue')
  },
  {
    // 新建公告
    path: '/news/notice/addNotice',
    name: 'addNotice',
    meta: {
      title: '新建公告',
      activeMenu: ['RISE_ADMIN', 'ADMIN_NEWS_NOTICE']
    },
    component: () =>
      import('@/views/newsManagement/notice/components/addNotice.vue')
  },
  {
    // 预览公告
    path: '/news/notice/previewNotice',
    name: 'previewNotice',
    meta: {
      title: '预览公告',
      activeMenu: ['RISE_ADMIN', 'ADMIN_NEWS_NOTICE']
    },
    component: () =>
      import('@/views/newsManagement/notice/components/previewNotice.vue')
  },
  {
    path: '/news/notice/toView',
    name: 'toView',
    meta: {
      title: '查看公告',
      activeMenu: ['RISE_ADMIN', 'ADMIN_NEWS_NOTICE']
    },
    component: () =>
      import('@/views/newsManagement/notice/components/toView.vue')
  },
  {
    // 用户模块
    path: '/news/newsMent/index',
    name: 'userNewsManagement',
    meta: {
      title: '用户组设置',
      activeMenu: ['RISE_COMMON_FUNCTION', 'CF_NEWS']
    },
    component: () => import('@/views/newsManagement/newsMent/index.vue')
  }
]
