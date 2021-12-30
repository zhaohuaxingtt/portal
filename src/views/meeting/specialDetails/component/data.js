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
    i18n: 'MT_HUIYIMINGCHENG',
    label: '会议名称'
  },
  {
    prop: 'positionName',
    i18n: 'MT_HUIYILEIXING',
    label: '会议类型'
  },
  {
    prop: 'positionUser',
    i18n: 'MT_HUIYIZHUANGTAI',
    label: '会议状态'
  },
  {
    prop: 'positionUser',
    i18n: 'MT_HUIYIDIDIAN',
    label: '会议地点'
  },
  {
    prop: 'positionUser',
    i18n: 'MT_HUIYIRIQI',
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
    i18n: 'MT_HUIYIMINGCHENG',
    // width: 350,
    tooltip: false,
    align: 'left'
  },
  {
    prop: '会议类型',
    label: '会议类型',
    i18n: 'MT_HUIYILEIXING',
    // width: 90,
    tooltip: false,
    align: 'left'
  },
  {
    prop: '会议状态',
    label: '会议状态',
    i18n: 'MT_HUIYIZHUANGTAI',
    // width: 70,
    tooltip: false,
    align: 'left'
  },
  {
    prop: '会议地点',
    label: '会议地点',
    i18n: 'MT_HUIYIDIDIAN',
    // width: 150,
    tooltip: false,
    align: 'left'
  },
  {
    prop: '会议时间',
    label: '会议时间',
    i18n: 'MT_HUIYISHIJIAN',
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
export const stateObj = {
  '01': 'MT_WEIJINXING',
  '02': 'MT_JINXINGZHONG',
  '03': 'MT_YIJIESHU',
  '04': 'MT_SHENQINGCHEHUI'
}
export const themenConclusion = {
  '01': 'MT_DAIDING',
  '02': 'MT_DINGDIAN',
  '03': 'MT_FALOI',
  '04': 'MT_ZHUANTER',
  '05': 'MT_XIACIPRE',
  '06': 'MT_ZHUANCSC',
  '07': 'MT_GUANBI'
}
export const themenConclusionArrObj = [
  {
    conclusionCsc: '05',
    conclusionName: '下次Pre CSC',
    i18n: 'MT_XIACIPRE'
  },
  {
    conclusionCsc: '06',
    conclusionName: '转CSC',
    i18n: 'MT_ZHUANCSC'
  },
  {
    conclusionCsc: '02',
    conclusionName: '定点',
    i18n: 'MT_DINGDIAN'
  },
  {
    conclusionCsc: '03',
    conclusionName: '发LOI',
    i18n: 'MT_FALOI'
  },
  {
    conclusionCsc: '04',
    conclusionName: '转TER/TOP-TER',
    i18n: 'MT_ZHUANTER'
  },
  {
    conclusionCsc: '01',
    conclusionName: '待定',
    i18n: 'MT_DAIDING'
  },
  {
    conclusionCsc: '07',
    conclusionName: '关闭',
    i18n: 'MT_GUANBI'
  }
]
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
      { title: '锁定', i18n: 'MT_SUODING', methodName: 'lock' },
      { title: '开始', i18n: 'MT_KAISHI', methodName: 'start' },
      { title: '修改', i18n: 'MT_XIUGAI', methodName: 'edit' },
      { title: '返回', i18n: 'MT_FANHUI', methodName: 'back' }
    ],
    tableButtonList: [
      [
        { title: '新增休息', i18n: 'MT_XINZENGXIUXI', methodName: 'addRest' },
        {
          title: '新增手工议题',
          i18n: 'MT_XINZENGSHOUGONGYITI',
          methodName: 'addTopic'
        },
        {
          title: '议题调整',
          i18n: 'MT_YITITIAOZHENG',
          methodName: 'updateTopic'
        },
        {
          title: '批量排序',
          i18n: 'MT_PILIANGPAIXU',
          methodName: 'sortBatch'
        }
        // { title: "导入议题", methodName: "importTopic" },
      ],
      [
        {
          title: '修改议题',
          i18n: 'MT_XIUGAIYITI',
          methodName: 'editTopic',
          disabled: true
        },
        {
          title: '维护资料',
          i18n: 'MT_WEIHUZILIAO',
          methodName: 'protectInfo',
          disabled: true
        },
        {
          title: '删除',
          i18n: 'MT_SHANCHU',
          methodName: 'deleteTopAll',
          disabled: true
        },
        {
          title: '改期',
          i18n: 'MT_GAIQI',
          methodName: 'updateDate',
          disabled: true
        },
        {
          title: '拆分',
          i18n: 'MT_CHAIFEN',
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
      { title: '开始', i18n: 'MT_KAISHI', methodName: 'start' },
      { title: '解锁', i18n: 'MT_JIESUO', methodName: 'deblock' },
      { title: '返回', i18n: 'MT_FANHUI', methodName: 'back' }
    ],
    tableButtonList: [
      [
        { title: '新增休息', i18n: 'MT_XINZENGXIUXI', methodName: 'addRest' },
        {
          title: '新增手工议题',
          i18n: 'MT_XINZENGSHOUGONGYITI',
          methodName: 'addTopic'
        },
        {
          title: '议题调整',
          i18n: 'MT_YITITIAOZHENG',
          methodName: 'updateTopic'
        },
        {
          title: '批量排序',
          i18n: 'MT_PILIANGPAIXU',
          methodName: 'sortBatch'
        }
        // { title: "导入议题", methodName: "importTopic" },
      ],
      [
        // { title: "开始", methodName: "start" },
        {
          title: '修改议题',
          i18n: 'MT_XIUGAIYITI',
          methodName: 'editTopic',
          disabled: true
        },
        {
          title: '维护资料',
          i18n: 'MT_WEIHUZILIAO',
          methodName: 'protectInfo',
          disabled: true
        },
        {
          title: '删除',
          i18n: 'MT_SHANCHU',
          methodName: 'deleteTopAll',
          disabled: true
        },
        {
          title: '改期',
          i18n: 'MT_GAIQI',
          methodName: 'updateDate',
          disabled: true
        },
        {
          title: '拆分',
          i18n: 'MT_CHAIFEN',
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
      { title: '结束', i18n: 'MT_JIESHU', methodName: 'endMeeting' },
      { title: '同屏', i18n: 'MT_TONGPING', methodName: 'sameScreen' },
      { title: '展示', i18n: 'MT_ZHANSHI', methodName: 'displayShow' },
      { title: '返回', i18n: 'MT_FANHUI', methodName: 'back' }
    ],
    tableButtonList: [
      [
        { title: '新增休息', i18n: 'MT_XINZENGXIUXI', methodName: 'addRest' },
        {
          title: '新增手工议题',
          i18n: 'MT_XINZENGSHOUGONGYITI',
          methodName: 'addTopic'
        },
        {
          title: '议题调整',
          i18n: 'MT_YITITIAOZHENG',
          methodName: 'updateTopic'
        },
        {
          title: '批量排序',
          i18n: 'MT_PILIANGPAIXU',
          methodName: 'sortBatch'
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
          title: '修改议题',
          i18n: 'MT_XIUGAIYITI',
          methodName: 'editTopic',
          disabled: true
        },
        {
          title: '维护资料',
          i18n: 'MT_WEIHUZILIAO',
          methodName: 'protectInfo',
          disabled: true
        },
        {
          title: '删除',
          i18n: 'MT_SHANCHU',
          methodName: 'deleteTopAll',
          disabled: true
        },
        {
          title: '结束议题',
          i18n: 'MT_JIESHUYITI',
          methodName: 'overTopic',
          disabled: true
        },
        {
          title: '维护结论',
          i18n: 'MT_WEIHUJIELUN',
          methodName: 'protectResult',
          disabled: true
        },
        {
          title: '查看结论',
          i18n: 'MT_CHAKANJIELUN',
          methodName: 'lookResult',
          disabled: true
        }
      ]
    ]
  },
  {
    title: '结束',
    i18n: 'MT_JIESHU',
    methodName: 'end',
    rightButtonList: [
      { title: '关闭', i18n: 'MT_GUANBI', methodName: 'close' },
      {
        title: '生成会议纪要',
        i18n: 'MT_SHENGCHENGHUIYIJIYAO',
        methodName: 'generateMeetingMinutes'
      },
      { title: '返回', i18n: 'MT_FANHUI', methodName: 'back' }
    ],
    tableButtonList: [
      [
        {
          title: '新增休息',
          i18n: 'MT_XINZENGXIUXI',
          methodName: 'addRest',
          disabled: true
        },
        {
          title: '新增议题',
          i18n: 'MT_XINZENGYITI',
          methodName: 'addTopic',
          disabled: true
        },
        {
          title: '议题调整',
          i18n: 'MT_YITITIAOZHENG',
          methodName: 'updateTopic',
          disabled: true
        }
      ],
      [
        {
          title: '待定',
          i18n: 'MT_DAIDING',
          methodName: 'bePending',
          disabled: true
        },
        {
          title: '定点',
          i18n: 'MT_DINGDIAN',
          methodName: 'fixedPoint',
          disabled: true
        },
        {
          title: '转CSC',
          i18n: 'MT_ZHUANCSC',
          methodName: 'translateCSC',
          disabled: true
        },
        {
          title: '下次Pre CSC',
          i18n: 'MT_XIACIPRE',
          methodName: 'nextPreCSC',
          disabled: true
        },
        {
          title: '发LOI',
          i18n: 'MT_FALOI',
          methodName: 'senLol',
          disabled: true
        },
        {
          title: '转TER/TOP-TER',
          i18n: 'MT_ZHUANTER',
          methodName: 'translateTer',
          disabled: true
        },
        {
          title: '冻结RS单',
          i18n: 'MT_DONGJIERSDAN',
          methodName: 'freezeRsBill',
          disabled: true
        },
        {
          title: '关闭',
          i18n: 'MT_GUANBI',
          methodName: 'closeResult',
          disabled: true
        },
        {
          title: '查看结论',
          i18n: 'MT_CHAKANJIELUN',
          methodName: 'lookResult',
          disabled: true
        }
      ]
    ]
  },
  {
    title: '关闭',
    i18n: 'MT_GUANBI',
    methodName: 'close',
    rightButtonList: [
      {
        title: '生成会议纪要',
        i18n: 'MT_SHENGCHENGHUIYIJIYAO',
        methodName: 'generateMeetingMinutes'
      },
      { title: '返回', i18n: 'MT_FANHUI', methodName: 'back' }
    ],
    tableButtonList: [
      [
        {
          title: '新增休息',
          i18n: 'MT_XINZENGXIUXI',
          methodName: 'addRest',
          disabled: true
        },
        {
          title: '新增手工议题',
          i18n: 'MT_XINZENGSHOUGONGYITI',
          methodName: 'addTopic',
          disabled: true
        },
        {
          title: '议题调整',
          i18n: 'MT_YITITIAOZHENG',
          methodName: 'updateTopic',
          disabled: true
        }
      ],
      [
        {
          title: '查看结论',
          i18n: 'MT_CHAKANJIELUN',
          methodName: 'lookResult',
          disabled: true
        }
      ]
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
