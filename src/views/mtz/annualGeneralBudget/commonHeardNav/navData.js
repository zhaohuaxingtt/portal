/*
 * @Author: your name
 * @Date: 2021-08-27 15:07:07
 * @LastEditTime: 2022-12-24 13:00:09
 * @LastEditors: YoHo && 917955345@qq.com
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\commonHeardNav\navData.js
 */
export const tabRouterList = [
  {
    value: 1,
    name: '年度预算',
    url: '/mtz/annualGeneralBudget/annualBudget',
    activePath: '/mtz/annualGeneralBudget/annualBudget',
    key: '年度预算',
    permissionKey: 'PORTAL_MTZ_NAV_NAINDUYUSUAN'
  },
  {
    value: 2,
    name: '报表展示',
    url: '/mtz/annualGeneralBudget/reportsShow',
    activePath: '/mtz/annualGeneralBudget/reportsShow',
    key: '报表展示',
    permissionKey: 'PORTAL_MTZ_NAV_BAOBIAOZHANSHI'
  },
  {
    value: 3,
    group: 3,
    name: '定点与变更',
    url: '/mtz/annualGeneralBudget/locationChange/MtzLocationPoint',
    activePath: '/mtz/annualGeneralBudget/locationChange',
    key: '定点与变更',
    // permissionKey: 'PORTAL_MTZ_NAV_DINGDIANYUBIANGENG',
    permissionKey: 'WORKBENCH_MTZ_SOURCING'
  },
  {
    value: 4,
    name: '补差管理',
    url: '/mtz/annualGeneralBudget/replenishmentManagement',
    activePath: '/mtz/annualGeneralBudget/replenishmentManagement',
    key: '补差管理',
    permissionKey: 'PORTAL_MTZ_NAV_BUCHAGUANLI'
  },
  {
    value: 5,
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
    group: 3,
    name: 'MTZ定点',
    url: '/mtz/annualGeneralBudget/locationChange/MtzLocationPoint',
    activePath: '/locationChange/MtzLocationPoint',
    key: 'MTZDINGDIAN',
    permissionKey: 'WORKBENCH_MTZ_SOURCING',
    permissionName: 'WORKBENCH_MTZ_SOURCING',
  },
  {
    value: 2,
    group: 3,
    name: 'MTZ变更',
    url: '/mtz/annualGeneralBudget/locationChange/MtzLocationChange',
    activePath: '/locationChange/MtzLocationChange',
    key: 'MTZBIANGENG',
    permissionKey: 'WORKBENCH_MTZ_SOURCING',
    permissionName: 'WORKBENCH_MTZ_SOURCING',
  },
  {
    value: 3,
    group: 3,
    name: '芯片定点',
    url: '/mtz/annualGeneralBudget/locationChange/ChipLocationPoint',
    activePath: '/locationChange/ChipLocationPoint',
    key: 'CHIPDINGDIAN',
    permissionKey: 'PORTAL_CHIP_POINT',
    permissionName: 'PORTAL_CHIP_POINT',
  },
  {
    value: 4,
    group: 3,
    name: '芯片变更',
    url: '/mtz/annualGeneralBudget/locationChange/ChipLocationChange',
    activePath: '/locationChange/ChipLocationChange',
    key: 'CHIPBIANGENG',
    permissionKey: 'PORTAL_CHIP_CHANGE',
    permissionName: 'PORTAL_CHIP_CHANGE',
  },
];