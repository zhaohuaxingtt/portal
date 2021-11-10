/*
 * @Author: Luoshuang
 * @Date: 2021-07-27 20:28:44
 * @LastEditors: Luoshuang
 * @LastEditTime: 2021-09-13 11:29:30
 * @Description: 项目管理相关路由
 * @FilePath: \front-portal\src\router\RouterProjectMgmt.js
 */
export default [
  {
    path: '/scheassistant',
    name: 'scheassistant',
    meta: {
      title: '排程助手'
    },
    component: () => import('@/views/projectMgt'),
    redirect: '/scheassistant/defaultscheLogic',
    children: [
      {
        path: 'defaultscheLogic',
        name: 'defaultScheLogic',
        meta: {
          title: '排程助手-默认排程算法配置'
        },
        component: () => import('@/views/projectMgt/defaultScheLogic')
      },
      {
        path: 'riskAndAlarmConfig',
        name: 'riskAndAlarmConfig',
        meta: {
          title: '排程助手-风险预警配置'
        },
        component: () => import('@/views/projectMgt/riskAndAlarmConfig')
      }
    ]
  }
]
