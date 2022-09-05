export const searchList = [
  { prop: 'status', label: '状态', key: 'ZHUANGTAI', type: 'select', optionName: 'statusList' },
  { prop: 'closeReasonList', label: '关闭原因', key: 'GUANBIYUANYIN', type: 'select', optionName: 'reasonList', multiple: true },
  { prop: 'departmentCodeList', label: '科室', key: 'KESHI', type: 'select', optionName: 'deptList', multiple: true },
  { prop: 'linieName', label: 'LINIE', key: 'LINIE', type: 'input' },
  { prop: 'bkaName', label: 'BKA名称', key: 'BKANAME', type: 'input' },
  { prop: 'date', label: '任务产生时间', key: 'RENWUCHANSHENGSHIJIAN', type: 'date' },
]

export const sentTableTitle = [
  { props: 'bkaName', label: 'BKA', key: 'BKA', sortable: true },
  { props: 'date', label: '任务截止时间', key: 'RENWUJIEZHISHIJIAN', sortable: true },
  { props: 'status', label: '跟进状态', key: 'GENJINZHUANGTAI', sortable: true },
  { props: 'closeReason', label: '关闭原因', key: 'GUANBIYUANYIN', sortable: true },
  { props: 'closeDate', label: '关闭时间', key: 'GUANBISHIJAIN', sortable: true },
  { props: 'dept', label: '科室', key: 'KESHI', sortable: true },
  { props: 'linie', label: 'LINIE', key: 'LINIE', sortable: true },
  { props: 'sort', label: '', key: '' },
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
