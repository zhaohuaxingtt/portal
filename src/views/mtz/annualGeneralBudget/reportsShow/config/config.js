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
  },
  {
    value: 2,
    name: '月度跟踪',
    url: '/mtz/annualGeneralBudget/reportsShow/monthlyTracking',
    activePath: '/mtz/annualGeneralBudget/reportsShow/monthlyTracking',
    key: '月度跟踪',
  },
];


export const subNavList = [
  {
    code: '1',
    name:'材料组',
    key:'LK_CAILIAOZU',
    //permissionKey:'AEKO_APPROVE_TAB_PENDING'
     path:'/mtz/annualGeneralBudget/reportsShow/mtzAnnualBudget/materialGroup'
  },
  {
    code: '2',
    name:'材料中类',
    key:'LK_CAILIAOZHONGLEI',
    path:'/mtz/annualGeneralBudget/reportsShow/mtzAnnualBudget/classMaterial'
    //permissionKey:'AEKO_APPROVE_TAB_APPROVED'
  },
  {
    code: '3',
    name:'科室',
    key:'LK_KESHI',
    path:'/mtz/annualGeneralBudget/reportsShow/mtzAnnualBudget/department'
    //permissionKey:'AEKO_APPROVE_TAB_APPROVED'
  },
  {
    code: '4',
    name:'品牌',
    key:'LK_PINPAI',
    path:'/mtz/annualGeneralBudget/reportsShow/mtzAnnualBudget/brand'
    //permissionKey:'AEKO_APPROVE_TAB_APPROVED'
  },
  {
    code: '5',
    name:'车型',
    key:'LK_CHEXING',
    path:'/mtz/annualGeneralBudget/reportsShow/mtzAnnualBudget/model'
    //permissionKey:'AEKO_APPROVE_TAB_APPROVED'
  },
]

export const monthlyTrackingNavList = [
  {
    code: '1',
    name:'预算月度跟踪',
    key:'LK_YUSUANYUEDUGENZONG',
    //permissionKey:'AEKO_APPROVE_TAB_PENDING'
    path:'/mtz/annualGeneralBudget/reportsShow/monthlyTracking/monthlyBudgetTracking'
  },
  {
    code: '2',
    name:'差异原因分析',
    key:'LK_CHAYIYUANYINFENXI',
    path:'/mtz/annualGeneralBudget/reportsShow/monthlyTracking/causeAnalysisDifference'
    //permissionKey:'AEKO_APPROVE_TAB_APPROVED'
  },
  {
    code: '3',
    name:'支付金额月度跟踪',
    key:'LK_ZHIFUJINEYUEDUGENZONG',
    path:'/mtz/annualGeneralBudget/reportsShow/monthlyTracking/monthlyTrackingPayment'
    //permissionKey:'AEKO_APPROVE_TAB_APPROVED'
  },
  {
    code: '4',
    name:'车型预算月度跟踪',
    key:'LK_CHEXINGYUSUANYUEDUGENXONG',
    path:'/mtz/annualGeneralBudget/reportsShow/monthlyTracking/modelMonthlyBudgetTracking'
    //permissionKey:'AEKO_APPROVE_TAB_APPROVED'
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
    prop: "mtzMaterialNumber",
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
  },
]