/*
 * @Author: your name
 * @Date: 2021-08-27 15:07:07
 * @LastEditTime: 2023-03-19 16:00:55
 * @LastEditors: YoHo && 917955345@qq.com
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\commonHeardNav\navData.js
 */
export const tabRouterList = [
  {
    value: 1,
    name: '总览',
    url: '/mtz/annualGeneralBudget/overview',
    activePath: '/mtz/annualGeneralBudget/overview',
    key: '总览',
    // permissionKey: 'PORTAL_MTZ_NAV_OVERVIEW'
  },
  {
    value: 2,
    group: 2,
    name: '补差规则',
    url: '/mtz/annualGeneralBudget/locationChange/MtzLocationPoint',
    activePath: '/mtz/annualGeneralBudget/locationChange',
    key: '补差规则',
    // permissionKey: 'PORTAL_MTZ_NAV_DINGDIANYUBIANGENG',
    permissionKey: 'WORKBENCH_MTZ_SOURCING'
  },
  {
    value: 3,
    group: 3,
    name: '补差执行',
    url: '/mtz/annualGeneralBudget/replenishmentManagement',
    activePath: '/mtz/annualGeneralBudget/replenishmentManagement',
    key: '补差执行',
    permissionKey: 'PORTAL_MTZ_NAV_BUCHAGUANLI'
  },
  {
    value: 4,
    group: 4,
    name: '报表展示',
    url: '/mtz/annualGeneralBudget/reportsShow',
    activePath: '/mtz/annualGeneralBudget/reportsShow',
    key: '报表展示',
    permissionKey: 'PORTAL_MTZ_NAV_BAOBIAOZHANSHI'
  },
  {
    value: 5,
    name: '年度预算',
    url: '/mtz/annualGeneralBudget/annualBudget',
    activePath: '/mtz/annualGeneralBudget/annualBudget',
    key: '年度预算',
    permissionKey: 'PORTAL_MTZ_NAV_NAINDUYUSUAN'
  },
  {
    value: 6,
    name: '数据库',
    url: '/mtz/dataBase',
    activePath: '/mtz/dataBase',
    key: 'SHUJUKU',
    permissionKey: 'PORTAL_MTZ_NAV_SHUJUKU'
  }
]

export const rightNavList = [
  {
    value: 1,
    group: 2,
    name: 'MTZ定点',
    url: '/mtz/annualGeneralBudget/locationChange/MtzLocationPoint',
    activePath: '/locationChange/MtzLocationPoint',
    key: 'MTZDINGDIAN',
    permissionKey: 'WORKBENCH_MTZ_SOURCING',
    permissionName: 'WORKBENCH_MTZ_SOURCING',
  },
  {
    value: 2,
    group: 2,
    name: 'MTZ变更',
    url: '/mtz/annualGeneralBudget/locationChange/MtzLocationChange',
    activePath: '/locationChange/MtzLocationChange',
    key: 'MTZBIANGENG',
    permissionKey: 'WORKBENCH_MTZ_SOURCING',
    permissionName: 'WORKBENCH_MTZ_SOURCING',
  },
  {
    value: 3,
    group: 2,
    name: '芯片定点',
    url: '/mtz/annualGeneralBudget/locationChange/ChipLocationPoint',
    activePath: '/locationChange/ChipLocationPoint',
    key: 'CHIPDINGDIAN',
    permissionKey: 'PORTAL_CHIP_POINT',
    permissionName: 'PORTAL_CHIP_POINT',
  },
  {
    value: 4,
    group: 2,
    name: '芯片变更',
    url: '/mtz/annualGeneralBudget/locationChange/ChipLocationChange',
    activePath: '/locationChange/ChipLocationChange',
    key: 'CHIPBIANGENG',
    permissionKey: 'PORTAL_CHIP_CHANGE',
    permissionName: 'PORTAL_CHIP_CHANGE',
  },
  {
    value: 1,
    group: 3,
    name: 'MTZ补差计算任务',
    url: '/mtz/annualGeneralBudget/replenishmentManagement/mtzCalculationTask',
    activePath: '/mtz/annualGeneralBudget/replenishmentManagement/mtzCalculationTask',
    key: 'MTZ补差计算任务',
    // permissionKey:'MTZ_REPORT_BUCHAGUANLI_MTZBUCHAJISUANRENWU',
    permissionKey: 'MTZ_REPORT_BUCHAGUANLI_MTZBUCHAZONGLAN',
  },
  {
    value: 2,
    group: 3,
    name: 'MTZ补差总览',
    url: '/mtz/annualGeneralBudget/replenishmentManagement/mtzReplenishmentOverview',
    activePath: '/mtz/annualGeneralBudget/replenishmentManagement/mtzReplenishmentOverview',
    key: 'MTZ补差总览',
    permissionKey: 'MTZ_REPORT_BUCHAGUANLI_MTZBUCHAZONGLAN',
  },
  {
    value: 3,
    group: 3,
    name: '补差单列表',
    url: '/mtz/annualGeneralBudget/replenishmentManagement/supplementaryList',
    activePath: '/mtz/annualGeneralBudget/replenishmentManagement/supplementaryList',
    key: '补差单列表',
    permissionKey: 'MTZ_REPORT_BUCHAGUANLI_BUCHADANLIEBIAO',
  },
  {
    value: 4,
    group: 3,
    name: 'VWPT上载数量',
    url: '/mtz/annualGeneralBudget/replenishmentManagement/vwptUploadQuantity',
    activePath: '/mtz/annualGeneralBudget/replenishmentManagement/vwptUploadQuantity',
    key: 'VWPT上载数量',
    permissionKey: 'MTZ_REPORT_BUCHAGUANLI_VWPTSHANGZAISHULIANG',
  },
  {
    value: 5,
    group: 3,
    name: '芯片补差总览',
    url: '/mtz/annualGeneralBudget/replenishmentManagement/chipReplenishmentOverview',
    activePath: '/mtz/annualGeneralBudget/replenishmentManagement/chipReplenishmentOverview',
    key: '芯片补差总览',
    permissionKey: 'MTZ_REPORT_BUCHAGUANLI_MTZBUCHAZONGLAN',
  },
  {
    value: 6,
    group: 3,
    name: '芯片补差计算任务',
    url: '/mtz/annualGeneralBudget/replenishmentManagement/chipCalculationTask',
    activePath: '/mtz/annualGeneralBudget/replenishmentManagement/chipCalculationTask',
    key: '芯片补差计算任务',
    // permissionKey:'MTZ_REPORT_BUCHAGUANLI_MTZBUCHAJISUANRENWU',
    permissionKey: 'MTZ_REPORT_BUCHAGUANLI_MTZBUCHAZONGLAN',
  },
  {
    value: 7,
    group: 3,
    name: '芯片补差单列表',
    url: '/mtz/annualGeneralBudget/replenishmentManagement/chipSupplementaryList',
    activePath: '/mtz/annualGeneralBudget/replenishmentManagement/chipSupplementaryList',
    key: '芯片补差单列表',
    permissionKey: 'MTZ_REPORT_BUCHAGUANLI_BUCHADANLIEBIAO',
  },

  {
    value: 1,
    group: 4,
    name: '年度预算',
    url: '/mtz/annualGeneralBudget/reportsShow/mtzAnnualBudget',
    activePath: '/annualGeneralBudget/reportsShow/mtzAnnualBudget',
    key: '年度预算',
    permissionKey: 'MTZ_REPORT_ANNUAL_BUDGET',

  },
  {
    value: 2,
    group: 4,
    name: '月度跟踪',
    url: '/mtz/annualGeneralBudget/reportsShow/monthlyTracking',
    activePath: '/annualGeneralBudget/reportsShow/monthlyTracking',
    key: '月度跟踪',
    permissionKey: 'MTZ_REPORT_MONTHLY_TRACKING',
  },
];