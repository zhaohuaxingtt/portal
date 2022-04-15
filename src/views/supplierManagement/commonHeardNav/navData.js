/*
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-06-22 11:05:40
 * @LastEditors: Please set LastEditors
 * @Descripttion: your project
 */
/*
 * @Author: yourname
 * @Descripttion: your project
 */
export const tabRouterList = [
  {
    value: 1,
    name: '供应商360',
    url: '/supplier/supplierList',
    activePath: '/supplier/supplierList',
    key: 'GONGYINGSHANGLIST',
    permissionKey: 'SUPPLIER_WORKBENCH_360'
  },
  {
    value: 2,
    name: '供应商绩效',
    url: '/supplier/spiIndex',
    activePath: '/supplier/spiIndex',
    key: 'GONGYINGSHYANGJIXIAO',
    permissionKey: 'SUPPLIER_MERITS'
  },
  {
    value: 3,
    name: 'KPI',
    url: '/supplier/kpiRouter',
    activePath: '/supplier/kpiRouter',
    key: 'KPI',
    permissionKey: 'WORKBENCH_KPI',
  },
  //   {
  //     value: 4,
  //     name: '黑名单',
  //     // url: '/supplier/kpi',
  //     //activePath: '/supplier/kpi',
  //     key: '黑名单',
  //   },
  {
    value: 4,
    name: 'N级供应链',
    url: '/supplier/NTier',
    activePath: '/supplier/NTier',
    key: 'NJIGONGYINGLIAN',
    permissionKey: 'WORKBENCH_N_LEVEL_SUPPLIER'
  },
  {
    value: 5,
    name: '供应商组管理',
    url: '/supplier/suppliergroupmanagement',
    activePath: '/supplier/suppliergroupmanagement',
    key: 'GONGYINGSHANGZUGUANLI',
    // permissionKey: 'WORKBENCH_SUPPLIER_GROUP_MANAGEMENT'
  }
  //   {
  //     value: 6,
  //     name: '供应商标签库',
  //     url: '/supplier/supplierTag',
  //     activePath: '/supplier/supplierTag',
  //     key: '供应商标签库',
  //   },
]

export const tabRouterListGP = [
  {
    value:1,
    name: '供应商360',
    url: '/supplier/supplierListGP',
    activePath: '/supplierListGP',
    key: 'GONGYINGSHANGLIST',
    permissionKey: 'SUPPLIER_WORKBENCH_360'
  },
  {
    value:2,
    name: '分散（内部报销）供应商',
    url: '/supplier/supplierListDis',
    activePath: '/supplierListDis',
    key: 'FENSANNEIBUBAOXIAOGONGYINGSHANG',
    permissionKey: 'SUPPLIER_DISPERSEDSUPPLIER'
  },
]

export const categoryManagementAssistantList = [
  {
    value: 1,
    name: '总览',
    url: '/supplier/spiIndex/spiAll',
    activePath: '/supplier/spiIndex/spiAll',
    key: 'ZONGLAN',
    permissionKey: 'SUPPLIER_WORKBENCH_JIXIAO_ZONGLAN'
  },
  {
    value: 2,
    name: '供应商绩效',
    url: '/supplier/spiIndex/supplierPowerBi',
    activePath: '/supplier/spiIndex/supplierPowerBi',
    key: 'GONGYINGSHANGJIXIAO',
    permissionKey: 'SUPPLIER_WORKBENCH_JIXIAO_GONGYINGSHANGJIXIAO'
  },
  {
    value: 3,
    name: '年度重点追踪',
    url: '/supplier/spiIndex/supplierPoint',
    activePath: '/supplier/spiIndex/supplierPoint',
    key: 'NIANDUZHONGDIANZHUIZONG',
    permissionKey: 'SUPPLIER_WORKBENCH_JIXIAO_NIANDUZHONGDIANZHUIZONG'
  },
  {
    value: 4,
    name: '半年报回顾',
    url: '/supplier/spiIndex/supplierList',
    activePath: '/supplier/spiIndex/supplierList',
    key: 'BANNIANBAOHUIGU',
    permissionKey: 'SUPPLIER_WORKBENCH_JIXIAO_BANNIANBAOHUIGU'
  }
]

export const categoryManagementAssistantListkpi = [
  {
    value: 1,
    name: '总览',
    url: '/supplier/kpiRouter/kpiList',
    activePath: '/supplier/kpiRouter/kpiList',
    key: 'ZONGLAN',
    permissionKey: 'SUPPLIER_WORKBENCH_KPI_ZONGLAN'
  },
  {
    value: 2,
    name: '详情',
    url: '/supplier/kpiRouter/supplierKpiTreeTable',
    activePath: '/supplier/kpiRouter/supplierKpiTreeTable',
    key: 'XIANGQING',
    permissionKey: 'SUPPLIER_WORKBENCH_KPI_XIANGQING'
  }
]

export const nTierRouterList = [
  {
    value: 1,
    name: 'N级供应链地图',
    url: '/supplier/NTier/NTierMap',
    activePath: '/supplier/NTier/NTierMap',
    key: 'NJIGONGYINGLIANDITU',
    permissionKey:"SUPPLIER_WORKBENCH_N_NJIGONGYINGLIANDITU"
  },
  {
    value: 2,
    name: 'N级供应链风险',
    url: '/supplier/NTier/supplyChainRisk',
    activePath: '/supplier/NTier/supplyChainRisk',
    key: 'NJIGONGYINGLIANFENGXIAN',
    permissionKey:"SUPPLIER_WORKBENCH_N_NJIGONGYINGLIANFENGXIAN"
  },
  {
    value: 3,
    name: 'N级供应链分析',
    url: '/supplier/NTier/supplyChainAnalysis',
    activePath: '/supplier/NTier/supplyChainAnalysis',
    key: 'NJIGONGYINGLIANFENXI',
    permissionKey:"SUPPLIER_WORKBENCH_N_NJIGONGYINGLIANFENXI"
  },
  {
    value: 4,
    name: 'N级供应链维护',
    url: '/supplier/NTier/supplyMaintain/nTierBKL',
    activePath: '/supplier/NTier/supplyMaintain/nTierBKL',
    key: 'NJIGONGYINGLIANWEIHU',
    permissionKey:"SUPPLIER_WORKBENCH_N_NJIGONGYINGLIANWEIHU"
  }
]
