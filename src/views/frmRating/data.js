/*
 * @version: 1.0
 * @Author: zbin
 * @Date: 2021-05-21 10:18:28
 * @LastEditors: zbin
 * @LastEditTime: 2021-06-08 19:31:41
 * @Descripttion: your project
 */
export const tabRouterList = [
  {
    value: 1,
    name: '概览',
    url: '/supplier/frmrating/supplieroverview',
    activePath: '/supplier/frmrating/supplieroverview',
    key: 'SUPPLIER_GAILAN',
    permissionKey:"PORTAL_SUPPLIER_NAV_GAILAN"
  },
  {
    value: 2,
    name: 'FRM综合管理',
    url: '/supplier/frmrating/frmintegratedmanagement',
    activePath: '/supplier/frmrating/frmintegratedmanagement',
    key: 'SUPPLIER_FRMZONGHEGUANLI',
    permissionKey:"PORTAL_SUPPLIER_NAV_FRMZONGHEGUANLI"
  },
  {
    value: 3,
    name: '新供应商评级',
    url: '/supplier/frmrating/newsupplierrating',
    activePath: '/supplier/frmrating/newsupplierrating',
    key: 'SUPPLIER_XINGONGYINGSHANGPINGJI',
    permissionKey:"PORTAL_SUPPLIER_NAV_XINGONGYINGSHANGPINGJI"
  },
  {
    value: 4,
    name: '初步评级',
    url: '/supplier/frmrating/preliminaryrating',
    activePath: '/supplier/frmrating/preliminaryrating',
    key: 'SUPPLIER_CHUBUPINGJI',
    permissionKey:"PORTAL_SUPPLIER_NAV_CHUBUPINGJI"
  },
  {
    value: 5,
    name: '深入评级',
    url: '/supplier/frmrating/depthRating',
    activePath: '/supplier/frmrating/depthRating',
    key: 'SUPPLIER_SHENRUPINGJI',
    permissionKey:"PORTAL_SUPPLIER_NAV_SHENRUPINGJI"
  },
  {
    value: 6,
    name: '风险信号',
    url: '/supplier/frmrating/riskSignal',
    activePath: '/supplier/frmrating/riskSignal',
    key: 'SUPPLIER_FENGXIANXINHAO',
    permissionKey:"PORTAL_SUPPLIER_NAV_FENGXIANXINHAO"
  },
  {
    value: 7,
    name: '舆情监测',
    key: 'SUPPLIER_YUQINGJIANCE',
    url: '/supplier/frmrating/publicOpinion',
    activePath: '/supplier/frmrating/publicOpinion',
    permissionKey:"PORTAL_SUPPLIER_NAV_YUQINGJIANCE"
  },
  {
    value: 8,
    name: '供应商融资申请',
    key: 'SUPPLIER_GONGYINGSHANGRONGZISHENQING',
    permissionKey:"PORTAL_SUPPLIER_NAV_GONGYINGSHANGRONGZISHENQING"
  }
]

export const preliminaryRatingRouterList = [
  {
    value: 1,
    name: '定性打分',
    url: '/supplier/frmrating/preliminaryrating/qualitativeScoringPage',
    activePath: '/supplier/frmrating/preliminaryrating/qualitativeScoringPage',
    key: 'SPR_FRM_FRMGL_DXDAF'
  },
  {
    value: 2,
    name: '初步评级',
    url: '/supplier/frmrating/preliminaryrating/preliminaryrating',
    activePath: '/supplier/frmrating/preliminaryrating/preliminaryrating',
    key: 'SUPPLIER_CHUBUPINGJI'
  }
]
