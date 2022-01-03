import dayjs from '@/utils/dayjs.js';
export const baseRules = {
  topic: [
    { required: true, message: "必填", trigger: "blur" },
    { min: 1, max: 255, message: "最大长度 255 字符", trigger: "blur" },
  ],
  duration: [
    { required: true, message: "必填", trigger: "blur" },
    {
      type: "number",
      message: "最大长度3位，单位（分钟），必须正整数",
      trigger: "blur",
      transform(value) {
        if (value !== null && value !== "") {
          if (
            String(value).trim() === "" ||
            Number(value) <= 0 ||
            Number(value) >= 1000
          ) {
            return false;
          } else if (
            String(value).indexOf(".") !== -1 ||
            String(value).indexOf("-") !== -1
          ) {
            return false;
          } else {
            return Number(value);
          }
        } else {
          return null;
        }
      },
    },
  ],
};

// export const tableColumns =
export const approvalBoolean = [
  {
    value: "true",
    label: "是",
  },
  {
    value: "false",
    label: "否",
  },
];
export const tableListColumns = [
  {
    type: "selection",
  },

  {
    prop: "positionCode",
    // i18n: "APPROVAL.POSITION_CODE",
    label: "会议名称",
  },
  {
    prop: "positionName",
    // i18n: "APPROVAL.POSITION_NAME",
    label: "会议类型",
  },
  {
    prop: "positionUser",
    // i18n: "APPROVAL.POSITION_USER",
    label: "会议状态",
  },
  {
    prop: "positionUser",
    label: "会议地点",
  },
  {
    prop: "positionUser",
    label: "会议日期",
  },
];
export const updateDatetableColumns = [
  {
    type: "selection",
    width: 40,
  },
  {
    prop: "会议名称",
    label: "会议名称",
    i18n: "会议名称",
    // width: 350,
    tooltip: false,
    align: "left",
  },
  {
    prop: "会议类型",
    label: "会议类型",
    i18n: "会议类型",
    // width: 90,
    tooltip: false,
    align: "left",
  },
  {
    prop: "会议状态",
    label: "会议状态",
    i18n: "会议状态",
    // width: 70,
    tooltip: false,
    align: "left",
  },
  {
    prop: "会议地点",
    label: "会议地点",
    i18n: "会议地点",
    // width: 150,
    tooltip: false,
    align: "left",
  },
  {
    prop: "会议时间",
    label: "会议时间",
    i18n: "会议时间",
    // width: 200,
    tooltip: false,
    align: "center",
  },
];
export const statusObj = {
  "01": "草稿",
  "02": "开放",
  "03": "锁定",
  "04": "开始",
  "05": "结束",
  "06": "关闭",
};
export const stateObj = {
  "01": "未进行",
  "02": "进行中",
  "03": "已结束",
  "04": "申请撤回",
};
export const themenConclusion = {
  "01": "待定",
  "02": "定点",
  "03": "发LOI",
  "04": "转TER/TOP-TER",
  "05": "下次Pre CSC",
  "06": "转CSC",
  "07": "关闭",
};
export const themenConclusionArrObj = [
  // {
  //   conclusionCsc: "01",
  //   conclusionName: "待定",
  // },
  // {
  //   conclusionCsc: "02",
  //   conclusionName: "定点",
  // },
  // {
  //   conclusionCsc: "03",
  //   conclusionName: "发LOI",
  // },
  // {
  //   conclusionCsc: "04",
  //   conclusionName: "转TER/TOP-TER",
  // },
  // {
  //   conclusionCsc: "05",
  //   conclusionName: "下次Pre CSC",
  // },
  // {
  //   conclusionCsc: "06",
  //   conclusionName: "转CSC",
  // },
  // {
  //   conclusionCsc: "07",
  //   conclusionName: "关闭",
  // },
  {
    conclusionCsc: "01",
    conclusionName: "待定",
  },
  {
    conclusionCsc: "02",
    conclusionName: "通过",
  },
  {
    conclusionCsc: "03",
    conclusionName: "不通过",
  },
  {
    conclusionCsc: "04",
    conclusionName: "Last Call",
  },
  {
    conclusionCsc: "05",
    conclusionName: "分段定点",
  },
];
export const numToLetter = {
  "1": "A",
  "2": "B",
  "3": "C",
  "4": "D",
  "5": "E",
  "6": "F",
  "7": "G",
  "8": "H",
  "9": "I",
  "10": "J",
  "11": "K",
  "12": "L",
  "13": "M",
  "14": "N",
  "15": "O",
  "16": "P",
  "17": "Q",
  "18": "R",
  "19": "S",
  "20": "T",
  "21": "U",
  "22": "V",
  "23": "W",
  "24": "X",
  "25": "Y",
  "26": "Z",
};
export const buttonList = [
  {
    title: "开放",
    methodName: "open",
    rightButtonList: [
      { title: "锁定", methodName: "lock" },
      { title: "开始", methodName: "start" },
      { title: "修改", methodName: "edit" },
      { title: "返回", methodName: "back" },
    ],
    tableButtonList: [
      [
        { title: "新增休息", methodName: "addRest" },
        { title: "新增议题", methodName: "newAddTopic" },
        // { title: "新增手工议题", methodName: "addTopic" },
        { title: "议题调整", methodName: "updateTopic" },
        { title: "批量调整", methodName: "batchAdjustment" },
        // { title: "导入议题", methodName: "importTopic" },
      ],
      [
        { title: "修改议题", methodName: "editTopic", disabled: true },
        { title: "维护资料", methodName: "protectInfo", disabled: true },
        { title: "删除", methodName: "deleteTopAll", disabled: true },
        { title: "改期", methodName: "updateDate", disabled: true },
        // { title: "拆分", methodName: "split", disabled: true },
        { title: "结束议题", methodName: "overTopic", disabled: true, },
        { title: "发送大会议程", methodName: "sendAgenda", disabled: true },
      ],
    ],
  },
  {
    title: "锁定",
    methodName: "lock",
    rightButtonList: [
      { title: "开始", methodName: "start" },
      { title: "解锁", methodName: "deblock" },
      { title: "返回", methodName: "back" },
    ],
    tableButtonList: [
      [
        { title: "新增休息", methodName: "addRest" },
        { title: "新增议题", methodName: "newAddTopic" },
        // { title: "新增手工议题", methodName: "addTopic" },
        { title: "议题调整", methodName: "updateTopic" },
        { title: "批量调整", methodName: "batchAdjustment" },
        // { title: "导入议题", methodName: "importTopic" },
      ],
      [
        // { title: "开始", methodName: "start" },
        { title: "修改议题", methodName: "editTopic", disabled: true },
        { title: "维护资料", methodName: "protectInfo", disabled: true },
        { title: "删除", methodName: "deleteTopAll", disabled: true },
        { title: "改期", methodName: "updateDate", disabled: true },
        // { title: "拆分", methodName: "split", disabled: true },
        { title: "结束议题", methodName: "overTopic", disabled: true, },
        { title: "发送大会议程", methodName: "sendAgenda", disabled: true },
      ],
    ],
  },
  {
    title: "开始",
    methodName: "start",
    rightButtonList: [
      { title: "结束", methodName: "endMeeting" },
      { title: "同屏", methodName: "sameScreen" },
      { title: "展示", methodName: "displayShow" },
      { title: "返回", methodName: "back" },
    ],
    tableButtonList: [
      [
        { title: "新增休息", methodName: "addRest" },
        { title: "新增议题", methodName: "newAddTopic" },
        // { title: "新增手工议题", methodName: "addTopic" },
        { title: "议题调整", methodName: "updateTopic" },
        { title: "批量调整", methodName: "batchAdjustment" },
        // { title: "导入议题", methodName: "importTopic" },
      ],
      [
        // {
        //   title: "开始议题",
        //   methodName: "startTopic",
        //   // disabled: true,
        //   triggerDisabled: true,
        // },
        { title: "修改议题", methodName: "editTopic", disabled: true },
        { title: "维护资料", methodName: "protectInfo", disabled: true },
        { title: "删除", methodName: "deleteTopAll", disabled: true },
        { title: "改期", methodName: "updateDate", disabled: true },
        { title: "结束议题", methodName: "overTopic", disabled: true, },
        // { title: "维护结论", methodName: "protectResult", disabled: true, },
        // { title: "查看结论", methodName: "lookResult", disabled: true, },
        { title: "发送大会议程", methodName: "sendAgenda", disabled: true },
      ],
    ],
  },
  {
    title: "结束",
    methodName: "end",
    rightButtonList: [
      { title: "关闭", methodName: "close" },
      { title: "生成会议纪要", methodName: "generateMeetingMinutes" },
      { title: "返回", methodName: "back" },
    ],
    tableButtonList: [
      [
        { title: "新增休息", methodName: "addRest", disabled: true },
        { title: "新增议题", methodName: "addTopic", disabled: true },
        { title: "议题调整", methodName: "updateTopic", disabled: true },
      ],
      [
        { title: "待定", methodName: "bePending", disabled: true },
        { title: "定点", methodName: "fixedPoint", disabled: true },
        { title: "转CSC", methodName: "translateCSC", disabled: true },
        { title: "下次Pre CSC", methodName: "nextPreCSC", disabled: true },
        { title: "发LOI", methodName: "senLol", disabled: true },
        { title: "转TER/TOP-TER", methodName: "translateTer", disabled: true },
        { title: "冻结RS单", methodName: "freezeRsBill", disabled: true },
        { title: "关闭", methodName: "closeResult", disabled: true },
        { title: "查看结论", methodName: "lookResult", disabled: true },
      ],
    ],
  },
  {
    title: "关闭",
    methodName: "close",
    rightButtonList: [
      { title: "生成会议纪要", methodName: "generateMeetingMinutes" },
      { title: "返回", methodName: "back" },
    ],
    tableButtonList: [
      [
        { title: "新增休息", methodName: "addRest", disabled: true },
        { title: "新增手工议题", methodName: "addTopic", disabled: true },
        { title: "议题调整", methodName: "updateTopic", disabled: true },
      ],
      [{ title: "查看结论", methodName: "lookResult", disabled: true }],
    ],
  },
  {
    title: "草稿",
    methodName: "draw",
    rightButtonList: [],
    tableButtonList: [[], []],
  },
];


//列表
export const TABLE_COLUMNS_DEFAULT = [
  {
    props: 'index',
    name: '#',
    width: 50
  },
  {
    type: 'index',
    label: '#',
    i18n: '',
    width: 50
  },
  {
    props: 'currency',
    name: '货币类型',
    key: '',
    required: true,
    rule: { required: true, message: '货币类型', trigger: 'change' }
  },
  {
    props: 'targetPrice',
    name: '目标价',
    key: '',
    required: true,
    rule: { required: true, message: '货币类型', trigger: 'change' }
  },
  {
    props: 'finalPrice',
    name: '最终成交价',
    key: '',
    required: true,
    rule: { required: true, message: '货币类型', trigger: 'change' }
  },
  {
    props: 'supplierName',
    name: '供应商',
    key: ''
  },
]
// 表头 发送大会议程
export const TABLE_COLUMNS_DEFAULTALl = [
  {
    type: 'selection',
    width: 50
  },
  {
    type: 'index',
    label: '#',
    i18n: '',
    width: 50
  }, 
  {
    value: 1,
    prop: '',
    label: '会议名称',
    i18n: '',
    customRender: (h, scope) => {
      return <span class='open-link-text' > {scope.row.code} </span>
    },
  },
  {
    value: 2,
    prop: '',
    label: '会议类型',
    i18n: '',
  },
  {
    value: 3,
    prop: '',
    label: '会议状态',
    i18n: '',
  },
  {
    value: 4,
    prop: '',
    label: '会议地点',
    i18n: ''
  },
  {
    value: 5,
    prop: '',
    label: '会议时间',
    i18n: ''
  },
  {
    value: 6,
    prop: '',
    label: '周次',
    i18n: '',
  },
  
]
export const statusList = [
  {
    label: '草稿',
    value: '01',
  },
  {
    label: '开放',
    value: '02',
  },
  {
    label: '锁定',
    value: '03',
  },
  {
    label: '开始',
    value: '04',
  },
  {
    label: '结束',
    value: '05',
  },
  {
    label: '关闭',
    value: '06',
  },
];
let weekNum = dayjs(dayjs().year()).isoWeeksInYear();
let weekListInit = [];
for (let index = 0; index < weekNum; index++) {
  if (index < 9) {
    weekListInit.push({
      label: 'CW0' + (index + 1) + '/' + weekNum,
      value: index,
    });
  } else {
    weekListInit.push({
      label: 'CW' + (index + 1) + '/' + weekNum,
      value: index,
    });
  }
}
export {weekListInit};