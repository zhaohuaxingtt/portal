export default [
  {
    path: '/survey',
    name: 'survey',
    meta: {
      title: '调查问卷'
    },
    redirect: '/survey/management',
    component: () => import('@/views/surveyManagement/manage/index.vue'),
    children: [
      {
        path: '/survey/management',
        name: 'surveyManagement',
        meta: {
          title: '问卷管理',
          activeMenu: ['RISE_ADMIN', 'ADMIN_NEWS_SURVEY']
        },
        component: () =>
          import('@/views/surveyManagement/manage/survey/management/index')
      },
      {
        path: '/survey/create',
        name: 'surveyCreate',
        meta: {
          title: '新建问卷',
          activeMenu: ['RISE_ADMIN', 'ADMIN_NEWS_SURVEY']
        },
        component: () =>
          import('@/views/surveyManagement/manage/survey/create/index.vue')
      }
    ]
  },
  {
    path: '/survey/data',
    name: 'surveyData',
    meta: {
      title: '问卷数据'
    },
    component: () => import('@/views/surveyManagement/data/index.vue')
  },
  {
    path: '/survey/hall',
    name: 'answer',
    meta: {
      title: '答题大厅'
    },
    component: () => import('@/views/surveyManagement/hall/index.vue'),
    redirect: '/survey/answer',
    children: [
      {
        path: '/survey/answer',
        name: 'answer',
        meta: {
          title: '答题入口',
          activeMenu: ['RISE_COMMON_FUNCTION', 'CF_NEWS']
        },
        component: () => import('@/views/surveyManagement/answer/index.vue')
      }
    ]
  },
  {
    path: '/survey/answer/detail/:id',
    name: 'detail',
    meta: {
      title: '问卷调查',
      activeMenu: ['CF_NEWS', 'RISE_COMMON_FUNCTION']
    },
    component: () => import('@/views/surveyManagement/answer/detail/index.vue')
  }
]
