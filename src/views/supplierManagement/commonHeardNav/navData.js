/*
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-06-22 11:05:40
 * @LastEditors: caopeng
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
    key: 'GONGYINGSHANGLIST'
  },
  {
    value: 2,
    name: '供应商绩效',
    url: '/supplier/spiIndex',
    activePath: '/supplier/spiIndex',
    key: 'GONGYINGSHYANGJIXIAO'
  },
  {
    value: 3,
    name: 'KPI',
    url: '/supplier/kpiRouter',
    activePath: '/supplier/kpiRouter',
    key: 'KPI'
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
    key: 'NJIGONGYINGLIAN'
  }
  //   {
  //     value: 6,
  //     name: '供应商标签库',
  //     url: '/supplier/supplierTag',
  //     activePath: '/supplier/supplierTag',
  //     key: '供应商标签库',
  //   },
]

export const categoryManagementAssistantList = [
  {
    value: 1,
    name: '总览',
    url: '/supplier/spiIndex/spiAll',
    activePath: '/supplier/spiIndex/spiAll',
    key: 'ZONGLAN'
  },
  {
    value: 2,
    name: '供应商绩效',
    url: '/supplier/spiIndex/supplierPowerBi',
    activePath: '/supplier/spiIndex/supplierPowerBi',
    key: 'GONGYINGSHANGJIXIAO'
  },
  {
    value: 3,
    name: '年度重点追踪',
    url: '/supplier/spiIndex/supplierPoint',
    activePath: '/supplier/spiIndex/supplierPoint',
    key: 'NIANDUZHONGDIANZHUIZONG'
  },
  {
    value: 4,
    name: '半年报回顾',
    url: '/supplier/spiIndex/supplierList',
    activePath: '/supplier/spiIndex/supplierList',
    key: 'BANNIANBAOHUIGU '
  }
]

export const categoryManagementAssistantListkpi = [
  {
    value: 1,
    name: '总览',
    url: '/supplier/kpiRouter/kpiList',
    activePath: '/supplier/kpiRouter/kpiList',
    key: 'ZONGLAN'
  },
  {
    value: 2,
    name: '详情',
    url: '/supplier/kpiRouter/supplierKpiTreeTable',
    activePath: '/supplier/kpiRouter/supplierKpiTreeTable',
    key: 'XIANGQING'
  }
]

export const nTierRouterList = [
  {
    value: 1,
    name: 'N级供应链地图',
    url: '/supplier/NTier/NTierMap',
    activePath: '/supplier/NTier/NTierMap',
    key: 'NJIGONGYINGLIANDITU'
  },
  {
    value: 2,
    name: 'N级供应链风险',
    url: '/supplier/NTier/supplyChainRisk',
    activePath: '/supplier/NTier/supplyChainRisk',
    key: 'NJIGONGYINGLIANFENGXIAN'
  },
  {
    value: 3,
    name: 'N级供应链分析',
    url: '/supplier/NTier/supplyChainAnalysis',
    activePath: '/supplier/NTier/supplyChainAnalysis',
    key: 'NJIGONGYINGLIANFENXI'
  },
  {
    value: 4,
    name: 'N级供应链维护',
    url: '/supplier/NTier/supplyMaintain/nTierBKL',
    activePath: '/supplier/NTier/supplyMaintain/nTierBKL',
    key: 'NJIGONGYINGLIANWEIHU'
  }
]
