export const TABLE_COLUMNS = [
  {
    type: 'selection',
    width: 50
  },
  {
    prop: 'itemName',
    label: '任务名称',
    i18n: 'APPROVAL.TASK_NAME'
  },
  {
    prop: 'itemContent',
    label: '任务描述',
    i18n: 'APPROVAL.TASK_DESC'
  },
  {
    prop: 'createDate',
    label: '发起时间',
    i18n: 'APPROVAL.THE_START_TIME'
  },
  {
    prop: 'dueDate',
    label: '截止时间',
    i18n: 'APPROVAL.DEADLINE_TIME'
  },
  {
    prop: 'status',
    label: '任务状态',
    i18n: 'APPROVAL.TASK_STATUS'
    // customRender: (h, scope) => {
    //   const { status } = scope.row
    //   return Number(status) ? '进行中' : '已完成'
    // },
  }
  // {
  //   prop: 'completeTime',
  //   label: '完成时间',
  //   i18n: 'APPROVAL.COMPLETE_TIME',
  // },
  // {
  //   prop: 'taskType',
  //   label: '任务类型',
  //   i18n: 'APPROVAL.TASK_AGENT_TYPE'
  // }
]
export const TRANSFER_TABLE_COLUMNS = [
  {
    type: 'selection',
    width: 50
  },
  {
    type: 'index',
    width: 50,
    label: '编号',
    i18n: 'APPROVAL.NO'
  },
  {
    prop: 'id',
    label: '员工号',
    i18n: 'APPROVAL.STAFF_NO'
  },
  {
    prop: 'nameZh',
    label: '姓名',
    i18n: 'APPROVAL.STAFF_NAME'
  },
  {
    prop: 'department',
    label: '所属部门',
    i18n: 'APPROVAL.STAFF_DEPARTMENT'
  },
  {
    prop: 'mobile',
    label: '手机',
    i18n: 'APPROVAL.STAFF_MOBILE'
  },
  {
    prop: 'phone',
    label: '电话',
    i18n: 'APPROVAL.STAFF_TEL'
  }
]
export const TASK_TYPES = [
  {
    value: 1,
    label: '会议代理'
  }
]

export const TASK_STSTUESES = [
  {
    value: '',
    i18n: 'APPROVAL.STAFF_TEL',
    label: '全部'
  },
  {
    value: 1,
    i18n: 'APPROVAL.STAFF_TEL',
    label: '已完成'
  },
  {
    value: 0,
    i18n: 'APPROVAL.STAFF_TEL',
    label: '进行中'
  }
]

export const SEARCH_DATA = {
  name: '',
  status: '',
  category: '',
  timeRanges: []
}

export const TEST_DATA = [
  {
    id: 1,
    itemName: '车辆采购审批',
    itemContent: '车辆采购审批',
    createDate: '2021-02-02',
    dueDate: '2022-09-09',
    status: '0'
    // completeTime: '2022-09-09',
    // type: '审批任务',
  },
  {
    id: 2,
    itemName: '车辆采购审批',
    itemContent: '车辆采购审批',
    createDate: '2021-02-02',
    dueDate: '2022-09-09',
    status: '1'
    // completeTime: '2022-09-09',
    // type: '审批任务',
  },
  {
    id: 3,
    itemName: '车辆采购审批',
    itemContent: '车辆采购审批',
    createDate: '2021-02-02',
    dueDate: '2022-09-09',
    status: '1'
    // completeTime: '2022-09-09',
    // type: '审批任务',
  }
]
