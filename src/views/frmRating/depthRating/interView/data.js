/*
 * @Date: 2021-11-08 11:47:59
 * @LastEditors: zhaohuaxing 870063335@qq.com
 * @LastEditTime: 2022-05-26 21:56:44
 * @FilePath: \front-portal-new\src\views\frmRating\depthRating\interView\data.js
 */
export const interViewTabList = [
  {
    value: 1,
    name: '基本情况',
    key: 'SPR_FRM_DEP_JBQK',
    permissionKey: 'PORTAL_FENGXIAN_SHENRUPINGJI_FANGTAN_SPR_FRM_DEP_JBQK'
  },
  {
    value: 2,
    name: '业务&上下游',
    key: 'SPR_FRM_DEP_YWSXY',
    permissionKey: 'PORTAL_FENGXIAN_SHENRUPINGJI_FANGTAN_SPR_FRM_DEP_YWSXY'
  },
  {
    value: 3,
    name: '财务',
    key: 'SPR_FRM_DEP_FINANCE',
    permissionKey: 'PORTAL_FENGXIAN_SHENRUPINGJI_FANGTAN_SPR_FRM_DEP_FINANCE'
  },
  {
    value: 4,
    name: '其他',
    key: 'SPR_FRM_DEP_OTHER',
    permissionKey: 'PORTAL_FENGXIAN_SHENRUPINGJI_FANGTAN_SPR_FRM_DEP_OTHER'
  }
]
// 集团、股东、实际控制人（详见股权结构图）
export const groupShareholder = [
  { props: 'name', name: '股东名称', key: 'SPR_FRM_XGYSPJ_GDMC', minWidth:200 },
  { props: 'industryBelongs', name: '行业归属', key: 'HANGYEGUISHU', width:200 },
  { props: 'mainBusiness', name: '主营业务', key: 'ZHUYINYEWU', minWidth:200 },
  { props: 'principal', name: '负责人', key: 'FUZEREN', width:120 },
  { props: 'proportion', name: '持股比例（%）', key: 'SPR_FRM_XGYSPJ_CGBL', width:140 },
  {
    props: 'shareholderContribution',
    name: '持股金额',
    key: 'SPR_FRM_DEP_CGJE',
    width:120
  },
]

// 组织机构、人员情况
export const organizationDetail = [
  { props: 'headcount', name: '总人数', type: 'input', key: 'SPR_FRM_DEP_ZRS' },
  {
    props: 'managerNumber',
    name: '管理人员',
    type: 'input',
    key: 'SPR_FRM_DEP_GLRY'
  },
  {
    props: 'developerNumber',
    name: '研发人员',
    type: 'input',
    key: 'YANFARENYUAN'
  },
  {
    props: 'productionNumber',
    name: '生产人员',
    type: 'input',
    key: 'SPR_FRM_DEP_SCRY'
  },
  {
    props: 'legalRepresentative',
    name: '法定代表人',
    type: 'input',
    key: 'LegalPerson'
  },
  {
    props: 'legalRepresentativeDateBirth',
    name: '出生日期',
    type: 'date',
    key: 'SPR_FRM_DEP_CSRQ'
  },
  {
    props: 'legalRepresentativeSex',
    name: '性别',
    type: 'select',
    select: 'EMPLOYEE_GENDER',
    key: 'XINGBIE'
  },
  {
    props: 'flegalRepresentativeWorkYear',
    name: '从业年限',
    type: 'input',
    key: 'SPR_FRM_DEP_CYNX'
  },
  {
    props: 'actualController',
    name: '实际控制人',
    type: 'input',
    key: 'SPR_FRM_DEP_SJKZR'
  },
  {
    props: 'actualControllerDateBirth',
    name: '出生日期',
    type: 'date',
    key: 'SPR_FRM_DEP_CSRQ'
  },
  {
    props: 'actualControllerSex',
    name: '性别',
    type: 'select',
    select: 'EMPLOYEE_GENDER',
    key: 'XINGBIE'
  },
  {
    props: 'actualControllerWorkYear',
    name: '从业年限',
    type: 'input',
    key: 'SPR_FRM_DEP_CYNX'
  },
  {
    props: 'generalManager',
    name: '总经理',
    type: 'input',
    key: 'SPR_FRM_DEP_ZJL'
  },
  {
    props: 'generalManagerDateBirth',
    name: '出生日期',
    type: 'date',
    key: 'SPR_FRM_DEP_CSRQ'
  },
  {
    props: 'generalManagerSex',
    name: '性别',
    type: 'select',
    select: 'EMPLOYEE_GENDER',
    key: 'XINGBIE'
  },
  {
    props: 'generalManagerWorkYear',
    name: '从业年限',
    type: 'input',
    key: 'SPR_FRM_DEP_CYNX'
  },
  {
    props: 'isSetTradeUnion',
    name: '是否设置工会',
    type: 'select',
    select: 'TURE_FALSE',
    key: 'SHIFOUSHEZHIGONGHUI'
  }
]

// 主要产品及占比、产品工艺
export const mainProduct = [
  {
    props: 'businessProductName',
    name: '业务或产品',
    key: 'SPR_FRM_DEP_YWHCP'
  },
  { props: 'proportion', name: '占比', key: 'SPR_FRM_DEP_ZB' }
]

// 主要客户
export const mainCustomers = [
  { props: 'cusomerName', name: '主要客户', key: 'SUPPLIER_ZHUYAOKEHU' },
  { props: 'mainProducts', name: '供货产品', key: 'SUPPLIER_GONGHUOCHANPIN' },
  { props: 'cooperativeDate', name: '合作年限', key: 'HEZUONIANXIAN' },
  {
    props: 'totalSalesPro',
    name: '最新年度供货占比',
    key: 'SPR_FRM_DEP_ZXNDGHZB'
  },
  {
    props: 'amountOfSupply',
    name: '最新年度供货金额',
    key: 'SPR_FRM_DEP_ZXNDGHJE'
  },
  { props: 'paymentDays', name: '账期', key: 'ZHANGQI' },
  { props: 'cashNotesPro', name: '现金票据比例', key: 'XIANJINGPIAOJUJINGLI' },
  { props: 'plan', name: '业务发展计划', key: 'SUPPLIER_YEWUFAZHANJIHUA' }
]

// 主要供应商
export const mainSupplier = [
  { props: 'supplierName', name: '主要供应商', key: 'SPR_FRM_DEP_ZYGYS' },
  { props: 'mainProducts', name: '供货产品', key: 'SUPPLIER_GONGHUOCHANPIN' },
  { props: 'cooperativeDate', name: '合作年限', key: 'HEZUONIANXIAN' },
  {
    props: 'totalSalesPro',
    name: '最新年度销售占比',
    key: 'SPR_FRM_DEP_ZXNDXSZB'
  },
  {
    props: 'amountOfSupply',
    name: '最新年度销售金额',
    key: 'SPR_FRM_DEP_ZXNDXSJE'
  },
  { props: 'paymentDays', name: '账期', key: 'ZHANGQI' },
  { props: 'cashNotesPro', name: '现金票据比例', key: 'XIANJINGPIAOJUJINGLI' }
]

//资金与融资渠道
export const CapitalFinancing = [
  { props: 'bankName', name: '银行名称', key: 'YINHANGMINCHENG',rule:[{ required: true, message: '请输入银行名称', trigger: 'blur' }]},
  { props: 'creditAmount', name: '授信金额', key: 'SHOUQUANJINE' ,rule:[{ required: true, message: '请输入授信金额', trigger: 'blur' }]},
  { props: 'usedAmount', name: '已使用', key: '已使用' },
  {
    props: 'creditDateStart',
    name: '授信起止日期',
    key: 'SPR_FRM_DEP_SXQZRQ',
    width: 350
  },
  { props: 'mortgage', name: '担保/抵押/质押', key: 'SPR_FRM_DEP_DBDYZY' },
  { props: 'interestRate', name: '利率', key: 'LILV',rule:[{ required: true, message: '请输入利率', trigger: 'blur' }] },
  { props: 'repaymentSchedule', name: '还款计划', key: 'HUANKUANGJIHUA' }
]
