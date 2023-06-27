/* 任务管理 */
export default [
    {
      path: '/taskManagement',
      name: 'taskManagement',
      meta: {
        title: '任务管理',
        activeMenu: ['RISE_COMMON_FUNCTION', 'CF_TASK']
      },
      component: () => import('@/views/taskManagement/index')
    }
  ]
  