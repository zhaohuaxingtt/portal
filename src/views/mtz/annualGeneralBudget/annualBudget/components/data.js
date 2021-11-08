/*
 * @Author: youyuan
 * @Date: 2021-06-16 20:44:29
 * @LastEditTime: 2021-11-01 19:51:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-web\src\views\partsrfq\analysisTool\components\data.js
 */
 export const tableTitleBuyer = [
  {props: 'forecastTime', name: '预算年份', key: 'YUSUANNIANFEN'},
  {props: 'demandVersion', name: '用量版本', key: 'YONGLIANGBANBEN'},
  {props: 'endForecastAmount', name: '预算金额（百万）', key: 'YUSUANJINEBAIWAN'},
  {props: 'forecastVersion', name: '版本号', key: 'BANBENHAO'},
  {props: 'status', name: '状态', key: 'ZHUANGTAI'},
  {props: 'confirmDate', name: '要求确认日期', key: 'YAOQIUQUERENRIQI'},
  {props: 'confirmStatus', name: '确认状态', key: 'QUERENZHUANGTAI'},
  {props: 'realityTime', name: '实际确认日期', key: 'SHIJIQUERENRIQI'},
]

export const tableTitleDepter = [
  {props: 'forecastTime', name: '预算年份', key: 'YUSUANNIANFEN'},
  {props: 'demandVersion', name: '用量版本', key: 'YONGLIANGBANBEN'},
  {props: 'endForecastAmount', name: '预算金额（百万）', key: 'YUSUANJINEBAIWAN'},
  {props: 'forecastVersion', name: '版本号', key: 'BANBENHAO'},
  {props: 'status', name: '状态', key: 'ZHUANGTAI'},
  {props: 'confirmDate', name: '要求确认日期', key: 'YAOQIUQUERENRIQI'},
]

export const tableTitleLeader = [
  {props: 'forecastTime', name: '预算年份', key: ''},
  {props: 'demandVersion', name: '用量版本', key: '',width: 220},
  {props: 'createDate', name: '创建日期', key: ''},
  {props: 'updateDate', name: '最后更新日期', key: ''},
  {props: 'startForecastAmount', name: '初始预算金额', key: ''},
  {props: 'endForecastAmount', name: '最终预算金额', key: ''},
  {props: 'forecastVersion', name: '版本号', key: ''},
  {props: 'status', name: '状态', key: ''},
  {props: 'confirmDate', name: '要求确认日期', key: ''},
  {props: 'option', name: '操作', key: ''},
]

export const navList = [
  {
    value: 1,
    name: 'MTZ材料组',
    key: 'MTZCAILIAOZU',
  },
  {
    value: 2,
    name: '零件号',
    key: 'LINGJIANHAO',
  },
]

export const materialGroupTableTitle = [
  {props: 'mtzMaterialName', name: 'MTZ材料组', key: 'MTZCAILIAOZU'},
  {props: 'materialMediumName', name: '原材料中类', key: 'YUANCAILIAOZHONGLEI'},
  {props: 'initPrTotal', name: '初始预算金额（百万）', key: 'CHUSHIYUSUANJINE', width: 200},
  {props: 'coefValue', name: '系数', key: 'XISHU'},
  {props: 'prTotal', name: '最终预算金额（百万）', key: 'ZUIZHONGYUSUANJINE', width: 200},
]

export const partTableTitle1 = [
  {props: 'partNumber', name: '零件号', key: 'LINGJIANHAO'},
  {props: 'partName', name: '零件名称', key: 'LINGJIANMINGCHENG'},
  {props: 'mtzMaterialName', name: 'MTZ材料组', key: 'MTZCAILIAOZU'},
  {props: 'demandNum', name: '预测用量', key: 'YCYL'},
  {props: 'initPrTotal', name: '初始预算金额（百万）', key: 'CHUSHIYUSUANJINEBAIW', width: 200},
  {props: 'coefValue', name: '系数', key: 'XISHU'},
  {props: 'prTotal', name: '最终预算金额（百万）', key: 'ZUIZHONGYUSUANJINE', width: 200},
]

export const partTableTitle2 = [
  {props: 'partNumber', name: '零件号', key: 'LINGJIANHAO'},
  {props: 'partName', name: '零件名称', key: 'LINGJIANMINGCHENG'},
  {props: 'buyerName', name: '采购员', key: 'CAIGOUYUAN'},
  {props: 'mtzMaterialName', name: 'MTZ材料组', key: 'MTZCAILIAOZU'},
  {props: 'demandNum', name: '预测用量', key: 'YCYL'},
  {props: 'initPrTotal', name: '初始预算金额（百万）', key: 'CHUSHIYUSUANJINE', width: 200},
  {props: 'coefValue', name: '系数', key: 'XISHU'},
  {props: 'prTotal', name: '最终预算金额（百万）', key: 'ZUIZHONGYUSUANJINE', width: 200},
]

export const purchaseBudgetTitle = [
  {props: 'buyerName', name: '采购员', key: 'CAIGOUYUAN'},
  {props: 'departments', name: '科室', key: 'KESHI'},
  {props: 'initPrTotal', name: '初始预算金额（百万）', key: 'CHUSHIYUSUANJINE', width: 200},
  {props: 'prTotal', name: '最终预算金额（百万）', key: 'ZUIZHONGYUSUANJINE', width: 200},
  {props: 'confirmStatus', name: '状态', key: 'ZHUANGTAI'},
]

export const changeLogTitle = [
  {props: '1', name: '操作类型', key: ''},
  {props: '2', name: '操作前', key: ''},
  {props: '3', name: '操作后', key: ''},
  {props: '4', name: '操作人', key: ''},
  {props: '5', name: '操作时间', key: ''},
]