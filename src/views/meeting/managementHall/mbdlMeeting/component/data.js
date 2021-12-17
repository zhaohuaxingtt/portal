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
      { title: "撤回", methodName: "recall", disabled: true},
      { title: "锁定", methodName: "lock" },
      { title: "修改", methodName: "edit" },
      { title: "返回", methodName: "back" },
    ],
    tableButtonList: [
      [
        { title: "新增休息", methodName: "addRest" },
        { title: "新增议题", methodName: "addTopic" },
        { title: "议题调整", methodName: "updateTopic" },
        { title: "导入议题", methodName: "importTopic" },
      ],
      [
        { title: "修改议题", methodName: "editTopic", disabled: true },
        { title: "维护资料", methodName: "protectInfo", disabled: true },
        { title: "删除", methodName: "deleteTop", disabled: true },
        { title: "改期", methodName: "updateDate", disabled: true },
        { title: "拆分", methodName: "split", disabled: true },
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
        { title: "新增议题", methodName: "addTopic" },
        { title: "议题调整", methodName: "updateTopic" },
        // { title: "导入议题", methodName: "importTopic" },
      ],
      [
        // { title: "开始", methodName: "start" },
        { title: "修改议题", methodName: "editTopic", disabled: true },
        { title: "维护资料", methodName: "protectInfo", disabled: true },
        { title: "删除", methodName: "deleteTop", disabled: true },
        { title: "改期", methodName: "updateDate", disabled: true },
        { title: "拆分", methodName: "split", disabled: true },
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
        { title: "新增议题", methodName: "addTopic" },
        { title: "议题调整", methodName: "updateTopic" },
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
        { title: "删除", methodName: "deleteTop", disabled: true },
        { title: "改期", methodName: "updateDate", disabled: true },
        { title: "结束议题", methodName: "overTopic", disabled: true, },
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
      [],
    ],
  },
  {
    title: "关闭",
    methodName: "close",
    rightButtonList: [
      { title: "查看会议纪要", methodName: "lookMeetingMinutes" },
      { title: "返回", methodName: "back" },
    ],
    tableButtonList: [
      [
        { title: "新增休息", methodName: "addRest", disabled: true },
        { title: "新增议题", methodName: "addTopic", disabled: true },
        { title: "议题调整", methodName: "updateTopic", disabled: true },
      ],
      [],
    ],
  },
  {
    title: "草稿",
    methodName: "draw",
    rightButtonList: [],
    tableButtonList: [[], []],
  },
];

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
