/*
 * @Author: your name
 * @Date: 2021-08-10 14:33:59
 * @LastEditTime: 2021-08-13 13:42:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\router\RouterMainData.js
 */
import mainLayout from '@/views/mainData/layout'
export default [
  {
    path: '/main-data',
    name: 'mainData',
    redirect: '/main-data/car-project',
    component: mainLayout,
    children: [
      {
        path: 'product-family',
        name: 'MainDataProductFamily',
        meta: {
          title: '产品家族',
          activeMenu: ['RISE_ADMIN', 'ADMIN_MAIN_DATA']
        },
        component: () => import('@/views/mainData/productFamily')
      },
      {
        path: 'car-project',
        name: 'MainDataCarProject',
        meta: {
          title: '车型项目管理',
          activeMenu: ['RISE_ADMIN', 'ADMIN_MAIN_DATA']
        },
        component: () => import('@/views/mainData/carProject')
      },
      {
        path: 'car',
        name: 'MainDataCar',
        meta: {
          title: '车型主数据管理',
          activeMenu: ['RISE_ADMIN', 'ADMIN_MAIN_DATA']
        },
        component: () => import('@/views/mainData/car')
      }
    ]
  }
]

export const routerDetailMainData = [
  {
    path: '/main-data/car/detail',
    name: 'MainDataCarDetail',
    meta: {
      title: '车型主数据',
      activeMenu: ['RISE_ADMIN', 'ADMIN_MAIN_DATA']
    },
    component: () => import('@/views/mainData/car/detail')
  },
  {
    path: '/main-data/carproject/add',
    name: 'MainDataCarProjectAdd',
    meta: {
      title: '车型项目主数据',
      activeMenu: ['RISE_ADMIN', 'ADMIN_MAIN_DATA']
    },
    component: () => import('@/views/mainData/carProject/detail')
  }
]
