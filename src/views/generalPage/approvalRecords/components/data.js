import language from '@/utils/language'


// 审批流状态
export const approvalFlowStatus = [
  {
    label: '进行中',
    value: '0',
    i18n: 'TM_WEIQIANSHU'
  },
  {
    label: '已结束',
    value: '01',
    i18n: 'TM_YIQIANSHUBIAOZHUN'
  },
]
export const searchFormData = [
  { props: 'supplier', name: '审批事项', key: '审批事项' },
  { props: 'termsName', name: '任务名称', key: '任务名称', type: 'select', selectOption: 'signStatusList', multiple: true },
  { props: 'signUser', name: '申请人', key: '申请人', type: 'select', selectOption: 'signStatusList', multiple: true },
  { props: 'approveStatus', name: '审批流状态', key: '审批流状态', type: 'select', selectOption: 'approvalFlowStatus' },
]

export const tableColumns = [
  {
    type: 'index',
    label: '#',
    i18n: '#'
  },
  {
    i18n: '审批单据ID',
    prop: 'termsCode',
    sortable: true,
    minWidth: 110,
    emit:'openPage',
    customRender: (h, scope) => {
      return <span>{scope.row.termsName}/{scope.row.version}</span>
    }
  },
  {
    i18n: '业务模块',
    prop: 'termsName',
    sortable: true,
    minWidth: 200
  },
  {
    i18n: '任务名称',
    prop: 'shortNameZh',
    minWidth: 140,
    sortable: true
  },
  {
    i18n: '审批事项',
    prop: 'serviceCode',
    minWidth: 120,
    sortable: true
  },
  {
    i18n: '申请人',
    prop: 'svwTempCode',
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
    prop: 'sapCode',
    sortable: true,
    minWidth: 120,
  }
]