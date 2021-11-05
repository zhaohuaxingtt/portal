/*
 * @Author: your name
 * @Date: 2021-09-17 13:56:42
 * @LastEditTime: 2021-10-29 16:51:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \重庆软维科技\front-portal\src\views\mtz\dataBase\marketPriceEnquiry\components\data.js
 */
// 员工列表Table配置
export const tableSetting = [
  {
    props: 'materialCode',
    name: '原材料牌号',
    key: 'YUANCAILIAOPAIHAO',
    tooltip: true
  },
  { props: 'period', name: '月份期间', key: 'YUEFENQIJIAN', tooltip: true },
  { props: 'marketType', name: '市场价类别', key: 'SHICHANGJIALEIBIE' },
  { props: 'materialName', name: '原材料名称', key: 'YUANCAILIAOMINGCHENG' },
  { props: 'materialCategory', name: '材料中类', key: 'CAILIAOZHONGLEI' },
  { props: 'categoryDesc', name: '中类描述', key: 'ZHONGLEIMIAOSHU' },
  { props: 'source', name: '市场价来源', key: 'SHICHANGJIALAIYUAN' },
  { props: 'eprice', name: '市场价', key: 'SHICHANGJIA' },
  { props: 'unit', name: '计量单位', key: 'JILIANGDANWEI' },
  { props: 'priceUnit', name: '每', key: 'MEI' },
  { props: 'currency', name: '货币', key: 'HUOBI' },
  { props: 'exchangeRate', name: '汇率', key: 'MTZHUILV' }
]

export const ruleQueryFormData = [
  {
    props: 'materialCode',
    name: '原材料牌号',
    key: 'YUANCAILIAOPAIHAO',
    type: 'input'
  },
  { props: 'periodStart', name: '月度起', key: 'YUEDUQI', type: 'datepicker' },
  { props: 'periodEnd', name: '月度止', key: 'YUEDUZHI', type: 'datepicker' },
  {
    props: 'materialName',
    name: '原材料名称',
    key: 'YUANCAILIAOMINGCHENG',
    type: 'input'
  },
  {
    props: 'materialCategory',
    name: '材料中类',
    key: 'CAILIAOZHONGLEI',
    type: 'input'
  },
  {
    props: 'categoryDesc',
    name: '中类描述',
    key: 'ZHONGLEIMIAOSHU',
    type: 'input'
  },
  {
    props: 'source',
    name: '市场价来源',
    key: 'SHICHANGJIALAIYUAN',
    type: 'select'
  },
  {
    props: 'marketType',
    name: '市场价类别',
    key: 'SHICHANGJIALEIBIE',
    type: 'select'
  }
]

export const uploadInfoTableTitle = [
  { props: 'index', name: '#', key: '', tooltip: true, width: 50},
  { props: 'remark', name: '错误信息', key: 'CUOWUXINXI', tooltip: true, width: 400},
  { props: 'materialNo', name: '编码', key: 'BIANMA', tooltip: true, width: 120},
  { props: 'name', name: '名称', key: 'MINGCHENG', tooltip: true, width: 120 },
  { props: 'period', name: '生效期间', key: 'SHENGXIAOQIJIAN', width: 120 },
  { props: 'marketType', name: '类别', key: 'LEIBIE', width: 120 },
  { props: 'eprice', name: '市场价', key: 'SHICHANGJIA', width: 120 },
  { props: 'currency', name: '币种', key: 'BIZHONG', width: 120 },
  { props: 'priceUnit', name: '定价单位', key: 'DINGJIADANWEI', width: 120 },
  { props: 'unit', name: '定价计量单位', key: 'DINGJIAJILIANGDANWEI', width: 150 },
  { props: 'exchangeRate', name: '汇率', key: 'MTZHUILV', width: 120 },
  { props: 'source', name: '来源', key: 'LAIYUAN', width: 120  },
]
