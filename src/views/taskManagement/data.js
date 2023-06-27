export const searchFormData = [
  { props: 'taskTypeList', name: '任务类型', key: '任务类型', type: 'select', selectOption: 'taskTypeList', multiple: true },
  { props: 'handlerIdList', name: '执行人', key: '执行人', type: 'select', selectOption: 'senderIdList', multiple: true },
  // { props: 'supplierIdList', name: '供应商', key: '供应商', type: 'select', selectOption: 'supplierIdList', multiple: true },
  { props: 'supplierName', name: '供应商', key: '供应商' },
  { props: 'processingStatus', name: '状态', key: '状态', type: 'select', selectOption: 'processingStatus', showAll: true },
]


export const tableTitle = [
  {
    type: 'selection',
    width: 50,
  }, {
    type: 'index',
    label: '#',
    width: 50,
  },
  { prop: 'taskTypeName', name: '任务类型', i18n: '任务类型', minWidth: 100 },
  { prop: 'taskName', name: '任务名称', i18n: '任务名称' },
  { prop: 'handler', name: '执行人', i18n: '执行人', width: 120 },
  { prop: 'supplierName', name: '供应商', i18n: '供应商', minWidth: 120 },
  { prop: 'processingStatusName', name: '状态', i18n: '状态', width: 120 },
  { prop: 'createDate', name: '创建时间', i18n: '创建时间', minWidth: 160 },
  { prop: 'updateDate', name: '更新时间', i18n: '更新时间', minWidth: 160 },
]