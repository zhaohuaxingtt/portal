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
    title: '产品家族',
    url: '/main-data/product-family',
    permissionKey: 'ADMIN_MAIN_DATA_PRODUCT_FAMILY'
  },
  {
    title: '车型项目管理',
    url: '/main-data/car-project',
    permissionKey: 'ADMIN_MAIN_DATA_CARPROJECT'
  },
  {
    title: '车型主数据管理',
    url: '/main-data/car',
    permissionKey: 'ADMIN_MAIN_DATA_CARMODEL'
  }
]

export const MENUSEn = [
  {
    title: 'Product Family',
    url: '/main-data/product-family',
    permissionKey: 'ADMIN_MAIN_DATA_PRODUCT_FAMILY'
  },
  {
    title: 'Model Project Management',
    url: '/main-data/car-project',
    permissionKey: 'ADMIN_MAIN_DATA_CARPROJECT'
  },
  {
    title: 'Vehicle Master Data Management',
    url: '/main-data/car',
    permissionKey: 'ADMIN_MAIN_DATA_CARMODEL'
  }
]


