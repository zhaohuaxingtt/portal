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

export const chooseOrganizeTableColumns = [
  {
    type: "selection",
    width: 40,
  },
  {
    type: "index",
    label: "序号",
    i18n: "MT_XUHAO3",
    width: 60,
    tooltip: false,
  },
  {
    // prop: "nameZh",
    label: "组织机构名称(中)",
    i18n: "MT_ZUZHIJIGOUMINGCHENGZHONG",
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
    label: "组织机构名称(英)",
    i18n: "MT_ZUZHIJIGOUMINGCHENGYING",
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
        scope.row.nameEn ? scope.row.nameEn : ""
      );
    },
  },
  {
    // prop: "userNum",
    label: "组织机构编码",
    i18n: "MT_ZUZHIJIGOUBIANMA",
    // width: 90,
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
        scope.row.fullCode ? scope.row.fullCode : ""
      );
    },
  },
  {
    // prop: "deptNumList",
    label: "组织级别",
    i18n: "MT_ZUZHIJIBIE",
    align: "left",
    width: 90,
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
        scope.row.level ? scope.row.level : ""
      );
    },
  },
];