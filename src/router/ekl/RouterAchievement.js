//updated by dolphin on 5/19/2020, 7:54:14 PM.

'use strict'

export default [
  {
    path: '/achievement/baseData/mymerit',
    name: 'Mymerit',
    component: () => import('@/views/purchase/achievement/mymerit')
  },
  {
    path: '/achievement/baseData/list',
    name: 'Achievement',
    component: () => import('@/views/purchase/achievement')
  },
  {
    path: '/achievement/baseData/outputManagement',
    name: 'OutputManagement',
    component: () => import('@/views/purchase/outputManagement')
  },
  {
    path: '/achievement/baseData/targetManage',
    name: 'BatchDetail',
    component: () => import('@/views/purchase/batchDetail')
  }
]
