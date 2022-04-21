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
    width: 40
  },
  {
    prop: 'title',
    label: '资源名称',
    i18n: '资源名称',
    align: 'left',
    headerAlign: 'left',
    emit: 'click-menu',
    customRender: (h, scope) => {
      return <span class="cursor-pointer">{scope.row.title}</span>
    }
  }
]

export const MENUSZh = [
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
    url: '/mainDataSupplier/n-tier',
    permissionKey: 'ADMIN_MAIN_DATA_SUPPLIER_DATA_N_TIER'
  },
  {
    title: '分散（内部报销）供应商信息',
    url: '/mainDataSupplier/dis-up',
    permissionKey: 'ADMIN_MAIN_DATA_SUPPLIER_DISPERSED'
  },
]

export const MENUSEn = [
  {
    title: 'Supplier Info',
    url: '/mainDataSupplier/list',
    permissionKey: 'ADMIN_MAIN_DATA_SUPPLIER_DATA_LIST'
  },
  {
    title: 'Supplier User Info',
    url: '/mainDataSupplier/user',
    permissionKey: 'ADMIN_MAIN_DATA_SUPPLIER_DATA_USER'
  },
  {
    title: 'N-Tier Supplier Info',
    url: '/mainDataSupplier/N-Tier',
    permissionKey: 'ADMIN_MAIN_DATA_SUPPLIER_DATA_N_TIER'
  },
  {
    title: 'Dispersed Supplier Info',
    url: '/mainDataSupplier/dis-up',
    permissionKey: 'ADMIN_MAIN_DATA_SUPPLIER_DISPERSED'
  }
]
