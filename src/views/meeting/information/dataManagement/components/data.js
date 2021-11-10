export const baseRules = {
  type: [{ required: true, message: "请选择资料类型！", trigger: "change" }],
  name: [
    { required: true, message: "请输入资料标题！", trigger: "blur" },
    { min: 1, max: 64, message: "最大长度64字符", trigger: "blur" },
  ],
  attachmentId: [{ required: true, message: "请上传附件！", trigger: "change" }],
};

/* export const tableColumns = [
  {
    type: "index",
    i18n: "序号",
    width: 69,
    tooltip: false,
  },
  {
    prop: "name",
    label: "资料名称",
    i18n: "资料名称",
    align: "left",
    tooltip: false,
  },
  {
    prop: "type",
    label: "类型",
    i18n: "类型",
    align: "left",
    width: 140,
    tooltip: false,
  },
  {
    prop: "meetingNameSuffix",
    label: "发布者",
    i18n: "发布者",
    align: "left",
    width: 80,
    tooltip: false,
  },
  {
    prop: "duration",
    label: "发布日期",
    i18n: "发布日期",
    align: "left",
    width: 160,
    tooltip: false,
  },
  {
    prop: "isTriggerApproval",
    label: "状态",
    i18n: "状态",
    width: 150,
    tooltip: false,
    customRender: (h, scope) => {
      return <span>{scope.row.isTriggerApproval ? "是" : "否"}</span>;
    },
  },
  {
    label: "操作",
    i18n: "操作",
    width: 246,
    tooltip: false,
  },
];
 */
