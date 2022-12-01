import statusShow from "./components/statusShow";
import sortSpan from "./components/sortSpan";
import overdue from "./components/overdue";
import shortageLevelSpan from "./components/shortageLevel";

// 待反馈报警信
export const searchList = [
  { prop: 'supplierName', label: '供应商', key: 'GONGYINGSHANG', type: 'input' },
  { prop: 'status', label: '状态', key: 'ZHUANGTAI', type: 'select', optionName: 'statusList', default: 'TO_FOLLOW_UP_OFFLINE' },
  { prop: 'closeReasonList', label: '关闭原因', key: '关闭原因', type: 'select', optionName: 'reasonList', multiple: true },
  { prop: 'departmentCodeList', label: '科室', key: 'KESHI', type: 'select', optionName: 'deptList', multiple: true },
  { prop: 'linieName', label: 'LINIE', key: 'LINIE', type: 'input' },
  { prop: 'date', label: '任务产生时间', key: '任务产生时间', type: 'date', default: [] },
]

// 报警信
export const toBeSearchList = [
  { prop: 'source', label: '来源', key: 'LAIYUAN', type: 'select', optionName: 'sourceTypeList' },
  { prop: 'supplierName', label: '供应商', key: 'GONGYINGSHANG', type: 'input' },
  { prop: 'eventName', label: '事件名称', key: '事件名称', type: 'input' },
  { prop: 'emergencyLever', label: '紧缺级别', key: '紧缺级别', type: 'select', optionName: 'levelList', multiple: true },
  { prop: 'status', label: '状态', key: 'ZHUANGTAI', type: 'select', optionName: 'statusList', default: 'SENT' },
  { prop: 'departmentCodeList', label: '科室', key: 'KESHI', type: 'select', optionName: 'deptList', multiple: true },
  { prop: 'linieName', label: 'LINIE', key: 'LINIE', type: 'input' },
  { prop: 'date', label: '发送时间', key: '发送时间', type: 'date', default: [] },
]


export const sentTableTitle = [
  { type: 'index', label: '#', key: '#', width: 50 },
  {
    prop: 'supplierName',
    label: '供应商',
    key: 'GONGYINGSHANG',
    sortable: true,
    emit: 'gotoSupplier',
    customRender: (h, scope) => {
      return <statusShow row={scope.row} prop="supplierName" link></statusShow>
    }
  },
  {
    prop: 'bkaName',
    label: 'BKA',
    key: 'BKA',
    sortable: true,
    tooltip: true,
    minWidth: 120,
    emit: 'gotoBKA',
    customRender: (h, scope) => {
      return <statusShow row={scope.row} prop="bkaName" link></statusShow>
    }
  },
  {
    prop: 'taskEndDateStr',
    label: '供应商任务截止时间',
    key: '供应商任务截止时间',
    sortable: true,
    tooltip: true,
    width: 210,
    customRender: (h, scope) => {
      return <overdue row={scope.row} prop="taskEndDateStr" flag={scope.row.hasOverdue}></overdue>
    }
  },
  {
    prop: 'status',
    label: '跟进状态',
    key: '跟进状态',
    sortable: true,
    customRender: (h, scope) => {
      return <statusShow row={scope.row} prop="status" statusList={statusList}></statusShow>
    }
  },
  {
    prop: 'closeReason',
    label: '关闭原因',
    key: '关闭原因',
    sortable: true,
    emit: 'gotoAlarm',
    customRender: (h, scope) => {
      return <statusShow row={scope.row} link={scope.row.closeReason == 'SEND_ALARM_LETTER'} prop="closeReason" statusList={reasonList}></statusShow>
    }
  },
  {
    prop: 'closeTime',
    label: '关闭时间',
    key: '关闭时间',
    sortable: true,
    width: 180
  },
  {
    prop: 'departmentCode',
    label: '科室', key: 'KESHI',
    sortable: true
  },
  {
    prop: 'linieName',
    label: 'LINIE', key: 'LINIE',
    sortable: true
  },
  {
    prop: 'sort',
    label: '',
    key: '',
    emit: 'topType',
    customRender: (h, scope) => {
      return <sortSpan row={scope.row} prop="sort"></sortSpan>
    }
  },
]

export const toBeSentTableTitle = [
  { type: 'selection', width: 50 },
  { type: 'index', label: '#', key: '#', width: 50 },
  {
    prop: 'alarm', label: '报警信', key: '报警信', sortable: true, width: 90,
    emit: 'gotoAlarm',
    customRender: (h, scope) => {
      return <span class="link cursor">
        查看
      </span>
    }
  },
  {
    prop: 'supplierName', label: '供应商', key: 'GONGYINGSHANG', sortable: true,
    emit: 'gotoSupplier',
    customRender: (h, scope) => {
      return <statusShow row={scope.row} prop="supplierName" link></statusShow>
    }
  },
  {
    prop: 'source', label: '来源', key: 'LAIYUAN', sortable: true, width: 120,
    customRender: (h, scope) => {
      return <statusShow row={scope.row} prop="source" statusList={sourceTypeList}></statusShow>
    }
  },
  {
    prop: 'warningLetterTitle', label: '事件名称', key: '事件名称', sortable: true, tooltip: true, minWidth: 120,
    emit: 'gotoBKA',
    customRender: (h, scope) => {
      return <statusShow row={scope.row} prop="warningLetterTitle" link={scope.row.source == 'CAPACITY_RED_LIGHT'}></statusShow>
    }
  },
  {
    prop: 'shortageLevel', label: '紧缺级别', key: '紧缺级别', sortable: true, width: 120,
    sortMethod: shortageLevelSort,
    customRender: (h, scope) => {
      return <shortageLevelSpan row={scope.row} prop="shortageLevel" statusList={levelList}></shortageLevelSpan>
    }
  },
  { prop: 'sendTime', label: '发送时间', key: '发送时间', sortable: true, width: 180 },
  {
    prop: 'status', label: '状态', key: '状态', sortable: true, width: 80,
    customRender: (h, scope) => {
      return <statusShow row={scope.row} prop="status" statusList={toBeStatusList}></statusShow>
    }
  },
  { prop: 'closeTime', label: '处理时间', key: '处理时间', sortable: true, width: 180 },
  { prop: 'departmentCode', label: '科室', key: 'KESHI', sortable: true },
  { prop: 'linieName', label: 'LINIE', key: 'LINIE', sortable: true },
  {
    prop: 'sort', label: '', key: '', width: 80, emit: 'topType',
    customRender: (h, scope) => {
      return <sortSpan row={scope.row} prop="sort"></sortSpan>
    }
  },
]

export const sourceTypeList = [
  { value: 'CAPACITY_RED_LIGHT', label: '产能红灯' },
  { value: 'EMERGENCY', label: '突发事件' },
  { value: 'OTHER', label: '其他' },
]
// 报警信
export const toBeStatusList = [
  { value: 'CLOSED', label: '已处理' },
  { value: 'SENT', label: '已发送' },
]
// 待线下跟进
export const statusList = [
  { value: 'TO_FOLLOW_UP_OFFLINE', label: '待反馈' },
  { value: 'CLOSED', label: '已关闭' },
]

export const reasonList = [
  { value: 'SEND_ALARM_LETTER', label: '已补报警信' },
  { value: 'LIFT_RED_LIGHT', label: '已解除红灯' },
  { value: 'UPDATE_YELLOW_LIGHT', label: 'BKA已更新为黄灯' },
  { value: 'UPDATE_GREEN_LIGHT', label: 'BKA已更新为绿灯' },
]


export const levelList = [
  { value: 'low', label: '<=1周', icon: 'iconbaojiapingfengenzong-jiedian-hei', sort: 1 },
  { value: 'middle', label: '2~3周', icon: 'iconbaojiapingfengenzong-jiedian-hong', sort: 2 },
  { value: 'middleHigh', label: ' 3~4周', icon: 'iconbaojiapingfengenzong-jiedian-cheng', sort: 3 },
  { value: 'high', label: '>=4周', icon: 'iconbaojiapingfengenzong-jiedian-huang', sort: 4 },
]

// 紧缺级别排序
function shortageLevelSort(a, b) {
  const row1 = levelList.find(item => item.value == a.shortageLevel)
  const row2 = levelList.find(item => item.value == b.shortageLevel)
  return row1.sort - row2.sort
}


export const eventList = [
  { value: '1', label: '事件1' },
  { value: '2', label: '事件2' },
  { value: '3', label: '事件3' },
  { value: '4', label: '事件4' },
]
