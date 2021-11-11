/*
 * @Author: youyuan
 * @Date: 2021-09-08 10:55:37
 * @LastEditTime: 2021-10-28 18:09:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \重庆软维科技\front-portal\src\views\mtz\annualBudgetEdit\buyerOverview\components\data.js
 */
export const search = [
  {props: 'departNumber', name: '科室', type: 'selectMultiple', key: 'KESHI'},
  {props: 'buyerName', name: '采购员', type: 'selectMultiple', key: 'CAIGOUYUAN'},
  {props: 'mtzMaterialNumber', name: 'MTZ材料组', type: 'selectMultiple', key: 'MTZCAILIAOZU'},
  {props: 'rawMaterialCodeList', name: '材料中类', type: 'selectMultiple', key: 'CAILIAOZHONGLEI'},
  {props: 'confirmStatus', name: '状态', type: 'select', key: 'ZHUANGTAI'},
]

export const tableTitle = [
  {props: 'buyerName', name: '采购员', key: 'CAIGOUYUAN'},
  {props: 'departments', name: '科室', key: 'KESHI'},
  {props: 'initPrTotal', name: '初始预算金额（百万）', key: 'CHUSHIYUSUANJINEBAIWAN'},
  {props: 'coefValue', name: '系数', key: 'XISHU'},
  {props: 'prTotal', name: '最终预算金额（百万）', key: 'ZUIZHONGYUSUANJINE'},
  {props: 'confirmStatus', name: '状态', key: 'ZHUANGTAI'},
  {props: 'option', name: '操作', key: 'CAOZUO'},
]

export const editDetailTableTitle = [
  {props: 'mtzMaterialName', name: 'MTZ材料组', key: 'MTZCAILIAOZU'},
  {props: 'materialMediumNum', name: '材料中类', key: 'CAILIAOZHONGLEI'},
  {props: 'initPrTotal', name: '初始预算金额（百万）', key: 'CHUSHIYUSUANJINEBAIWAN'},
  {props: 'coefValue', name: '系数', key: 'XISHU'},
  {props: 'prTotal', name: '最终预算金额（百万）', key: 'ZUIZHONGYUSUANJINE'},
]