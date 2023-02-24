import BpmTodoList from '../views/bpm/task/todoList'
import BpmFinishList from '../views/bpm/task/finishList'
import BpmTaskDetail from '../views/bpm/task/detail'

export default [
  {
    path: '/bpm',
    name: 'bpm',
    meta: {
      title: 'bpm',
      activeMenu: ['RISE_COMMON_FUNCTION', 'CF_APPROVAL'] // 一级菜单,二级菜单
    },
    component: () => import('@/layout/view.vue'),
    redirect: '/bpm/approval/center',
    children: [
      {
        path: '/bpm/approval/center',
        name: 'approvalCenter',
        meta: {
          title: '审批中心'
        },
        component: () => import('@/views/bpm/approvalCenter')
      },
      {
        path: '/bpm/todoList',
        name: 'bpmTodoList',
        meta: {
          title: '我的审批-待办'
        },
        component: BpmTodoList
      },
      {
        path: '/bpm/todoList/detail/:instanceId/:taskId/:finished/:queryData?',
        name: 'bpmTaskUndoDetail',
        meta: {
          title: '我的审批-待办任务详情',
          noTopLayout: true,
          noLeftLayout: true
        },
        component: BpmTaskDetail
      },
      {
        path: '/bpm/finishList',
        name: 'bpmFinishList',
        meta: {
          title: '我的审批-已办'
        },
        component: BpmFinishList
      },
      {
        path: '/bpm/finishList/detail/:instanceId/:taskId/:finished/:queryData?',
        name: 'bpmTaskFinishDetail',
        meta: {
          title: '我的审批-已办任务详情',
          noTopLayout: true,
          noLeftLayout: true
        },
        component: BpmTaskDetail
      },
      {
        path: '/bpm/myApply',
        name: 'bpmMyAppy',
        meta: {
          title: '我的申请'
        },
        component: () => import('@/views/bpm/myApplication')
      },
      {
        path: '/bpm/myApply/detail/:instanceId/:finished/:queryData?',
        name: 'BpmTaskApplyDetail',
        meta: {
          title: '我的申请任务详情',
          noTopLayout: true,
          noLeftLayout: true
        },
        component: () => import('@/views/bpm/myApplication/detail')
      },

      /**             Aeko            */
      {
        path: '/bpm/myAekoApply',
        name: 'bpmMyAppyAeko',
        meta: {
          title: '我的申请'
        },
        component: () => import('@/views/bpm/myApplicationAeko')
      },
      {
        path: '/bpm/myAekoApply/detail/:instanceId/:finished/:queryData?',
        name: 'BpmTaskApplyDetailAeko',
        meta: {
          title: '我的申请任务详情'
        },
        component: () => import('@/views/bpm/myApplicationAeko/detail')
      }
    ]
  }
]
