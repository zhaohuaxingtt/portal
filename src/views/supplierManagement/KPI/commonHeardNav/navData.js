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
    value: 2,
    name: '供应商360',
    //url: '/supplier/index',
    //activePath: '',
    key: '供应商360',
    permissionKey: 'SUPPLIER_WORKBENCH_360'
  },
  {
    value: 1,
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
    permissionKey: 'WORKBENCH_KPI'
  },
  {
    value: 4,
    name: '黑名单',
    // url: '/supplier/kpi',
    //activePath: '/supplier/kpi',
    key: '黑名单'
  },
  {
    value: 2,
    name: 'N级供应链',
    //url: '/supplier/kpi',
    //activePath: '/supplier/kpi',
    key: 'N级供应链',
    permissionKey: 'WORKBENCH_N_LEVEL_SUPPLIER'
  }
]

export const categoryManagementAssistantList = [
  {
    value: 1,
    name: '总览',
    url: '/supplier/kpiIndex',
    activePath: '/supplier/kpiIndex',
    key: '总览',
    permissionKey: 'SUPPLIER_WORKBENCH_JIXIAO_ZONGLAN'
  },
  {
    value: 2,
    name: '供应商绩效',
    url: '/supplier/supplierPowerBi',
    activePath: '/supplier/supplierPowerBi',
    key: '供应商绩效',
    permissionKey: 'SUPPLIER_WORKBENCH_JIXIAO_GONGYINGSHANGJIXIAO'
  },
  {
    value: 3,
    name: '年度回顾&绩效追踪',
    url: '/supplier/supplierList',
    activePath: '/supplier/supplierList',
    key: '年度回顾&绩效追踪'
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
