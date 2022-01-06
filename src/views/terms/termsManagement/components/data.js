/* eslint-disable no-undef */
export const baseRules = {
  // 条款名称
  name: [
    {
      required: true,
      message: "必填",
      trigger: ["blur", "change"],
    },
    {
      min: 1,
      max: 30,
      message: "最大长度为 30 字符",
      trigger: ["blur", "change"],
    },
  ],
  // 生效时间
  inDate: [
    {
      required: true,
      message: "必填",
      trigger: ["blur", "change"],
    },
  ],
  // 是否个人条款
  isPersonalTerms: [
    {
      required: true,
      message: "必选",
      trigger: ["blur", "change"],
    },
  ],
  // 签署节点
  signNode: [
    {
      required: true,
      message: "必选",
      trigger: ["blur", "change"],
    },
  ],
  // 条款负责人
  chargeName: [
    {
      required: true,
      message: "必填",
      trigger: ["blur", "change"],
    },
  ],
  // 供应商范围
  supplierRange: [
    {
      required: true,
      message: "必选",
      trigger: ["blur", "change"],
    },
  ],
  // // 供应商身份
  // supplierIdentity: [
  //   {
  //     required: true,
  //     message: "必选",
  //     trigger: ["blur", "change"],
  //   },
  // ],
  // 供应商用户范围
  supplierContacts: [
    {
      required: true,
      message: "必选",
      trigger: ["blur", "change"],
    },
  ],
  // 备注
  remark: [
    {
      min: 1,
      max: 150,
      message: "最大长度为 150 字符",
      trigger: ["blur", "change"],
    },
  ],
  // 编辑方式
  editMode: [
    {
      required: true,
      message: "必填",
      trigger: ["blur", "change"],
    },
  ],
  // // 正文
  // termsText: [
  //   {
  //     required: true,
  //     message: "必填",
  //     trigger: ["blur", "change"],
  //   },
  // ],
  // // 条款正文id
  // termsTextId: [
  //   {
  //     required: true,
  //     message: "必填",
  //     trigger: ["blur", "change"],
  //   },
  // ],
  // coverImage: [
  //   { message: i18n.t("TERMS_WENJIANDAXIAOZUIDAXIANZHI"), trigger: "change" },
  // ],
};

export const tableTitle = [
  { props: "termsCode", name: "条款编码" },
  { props: "name", name: "条款名称" },
  { props: "termsVersion", name: "版本号" },
  { props: "state", name: "条款状态" },
  { props: "inDate", name: "条款生效时间" },
  { props: "publishDate", name: "发布日期" },
  { props: "signNode", name: "签署节点" },
  { props: "signResult", name: "签署情况" },
  { props: "isPersonalTerms", name: "是否个人条款" },
  { props: "supplierRange", name: "供应商范围" },
  { props: "supplierIdentity", name: "供应商身份" },
  { props: "supplierContacts", name: "供应商用户" },
  { props: "chargeName", name: "条款负责人" },
];

export const signTableTitle = [
  { props: "shortNameZh", name: "供应商名称" },
  { props: "serviceCode", name: "业务编码" },
  { props: "svwTempCode", name: "临时号" },
  { props: "svwCode", name: "SVW号" },
  { props: "sapCode", name: "SAP号" },
  { props: "formalStatus", name: "供应商身份" },
  { props: "supplierType", name: "供应商类型" },
  { props: "signName", name: "签署人" },
  { props: "signStatus", name: "签署状态" },
  { props: "signDate", name: "签署日期" },
];

// 条款状态
export const statusList = [
  {
    label: "草稿",
    value: "01",
  },
  {
    label: "待生效",
    value: "02",
  },
  {
    label: "有效",
    value: "03",
  },
  {
    label: "失效",
    value: "04",
  },
];

// 供应商范围
export const supplierRangeList = [
  {
    label: "生产供应商",
    value: "PP",
  },
  {
    label: "一般供应商",
    value: "GP",
  },
  {
    label: "Ntier",
    value: "NT",
  },
];

// 供应商身份
export const supplierIdentityList = [
  {
    label: "临时",
    value: "0",
  },
  {
    label: "正式",
    value: "1",
  },
  {
    label: "储蓄池",
    value: "2",
  },
];

// 是否个人条款
export const isPersonalTermsList = [
  {
    label: '是',
    value: true
  },
  {
    label: '否',
    value: false
  }
];

// 供应商用户范围
export const supplierContactsList = [
  {
    label: "所有用户",
    value: "01",
  },
  {
    label: "主联系人",
    value: "02",
  },
];

// 是否在线确认
export const isSignatureList = [
  {
    label: "是",
    value: true,
  },
  {
    label: "否",
    value: false,
  },
];

// 签署状态
export const signStatusList = [
  {
    label: "未签署",
    value: "01",
  },
  {
    label: "已签署标准",
    value: "02",
  },
  {
    label: "已签署非标",
    value: "03",
  },
  {
    label: "例外",
    value: "04",
  },
];

// 编辑方式
export const editModeList = [
  {
    label: "富文本编辑",
    value: "01",
  },
  {
    label: "导入",
    value: "02",
  },
];

export const isPersonalTermsObj = {
  true: "是",
  false: "否",
};

export const stateObj = {
  "01": "草稿",
  "02": "待生效",
  "03": "有效",
  "04": "失效",
};

export const supplierRangeObj = {
  PP: "生产供应商",
  GP: "一般供应商",
  NT: "Ntier",
};

export const supplierContactsObj = {
  "01": "所有用户",
  "02": "主联系人",
};

export const supplierIdentityObj = {
  "0": "临时",
  "1": "正式",
  "2": "储蓄池",
};

export const supplierTypeObj = {
  PP: "生产供应商",
  GP: "一般供应商",
  NT: "Ntier",
  CM: "自定义",
};

export const signStatusObj = {
  "01": "未签署",
  "02": "已签署标准",
  "03": "已签署非标",
  "04": "例外",
};
