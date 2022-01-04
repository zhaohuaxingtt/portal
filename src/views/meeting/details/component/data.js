export const baseRules = {
  topic: [
    { required: true, message: '必填', trigger: 'blur' },
    { min: 1, max: 255, message: '最大长度 255 字符', trigger: 'blur' }
  ],
  duration: [
    { required: true, message: '必填', trigger: 'blur' },
    {
      type: 'number',
      message: '最大长度3位，单位（分钟），必须正整数',
      trigger: 'blur',
      transform(value) {
        if (value !== null && value !== '') {
          if (
            String(value).trim() === '' ||
            Number(value) <= 0 ||
            Number(value) >= 1000
          ) {
            return false
          } else if (
            String(value).indexOf('.') !== -1 ||
            String(value).indexOf('-') !== -1
          ) {
            return false
          } else {
            return Number(value)
          }
        } else {
          return null
        }
      }
    }
  ]
}

// export const tableColumns =
export const approvalBoolean = [
  {
    value: 'true',
    label: '是',
    i18n: 'MT_SHI'
  },
  {
    value: 'false',
    label: '否',
    i18n: 'MT_FOU'
  }
]
export const tableListColumns = [
  {
    type: 'selection'
  },

  {
    prop: 'positionCode',
    // i18n: "APPROVAL.POSITION_CODE",
    label: '会议名称'
  },
  {
    prop: 'positionName',
    // i18n: "APPROVAL.POSITION_NAME",
    label: '会议类型'
  },
  {
    prop: 'positionUser',
    // i18n: "APPROVAL.POSITION_USER",
    label: '会议状态'
  },
  {
    prop: 'positionUser',
    label: '会议地点'
  },
  {
    prop: 'positionUser',
    label: '会议日期'
  }
]
export const updateDatetableColumns = [
  {
    type: 'selection',
    width: 40
  },
  {
    prop: '会议名称',
    label: '会议名称',
    i18n: '会议名称',
    // width: 350,
    tooltip: false,
    align: 'left'
  },
  {
    prop: '会议类型',
    label: '会议类型',
    i18n: '会议类型',
    // width: 90,
    tooltip: false,
    align: 'left'
  },
  {
    prop: '会议状态',
    label: '会议状态',
    i18n: '会议状态',
    // width: 70,
    tooltip: false,
    align: 'left'
  },
  {
    prop: '会议地点',
    label: '会议地点',
    i18n: '会议地点',
    // width: 150,
    tooltip: false,
    align: 'left'
  },
  {
    prop: '会议时间',
    label: '会议时间',
    i18n: '会议时间',
    // width: 200,
    tooltip: false,
    align: 'center'
  }
]
export const statusObj = {
  '01': 'MT_CAOGAO',
  '02': 'MT_KAIFANG',
  '03': 'MT_SUODING',
  '04': 'MT_KAISHI',
  '05': 'MT_JIESHU',
  '06': 'MT_GUANBI'
}
export const numToLetter = {
  1: 'A',
  2: 'B',
  3: 'C',
  4: 'D',
  5: 'E',
  6: 'F',
  7: 'G',
  8: 'H',
  9: 'I',
  10: 'J',
  11: 'K',
  12: 'L',
  13: 'M',
  14: 'N',
  15: 'O',
  16: 'P',
  17: 'Q',
  18: 'R',
  19: 'S',
  20: 'T',
  21: 'U',
  22: 'V',
  23: 'W',
  24: 'X',
  25: 'Y',
  26: 'Z'
}
export const buttonList = [
  {
    title: '开放',
    i18n: 'MT_KAIFANG',
    methodName: 'open',
    rightButtonList: [
      {
        i18n: 'MT_CHEHUI',
        title: '撤回',
        methodName: 'recall',
        disabled: true
      },
      { i18n: 'MT_SUODING', title: '锁定', methodName: 'lock' },
      { i18n: 'MT_XIUGAI', title: '修改', methodName: 'edit' },
      { i18n: 'MT_FANHUI', title: '返回', methodName: 'back' }
    ],
    tableButtonList: [
      [
        { i18n: 'MT_XINZENGXIUXI', title: '新增休息', methodName: 'addRest' },
        { i18n: 'MT_XINZENGYITI', title: '新增议题', methodName: 'addTopic' },
        {
          i18n: 'MT_YITITIAOZHENG',
          title: '议题调整',
          methodName: 'updateTopic'
        },
        { i18n: 'MT_DAORUYITI', title: '导入议题', methodName: 'importTopic' }
      ],
      [
        {
          i18n: 'MT_XIUGAIYITI',
          title: '修改议题',
          methodName: 'editTopic',
          disabled: true
        },
        {
          i18n: 'MT_WEIHUZILIAO',
          title: '维护资料',
          methodName: 'protectInfo',
          disabled: true
        },
        {
          i18n: 'MT_SHANCHU',
          title: '删除',
          methodName: 'deleteTop',
          disabled: true
        },
        {
          i18n: 'MT_GAIQI',
          title: '改期',
          methodName: 'updateDate',
          disabled: true
        },
        {
          i18n: 'MT_CHAIFEN',
          title: '拆分',
          methodName: 'split',
          disabled: true
        }
      ]
    ]
  },
  {
    title: '锁定',
    i18n: 'MT_SUODING',
    methodName: 'lock',
    rightButtonList: [
      { i18n: 'MT_KAISHI', title: '开始', methodName: 'start' },
      { i18n: 'MT_JIESUO', title: '解锁', methodName: 'deblock' },
      { i18n: 'MT_FANHUI', title: '返回', methodName: 'back' }
    ],
    tableButtonList: [
      [
        { i18n: 'MT_XINZENGXIUXI', title: '新增休息', methodName: 'addRest' },
        { i18n: 'MT_XINZENGYITI', title: '新增议题', methodName: 'addTopic' },
        {
          i18n: 'MT_YITITIAOZHENG',
          title: '议题调整',
          methodName: 'updateTopic'
        }
        // { title: "导入议题", methodName: "importTopic" },
      ],
      [
        // { title: "开始", methodName: "start" },
        {
          i18n: 'MT_XIUGAIYITI',
          title: '修改议题',
          methodName: 'editTopic',
          disabled: true
        },
        {
          i18n: 'MT_WEIHUZILIAO',
          title: '维护资料',
          methodName: 'protectInfo',
          disabled: true
        },
        {
          i18n: 'MT_SHANCHU',
          title: '删除',
          methodName: 'deleteTop',
          disabled: true
        },
        {
          i18n: 'MT_GAIQI',
          title: '改期',
          methodName: 'updateDate',
          disabled: true
        },
        {
          i18n: 'MT_CHAIFEN',
          title: '拆分',
          methodName: 'split',
          disabled: true
        }
      ]
    ]
  },
  {
    title: '开始',
    i18n: 'MT_KAISHI',
    methodName: 'start',
    rightButtonList: [
      { i18n: 'MT_JIESHU', title: '结束', methodName: 'endMeeting' },
      { i18n: 'MT_TONGPING', title: '同屏', methodName: 'sameScreen' },
      { i18n: 'MT_ZHANSHI', title: '展示', methodName: 'displayShow' },
      { i18n: 'MT_FANHUI', title: '返回', methodName: 'back' }
    ],
    tableButtonList: [
      [
        { i18n: 'MT_XINZENGXIUXI', title: '新增休息', methodName: 'addRest' },
        { i18n: 'MT_XINZENGYITI', title: '新增议题', methodName: 'addTopic' },
        {
          i18n: 'MT_YITITIAOZHENG',
          title: '议题调整',
          methodName: 'updateTopic'
        }
        // { title: "导入议题", methodName: "importTopic" },
      ],
      [
        // {
        //   title: "开始议题",
        //   methodName: "startTopic",
        //   // disabled: true,
        //   triggerDisabled: true,
        // },
        {
          i18n: 'MT_XIUGAIYITI',
          title: '修改议题',
          methodName: 'editTopic',
          disabled: true
        },
        {
          i18n: 'MT_WEIHUZILIAO',
          title: '维护资料',
          methodName: 'protectInfo',
          disabled: true
        },
        {
          i18n: 'MT_SHANCHU',
          title: '删除',
          methodName: 'deleteTop',
          disabled: true
        },
        {
          i18n: 'MT_JIESHUYITI',
          title: '结束议题',
          methodName: 'overTopic',
          disabled: true
        }
      ]
    ]
  },
  {
    i18n: 'MT_JIESHU',
    title: '结束',
    methodName: 'end',
    rightButtonList: [
      { i18n: 'MT_GUANBI', title: '关闭', methodName: 'close' },
      {
        i18n: 'MT_SHENGCHENGHUIYIJIYAO',
        title: '生成会议纪要',
        methodName: 'generateMeetingMinutes'
      },
      { i18n: 'MT_FANHUI', title: '返回', methodName: 'back' }
    ],
    tableButtonList: [
      [
        {
          i18n: 'MT_XINZENGXIUXI',
          title: '新增休息',
          methodName: 'addRest',
          disabled: true
        },
        {
          i18n: 'MT_XINZENGYITI',
          title: '新增议题',
          methodName: 'addTopic',
          disabled: true
        },
        {
          i18n: 'MT_YITITIAOZHENG',
          title: '议题调整',
          methodName: 'updateTopic',
          disabled: true
        }
      ],
      []
    ]
  },
  {
    title: '关闭',
    i18n: 'MT_GUANBI',
    methodName: 'close',
    rightButtonList: [
      {
        i18n: 'MT_CHAKANHUIYIJIYAO',
        title: '查看会议纪要',
        methodName: 'lookMeetingMinutes'
      },
      { i18n: '', title: 'MT_FANHUI', methodName: 'back' }
    ],
    tableButtonList: [
      [
        {
          i18n: 'MT_XINZENGXIUXI',
          title: '新增休息',
          methodName: 'addRest',
          disabled: true
        },
        {
          i18n: 'MT_XINZENGYITI',
          title: '新增议题',
          methodName: 'addTopic',
          disabled: true
        },
        {
          i18n: 'MT_YITITIAOZHENG',
          title: '议题调整',
          methodName: 'updateTopic',
          disabled: true
        }
      ],
      []
    ]
  },
  {
    title: '草稿',
    i18n: 'MT_CAOGAO',
    methodName: 'draw',
    rightButtonList: [],
    tableButtonList: [[], []]
  }
]

// tableColumns: [
//   {
//     type: "selection",
//     width: 40,
//   },
//   {
//     prop: "itemNo",
//     label: "NO.",
//     i18n: "NO.",
//     width: 50,
//     tooltip: false,
//     align: "center",
//   },
//   {
//     prop: "count",
//     label: "Count",
//     i18n: "Count",
//     align: "center",
//     emit: "go-detail",
//     width: 70,
//     // customRender: (h, scope) => {
//     //   return <span class="open-link-text">{scope.row.name}</span>;
//     // },
//     tooltip: false,
//   },
//   {
//     prop: "topic",
//     label: "Topic",
//     i18n: "Topic",
//     align: "center",
//     // width: 130,
//     tooltip: false,
//     customRender: (h, scope) => {
//       if (scope.row.state === "01")
//         return h("span", [
//           h(
//             "a",
//             {
//               style: {
//                 marginRight: "5px",
//               },
//               class: "open-link-text open-link-text-black",
//               on: {
//                 click: () => {
//                   this.lookThemen(scope.row);
//                 },
//               },
//             },
//             scope.row.topic
//           ),
//         ]);
//       if (scope.row.state === "03")
//         return h("span", [
//           h(
//             "a",
//             {
//               style: {
//                 marginRight: "5px",
//               },
//               class: "open-link-text open-link-text-grey",
//               on: {
//                 click: () => {
//                   this.lookThemen(scope.row);
//                 },
//               },
//             },
//             scope.row.topic
//           ),
//         ]);
//       return h("span", [
//         h(
//           "a",
//           {
//             style: {
//               marginRight: "5px",
//             },
//             class: "open-link-text open-link-text-blue",
//             on: {
//               click: () => {
//                 this.lookThemen(scope.row);
//               },
//             },
//           },
//           scope.row.topic
//         ),
//       ]);
//     },
//   },
//   {
//     prop: "duration",
//     label: "Duration(min)",
//     i18n: "Duration(min)",
//     align: "center",
//     // width: 90,
//     tooltip: false,
//     customRender: (h, scope) => {
//       if (
//         Number(this.$route.query.userId) === 2 &&
//         this.meetingInfo.state === "03" &&
//         scope.row.state === "04"
//       ) {
//         return h("div", { class: "open-clink-back-text" }, [
//           h("div", {
//             class: "open-text-text-choice",
//             on: {
//               click: () => {
//                 this.recallTheThemen(scope.row);
//               },
//             },
//           }),
//           // h(
//           //   "div",
//           //   {
//           //     class: "open-clink-back ",
//           //   },
//           //   scope.row.duration
//           // ),
//         ]);
//         // if (
//         //   this.selectedTableData &&
//         //   this.selectedTableData.find((item) => {
//         //     return item.id === scope.row.id;
//         //   })
//         // ) {
//         //   return h("div", { class: "open-clink-back-text" }, [
//         //     h("div", {
//         //       class: "open-text-text-choice",
//         //       on: {
//         //         click: () => {
//         //           this.recallTheThemen(scope.row);
//         //         },
//         //       },
//         //     }),
//         //     // h(
//         //     //   "div",
//         //     //   {
//         //     //     class: "open-clink-back ",
//         //     //   },
//         //     //   scope.row.duration
//         //     // ),
//         //   ]);
//         // }
//         // return h("div", { class: "open-clink-back-text" }, [
//         //   h("div", {
//         //     class: "open-text-text",
//         //     on: {
//         //       click: () => {
//         //         this.recallTheThemen(scope.row);
//         //       },
//         //     },
//         //   }),
//         //   h(
//         //     "div",
//         //     {
//         //       class: "open-clink-back ",
//         //     },
//         //     scope.row.duration
//         //   ),
//         // ]);
//       }
//       return h("span", [h("span", scope.row.duration)]);
//     },
//   },
//   {
//     prop: "time",
//     label: "Time",
//     i18n: "Time",
//     tooltip: false,
//     // width: 110,
//   },
//   {
//     prop: "presenter",
//     label: "Presenter",
//     i18n: "Presenter",
//     // width: 100,
//     tooltip: false,
//   },
//   {
//     prop: "presenterDept",
//     label: "Presenter Department",
//     i18n: "Presenter Department",
//     align: "center",
//     emit: "go-detail",
//     // width: 110,
//     tooltip: false,
//   },
//   {
//     prop: "supporter",
//     label: "Supporter",
//     i18n: "Supporter",
//     align: "center",
//     tooltip: false,
//     // width: 100,
//   },
//   {
//     prop: "supporterDept",
//     label: "Supporter Department",
//     i18n: "Supporter Department",
//     tooltip: false,
//     // width: 110,
//   },
//   {
//     prop: "remark",
//     label: "Remark",
//     i18n: "Remark",
//     tooltip: false,
//     // width: 120,
//   },
// ],
