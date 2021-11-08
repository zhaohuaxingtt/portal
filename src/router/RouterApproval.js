import BpmTodoList from '../views/bpm/task/todoList'
import BpmFinishList from '../views/bpm/task/finishList'
import BpmTaskDetail from '../views/bpm/task/detail'

export default [
  {
    path: '/bpm',
    name: 'bpm',
    meta: {
      title: 'bpm',
      top: 'RISE_COMMON_FUNCTION' // 一级菜单 选中与否 flag
    },
    component: () => import('@/layout/view.vue'),
    redirect: '/bpm/approval/center',
    children: [
      {
        path: '/bpm/approval/center',
        name: 'approvalCenter',
        meta: {
          title: '审批中心',
          top: 'RISE_COMMON_FUNCTION' // 一级菜单 选中与否 flag
        },
        component: () => import('@/views/bpm/approvalCenter')
      },
      {
        path: '/bpm/todoList',
        name: 'bpmTodoList',
        meta: {
          title: '我的审批-待办',
          top: 'RISE_COMMON_FUNCTION' // 一级菜单 选中与否 flag
        },
        component: BpmTodoList
      },
      {
        path: '/bpm/todoList/detail/:instanceId/:taskId/:finished',
        name: 'bpmTaskUndoDetail',
        meta: {
          title: '我的审批-待办任务详情',
          top: 'RISE_COMMON_FUNCTION' // 一级菜单 选中与否 flag
        },
        component: BpmTaskDetail
      },
      {
        path: '/bpm/finishList',
        name: 'bpmFinishList',
        meta: {
          title: '我的审批-已办',
          top: 'RISE_COMMON_FUNCTION' // 一级菜单 选中与否 flag
        },
        component: BpmFinishList
      },
      {
        path: '/bpm/finishList/detail/:instanceId/:taskId/:finished',
        name: 'bpmTaskFinishDetail',
        meta: {
          title: '我的审批-已办任务详情',
          top: 'RISE_COMMON_FUNCTION' // 一级菜单 选中与否 flag
        },
        component: BpmTaskDetail
      },
      {
        path: '/bpm/myApply',
        name: 'bpmMyAppy',
        meta: {
          title: '我的申请',
          top: 'RISE_COMMON_FUNCTION' // 一级菜单 选中与否 flag
        },
        component: () => import('@/views/bpm/myApplication')
      },
      {
        path: '/bpm/myApply/detail/:instanceId/:finished',
        name: 'BpmTaskApplyDetail',
        meta: {
          title: '我的申请任务详情'
        },
        component: () => import('@/views/bpm/myApplication/detail')
      },

      {
        path: '/approval/agent',
        name: 'approvalAgent',
        meta: {
          title: '审批代理'
        },
        component: () => import('@/views/bpm/approvalAgent')
      },
      {
        path: '/approval/agent/add',
        name: 'ApprovalAgentAdd',
        meta: {
          title: '新建审批代理'
        },
        component: () => import('@/views/bpm/approvalAgent/add')
      },
      {
        path: '/approval/agent/edit/:id',
        name: 'ApprovalAgentEdit',
        meta: {
          title: '编辑审批代理'
        },
        component: () => import('@/views/bpm/approvalAgent/edit')
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
        path: '/bpm/myAekoApply/detail/:instanceId/:finished',
        name: 'BpmTaskApplyDetailAeko',
        meta: {
          title: '我的申请任务详情'
        },
        component: () => import('@/views/bpm/myApplicationAeko/detail')
      }
    ]
  }
]
