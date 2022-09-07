export const searchList = [
  { prop: 'supplier', label: '供应商', key: 'GONGYINGSHANG', type: 'input' },
  { prop: 'status', label: '状态', key: 'ZHUANGTAI', type: 'select', optionName: 'statusList' },
  { prop: 'closeReasonList', label: '关闭原因', key: '关闭原因', type: 'select', optionName: 'reasonList', multiple: true },
  { prop: 'departmentCodeList', label: '科室', key: 'KESHI', type: 'select', optionName: 'deptList', multiple: true },
  { prop: 'linieName', label: 'LINIE', key: 'LINIE', type: 'input' },
  { prop: 'date', label: '任务产生时间', key: '任务产生时间', type: 'date' },
]

export const toBeSearchList = [
  { prop: 'sourceType', label: '来源', key: 'LAIYUAN', type: 'select', optionName: 'sourceTypeList' },
  { prop: 'supplier', label: '供应商', key: 'GONGYINGSHANG', type: 'input' },
  { prop: 'enevtName', label: 'SHIJIANMINGCHEN', key: 'SHIJIANMINGCHEN', type: 'select', optionName: 'eventList', multiple: true },
  { prop: 'level', label: '紧缺级别', key: 'JINQUEJIBIE', type: 'select', optionName: 'levelList', multiple: true },
  { prop: 'status', label: '状态', key: 'ZHUANGTAI', type: 'select', optionName: 'statusList' },
  { prop: 'departmentCodeList', label: '科室', key: 'KESHI', type: 'select', optionName: 'deptList', multiple: true },
  { prop: 'linieName', label: 'LINIE', key: 'LINIE', type: 'input' },
]


export const sentTableTitle = [
  { props: 'supplierName', label: '供应商', key: 'GONGYINGSHANG', sortable: true },
  { props: 'bkaName', label: 'BKA', key: 'BKA', sortable: true },
  { props: 'date', label: '供应商任务截止时间', key: '供应商任务截止时间', sortable: true, tooltip: true },
  { props: 'date2', label: '跟进截止时间', key: '跟进截止时间', sortable: true },
  { props: 'status', label: '跟进状态', key: '跟进状态', sortable: true },
  { props: 'closeReason', label: '关闭原因', key: '关闭原因', sortable: true },
  { props: 'closeDate', label: '关闭时间', key: '关闭时间', sortable: true },
  { props: 'dept', label: '科室', key: 'KESHI', sortable: true },
  { props: 'linie', label: 'LINIE', key: 'LINIE', sortable: true },
  { props: 'sort', label: '', key: '' },
]


export const toBeSentTableTitle = [
  { props: 'alarm', label: '报警信', key: '报警信', sortable: true },
  { props: 'supplierName', label: '供应商', key: 'GONGYINGSHANG', sortable: true },
  { props: 'sourceType', label: '来源', key: 'LAIYUAN', sortable: true },
  { props: 'bkaName', label: '名称', key: 'NAME', sortable: true },
  { props: 'level', label: '紧缺级别', key: 'JINQUEJIBIE', sortable: true },
  { props: 'sentDate', label: '发送时间', key: 'FASONGSHIJAIN', sortable: true },
  { props: 'status', label: '状态', key: 'ZHUANGTAI', sortable: true },
  { props: 'meetName', label: '会议名称', key: '会议名称', sortable: true },
  { props: 'closeDate', label: '关闭时间', key: '关闭时间', sortable: true },
  { props: 'dept', label: '科室', key: 'KESHI', sortable: true },
  { props: 'linie', label: 'LINIE', key: 'LINIE', sortable: true },
  { props: 'sort', label: '', key: '' },
]

export const sourceTypeList = [
  { value: '1', label: '产能红灯' },
  { value: '2', label: '突发事件' },
  { value: '3', label: '其他' },
]

export const statusList = [
  { value: '1', label: '待线下跟进' },
  { value: '2', label: '已关闭' },
]

export const reasonList = [
  { value: '1', label: '已补报警信' },
  { value: '2', label: '已解除红灯' },
  { value: '3', label: '已改为黄灯' },
  { value: '4', label: 'BKA已更新（绿灯）' },
]


export const levelList = [
  { value: '1', label: '<=1周' },
  { value: '2', label: '2~3周' },
  { value: '3', label: ' 3~4周' },
  { value: '4', label: '>=4周' },
]

export const eventList = [
  { value: '1', label: '事件1' },
  { value: '2', label: '事件2' },
  { value: '3', label: '事件3' },
  { value: '4', label: '事件4' },
]
