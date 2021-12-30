export const baseRules = {
  groupName: [
    { required: true, message: "必填", trigger: "blur" },
    { min: 1, max: 64, message: "最大长度 64 字符", trigger: "blur" },
  ],
  meetingType: [{ required: true, message: "必选", trigger: "change" }],
};

export const chooseReceiverTableColumns = [
  {
    type: "selection",
    width: 50,
  },
  {
    type: "index",
    label: "序号",
    i18n: "MT_XUHAO3",
    width: 68,
    tooltip: false,
  },
  {
    // prop: "nameZh",
    label: "姓名",
    i18n: "MT_XINGMING",
    align: "left",
    // width: 200,
    tooltip: true,
    customRender: (h, scope) => {
      return h(
        "div",
        {
          style: {
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          },
        },
        scope.row.nameZh ? scope.row.nameZh : ""
      );
    },
  },
  {
    // prop: "email",
    // width: 200,
    label: "电子邮箱",
    i18n: "MT_DIANZIYOUXIANG",
    align: "left",
    tooltip: true,
    customRender: (h, scope) => {
      return h(
        "div",
        {
          style: {
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          },
        },
        scope.row.email ? scope.row.email : ""
      );
    },
  },
  {
    // prop: "userNum",
    label: "工号",
    i18n: "MT_GONGHAO",
    width: 90,
    align: "left",
    tooltip: true,
    customRender: (h, scope) => {
      return h(
        "div",
        {
          style: {
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          },
        },
        scope.row.userNum ? scope.row.userNum : ""
      );
    },
  },
  {
    // prop: "deptNumList",
    label: "所属部门",
    i18n: "MT_SUOSHUBUMEN",
    align: "left",
    tooltip: true,
    customRender: (h, scope) => {
      return h(
        "div",
        {
          style: {
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          },
        },
        scope.row.deptNumList ? scope.row.deptNumList : ""
      );
    },
  },
];
