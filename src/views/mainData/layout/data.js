/*
 * @Author: your name
 * @Date: 2021-08-10 14:33:59
 * @LastEditTime: 2021-08-17 13:53:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mainData\layout\data.js
 */
export const COLUMNS = [
  {
    type: 'fullIndex',
    width: 70
  },
  {
    prop: 'title',
    label: '主数据管理',
    i18n: 'ROLE.RESOURCE_NAME',
    type: 'expanded',
    align: 'left',
    headerAlign: 'left',
    minWidth: 160,
    emit: 'click-menu'
  }
]

export const MENUS = [
  {
    title: '产品家族',
    url: '/main-data/product-family'
  },
  {
    title: '车型项目管理',
    url: '/main-data/car-project'
  },
  {
    title: '车型主数据管理',
    url: '/main-data/car'
  }
]
