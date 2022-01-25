/*
 * @Author: your name
 * @Date: 2021-08-27 17:46:51
 * @LastEditTime: 2021-10-22 18:19:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudgetLeader\commonHeardNav\navData.js
 */
export const tabRouterList = [
  {
    value: 1,
    name: 'MTZ年度预算',
    url: '/mtz/annualBudgetEdit',
    activePath: '/mtz/annualBudgetEdit',
    key: 'MTZNIANDUYUSUANBIANJI',
    permissionKey:"PORTAL_MTZ_NIANDUYUSUAN_MTZNIANDUYUSUANBIANJI"
  },
];
export const categoryManagementAssistantList = [
  {
    value: 1,
    name: '采购员预算总览',
    url: '/mtz/annualBudgetEdit/buyerOverview',
    activePath: '/mtz/annualBudgetEdit/buyerOverview',
    key: 'CAIGOUYUANYUSUANZONGLAN',
    permissionKey:"PORTAL_MTZ_NIANDUYUSUAN_CAIGOUYUANYUSUANZONGLAN"
  },
  {
    value: 2,
    name: '科室预算总览',
    url: '/mtz/annualBudgetEdit/officeOverview',
    activePath: '/mtz/annualBudgetEdit/officeOverview',
    key: 'KESHIYUSUANZONGLAN',
    permissionKey:"PORTAL_MTZ_NIANDUYUSUAN_KESHIYUSUANZONGLAN"
  },
  {
    value: 3,
    name: '品牌预算总览',
    url: '/mtz/annualBudgetEdit/brandOverview',
    activePath: '/mtz/annualBudgetEdit/brandOverview',
    key: 'PINPAIYUSUANZONGLAN',
    permissionKey:"PORTAL_MTZ_NIANDUYUSUAN_PINPAIYUSUANZONGLAN"
  },
  {
    value: 4,
    name: '编辑其他',
    url: '/mtz/annualBudgetEdit/otherOverview',
    activePath: '/mtz/annualBudgetEdit/otherOverview',
    key: 'BIANJIQITA',
    permissionKey:"PORTAL_MTZ_NIANDUYUSUAN_BIANJIQITA"
  },
];