/*
 * @Author: moxuan
 * @Description: 补差管理
 */
export const navList = [
  {
    value: 1,
    name: 'MTZ补差计算任务',
    url: '/mtz/annualGeneralBudget/replenishmentManagement/mtzCalculationTask',
    activePath: '/mtz/annualGeneralBudget/replenishmentManagement/mtzCalculationTask',
    key: 'MTZ补差计算任务',
    // permissionKey:'MTZ_REPORT_BUCHAGUANLI_MTZBUCHAJISUANRENWU',
    permissionKey:'MTZ_REPORT_BUCHAGUANLI_MTZBUCHAZONGLAN',
  },
  {
    value: 2,
    name: 'MTZ补差总览',
    url: '/mtz/annualGeneralBudget/replenishmentManagement/mtzReplenishmentOverview',
    activePath: '/mtz/annualGeneralBudget/replenishmentManagement/mtzReplenishmentOverview',
    key: 'MTZ补差总览',
    permissionKey:'MTZ_REPORT_BUCHAGUANLI_MTZBUCHAZONGLAN',
  },
  {
    value: 3,
    name: '补差单列表',
    url: '/mtz/annualGeneralBudget/replenishmentManagement/supplementaryList',
    activePath: '/mtz/annualGeneralBudget/replenishmentManagement/supplementaryList',
    key: '补差单列表',
    permissionKey:'MTZ_REPORT_BUCHAGUANLI_BUCHADANLIEBIAO',
  },
  {
    value: 4,
    name: 'VWPT上载数量',
    url: '/mtz/annualGeneralBudget/replenishmentManagement/vwptUploadQuantity',
    activePath: '/mtz/annualGeneralBudget/replenishmentManagement/vwptUploadQuantity',
    key: 'VWPT上载数量',
    permissionKey:'MTZ_REPORT_BUCHAGUANLI_VWPTSHANGZAISHULIANG',
  },
];
