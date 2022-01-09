/*
 * @Author: moxuan
 * @Description: 补差管理
 */
export const navList = [
  {
    value: 1,
    name: '年度预算',
    url: '/mtz/annualGeneralBudget/reportsShow/mtzAnnualBudget',
    activePath: '/mtz/annualGeneralBudget/reportsShow/mtzAnnualBudget',
    key: '年度预算',
    permissionKey:'MTZ_REPORT_ANNUAL_BUDGET',
    permissionName:'年度预算',

  },
  {
    value: 2,
    name: '月度跟踪',
    url: '/mtz/annualGeneralBudget/reportsShow/monthlyTracking',
    activePath: '/mtz/annualGeneralBudget/reportsShow/monthlyTracking',
    key: '月度跟踪',
    permissionKey:'MTZ_REPORT_MONTHLY_TRACKING',
    permissionName:'月度跟踪',
  },
];


export const subNavList = [
  {
    code: '1',
    name:'材料组',
    key:'LK_CAILIAOZU',
    path:'/mtz/annualGeneralBudget/reportsShow/mtzAnnualBudget/materialGroup',
    permissionKey:'MTZ_REPORT_ANNUAL_BUDGET_MATERIAL_GROUP',
    permissionName:'材料组',
  },
  {
    code: '2',
    name:'材料中类',
    key:'LK_CAILIAOZHONGLEI',
    path:'/mtz/annualGeneralBudget/reportsShow/mtzAnnualBudget/classMaterial',
    permissionKey:'MTZ_REPORT_ANNUAL_BUDGET_MEDIUM_CLASS_OF_MATERIALS',
    permissionName:'材料中类',
  },
  {
    code: '3',
    name:'科室',
    key:'LK_KESHI',
    path:'/mtz/annualGeneralBudget/reportsShow/mtzAnnualBudget/department',
    permissionKey:'MTZ_REPORT_ANNUAL_BUDGET_DEPARTMENT',
    permissionName:'科室',
  },
  {
    code: '4',
    name:'品牌',
    key:'LK_PINPAI',
    path:'/mtz/annualGeneralBudget/reportsShow/mtzAnnualBudget/brand',
    permissionKey:'MTZ_REPORT_ANNUAL_BUDGET_BRAND',
    permissionName:'品牌',
  },
  {
    code: '5',
    name:'车型',
    key:'LK_CHEXING',
    path:'/mtz/annualGeneralBudget/reportsShow/mtzAnnualBudget/model',
    permissionKey:'MTZ_REPORT_ANNUAL_BUDGET_CAR_MODEL',
    permissionName:'车型',
  },
]

export const monthlyTrackingNavList = [
  {
    code: '1',
    name:'预算月度跟踪',
    key:'LK_YUSUANYUEDUGENZONG',
    path:'/mtz/annualGeneralBudget/reportsShow/monthlyTracking/monthlyBudgetTracking',
    permissionKey:'MTZ_REPORT_MONTHLY_TRACKING_MONTHLY_BUDGET_TRACKING',
    permissionName:'预算月度跟踪',
  },
  {
    code: '2',
    name:'差异原因分析',
    key:'LK_CHAYIYUANYINFENXI',
    path:'/mtz/annualGeneralBudget/reportsShow/monthlyTracking/causeAnalysisDifference',
    permissionKey:'MTZ_REPORT_MONTHLY_TRACKING_ANALYSIS_CAUSES_DIFFERENCES',
    permissionName:'差异原因分析',
  },
  {
    code: '3',
    name:'支付金额月度跟踪',
    key:'LK_ZHIFUJINEYUEDUGENZONG',
    path:'/mtz/annualGeneralBudget/reportsShow/monthlyTracking/monthlyTrackingPayment',
    permissionKey:'MTZ_REPORT_MONTHLY_TRACKING_MONTHLY_PAYMENT_AMOUNT_TRACKING',
    permissionName:'支付金额月度跟踪',
  },
  {
    code: '4',
    name:'车型预算月度跟踪',
    key:'LK_CHEXINGYUSUANYUEDUGENXONG',
    path:'/mtz/annualGeneralBudget/reportsShow/monthlyTracking/modelMonthlyBudgetTracking',
    permissionKey:'MTZ_REPORT_MONTHLY_TRACKING_MONTHLY_MODEL_BUDGET_TRACKING',
    permissionName:'车型预算月度跟踪',
  },

]


export const  leftModelColumns=[
  {
    prop: "carModel",
    label: "车型",
    i18n: "LK_CHEXING",
    headerAlign: "center",
    align: "center",
    tooltip: true,
    emit: 'open-card-model',
    customRender: (h, scope) =>{
      return <el-link type="primary" >{scope.row.carModel}</el-link>
    }
  },
  {
    prop: "carModel",
    label: "车型六位号",
    i18n: "LK_CHEXINGLIUWEIHAO",
    headerAlign: "center",
    align: "center",
    tooltip: true,
  },
  {
    prop: "price",
    label: "预算金额（元/车）",
    i18n: "LK_YUSUANJINEYUANCHE",
    headerAlign: "center",
    align: "center",
    tooltip: true,
  },
]

export const rightModelColums=[
  {
    prop: "materialMediumNum",
    label: "材料中类",
    i18n: "LK_CAILIAOZHONGLEI",
    headerAlign: "center",
    align: "center",
    tooltip: true,
  },
  {
    prop: "mtzMaterialNumbers",
    label: "材料组",
    i18n: "LK_CAILIAOZHU",
    headerAlign: "center",
    align: "center",
    tooltip: true,
  },
  {
    prop: "price",
    label: "预算金额（元/车）",
    i18n: "LK_YUSUANJINEYUANCHE",
    headerAlign: "center",
    align: "center",
    tooltip: true,
    customRender:(h, scope)=>{
      return <span>{scope.row.price?.replace(/(\d{1,3})(?=(\d{3})+(?:$|\.))/g, '$1,')}</span>
    }
  },
]