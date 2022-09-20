// 待反馈报警信
export const searchList = [
  { prop: 'supplierId', label: '供应商', key: 'GONGYINGSHANG', type: 'input' },
  { prop: 'status', label: '状态', key: 'ZHUANGTAI', type: 'select', optionName: 'statusList', default: 'TO_FOLLOW_UP_OFFLINE' },
  { prop: 'closeReasonList', label: '关闭原因', key: '关闭原因', type: 'select', optionName: 'reasonList', multiple: true },
  { prop: 'departmentCodeList', label: '科室', key: 'KESHI', type: 'select', optionName: 'deptList', multiple: true },
  { prop: 'linieName', label: 'LINIE', key: 'LINIE', type: 'input' },
  { prop: 'date', label: '任务产生时间', key: '任务产生时间', type: 'date' },
]

// 报警信
export const toBeSearchList = [
  { prop: 'source', label: '来源', key: 'LAIYUAN', type: 'select', optionName: 'sourceTypeList' },
  { prop: 'supplierId', label: '供应商', key: 'GONGYINGSHANG', type: 'input' },
  { prop: 'eventName', label: '事件名称', key: '事件名称', type: 'input' },
  { prop: 'emergencyLever', label: '紧缺级别', key: '紧缺级别', type: 'select', optionName: 'levelList', multiple: true },
  { prop: 'status', label: '状态', key: 'ZHUANGTAI', type: 'select', optionName: 'statusList' },
  { prop: 'departmentCodeList', label: '科室', key: 'KESHI', type: 'select', optionName: 'deptList', multiple: true },
  { prop: 'linieName', label: 'LINIE', key: 'LINIE', type: 'input' },
]


export const sentTableTitle = [
  { props: 'supplierName', label: '供应商', key: 'GONGYINGSHANG', sortable: true },
  { props: 'bkaName', label: 'BKA', key: 'BKA', sortable: true, tooltip: true },
  { props: 'taskEndDateStr', label: '供应商任务截止时间', key: '供应商任务截止时间', sortable: true, tooltip: true },
  // { props: 'date2', label: '跟进截止时间', key: '跟进截止时间', sortable: true },
  { props: 'status', label: '跟进状态', key: '跟进状态', sortable: true },
  { props: 'closeReason', label: '关闭原因', key: '关闭原因', sortable: true },
  { props: 'closeTime', label: '关闭时间', key: '关闭时间', sortable: true },
  { props: 'departmentCode', label: '科室', key: 'KESHI', sortable: true },
  { props: 'linieName', label: 'LINIE', key: 'LINIE', sortable: true },
  { props: 'sort', label: '', key: '' },
]


export const toBeSentTableTitle = [
  { props: 'alarm', label: '报警信', key: '报警信', sortable: true, width: 80 },
  { props: 'supplierName', label: '供应商', key: 'GONGYINGSHANG', sortable: true },
  { props: 'source', label: '来源', key: 'LAIYUAN', sortable: true, width: 120 },
  { props: 'bkaName', label: '名称', key: 'BKA名称', sortable: true, tooltip: true, minWidth: 120 },
  { props: 'shortageLevel', label: '紧缺级别', key: '紧缺级别', sortable: true, width: 120 },
  { props: 'sendTime', label: '发送时间', key: '发送时间', sortable: true },
  { props: 'status', label: '状态', key: '状态', sortable: true, width: 80 },
  // { props: 'meetName', label: '会议名称', key: '会议名称', sortable: true },
  { props: 'closeTime', label: '关闭时间', key: '关闭时间', sortable: true },
  { props: 'departmentCode', label: '科室', key: 'KESHI', sortable: true },
  { props: 'linieName', label: 'LINIE', key: 'LINIE', sortable: true },
  { props: 'sort', label: '', key: '', width: 80 },
]

export const sourceTypeList = [
  { value: 'CAPACITY_RED_LIGHT', label: '产能红灯' },
  { value: 'EMERGENCY', label: '突发事件' },
  { value: 'OTHER', label: '其他' },
]

export const statusList = [
  { value: 'TO_FOLLOW_UP_OFFLINE', label: '待线下跟进' },
  { value: 'CLOSED', label: '已关闭' },
  { value: 'SENT', label: '已发送' },
]

export const reasonList = [
  { value: 'SEND_ALARM_LETTER', label: '已补报警信' },
  { value: 'LIFT_RED_LIGHT', label: '已解除红灯' },
  { value: 'UPDATE_YELLOW_LIGHT', label: '已改为黄灯' },
  { value: 'UPDATE_GREEN_LIGHT', label: 'BKA已更新（绿灯）' },
]


export const levelList = [
  { value: 'low', label: '<=1周' },
  { value: 'middle', label: '2~3周' },
  { value: 'middleHigh', label: ' 3~4周' },
  { value: 'high', label: '>=4周' },
]

export const eventList = [
  { value: '1', label: '事件1' },
  { value: '2', label: '事件2' },
  { value: '3', label: '事件3' },
  { value: '4', label: '事件4' },
]
