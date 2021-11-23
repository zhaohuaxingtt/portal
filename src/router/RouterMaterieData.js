import mainLayout from '@/views/materielMainData/layout'

export default [
  {
    path: '/materielData',
    name: 'materielData',
    redirect: '/materielData/parts-message',
    component: mainLayout,
    children: [
      {
        path: 'parts-message',
        name: 'partsMessage',
        meta: {
          title: '零件信息',
          activeMenu: ['RISE_ADMIN', 'ADMIN_MAIN_DATA']
        },
        component: () => import('@/views/materielMainData/partMainData')
      },
      {
        path: 'material-group',
        name: 'materialGroup',
        meta: {
          title: '材料组信息',
          activeMenu: ['RISE_ADMIN', 'ADMIN_MAIN_DATA']
        },
        component: () => import('@/views/materielMainData/partsMaterialGroup')
      },
      {
        path: 'product-message',
        name: 'productMessage',
        meta: {
          title: '产品主数据',
          activeMenu: ['RISE_ADMIN', 'ADMIN_MAIN_DATA']
        },
        component: () => import('@/views/materielMainData/ProductMasterData')
      },
      {
        path: 'mould',
        name: 'MTZMaterielGroupMould',
        meta: {
          title: '模具材料组信息',
          activeMenu: ['RISE_ADMIN', 'ADMIN_MAIN_DATA']
        },
        component: () => import('@/views/materielMainData/mould')
      },
      {
        path: 'RAW-message',
        name: 'RAWMessage',
        meta: {
          title: '原材料信息',
          activeMenu: ['RISE_ADMIN', 'ADMIN_MAIN_DATA']
        },
        component: () => import('@/views/mtzDataManage/rawMaterielInfor')
      },
      {
        path: 'MTZ-RAW-materiel',
        name: 'MTZRAWMateriel',
        meta: {
          title: 'MTZ原材料信息',
          activeMenu: ['RISE_ADMIN', 'ADMIN_MAIN_DATA']
        },
        component: () => import('@/views/mtzDataManage/mtzRawMaterielInfor')
      },
      {
        path: 'MTZ-materiel-group',
        name: 'MTZMaterielGroup',
        meta: {
          title: 'MTZ材料组信息',
          activeMenu: ['RISE_ADMIN', 'ADMIN_MAIN_DATA']
        },
        component: () => import('@/views/mtzDataManage/mtzMaterielGroupInfor')
      },
      {
        path: 'Heavy-Item',
        name: 'HeavyItem',
        meta: {
          title: 'eavyItem',
          activeMenu: ['RISE_ADMIN', 'ADMIN_MAIN_DATA']
        },
        component: () => import('@/views/materielMainData/heavyItem')
      }
    ]
  }
]

export const routerDetailMaterieData = [
  {
    path: '/materielData/parts-message/edit',
    name: 'partsMessageEdit',
    meta: {
      title: '编辑零件主数据',
      activeMenu: ['RISE_ADMIN', 'ADMIN_MAIN_DATA']
    },
    component: () => import('@/views/materielMainData/partMainData/edit')
  },
  {
    path: '/materielData/material-group',
    name: 'materialGroup',
    meta: {
      title: '材料组信息',
      activeMenu: ['RISE_ADMIN', 'ADMIN_MAIN_DATA']
    },
    component: () => import('@/views/materielMainData/partsMaterialGroup')
  },
  {
    path: '/materielData/material-group/detail',
    name: 'materialGroupDetail',
    meta: {
      title: '材料组信息',
      activeMenu: ['RISE_ADMIN', 'ADMIN_MAIN_DATA']
    },
    component: () =>
      import('@/views/materielMainData/partsMaterialGroup/detail')
  },
  {
    path: '/materielData/material-group/detail/add-technology',
    name: 'add-technology',
    meta: {
      title: '工艺组信息',
      activeMenu: ['RISE_ADMIN', 'ADMIN_MAIN_DATA']
    },
    component: () =>
      import(
        '@/views/materielMainData/partsMaterialGroup/components/addTechnology'
      )
  },
  {
    path: '/materielData/product-message/edit',
    name: 'productDetailMessage',
    meta: {
      title: '产品主数据详情信息',
      activeMenu: ['RISE_ADMIN', 'ADMIN_MAIN_DATA']
    },
    component: () =>
      import('@/views/materielMainData/ProductMasterData/detailMessage')
  },

  {
    path: '/materielData/MTZ-materiel-group/detail',
    name: 'MTZMaterielGroupDetail',
    meta: {
      title: 'MTZ材料组信息详情',
      activeMenu: ['RISE_ADMIN', 'ADMIN_MAIN_DATA']
    },
    component: () =>
      import('@/views/mtzDataManage/mtzMaterielGroupInfor/detail')
  },
  {
    path: '/materielData/MTZ-materiel-group/relation',
    name: 'MTZMaterielGroupRelation',
    meta: {
      title: 'MTZ材料组关联关系列表',
      activeMenu: ['RISE_ADMIN', 'ADMIN_MAIN_DATA']
    },
    component: () =>
      import('@/views/mtzDataManage/mtzMaterielGroupInfor/relation')
  },
  {
    path: '/materielData/mould/detail',
    name: 'MTZMaterielGroupMouldDetail',
    meta: {
      title: '模具材料组详细信息',
      activeMenu: ['RISE_ADMIN', 'ADMIN_MAIN_DATA']
    },
    component: () => import('@/views/materielMainData/mould/detail')
  }
]
