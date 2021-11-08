/*
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-06-22 11:05:40
 * @LastEditors: zbin
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
    key: '供应商360',
  },
  {
    value: 2,
    name: '供应商绩效',
    url: '/supplier/spiIndex',
    activePath: '/supplier/spiIndex',
    key: '供应商绩效',
  },
  {
    value: 3,
    name: 'KPI',
    url: '/supplier/kpiRouter',
    activePath: '/supplier/kpiRouter',
    key: 'KPI',
  },
  {
    value: 4,
    name: '黑名单',
    // url: '/supplier/kpi',
    //activePath: '/supplier/kpi',
    key: '黑名单',
  },
  {
    value: 5,
    name: 'N级供应链',
    url: '/supplier/NTier',
    activePath: '/supplier/NTier',
    key: 'N级供应链',
  },
  {
    value: 6,
    name: '供应商标签库',
    url: '/supplier/supplierTag',
    activePath: '/supplier/supplierTag',
    key: '供应商标签库',
  },
];


export const categoryManagementAssistantList = [
  {
    value: 1,
    name: '总览',
    url: '/supplier/spiIndex/spiAll',
    activePath: '/supplier/spiIndex/spiAll',
    key: '总览',
  },
  {
    value: 2,
    name: '供应商绩效',
    url: '/supplier/spiIndex/supplierPowerBi',
    activePath: '/supplier/spiIndex/supplierPowerBi',
    key: '供应商绩效',
  },
  {
    value: 3,
    name: '年度重点追踪',
    url: '/supplier/spiIndex/supplierPoint',
    activePath: '/supplier/spiIndex/supplierPoint',
    key: '年度重点追踪',
  },
  {
    value: 4,
    name: '半年报回顾',
    url: '/supplier/spiIndex/supplierList',
    activePath: '/supplier/spiIndex/supplierList',
    key: '半年报回顾 ',
  }
];

export const categoryManagementAssistantListkpi = [
  {
    value: 1,
    name: '总览',
    url: '/supplier/kpiRouter/kpiList',
    activePath: '/supplier/kpiRouter/kpiList',
    key: '总览',
  },
  {
    value: 2,
    name: '详情',
    url: '/supplier/kpiRouter/supplierKpiTreeTable',
    activePath: '/supplier/kpiRouter/supplierKpiTreeTable',
    key: '详情',
  }
];

export const nTierRouterList = [
  {
    value: 1,
    name: 'N级供应链地图',
    url: '/supplier/NTier/NTierMap',
    activePath: '/supplier/NTier/NTierMap',
    key: 'N级供应链地图',
  },
  {
    value: 2,
    name: 'N级供应链风险',
    url: '/supplier/NTier/supplyChainRisk',
    activePath: '/supplier/NTier/supplyChainRisk',
    key: 'N级供应链风险',
  },
  {
    value: 3,
    name: 'N级供应链分析',
    url: '/supplier/NTier/supplyChainAnalysis',
    activePath: '/supplier/NTier/supplyChainAnalysis',
    key: 'N级供应链分析',
  },
  {
    value: 4,
    name: 'N级供应链维护',
    url: '/supplier/NTier/supplyMaintain',
    activePath: '/supplier/NTier/supplyMaintain',
    key: 'N级供应链维护',
  }
];
