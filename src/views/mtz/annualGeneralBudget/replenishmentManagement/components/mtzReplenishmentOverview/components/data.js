/*
 * @Author: your name
 * @Date: 2021-10-09 15:06:29
 * @LastEditTime: 2021-11-11 17:45:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \front-portal\src\views\mtz\annualGeneralBudget\replenishmentManagement\components\mtzReplenishmentOverview\components\data.js
 */
export const TABLE_COLUMS = [
  {
    type: 'selection',
    width: '60px'
  },
  {
    type: 'index',
    width: '60px',
    label: '#'
  },
  {
    prop: 'saNo',
    label: '采购框架',
    minWidth: 120
  },
  {
    prop: 'saItemNo',
    label: '项目号',
    minWidth: 120
  },
  {
    prop: 'mtzDocMonth',
    label: '补差期间',
    minWidth: 120
  },
  {
    prop: 'fpartNo',
    label: '零件号',
    minWidth: 120
  },
  {
    prop: 'materialNo',
    label: '原材料牌号',
    minWidth: 120
  },
  {
    prop: 'materialName',
    label: '原材料名称',
    minWidth: 120
  },
  {
    prop: 'materialCategory',
    label: '材料中类',
    minWidth: 160,
    customRender: (h, scope) => {
      return (
        <span>
          {scope.row.materialCategory}-{scope.row.materialName}
        </span>
      )
    }
  },
  {
    prop: 'basePrice',
    label: '原材料基价',
    minWidth: 120
  },
  {
    prop: 'basePriceUnit',
    label: '单位',
    minWidth: 120
  },
  {
    prop: 'bexchangeRate',
    label: '基价汇率',
    minWidth: 120
  },
  {
    prop: 'calUsg',
    label: '原材料用量',
    minWidth: 120
  },
  {
    prop: 'cond',
    label: '阈值',
    minWidth: 120
  },
  {
    prop: 'thresholdCompensationLogic',
    label: '阈值补差逻辑',
    minWidth: 120
  },
  {
    prop: 'rate',
    label: '补差系数',
    minWidth: 120
  },
  {
    prop: 'effPrice',
    label: '原材料市场价',
    minWidth: 120
  },
  {
    prop: 'basePriceUnit',
    label: '市场价单位',
    minWidth: 120
  },
  {
    prop: 'effExchangeRate',
    label: '市场价汇率',
    minWidth: 120
  },
  {
    prop: 'priceNo',
    label: '零件数量',
    minWidth: 120
  },
  {
    prop: 'calUnit',
    label: '零件数量单位',
    minWidth: 120
  },
  {
    prop: 'actAmt',
    label: '补差额',
    minWidth: 120
  },
  {
    prop: 'appAmt',
    label: '实际补差额',
    minWidth: 120
  },
  {
    prop: 'sPartNo',
    label: '二次件零件号',
    minWidth: 120
  },
  {
    prop: 'secondSupplierId',
    label: '二次件供应商',
    minWidth: 140,
    customRender: (h, scope) => {
      return (
        <span>
          {scope.row.secondSupplierSap}-{scope.row.secondSupplierName}
        </span>
      )
    }
  },
  {
    prop: 'factor',
    label: '一二次件比例',
    minWidth: 120
  }
]

export const tableTitle = [
  { props: 'assemblyPartnum', name: '一次件零件号', key: 'YCJLJH', width: 150 },
  {
    props: 'assemblyPartName',
    name: '一次件零件名称',
    key: 'YCJLJMC',
    width: 150
  },
  { props: 'qty', name: '一次件结算数量', key: 'YCJJSSL', width: 150 },
  { props: 'departmentName', name: '科室', key: 'KESHI', width: 150 },
  { props: 'ekName', name: '采购员', key: 'CAIGOUYUAN', width: 150 },
  { props: 'piecePartnum', name: '二次件零件号', key: 'ECJLJH', width: 150 },
  {
    props: 'piecePartName',
    name: '二次件零件名称',
    key: 'ECJLJMC',
    width: 150
  },
  { props: 'factor', name: '一二次件用量', key: 'YECJYL', width: 150 },
  { props: 'sty', name: '二次件结算数量', key: 'ECJJSSL', width: 150 },
  {
    props: 'ssupplier',
    name: '二次件供应商',
    key: 'ERCIJIANGONGYINGSHANG',
    width: 220
  },
  { props: 'compMoney1', name: '补差金额（收货）', key: 'BCJESH', width: 150 },
  { props: 'compMoney2', name: '补差金额（结算）', key: 'BCJEJS', width: 150 },
  {
    props: 'waitLaunchedDocMoney',
    name: '待发起凭证',
    key: 'DFQPZ',
    width: 150
  },
  {
    props: 'hasLaunchedDocMoney',
    name: '已发起凭证',
    key: 'YFQPZ',
    width: 150
  },
  { props: 'trueCompMoney', name: '实际补差金额', key: 'SJBCJE', width: 150 },
  { props: 'waitVerifyMoney', name: '待确认金额', key: 'DQRJE', width: 150 },
  { props: 'hasVerifyMoney', name: '已确认金额', key: 'YQRJE', width: 150 },
  { props: 'hasRatifyMoney', name: '已批准金额', key: 'YPZJE', width: 150 },
  { props: 'hasPayMoney', name: '已支付金额', key: 'YZFJE', width: 150 },
  { props: 'ruleNo', name: '规则编号', key: 'GZBH', width: 150 },
  { props: 'materialCode', name: '原材料牌号', key: 'YCLPH', width: 150 },
  { props: 'material', name: '原材料', key: 'YCL', width: 150 },
  { props: 'price', name: '基价', key: 'JIJIA', width: 150 },
  { props: 'countUnit', name: '每', key: 'MEI', width: 150 },
  { props: 'dosage', name: '用量', key: 'YONGLIANG', width: 150 },
  {
    props: 'dosageMeasureUnit',
    name: '用量计量单位',
    key: 'YONGLIANGJILIANGDANWEI',
    width: 150
  },
  { props: 'marketSource', name: '市场价来源', key: 'SCJLY', width: 150 },
  { props: 'compensationRatio', name: '补差系数', key: 'BCXS', width: 150 },
  { props: 'compensationPeriod', name: '补差周期', key: 'BCZQ', width: 150 },
  { props: 'threshold', name: '阈值', key: 'YUZHI', width: 150 },
  {
    props: 'thresholdCompensationLogic',
    name: '阈值补差逻辑',
    key: 'YZBCLJ',
    width: 150
  },
  { props: 'startDate', name: '有效期起', key: 'YXQQ', width: 150 },
  { props: 'endDate', name: '有效期止', key: 'YXQZ', width: 150 },
  { props: 'updateDate', name: '更新时间', key: 'GENGXINSHIJIAN', width: 150 }
]
