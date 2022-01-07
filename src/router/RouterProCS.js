import RouterPosition, {
  CFPosition,
  CFPositionAgentDetails,
  CFPositionTransferDetails
} from './RouterPosition'
import RouterUsercenter, { CfOrgChart } from './RouterUsercenter'
import RouterAuthorityMgmt from './RouterAuthorityMgmt'
// import RouterStaffMgmt from './RouterStaffMgmt'
import RouterProviderMgm from './RouterProviderMgm'
import RouterRole from './RouterRole'
export default [
  {
    path: '/ProCS',
    name: 'ProCS',
    meta: {
      title: 'ProCS'
    },
    component: () => import('@/layout/inner'),
    redirect: '/org/list',
    children: [
      ...RouterPosition,
      ...RouterUsercenter,
      ...RouterAuthorityMgmt,
      // ...RouterStaffMgmt,
      ...RouterProviderMgm,
      ...RouterRole
    ]
  }
]

const CFApprovalAgent = [
  {
    path: '/cfApprovalAgent',
    name: 'cf-approvalAgent',
    meta: {
      title: '审批代理',
      activeMenu: ['RISE_COMMON_FUNCTION', 'CF_PRO_CS']
    },
    component: () => import('@/layout/empty'),
    redirect: '/cfApprovalAgent/normal',
    children: [
      {
        path: 'normal',
        name: 'CF-ApprovalAgent',
        meta: {
          title: '审批代理'
        },
        component: () => import('@/views/procs/approvalAgent/index.vue')
      },
      {
        path: 'meeting',
        name: 'CF-ApprovalAgent-meeting',
        meta: {
          title: '会议审批代理'
        },
        component: () => import('@/views/procs/approvalAgent/meeting.vue')
      }
    ]
  }
]

const CFApprovalAgentDetail = [
  {
    path: '/cfApprovalAgent/add',
    name: 'CF-ApprovalAgentAdd',
    meta: {
      title: '新建审批代理'
    },
    component: () => import('@/views/bpm/approvalAgent/add')
  },
  {
    path: '/cfApprovalAgent/edit/:id',
    name: 'CF-ApprovalAgentEdit',
    meta: {
      title: '编辑审批代理'
    },
    component: () => import('@/views/bpm/approvalAgent/edit')
  }
]

export const cfProCS = [
  {
    path: '/cf-ProCS',
    name: 'CFProCS',
    meta: {
      title: 'ProCS',
      top: 'RISE_COMMON_FUNCTION' // 一级菜单 选中与否 flag
    },
    component: () => import('@/layout/inner'),
    redirect: '/cf-org/chart',
    children: [
      ...CfOrgChart,
      {
        path: 'index',
        name: 'ProCSIndex',
        meta: {
          title: 'ProCS Index',
          activeMenu: ['RISE_COMMON_FUNCTION', 'CF_PRO_CS']
        },
        component: () => import('@/views/procs')
      },
      {
        path: '/knowledge/index',
        name: 'knowledge',
        meta: {
          title: 'knowledge',
          activeMenu: ['RISE_COMMON_FUNCTION', 'CF_PRO_CS']
        },
        component: () => import('@/views/knowledge')
      },
      ...CFPosition,
      ...CFApprovalAgent
    ]
  },
  ...CFPositionAgentDetails,
  ...CFPositionTransferDetails,
  ...CFApprovalAgentDetail
]
