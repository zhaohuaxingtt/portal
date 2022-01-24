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
    align: 'left',
    headerAlign: 'left',
    minWidth: 160,
    emit: 'click-menu',
    customRender: (h, scope) => {
      return <span class="cursor-pointer">{scope.row.title}</span>
    }
  }
]

export const MENUS = [
  {
    title: '供应商信息',
    url: '/mainDataSupplier/list',
    permissionKey: 'ADMIN_MAIN_DATA_SUPPLIER_DATA_LIST'
  },
  {
    title: '供应商用户信息',
    url: '/mainDataSupplier/user',
    permissionKey: 'ADMIN_MAIN_DATA_SUPPLIER_DATA_USER'
  },
  {
    title: 'N-Tier供应商信息',
    url: '/mainDataSupplier/N-Tier',
    permissionKey: 'ADMIN_MAIN_DATA_SUPPLIER_DATA_N_TIER'
  }
]
