export default [
  {
    path: '/survey',
    name: 'survey',
    meta: {
      title: '调查问卷'
    },
    redirect: "/survey/management",
    component: () => import('@/views/surveyManagement/manage/index.vue'),
    children: [
      {
        path: '/survey/management',
        name: 'surveyManagement',
        meta: {
          title: '问卷管理'
        },
        component: () =>
          import('@/views/surveyManagement/manage/survey/management/index')
      },
      {
        path: '/survey/create',
        name: 'surveyCreate',
        meta: {
          title: '新建问卷'
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
          title: '答题入口'
        },
        component: () => import('@/views/surveyManagement/answer/index.vue')
      }
    ]
  },
  {
    path: '/survey/answer/detail/:id',
    name: 'detail',
    meta: {
      title: '问卷调查'
    },
    component: () =>
      import('@/views/surveyManagement/answer/detail/index.vue')
  },
]
