// csf / commodity 审批界面选项卡
export const navList = [
  {
    value: 1,
    name:'生产采购',
    key:'LK_SHENGCHANCAIGOU',
    permissionKey:'ELECTRONIC_SIGNATURE_PRODUCTION_PURCHASE',
    url: "/electronicSignature/productionpurchase/1",
    activePath: "/electronicSignature/productionpurchase/1",
    permissionName:'一般采购',
    isCanClick:true

  },
  {
    value: 2,
    name:'一般采购',
    key:'LK_YIBANCAIGOU',
    permissionKey:'ELECTRONIC_SIGNATURE_GENERAL_PURCHASE',
    url: "/electronicSignature/productionpurchase/2",
    activePath: "/electronicSignature/productionpurchase/2",
    permissionName:'一般采购',
    isCanClick:false

  },
]

export  const sinatureColumns=[
  {
    type: 'selection',
    width: 50
  },
  {
    prop: "partNum",
    label: "合同类型",
    i18n: "LK_HETONGLEIXING",
    headerAlign: "center",
    align: "center",
    tooltip: true,
  },
  {
    prop: "partNum",
    label: "合同描述",
    i18n: "LK_HETONGMIAOHSHU",
    headerAlign: "center",
    align: "center",
    tooltip: true,
  },
  {
    prop: "partNum",
    label: "编号",
    i18n: "LK_BIANHAO",
    headerAlign: "center",
    align: "center",
    tooltip: true,
  },
  {
    prop: "partNum",
    label: "供应商",
    i18n: "LK_GONGYINGSHANG",
    headerAlign: "center",
    align: "center",
    tooltip: true,
  },
  {
    prop: "partNum",
    label: "采购员",
    i18n: "LK_CAIGOUYUAN",
    headerAlign: "center",
    align: "center",
    tooltip: true,
  },
  {
    prop: "partNum",
    label: "科室",
    i18n: "LK_KESHI",
    headerAlign: "center",
    align: "center",
    tooltip: true,
  },

  {
    prop: "partNum",
    label: "印章类型",
    i18n: "LK_YINZHANGLEIXING",
    headerAlign: "center",
    align: "center",
    tooltip: true,
  },
  {
    prop: "partNum",
    label: "签署状态",
    i18n: "LK_QIANSHUZHUANGTAI",
    headerAlign: "center",
    align: "center",
    tooltip: true,
  },
  {
    prop: "partNum",
    label: "操作",
    i18n: "LK_CAOZUO",
    headerAlign: "center",
    align: "center",
    tooltip: true,
  },
]