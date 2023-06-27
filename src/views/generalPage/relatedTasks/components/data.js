export const searchFormData = [
  { props: 'taskTypeList', name: '任务类型', key: '任务类型', type: 'select', selectOption: 'taskTypeList', multiple: true },
  { props: 'taskName', name: '任务名称', key: '任务名称' },
  { props: 'handler', name: '负责人', key: '负责人' },
  { props: 'processingStatus', name: '状态', key: '状态', type: 'select', selectOption: 'processingStatus', showAll: true },
]

export const tableColumns = [
  {
    type: 'index',
    label: '#',
    width: 50,
  },
  { prop: 'taskTypeId', name: '任务ID', i18n: '任务ID', minWidth: 100 },
  { prop: 'taskTypeName', name: '任务类型', i18n: '任务类型', minWidth: 100 },
  { prop: 'taskName', name: '任务名称', i18n: '任务名称' },
  { prop: 'taskName', name: '任务描述', i18n: '任务描述' },
  { prop: 'handler', name: '任务负责人', i18n: '任务负责人', width: 120 },
  { prop: 'processingStatusName', name: '任务状态', i18n: '任务状态', width: 120 },
  { prop: 'createDate', name: '发起时间', i18n: '发起时间', minWidth: 160 },
  { prop: 'updateDate', name: '截止时间', i18n: '截止时间', minWidth: 160 },
]