/*
 * @Author: YoHo
 * @Date: 2023-01-05 12:40:05
 * @LastEditors: YoHo && 917955345@qq.com
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\terms\data.js
 */
export const navList = [
    {
      value: 1,
      name: '条款列表',
      url: '/terms/management',
      activePath: '/terms/management',
      key: '条款列表',
      permissionKey: 'SUPPLIER_WORKBENCH_KPI_ZONGLAN'
    },
    {
      value: 2,
      name: '签署情况明细',
      url: '/terms/signDetail',
      activePath: '/terms/signDetail',
      key: '签署情况明细',
      permissionKey: 'SUPPLIER_WORKBENCH_KPI_XIANGQING'
    }
  ]