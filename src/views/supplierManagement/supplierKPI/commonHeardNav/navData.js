/*
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-06-22 11:05:40
 * @LastEditors: 水痕
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
    //url: '/supplier/index',
    //activePath: '',
    key: '供应商360',
    permissionKey: 'SUPPLIER_WORKBENCH_360'
  },
  {
    value: 2,
    name: '供应商绩效',
    url: '/supplier/kpiIndex',
    activePath: '/supplier/kpiIndex',
    key: '供应商绩效',
    permissionKey: 'SUPPLIER_MERITS'
  },
  {
    value: 3,
    name: 'KPI',
    url: '/supplier/kpiList',
    activePath: '/supplier/kpiList',
    key: 'KPI',
    permissionKey: 'WORKBENCH_KPI',
  },
  // {
  //   value: 4,
  //   name: '黑名单',
  //   // url: '/supplier/kpi',
  //   //activePath: '/supplier/kpi',
  //   key: '黑名单'
  // },
  {
    value: 4,
    name: 'N级供应链',
    url: '/supplier/NTier',
    activePath: '/supplier/NTier',
    key: 'N级供应链',
    permissionKey: 'WORKBENCH_N_LEVEL_SUPPLIER',
  }
]

export const categoryManagementAssistantList = [
  {
    value: 1,
    name: '总览',
    url: '/supplier/kpiIndex',
    activePath: '/supplier/kpiIndex',
    key: 'ZONGLAN',
    permissionKey: 'SUPPLIER_WORKBENCH_JIXIAO_ZONGLAN'
  },
  {
    value: 2,
    name: '供应商绩效',
    url: '/supplier/supplierPowerBi',
    activePath: '/supplier/supplierPowerBi',
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
  },
  {
    value: 5,
    name: '指标管理',
    url: '/supplier/spiIndex/supplierIndexManage',
    activePath: '/supplier/spiIndex/supplierIndexManage',
    key: 'ZHIBIAOGUANLI',
    permissionKey: 'SUPPLIER_WORKBENCH_JIXIAO_SUPPLIERINDEXMANAGE'
  },
  {
    value: 6,
    name: '绩效版本管理',
    url: '/supplier/spiIndex/supplierVersion',
    activePath: '/supplier/spiIndex/supplierVersion',
    key: '绩效版本管理',
    permissionKey: 'SUPPLIER_WORKBENCH_JIXIAO_SUPPLIERBERSION'
  },
  {
    value: 6,
    name: 'KPI',
    url: '/supplier/spiIndex/kpi',
    activePath: '/supplier/spiIndex/kpi',
    key: 'KPI',
    permissionKey: 'SUPPLIER_WORKBENCH_JIXIAO_KPI'
  },
  {
    value: 7,
    name: '设置',
    url: '/supplier/spiIndex/system',
    activePath: '/supplier/spiIndex/system',
    key: '设置',
    permissionKey: 'SUPPLIER_WORKBENCH_JIXIAO_SYSTEM'
  }
]

export const categoryManagementAssistantListkpi = [
  {
    value: 1,
    name: '总览',
    url: '/supplier/kpiRouter/kpiList',
    activePath: '/supplier/kpiRouter/kpiList',
    key: '总览'
  },
  {
    value: 2,
    name: '详情',
    url: '/supplier/kpiRouter/imgKpi',
    activePath: '/supplier/kpiRouter/imgKpi',
    key: '详情'
  }
]
