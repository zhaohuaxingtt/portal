/* 任务中心 */
export default [
  {
    path: '/task/center',
    name: 'TaskCenter',
    meta: {
      title: '任务中心',
      activeMenu: ['RISE_COMMON_FUNCTION', 'CF_TASK']
    },
    component: () => import('@/views/bpm/taskCenter/center')
  },
  {
    path: '/task/list',
    name: 'TaskList',
    meta: {
      title: '任务管理',
      activeMenu: ['RISE_COMMON_FUNCTION', 'CF_TASK']
    },
    component: () => import('@/views/bpm/taskCenter/list')
  }
]
