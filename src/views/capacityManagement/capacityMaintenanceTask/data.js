export const searchForm = [
  { prop: 'department', label: '科室', key: 'KESHI', type: 'select', optionName: 'deptList', multiple: true },
  { prop: 'supplier', label: '供应商', key: 'GONGYINGSHANG', type: 'input' },
  { prop: 'sourceType', label: '来源', key: 'LAIYUAN', type: 'select', optionName: 'sourceTypeList' },
  { prop: 'taskStatus', label: '状态', key: 'ZHUANGTAI', type: 'select', optionName: 'taskStatusList' },
]

export const tableTitleLeft = [
  { props: 'supplierShortNameZh', name: '供应商', key: '', sortable: true, minWidth: 180, tooltip: true },
  { props: 'taskNumber', name: '产能维护任务数', key: '', sortable: true, width: 130 },
]

export const tableTitleRight = [
  { props: 'supplierShortNameZh', name: '供应商', key: '', sortable: true, minWidth: 180, tooltip: true },
  { props: 'bkaName', name: 'BKA', key: '', sortable: true, minWidth: 160, tooltip: true },
  { props: 'sourceType', name: '来源', key: '', sortable: true, tooltip: true, width: 170 },
  { props: 'taskEndDate', name: '供应商任务截止日期', key: '', sortable: true, width: 170 },
  { props: 'departmentCode', name: '科室', key: '', sortable: true, width: 90 },
  { props: 'status', name: '状态', key: '', sortable: true, width: 90 },
]

export const sourceTypeList = [
  { code: '1', name: '需求导入-待创建BKA' },
  { code: '2', name: '需求导入-待更新BKA' },
  { code: '3', name: '定时-待更新BKA' },
  // { code: '4', name: '产能调查-待更新BKA' }, 暂时注释
]

export const taskStatusList = [
  { code: 'TO_DO', name: '待完成' },
  { code: 'FINISHED', name: '已完成' },
  { code: 'OVERDUE', name: '逾期' },
  { code: 'OVERDUE_FINISHED', name: '逾期完成' },
]