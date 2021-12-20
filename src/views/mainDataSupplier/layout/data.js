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
    label: '资源名称',
    i18n: '资源名称',
    type: 'expanded',
    align: 'left',
    headerAlign: 'left',
    minWidth: 160,
    emit: 'click-menu'
  }
]

export const MENUS = [
  {
    title: '供应商信息',
    url: '/mainDataSupplier/list'
  },
  {
    title: '供应商用户信息',
    url: '/mainDataSupplier/user'
  },
  {
    title: 'N-Tier供应商信息',
    url: '/mainDataSupplier/N-Tier'
  }
]
