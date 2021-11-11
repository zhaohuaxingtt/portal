/* 任务中心 */
export default [
  {
    path: '/task/center',
    name: 'TaskCenter',
    meta: {
      title: '任务中心',
      top: 'RISE_COMMON_FUNCTION' // 一级菜单 选中与否 flag
    },
    component: () => import('@/views/bpm/taskCenter/center')
  },
  {
    path: '/task/list',
    name: 'TaskList',
    meta: {
      title: '任务管理',
      top: 'RISE_COMMON_FUNCTION' // 一级菜单 选中与否 flag
    },
    component: () => import('@/views/bpm/taskCenter/list')
  }
]
