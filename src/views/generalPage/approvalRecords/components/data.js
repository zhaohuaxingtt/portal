// 审批流状态
export const approvalFlowStatus = [
  {
    label: '进行中',
    value: '0',
    i18n: 'TM_WEIQIANSHU'
  },
  {
    label: '已结束',
    value: '1',
    i18n: 'TM_YIQIANSHUBIAOZHUN'
  },
]
export const searchFormData = [
  { props: 'approvalItem', name: '审批事项', key: '审批事项' },
  { props: 'categoryList', name: '任务名称', key: '任务名称', type: 'select', selectOption: 'approveStatus', multiple: true },
  { props: 'applyUserIdList', name: '申请人', key: '申请人', type: 'user' },
  { props: 'statusList', name: '审批流状态', key: '审批流状态', type: 'select', selectOption: 'approvalFlowStatus', multiple: true },
]

export const tableColumns = [
  {
    type: 'index',
    label: '#',
    i18n: '#'
  },
  {
    i18n: '审批单据ID',
    prop: 'businessId',
    sortable: true,
    minWidth: 110,
    emit:'openPage',
    customRender: (h, scope) => {
      return <span class="open-link-text">{scope.row.businessId}</span>
    }
  },
  {
    i18n: '业务模块',
    prop: 'itemType',
    sortable: true,
    minWidth: 200
  },
  {
    i18n: '任务名称',
    prop: 'processDefinitionName',
    minWidth: 140,
    sortable: true
  },
  {
    i18n: '审批事项',
    prop: 'itemEvent',
    minWidth: 120,
    sortable: true
  },
  {
    i18n: '申请人',
    prop: 'applyUserName',
    sortable: true,
    minWidth: 120,
  },
  {
    i18n: '审批流状态',
    prop: 'signStatus',
    sortable: true,
    minWidth: 140,
  },
  {
    i18n: '申请时间',
    prop: 'applyDate',
    sortable: true,
    minWidth: 120,
  }
]