/*
 * @Author: youyuan
 * @Date: 2021-09-08 17:22:27
 * @LastEditTime: 2021-10-29 17:00:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \重庆软维科技\front-portal\src\views\mtz\annualBudgetEdit\officeOverview\components\data.js
 */
export const tableTitle = [
  {props: 'linieName', name: '采购员', key: 'CAIGOUYUAN', icon: 'iconxinxitishi', iconTextKey: '', iconText: '建议完整填写采购员信息，否则可能导致各维度统计数据不一致。'},
  {props: 'materialMinorName', name: '材料中类', key: 'CAILIAOZHONGLEI', required: true},
  {props: 'budget', name: '预算金额', key: 'YUSUANJINE', required: true},
  {props: 'mtzCategoryName', name: 'MTZ材料组', key: 'MTZCAILIAOZU', required: true},
  {props: 'sectionName', name: '科室', key: 'KESHI', required: true},
  {props: 'brandName', name: '品牌', key: 'PINPAI', required: true},
  {props: 'mark', name: '备注', key: 'BEIZHU', tooltip: true},
]


export const uploadInfoTableTitle = [
  {props: 'remark', name: '错误信息', key: 'CUOWUXINXI', tooltip: true, width: 400},
  {props: 'linieName', name: '采购员', key: 'CAIGOUYUAN'},
  {props: 'materialMinorName', name: '材料中类', key: 'CAILIAOZHONGLEI', required: true},
  {props: 'budget', name: '预算金额', key: 'YUSUANJINE', required: true},
  {props: 'mtzCategoryName', name: 'MTZ材料组', key: 'MTZCAILIAOZU', required: true},
  {props: 'sectionName', name: '科室', key: 'KESHI', required: true},
  {props: 'brandName', name: '品牌', key: 'PINPAI', required: true},
  {props: 'mark', name: '备注', key: 'BEIZHU', tooltip: true},
]