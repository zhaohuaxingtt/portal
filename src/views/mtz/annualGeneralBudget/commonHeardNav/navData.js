/*
 * @Author: your name
 * @Date: 2021-08-27 15:07:07
 * @LastEditTime: 2022-01-12 19:22:23
 * @LastEditors: 水痕
 * @Description: In User Settings Edit
 * @FilePath: /front-portal/src/views/mtz/annualGeneralBudget/commonHeardNav/navData.js
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
    name: '定点与变更',
    url: '/mtz/annualGeneralBudget/locationChange',
    activePath: '/mtz/annualGeneralBudget/locationChange',
    key: '定点与变更',
    permissionKey: 'PORTAL_MTZ_NAV_DINGDIANYUBIANGENG'
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
