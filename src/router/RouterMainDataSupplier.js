/*
 * @Author: your name
 * @Date: 2021-08-10 14:33:59
 * @LastEditTime: 2021-08-13 13:42:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\router\RouterMainData.js
 */
import mainLayout from '@/views/mainDataSupplier/layout'
export default [
  {
    path: '/mainDataSupplier',
    name: 'mainData',
    redirect: '/mainDataSupplier/list',
    component: mainLayout,
    children: [
      {
        path: 'list',
        name: 'MainDataSupplierList',
        meta: {
          title: '供应商信息',
          activeMenu: ['RISE_ADMIN', 'ADMIN_MAIN_DATA']
        },
        component: () => import('@/views/mainDataSupplier/list')
      },
      {
        path: 'user',
        name: 'MainDataSupplierUser',
        meta: {
          title: '供应商用户',
          activeMenu: ['RISE_ADMIN', 'ADMIN_MAIN_DATA']
        },
        component: () => import('@/views/mainDataSupplier/user')
      },
      {
        path: 'n-tier',
        name: 'MainDataSupplierUser',
        meta: {
          title: 'N-Tier供应商信息',
          activeMenu: ['RISE_ADMIN', 'ADMIN_MAIN_DATA']
        },
        component: () => import('@/views/mainDataSupplier/N-Tier')
      },
      {
        path: 'dis-up',
        name: 'MainDataSupplierUser',
        meta: {
          title: '分散内部报销供应商信息',
          activeMenu: ['RISE_ADMIN', 'ADMIN_MAIN_DATA']
        },
        component: () => import('@/views/mainDataSupplier/Dis-Up')
      },
    ]
  }
]

export const RouterDetailSupplier = [
  {
    path: '/mainDataSupplier/list/detail',
    name: 'MainDataSupplierListDeail',
    meta: {
      title: '供应商详情信息',
      activeMenu: ['RISE_ADMIN', 'ADMIN_MAIN_DATA']
    },
    component: () => import('@/views/mainDataSupplier/list/detail')
  },
  {
    path: '/mainDataSupplier/N-Tier/detail',
    name: 'MainDataSupplierN-TierDetail',
    meta: {
      title: 'N-Tier详情页面',
      activeMenu: ['RISE_ADMIN', 'ADMIN_MAIN_DATA']
    },
    component: () => import('@/views/mainDataSupplier/N-Tier/detail/index')
  }
]
